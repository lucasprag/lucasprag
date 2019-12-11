---
title: How to add columns with a default value to large tables
date: 2019-11-17
excerpt: "If you worked with a large database you know that you can't just run an alter table to add a column with a default value, maybe you tried it and it failed -- like me awhile ago \U0001F915 -- but what if you really need to do that? That's what I'm about to tell you in these four simple steps."
tags:
  - rails
  - database
layout: post
---



If you worked with a large database you know that you can't just run an {% raw %}`alter table`{% endraw %} to add a column with a default value, maybe you tried it and it failed -- like me awhile ago 🤕 --  but what if you really need to do that? That's what I'm about to tell you in these four simple steps:

### 1. Add the column with no default

{% raw %}```ruby
class AddCurrencyToAccounts < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :currency, :string
  end
end
```{% endraw %}

This is going to run this SQL:

{% raw %}```sql
ALTER TABLE "accounts" ADD "currency" character varying
```{% endraw %}

### 2. When creating new records for that table, set the desired default value using your code

There are tons of ways of accomplishing it and it really depends on how you create your records, but this is good enough for the example:

{% raw %}```ruby
account.currency ||= "USD"
```{% endraw %}

### 3. Backfill all your table rows with the desired default value

If you have a large database you also probably already have a way of running code for all your records  asynchronously to finish it really fast -- If not let me know -- but if you don't have it, a {% raw %}`.find_each`{% endraw %} or a {% raw %}`.find_in_batches`{% endraw %} would probably do the trick:

{% raw %}```ruby
Account.where(currency: nil).find_each do |account|
  # .update_attributes doesn't touch updated_at
  account.update_attributes(currency: "USD")
end
```{% endraw %}

Why not just run {% raw %}`Account.where(currency: nil).update_all(currency: "USD")`{% endraw %} ?

Because this ☝️ is going to lock your table while your database updates all your rows, that's why we need to update individual records so the database locking only happens per row.

### 4. Finally, add the default value to your column 🎉

{% raw %}```ruby
class AddDefaultToCurrencyOnAccounts < ActiveRecord::Migration[5.2]
  def change
    change_column :accounts, :currency, :string, default: "USD", null: false
  end
end
```{% endraw %}

This is going to run this SQL

{% raw %}```sql
ALTER TABLE "accounts"
ALTER COLUMN "currency" TYPE character varying,
ALTER COLUMN "currency" SET DEFAULT 'USD',
ALTER "currency" SET NOT NULL
```{% endraw %}

After that you can remove your code that sets the default value when creating your records from step # 2 and it's done 🎉

*[This post is also available on DEV.](https://dev.to/lucasprag/how-to-add-columns-with-default-to-large-tables-8mc)*


<script>
const parent = document.getElementsByTagName('head')[0];
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.1.1/iframeResizer.min.js';
script.charset = 'utf-8';
script.onload = function() {
    window.iFrameResize({}, '.liquidTag');
};
parent.appendChild(script);
</script>    
