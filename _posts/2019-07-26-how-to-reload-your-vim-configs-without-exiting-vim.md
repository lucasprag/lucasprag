---
title:  How to reload your vim configs without exiting vim
date:   2019-07-26
excerpt: "This can be very useful, I'm going to show how to reload your vim configs anytime you save them or using a command and a map."
tags: 
  - vim
layout: post
---

<img src="/assets/images/posts/reloaded.png" alt="neovim showing reloaded" class="image" />

**Requirements**

Your vim configs need to be reloadable for this do work.

Nothing major, just make sure you use `!` on your commands and functions.

```vim
function! ToggleLineNumbers()
  if &number == 1
    set nonumber
  else
    set number
  endif
endfunction

command! GoToDefinitionUsingCTags execute ':tag ' . expand("<cword>")
```

Using `!` means that you are overwriting the function/commands if it is already loaded.

**Reloading vim configs automatically when you save them**

What we need is to source our vim configs every time vim finishes writing a buffer into a file.

```vim
" BufWritePost gets triggered when after
" writing the whole buffer to a file
autocmd! BufWritePost *.vim* so $MYVIMRC
```

More on auto commands and more here: [Introduction to vimL for vimmers](/vim/2019/07/26/introduction-on-viml-for-vimmers.html)


**Reloading vim configs using a command**

Would be nice if we could give the user (us) some feedback that the configs were reloaded?

For that we just need to create a command to source our `$VIMRC` and print something to the command line:

```vim
" reload vim configuration (aka vimrc)
command! ReloadVimConfigs so $MYVIMRC
  \| echo 'configs reloaded!'
```

We can also make a map for that, let's `CTRL + r` ?

```vim
map <C-r> :ReloadVimConfig<CR>
```

That's all, hope you enjoyed. Any problems or questions? Please leave a comment and I can help you out.
