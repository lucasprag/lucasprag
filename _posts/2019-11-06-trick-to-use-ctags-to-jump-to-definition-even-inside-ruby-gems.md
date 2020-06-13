---
title: Trick to use ctags to jump to definition even inside ruby gems
date: 2019-11-06
excerpt: This is really helpful especially if you need to debug other people's gems or your own. 👌
tags:
  - vim
layout: post
---
If you don't know what is ctags

> Ctags is a programming tool that generates an index file of names found in source and header files of various programming languages. Depending on the language, functions, variables, class members, macros and so on may be indexed. -- Wikipedia

In the case of Ruby you can jump to a method definition, class, etc using  [ctags](http://ctags.sourceforge.net/) which doesn't work 100% of the time but it helps a lot.

# vim

Vim has a native functionality where you can {% raw %}`:tag MyClass`{% endraw %} and it opens your class based on the index created by [ctags](http://ctags.sourceforge.net/).

You can extend this functionality as much as you like

{% raw %}```vim
" open tag of the word under the cursor, requires to run "ctargs -R ." before
command! JumpToTag execute ':tag ' . expand("<cword>")

command! JumpToTagOnVsplit :vsplit
      \| execute ':tag ' . expand("<cword>")

command! JumpToTagOnSplit :split
      \| execute ':tag ' . expand("<cword>")

```{% endraw %}

but there is one limitation when using Rails and other gems; you can't jump inside them, like {% raw %}`:tag ApplicationRecord`{% endraw %}.

# the trick

You can run bundle install and set the path to install gems inside your project so when you run {% raw %}`ctags -R .`{% endraw %} all the gems get indexed.

{% raw %}```bash
bundle install --path=vendor/bundle
```{% endraw %}

But remember to git ignore them

{% raw %}```
# ~/.gitignore_global
vendor/bundle

```{% endraw %}

# gutentags


If you don't like run {% raw %}`ctags -R .`{% endraw %} all the time, there is a plugin for vim that runs ctags in the background while you are coding. It's called [vim-gutentags](https://github.com/ludovicchabant/vim-gutentags). All you need to do is install it.



That's it, I hope you enjoyed this little trick to make our lives a bit easier when coding Rails on vim. 👍

*[This post is also available on DEV.](https://dev.to/lucasprag/little-trick-to-use-ctags-to-jump-to-definition-even-inside-gems-like-rails-on-vim-244j)*


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
