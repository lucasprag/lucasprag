---
title:  How to reload your vim configs without exiting vim
date:   2019-07-26
excerpt: "This can be very useful, I'm going to show how to reload your vim configs anytime you save them or using a command and a map."
tags:
  - vim
layout: post
---

<img src="/assets/images/posts/reloaded.png" alt="neovim showing reloaded" class="image" />

### Make your configs reloadable

Add `!` on your commands and functions like this:

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

### Option #1: Auto command

When using an auto command, vim is going to source -- or reload -- your vim configs every time you save them.

```vim
" the BufWritePost event gets triggered after writing buffers to files
autocmd! BufWritePost *.vim* so $MYVIMRC
```

`$MYVIMRC` is the path to your `vimrc` file.

More on auto commands: [Introduction to vimL for vimmers](/vim/2019/07/26/introduction-on-viml-for-vimmers.html)

### Option #2: Command and map

When using a command, vim is also going to source your configs, but only when you call the command.

```vim
command! ReloadVimConfigs so $MYVIMRC
  \| echo 'configs reloaded!'
```

After adding it to your vimrc, you need to type `:ReloadVimConfigs`.

I prefer this option because I have more control over __when__ my configs are reloaded.

You can create a map for that:

```vim
map <C-r> :ReloadVimConfig<CR>
```

That's all, hope you enjoyed. Any problems or questions? Please leave a comment and I can help you out.
