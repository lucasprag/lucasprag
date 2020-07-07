---
title: 🐠 Fish, the shell
date: 2020-06-22
tags:
  - terminal
layout: post
---

One of the greatest changes I've made to my set of programming tools was changing from zsh to [fish](https://fishshell.com/) and these are the reasons that drove me to this change:

### 1. Abbreviations

Abbreviations behave like aliases on bash and zsh but instead of only running their respective commands, they also expand and show the full command.

This is useful to let others know what you are doing when pair programming, to give some sense to your history of commands and to not let you forget how to use other shells when using other people's computers. This last one is special to me because I used to have lots of aliases on zsh, but when I had to help a colleague, I'd be lost because I wouldn't remember what `gcam` or `dcup` were exactly.

Example:

It may look that I'm typing super fast in the gif above -- because of its frames per second rate -- but I'm only typing `fn`, `gs`, `gd`, `ga .`, `gc`, `gp`.

![Using fish abbreviations, commands expand as I type the abbreviations to let other know what you are doing and keep you give sense to your history.](/assets/images/posts/fish-abbreviations.gif)

### 2. Syntax highlight

When typing commands to your shell, you get syntax highlighting that shows when a program exists, if you made a typo and many more things.

Showing command as red when the program doesn't exists

![program doesn't exists](/assets/images/posts/fish-doesnt-exist.png)

Showing darker blue for the program and lighter blue for its arguments

![darker blue for program and lighter blue for its arguments](/assets/images/posts/fish-syntax-highlight.png)

### 3. Oh my fish

[Oh my fish](https://github.com/oh-my-fish/oh-my-fish) is a fast, extensible and easy to use framework that let you write functions that work as bin programs.

You may have noticed that I typed `gp` in the gif above and it expanded to `git pull origin (current_branch)`

`current_branch` is a function I copied from somewhere -- I can't remember -- but all it does is to return the name of the branch you are currently using.

```
# ~/.config/fish/functions/current_branch.fish

function current_branch
    set ref (git symbolic-ref HEAD 2> /dev/null); or \
    set ref (git rev-parse --short HEAD 2> /dev/null); or return
    echo $ref | sed -e 's|^refs/heads/||'
end
```

I also have `gP` that expands to `git push origin (current_branch)`.

Another function I have is `kp` to interactively kill processes using [fzf](https://github.com/junegunn/fzf), a fast command line fuzzy finder.

![using kp to kill a sleep program running forever](/assets/images/posts/fish-kp.gif)

Oh my fish also brings to the table a number of [themes](https://github.com/oh-my-fish/oh-my-fish/blob/master/docs/Themes.md) for your shell with special formating to show branch names, current directories, if there is any git change, etc.

![my custom fish theme is quite simple](/assets/images/posts/fish-oh-my-fish-shell.png)

### 4. Auto complete

The default auto complete behaviour in fish is to add a gray auto completion option as you type commands.

![default auto complete](/assets/images/posts/fish-autocomplete.png)

But if you, like me, miss the `ctrl+r` history search from bash and zsh, you can add it to fish.

![fzf auto complete](/assets/images/posts/fish-querying-history.png)

The way to add it is by adding a symbolic link and a function to your fish config, assuming you use fzf.

```
ln -s ~/.fzf/shell/key-bindings.fish ~/.config/fish/functions/fzf_key_bindings.fish

# ~/.cofig/fish/functions/fish_user_key_bindings.fish
function fish_user_key_bindings
  fzf_key_bindings
end
```

I really like having both auto complete benefits. 😎

### Reason why _not_ use it

Fish is intentionally not fully POSIX compliant meaning that a script written for bash will likely not work on fish.

As a result, in order to run a bash script you need to explicitly run it on bash, for example `bash script.sh`.

This is not a big deal for me compared with the benefits I listed above, but I understand that it can be quite annoying.

---

[Fish](https://fishshell.com/) is not new, but it can be new to you as it was to me. If you like to try new programming things, I suggest fish. 🐠

I hope you enjoyed this post, please add any question, suggestion or anything in the comments below. 👍


