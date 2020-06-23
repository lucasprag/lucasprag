---
title: Wiki
layout: page
---

## Books

* [The Pragmatic Programmer](https://pragprog.com/book/tpp/the-pragmatic-programmer) by Andrew Hunt and David Thomas
* [Apprenticeship Patterns](https://www.goodreads.com/book/show/5608045-apprenticeship-patterns) by Adewale Oshineye, Dave Hoover
* [Computer Science Distilled](https://code.energy/computer-science-distilled/) by Wladston Ferreira Filho
* [You don't know JS](https://github.com/getify/You-Dont-Know-JS) by Kyle Simpson -- free online
* [I love Ruby](https://i-love-ruby.gitlab.io/) by Karthikeyan A K -- amazing book about ruby
* [Design Patterns in Ruby](https://bogdanvlviv.com/posts/ruby/patterns/design-patterns-in-ruby.html) by Bogdan Denkovych
* [The Rails 5 Way](https://leanpub.com/tr5w) by Obie Fernandez and Kevin Faustino
* [Design It!](https://pragprog.com/book/mkdsa/design-it) by Michael Keeling


## Personal Blogs

* [Nando Vieira](https://nandovieira.com/) -- ruby, rails, javascript, css, postgresql
* [A geek with a hat](https://swizec.com/blog/) -- react, career, productivity, mastery
* [Julia Evans](https://jvns.ca/) -- everything from data structures to vim sessions, plus she adds drawings to her posts to better explain the content
* [pgDash](https://pgdash.io/blog/index.html) -- postgresql, diagnostics, scale, sql, news
* [Eviltrout](https://eviltrout.com/) -- ruby, emberjs, discourse
* [Thoughtbot's upcase](https://thoughtbot.com/upcase/practice) -- a TON of good content, ruby, rails, vim, tmux, testing, design, advanced rails
* [no.lol](https://www.no.lol/) -- elixir, emberjs, being a techlead
* [Plataformatec](http://blog.plataformatec.com.br/category/english/) -- elixir, ruby, agile
* [Evil Martians' chronicles](https://evilmartians.com/chronicles) -- ruby, rails, graphql, docker
* [Arkency's blog](https://blog.arkency.com) -- ruby, rails, random posts about problems a consulting company has to go through
* [solnic.codes](https://solnic.codes/) -- ruby, architecture, frameworks, dry gems
* [Schneems](https://www.schneems.com/) -- ruby, postgresql, day-to-day activities on a dev
* [Martin Fowler](https://martinfowler.com/) -- agile, architecture, management

## great ruby gems for any project

* [strong\_migrations](https://github.com/ankane/strong_migrations) -- catch problematic migrations at development time
* [rack-attack](https://github.com/kickstarter/rack-attack) -- rack middleware for blocking & throttling abusive requests
* [sidekiq](https://github.com/mperham/sidekiq) -- background processing for ruby, freemium, but really good, +7B processed jobs at [Fera.ai](https://www.fera.ai/)
* [trailblazer](http://trailblazer.to/) -- a framework to write advanced business logic


## after ~6 years using vim

I use [neovim](https://neovim.io/) which is a fork of vim that **just works**. You can find my configuration [here](https://github.com/lucasprag/vimlociraptor).

Vim is great, but it's not a boost in productivity by itself. What boosts productivity IMO is:

* use a fast text editor -- like vim, sublime text, emacs
* learn **every single** shortcut and feature
* extend your editor by writing commands, snippets, plugins
* be focused on getting things done

#### blog posts

* [ten years of vim](https://endler.dev/2018/ten-years-of-vim/) by Matthias Endler -- core fundamentals and why people like vim so much
* [Intermediate Vim](https://mkaz.blog/code/intermediate-vim/) by Marcus Kazmierczak -- movements, buffers, commands like global, search, and macros
* [vim after 15 years](https://statico.github.io/vim3.html) by Ian Langworth -- comparing popular plugins and configs
* [why neovim is better than vim](https://geoff.greer.fm/2015/01/15/why-neovim-is-better-than-vim/) by Geoff Greer -- a bit old, but most of his arguments are still relevant

## Cache

It's super easy to use [cache on rails](https://guides.rubyonrails.org/caching_with_rails.html) -- aka, `Rails.cache` but we need to keep this in mind:

* cache should **never** be a requirement for your app
* your app should load **good** without cache and **really good** with cache
* no cache is better than any type of cache, only use it as the **last resort**

