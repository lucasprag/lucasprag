---
layout: post
title: Introduction to vimL for vimmers
date: 2019-07-26
tags: 
  - vim
excerpt: "After some time using vim, you feel the need to customize it a bit more, let's see a few things you can do to start."
image: /assets/images/posts/neovim.png
---

<img src="/assets/images/posts/neovim.png" alt="neovim" class="image" />

## Basic

VimL or vim script is quite complex, but we don't need to understand this big body of information before doing cool and useful stuff.

## Functions

Pretty much like in any language you can create functions and it's pretty simple:

```vim
function! Hello()
  echo 'hello vimmers!'
endfunction
```

You can call functions using `:call` like `:call Hello()`.

See more on `:help function`

## Variables

In VimL we can define variables using `let` like `let name = 'grokblog'`, but there are prefixes to make variables available only in certain scopes.

These are the 3 most important (IMO) prefixes to use:

```vim
" (nothing) in a function: local to a function; otherwise: global
let name = 'grokblog'

let g:name = 'grokblog' " global
let l:name = 'grokblog' " local to a function
let a:nmae = 'grokblog' " function argument (only inside a function)
```

See more on `:help internal-variables`

Examples:

```viml
let name = 'grokblog' " same as let g:name

function! PrintName(name)
  echo 'The name is ' . a:name . ' and the global name is ' . g:name
endfunction
```

You can test it by running `:call PrintName('cool name')`

It's not a variable, but you can access your vim settings using `&` and use it inside your functions. For example I have a function that I use to toggle line numbers:

```viml
function! ToggleLineNumbers()
  if &number == 1
    set nonumber
  else
    set number
  endif
endfunction
```

You can try saving it on your `vimrc` and running `:call ToggleLineNumbers()`.

## Commands

Commands are function-like instructions that you can run in the command line, which is where you go when you type `:` on vim.

For example I have a command to remove all the `debugger`s, `byebug`s and `binding.pry`s of the current buffer:

```viml
command! RemoveDebuggers global/byebug\|debugger\|pry/delete_
```

Another example would be to create a command to run our function from the above:

```viml
command! PrintName :call PrintName('command name')
```

so instead of doing `:call PrintName('cool name')` to test our function we could just use `:PrintName`.

See more on `:help command`

## Auto Commands

When you type, open a buffer of a file or what ever you do, vim triggers events that can be listen by commands, these are called auto commands. You can define them using `autocmd`.

For example we could we create an auto command to set the syntax to `html` for handlebar files that end with `.hbs`:

```viml
autocmd! BufNewFile,BufRead *.hbs set syntax=html
```

Or we could create an auto command to reload our vim configs when you save a `.vim` file:

```vim
" BufWritePost gets triggered when after
" writing the whole buffer to a file
autocmd! BufWritePost *.vim so $MYVIMRC
```

See more on `:help autocommand`

## Useful builtin functions

### `execute`

`execute` can run commands on the command line (when you use `:`), it's specially useful for me to write more complex commands.

Example of a command that I use everyday that uses `execute`:

```vim
" go to definition using ctags, requires "ctargs -R ." to be ran before
command! GoToDefinitionUsingCTags execute ':tag ' . expand("<cword>")
```

### `expand`

`expand` can give you useful information like in these examples:

```vim
:echo expand('%') " current file
:echo expand('<cword>') " word under the cursor
:echo expand('<cfile>') " file name under the cursor
```

Notice that I used it in the last example:

```vim
" go to definition using ctags, requires "ctargs -R ." to be ran before
command! GoToDefinitionUsingCTags execute ':tag ' . expand("<cword>")
```

`expand` also has modifiers:

- `:p` - expand to full path
- `:hp` - head (last path component removed)
- `:tp` - tail (last path component only)
- `:rp` - root (one extension removed)
- `:ep` - extension only


For example to get the full path of the current file: `:echo expand('%:p')`.

See more on `:help expand`

## Conclusion

Functions, variables, commands, auto commands, `execute` and `expand` are very useful to customize your vim. I hope you liked it. Feel free to dig into [my configs](https://github.com/lucasprag/vimlociraptor) and I'd love to see yours if you leave a link in the comments bellow. =)

