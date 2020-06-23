---
title: Use-case oriented rails applications
date: 2018-07-31
excerpt: >-
  I will bring here an approachable solution for building rails applications
  using some fundamentals of the so-called clean architecture. But, what is it?
tags:
  - rails
layout: post
---

I will bring here an approachable solution for building rails applications using some fundamentals of the so-called clean architecture. But, what is it?

# clean architecture

It's hard to tell what it is without telling about the problem.

The problem is, look at your rails application, try to identify what it does, open your {% raw %}`app`{% endraw %} folder and try to identify again.

We can see some folders like controllers, models, helpers and so on. Even when opening one of those folders we cannot say what is does, but we can only say what that application have, like users or products. The clean architecture came to try to solve this problem.

One thing we can notice on that rails applications is that it's screaming {% raw %}`web framework!`{% endraw %}.

But one thing we can never forget is that the **web is a delivery system** and should not dominate our code.

<img src="https://thepracticaldev.s3.amazonaws.com/i/aefxxs18lhzhhd12d3ci.png" alt="the web is a delivery system" class="center-block" />

# the proposal

A picture is worth a thousand words so let's check some images from Robert C. Martin illustrating his proposal of what path the request should follow:

### the user interacts with the system

<img src="https://thepracticaldev.s3.amazonaws.com/i/17p8mdqnjjt88qqq96ys.png" alt="the user interacts with the system" class="center-block" />

### the delivery mechanism builds a request model and passes it to the boundary/interface

<img src="https://thepracticaldev.s3.amazonaws.com/i/mgwra7e3hesxylpx8cvs.png" alt="the delivery mechanism builds a request model and passes it to the boundary/interface" class="center-block" />

### the interface knows which interactor to use and passes the request model to it

### and the interactor executes the business rules

<img src="https://thepracticaldev.s3.amazonaws.com/i/bj4vvazl2e89yi8rrag7.png" alt="the interactor executes the business rules and interacts with entities" class="center-block" />

### and interacts with entities

<img src="https://thepracticaldev.s3.amazonaws.com/i/g5n8ynvx60x0jhs0p33g.png" alt="and interacts with entities" class="center-block" />

### the interactor builds a result model and give it back to the boundary/interface

<img src="https://thepracticaldev.s3.amazonaws.com/i/btscyrgoskdpr5nuiawu.png" alt="the interactor builds a result model and give it back to the boundary/interface" class="center-block" />

### which will give it back to the delivery mechanism and the user

<img src="https://thepracticaldev.s3.amazonaws.com/i/p3ot6qjf9cb9ruic3s1m.png" alt="which will give it back to the delivery mechanism and the user" class="center-block" />

As you can see, the framework is just a detail in that architecture, it's a delivery mechanism. The interface to the user can be a website as well as a command line tool, the business rules go on the use cases which can interact with entities.

# what about MVC?

MVC (aka Model View Controller) is an architectural pattern which the user interacts with a controller who manipulates a model who updates the view where the user sees the result. I got this image from wikipedia to illustrate better:

<img src="https://thepracticaldev.s3.amazonaws.com/i/u1q6tvb5x6tzr5p7t8l3.png" alt="The MVC Process" class="center-block" />

The MVC pattern was created by Trygve Reenskaug to use with SmallTalk for graphical user interface (GUI) software design in 1979.

But what happens when we use this approach to build our entire web application?

<img src="https://thepracticaldev.s3.amazonaws.com/i/d6kxz416rhzx0p1jrmmb.png" alt="MVC as an web architecture is messy" class="center-block" />

It gets messy.

I'm not saying the MVC is bad, I'm saying that it's part of the delivery mechanism not of the application architecture.

<img src="https://thepracticaldev.s3.amazonaws.com/i/y96c29rykvgrmc9chpvu.png" alt="the delivery mechanism is the web framework, and the boundary/interface, interactor and entities are out application" class="center-block" />

# real world use case

## As an user, I want to pay an invoice

Imagine you have a web application and you send invoices to your users, and then they pay their invoices. So that use case could be named 'pay_invoice' and to group related classes I will create a module call {% raw %}`Accoutant`{% endraw %}.

The goal is to call the use case in the controller like this:

{% raw %}```ruby
class InvoicesController < ApplicationController
  def pay
    if Accountant.pay_invoice(params[:invoice_id], credit_card_params)
      format.html { redirect_to @invoice, notice: 'Invoice was successfully paid.' }
    else
      format.html { redirect_to @invoice, error: 'We got a problem paying that invoice' }
    end
  end
end
```{% endraw %}

In order to have that use case available we need to create a class like so:

{% raw %}```ruby
require 'caze'

module Accountant
  class PayInvoice
    include Caze

    attr_accessor :invoice_id, :credit_card

    export :call, as: :pay_invoice

    def initialize(invoice_id, credit_card)
      @invoice_id = invoice_id
      @credit_card = credit_card
    end

    def call
      # register payment thought payment gateway (maybe background job)
      # change invoice status
    end

    private

    def invoice
      @invoice ||= Invoice.find(invoice_id)
    end
  end
end
```{% endraw %}

some points to notice:
- there is only one public instance method ({% raw %}`call`{% endraw %})
- this class has one responsibility
- easy to write specs
- I used the {% raw %}`caze`{% endraw %} gem to have a simple DSL to define use cases instead of doing this:
{% raw %}```ruby
def self.pay_invoice(invoice_id, credit_card)
  self.new(invoice_id, credit_card).call
end
```{% endraw %}

We add that use case to the {% raw %}`Accountant`{% endraw %} module like so:

{% raw %}```ruby
require 'caze'

module Accountant
  include Caze

  has_use_case :pay_invoice, PayInvoice
end
```{% endraw %}

Now we can say one thing that this application does which is pay invoices. Take a look on how the files are organized:

<img src="https://thepracticaldev.s3.amazonaws.com/i/71ssjyd36uwnwqqwzbub.png" alt="We have an use cases folder with an accountant.rb there and an accountant folder with the pay_invoice.rb there" class="center-block" />

You don't really need to use the {% raw %}`caze`{% endraw %} gem, the important part of all this is:

## We separated what the application **HAS**

models like invoice, account and so on that doesn't change very much (stable)

## of what the application **DOES**

behaviors and use cases tend to change a lot while the business grows

## when to write use cases?

When you only need to manage resources, you can and should use the rails way which is resource oriented so it makes sense, but when you have a special logic and it's very unique to your business rules, you write use cases like the code above.

# conclusion

After all that work we can look on our application and quickly see what it does instead of just seeing resources which is what it has, you can also move between frameworks or create new interfaces to use your unique business rules.

Keep in mind that there is no silver bullet in programming, but this is for sure a very effective approuch to keep your use cases organized and keep your software architecture clean.

# references

- [Clean architecture by Robert Martin](http://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Architecture the Lost Years by Robert Martin](https://www.youtube.com/watch?v=WpkDN78P884)
- [Clean architecture on rails by Fabiano Beselga](https://medium.com/magnetis-backstage/clean-architecture-on-rails-e5e82e8cd326)
- [caze gem](https://github.com/magnetis/caze)
- [use case examples](http://www.gatherspace.com/static/use_case_example.html)
- ["Nice" by Uncle Bob
 ](https://twitter.com/unclebobmartin/status/992073756150558720)

*[This post is also available on DEV.](https://dev.to/lucasprag/use-case-oriented-rails-applications-28jb)*

