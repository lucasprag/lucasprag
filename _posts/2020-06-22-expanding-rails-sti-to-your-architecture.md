---
title: Expanding Rails' STI to your architecture
date: 2020-06-22
tags:
  - architecture
  - rails
layout: post
---

Let's say we need to create integrations with multiple ecommerce platforms that are somewhat similar where all them have orders, customers, products and the store itself, in this scenario we could use one model for each of these entities.

We don't need to stop there, we could make our software architecture understand when it's talking to an entity from platform `x` versus platform `y` and, with that, only implement the nuances of new platforms when adding them. Let me show you one idea.

## How Rails STI works

> STI or Single Table Inheritance is a way to simulate object-oriented inheritance in a relational database. - [Wikipedia](https://en.wikipedia.org/wiki/Single_Table_Inheritance).

What it means is that we can have multiple models inheriting from one model with common methods and attributes and that is linked to a single database table through active record. Let me show you how.

To achieve that, imagine a model called `Store`:

```ruby
# app/models/store.rb
class Store < ApplicationRecord
  def admin_url
    nil
  end
end
```

This model has these database columns:

```ruby
# rails g model Store name url external_id:string:uniq

class CreateStores < ActiveRecord::Migration[6.0]
  def change
    create_table :stores do |t|
      t.string :name
      t.string :url
      t.string :external_id # the ID on its platform

      t.timestamps
    end
    add_index :stores, :external_id, unique: true
  end
end
```

In order to use STI on this model, we simply need to add a column type to its table.

```ruby
# rails g migration AddTypeToStores type data_json:jsonb
class AddTypeToStores < ActiveRecord::Migration[6.0]
  def change
    add_column :stores, :type, :string
    add_column :stores, :data_json, :jsonb, default: "{}" # more on this later
  end
end
```

The sub-models:

```ruby
# app/models/store/shopify.rb
class Store::Shopify < Store
  def admin_url
    "#{url}/admin"
  end
end

# app/models/store/bigcommerce.rb
class Store::Bigcommerce < Store
  def admin_url
    "#{url}/manage/dashboard"
  end
end
```

For some of these platforms we could have totally unique attributes, thanks to [`store_accessor`](https://api.rubyonrails.org/classes/ActiveRecord/Store.html).

```ruby
class Store::Bigcommerce < Store
  store_accessor :data_json, :webdav_url

  def admin_url
    "#{url}/manage/dashboard"
  end
end
```

The result:

```ruby
shopify_store = Store::Shopify.new(name: "My Store", url: "https://mystore.myshopify.com")
shopify_store.name
shopify_store.admin_url
# => "https://mystore.myshopify.com/admin"

bigcommerce_store = Store::Bigcommerce.new(name: "My Store", url: "https://mystore.mybigcommerce.com")
bigcommerce_store.name
bigcommerce_store.admin_url
# => https://mystore.mybigcommerce.com/manage/dashboard

bigcommerce_store.webdav_url = "https://store-570ec032.mybigcommerce.com/dav"
# => https://store-570ec032.mybigcommerce.com/dav
```

Note that we don't have the `webdav_url` attribute for Shopify store models:

```ruby
shopify_store.webdav_url
# NoMethodError (undefined method `webdav_url' for #<Store::Shopify:0x00007fc6a7b848c0>)
```

Lastly, to query the STI model we don't need to only query it using the specific STI model, the parent model also works.

```ruby
Store::Shopify.create!(name: "My Store", url: "https://mystore.myshopify.com")
Store.last
#<Store::Shopify id: 1, name: "My Store", [...], type: "Store::Shopify", data_json: {}>
```

All this ☝️ helps us use similar models that share most of their methods and data but still are able to have some custom methods and attributes based on type.

# Expanding to the architecture

I'm going to use as example a simple architecture based on small classes that respond to `#run` and for the sake of this post, I'm only considering the store itself instead of all its possible entities like orders, customers, products, etc.

Use case: fetch and save store data from multiple platform APIs

Usage:

```ruby
SyncStore.run(store: Store.last)
```

There is no mention of any platform in the code above. Our goal is to not need to worry about platform specific behaviour until we really need. 💪

This is simple, we just need to use some common OOP concepts like inheritance with one catch that I'm going to show you later.

First, we need a parent class:

```ruby
# app/operations/sync_store.rb
class SyncStore
  class << self
    def run(*args)
      new(*args).run
    end
  end

  attr_accessor :store

  def initialize(store:)
    @store = store
  end

  def run
    raise NotImplementedError
  end
end
```

Second, we need child classes that are going to implement platform specific behaviour:

```ruby
# app/operations/sync_store/shopify.rb
class SyncStore::Shopify < SyncStore
  def run
    # get store data from API
    # normalize the return
    # create or update the store
  end
end

# app/operations/sync_store/bigcommerce.rb
class SyncStore::Bigcommerce < SyncStore
  def run
    # get store data from API
    # normalize the return
    # create or update the store
  end
end
```

In order to use the code above we would have to explicitly know about the type in our controllers, background jobs, etc.

```ruby
SyncStore::Shopify.run(store: Store::Shopify.last)
SyncStore::Bigcommerce.run(store: Store::Bigcommerce.last)
```

This is not what we want, but it's close.

We can change our parent class to automatically detect what is the type of the first argument and initialize the STI child class for that type.

```ruby
# app/operations/sync_store.rb
class SyncStore
  class << self
    def run(*args)
      build(*args).run # changed from calling .new to .build
    end

    # detect the STI type and initialize the child class
    def build(*args)
      # let devs use platform specific classes directly
      if name.split('::').size > 1
        new(*args)
      else
        # gets the STI type of the object in the first keyword argument
        # Ex. "Shopify", "Bigcommerce"
        sti_type = args.first.first.last.class.name.demodulize

        # try to find STI sub class, if not found return itself
        operation = "#{name}::#{sti_type}".safe_constantize || self

        operation.new(*args)
      end
    end
  end

  attr_accessor :store

  def initialize(store:)
    @store = store
  end

  def run
    raise NotImplementedError
  end
end
```

All we need it to call the parent class and we don't even need to know the STI type of the model:

```ruby
SyncStore.run(store: Store.last)
```

Why stop there? We can make most of our other classes understand it and only implement the nuances of each platform when adding a new one.

For that to happen we need to move this logic of choosing the STI child class out to something shared. It could be a common parent class or a shared module between these classes. I'm going with a shared module.

```ruby
# app/lib/operation.rb

module Operation
  def self.included(klass)
    klass.extend(ClassMethods)
  end

  module ClassMethods
    def run(*args)
      build(*args).run
    end

    def build(*args)
      # let devs use platform specific classes dirrectly
      if name.split('::').size > 1
        new(*args)
      else
        # gets the STI type of the object in the first keyword argument
        # Ex. "Shopify", "Bigcommerce"
        sti_type = args.first.first.last.class.name.demodulize

        # try to find STI sub class, if not found return itself
        operation = "#{name}::#{sti_type}".safe_constantize || self

        operation.new(*args)
      end
    end
  end
end
```

Then include this module to all parent classes that we want to do have this behaviour of choosing a child class based on the given STI model.

```ruby
# app/operations/sync_store.rb
class SyncStore
  include ::Operation

  attr_accessor :store

  def initialize(store:)
    @store = store
  end

  def run
    normalized_store = NormalizeStore.run(store: store, store_hash: get_store_from_api)

    SaveStore.run(store: store, normalized_store: normalized_store)
  end

  def get_store_from_api
    raise NotImplementedError
  end
end
```

Note that the `get_store_from_api` method should be implemented on every STI child class.

```ruby
# app/operations/sync_store/shopify.rb
class SyncStore::Shopify < SyncStore
  def get_store_from_api
    # call API and get this result
    { store_name: "My Shopify Store"}
  end
end

# app/operations/sync_store/bigcommerce.rb
class SyncStore::Bigcommerce < SyncStore
  def get_store_from_api
    # call API and get this result
    { display_name: "My BigCommerce Store"}
  end
end
```

Note the difference between the returned payloads. (Having `store_name` and `display_name` for name)

We can do the same thing with `NormalizeStore`:

```ruby
# app/operations/normalize_store.rb
class NormalizeStore
  include ::Operation

  attr_accessor :store, :store_hash

  def initialize(store:, store_hash:)
    @store = store
    @store_hash = store_hash
  end

  def run
    raise NotImplementedError
  end
end

# app/operations/normalize_store/shopify.rb
class NormalizeStore::Shopify < NormalizeStore
  def run
    # converts Shopify's store_hash to a common hash to assign to the model
    { name:  store_hash[:store_name] }
  end
end

# app/operations/normalize_store/bigcommerce.rb
class NormalizeStore::Bigcommerce < NormalizeStore
  def run
    # converts BigCommerce's store_hash to a common hash to assign to the model
    { name: store_hash[:display_name] }
  end
end
```

But on `SaveStore` we don't have any specific platform behaviour to cover since we have a common hash representing the store, we can just assign what we want and save.

```ruby
# app/operations/save_store.rb
class SaveStore
  include ::Operation

  attr_accessor :store, :normalized_store

  def initialize(store:, normalized_store:)
    @store = store
    @normalized_store = normalized_store
  end

  def run
    store.update(normalized_store)
  end
end
```

If you're following these instructions on your own, don't forget to add these new directories to your `config/application.rb`.

```ruby
config.eager_load_paths += %W(#{config.root}/operations/**/*.rb)
config.eager_load_paths += %W(#{config.root}/lib/*.rb)
```

It's done, we can test in the Rails console.

```ruby
# create some data
Store::Shopify.create!(name: "To be updated", url: "https://mystore.myshopify.com")

# run the parent class
SyncStore.run(store: Store.last)

Store.last
# => #<Store::Shopify id: 1, name: "My Shopify Store", type: "Store::Shopify", ...>
```

# Validating the architecture

The goal for this architecture is to be able to only implement the nuances of new platforms as we add them. Let's validate that by adding a new platform: __Wix__.

There are three classes we need to implement to be able to sync a Wix store: `Store::Wix`, `SyncStore::Wix` and `NormalizeStore::Wix`

```ruby
# app/models/store/wix.rb
class Store::Wix < Store
  def admin_url
    "https://www.wix.com/dashboard/#{external_id}/home"
  end
end

# app/operations/sync_store/wix.rb
class SyncStore::Wix < SyncStore
  def get_store_from_api
    { site: { displayName: "My Wix Store" } }
  end
end

# app/operations/normalize_store/wix.rb
class NormalizeStore::Wix < NormalizeStore
  def run
    # converts Wix's store_hash to a common hash to assign to the model
    { name: store_hash.dig(:site, :displayName) }
  end
end
```

Trying it out:

```ruby
# create some data
Store::Wix.create!(name: "To be updated", url: "https://store.lucasprag.com/")

# run the parent class
SyncStore.run(store: Store.last)

Store.last
# => #<Store::Wix id: 3, name: "My Wix Store", type: "Store::Wix", ...>
```

We reached our goal of only implementing the nuances of this new platform. ✅

# The end result

```
tree app/models/

app/models
├── application_record.rb
├── concerns
├── store
│   ├── bigcommerce.rb
│   ├── shopify.rb
│   └── wix.rb
└── store.rb
```

```
tree app/operations/

app/operations/
├── normalize_store     # converts platform specific data to common data
│   ├── bigcommerce.rb
│   ├── shopify.rb
│   └── wix.rb
├── normalize_store.rb
├── save_store.rb       # updates store based on common data
├── sync_store          # implements method to call the platform's specific API
│   ├── bigcommerce.rb
│   ├── shopify.rb
│   └── wix.rb
└── sync_store.rb       # calls method to call API, calls NormalizeStore and SaveStore
```

You can find the complete code from this post [here](https://github.com/lucasprag/expanding-sti).

I hope you enjoyed this post, please add any question, suggestion or anything in the comments below.

<small>
  "What about validations?" you may ask, well, I can write a blog post about it, just let me know if you want in the comments below 👍
</small>
