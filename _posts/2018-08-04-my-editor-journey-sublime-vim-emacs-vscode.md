---
title: >-
  My editor journey: sublime, vim, emacs, vscode
date: 2018-08-04
excerpt: >-
  How I've used sublime text, vim, emacs and vscode over my career as a software
  developer.
tags:
  - vim
  - emacs
  - vscode
layout: post
---


I will talk about my experience using each of those text editors, maybe it could be useful for someone evaluating text editors to invest time learning.

## sublime text
I started learning about programming when I was in high school, it was so much fun to write some code and see the results on the browser. I used sublime text because I was learning with blog posts and videos and most of the content mentioned sublime text. Also, it was fast and I had a few plugins installed to handle php, html, javascript and css. I used it for a few years at work too until the day I joined a company that had vim and emacs users.

## vim
The vim users worked on projects more closed to my own project so I started to check how they did things and then I started learning about vim. It was not cool, it was too hard to learn how to use it, to load new config files I had to restart vim every time and so much other problems, but since they did, I convinced myself that I could learn it too so I did.

I used vim for a few months and what I like about vim the most is that it's optimized for editing files not creating new ones. For the most of the time, we're editing files and moving between lines of code so that makes sense. Finally I was happy and productive using vim.

## neovim
One day I heard about neovim, not sure exactly why I switched to it, but take a look on the github project for both projects:

<img src="https://thepracticaldev.s3.amazonaws.com/i/mr475vfxouxinfcgxeaa.png" alt="vim project with only one contributor" />

<img src="https://thepracticaldev.s3.amazonaws.com/i/oogdvczt4j9mt5v49jxu.png" alt="vim project with 392 contributors" />

Wait what? Only one contributor on the vim repository? How only one person could have done that? Checking the pull request list I saw that the author applies changes from other people as it was his changes. Ok, I didn't liked that, so I changed to neovim which gives credit for people when they contribute.

UPDATE: I agree that my survey is too shallow. See [this comment](https://dev.to/heast/comment/4gk4). But I still don't like that.

## nvim + tmux
At that time people was talking about {% raw %}`tmux`{% endraw %} which is a terminal multiplexer so you could split your terminal and have tabs and customize everything from shortcuts to how tmux looks like for example adding useful info to your status bar. I tried and I liked. Since I was using nvim in the terminal it worked very well and I even found some plugins to integrate them smoothly. Here is how it looks like:

<img src="https://thepracticaldev.s3.amazonaws.com/i/u4ncf7ir9rfeb0lx700j.gif" alt="using tmux and vim having different tabs and splits and running test in a split bellow" />


I don't use nvim anymore, but you can still find my configuration for [vim](https://github.com/lucasprag/vimlociraptor) and [tmux](https://github.com/lucasprag/dotfiles/blob/master/tmux.conf).

I used this stack for 3 years and I was happy.

Then I see myself managing configs and plugins for nvim, tmux, zsh to run well on terminator on my Debian at work and iTerm on macOS at home. Not everything worked well between plugins too, for example I had auto completation on nvim and it works well unless I'm using multiple cursors which is a feature from another plugin, the auto completation would work only for the first cursor because they didn't integrated with each other. I got other frustrating problems like that one and I see myself spending too much time debugging or trying alternative plugins, so I was tented to try something different and this is where emacs came to my attention.

## emacs

Emacs has a GUI app which makes me don't need terminator or iTerm anymore and it has his own shell written in elist called eshell, so I'd have one config and plugins for everything. I tried to start from scratch writing down every config as I did with vim, but it was too much to learn and I had to get some work done so I tried spacemacs and with some help I could be productive in no time.

Spacemacs has vim key bindings so I was at home, I just needed to learn to handle different aspects of spacemacs like layouts and workspaces. It was easier to do things because it has a real-time display of available key bindings, so while you type you can see your options, also it is mnemonic so if you want layouts you'd use {% raw %}`SPC + l`{% endraw %}, if want to toggle something you'd use {% raw %}`SPC + t`{% endraw %}, if you want buffers you'd use {% raw %}`SPC + b`{% endraw %}, for projects {% raw %}`SPC + p`{% endraw %}, for files {% raw %}`SPC + f`{% endraw %} and to save a file you'd combine commands like {% raw %}`SPC + fs`{% endraw %} which means {% raw %}`spacemacs -> file -> save`{% endraw %} and {% raw %}`SPC + pt`{% endraw %} to see the project tree of files. Very straightforward right?

It took me like a month to understand everything and to work well. I was not happy with everything, I got some bugs which is ok, I reported and I tried to fix them but I had to learn one more language (elisp) to be able to do that. It was a great experience because I was learning a lot of elisp which is a great language in my opinion so I was having fun, which made me use spacemacs for 6 months.

Then I saw this video:


<iframe class="liquidTag" src="https://dev.to/embed/youtube?args=8kCd4w4kc68" style="border: 0; width: 100%;"></iframe>


Wait what? 10 years of love for Emacs undone by a week of VSCode? I have some friends who are happy with vscode too, they strongly recommend it. Ok, let's give it a try.

## vscode

I had to do some coding in a weekend so I switched to vscode and overall the experience was great, but I had to use the mouse a lot initially.

I installed the vim key bindings which for my surprise also has support for common vim plugins like {% raw %}`vim-easymotion`{% endraw %}, {% raw %}`vim-surround`{% endraw %}, {% raw %}`vim-commentary`{% endraw %} and others that I've never heard of.

Killer features for me that I found in vscode:
- {% raw %}`cmd + p`{% endraw %} to open files using fuzzy search is faster and more intelligent (it puts recent files on top)
- shortcuts are more similar with browser shortcuts which makes my life easier as web developer
- config files are {% raw %}`JSON`{% endraw %} files and there is no need for too much customization (my config file has 22 lines and that's all)
- the integrated multiple terminal works really well and it has splits like tmux
- vscode is maintened by Microsoft which I think it's great to have a team working on it and adding features that integrate well with each other
- I don't need to debug vscode and I didn't find any bug so far
- I don't need to install too much plugins
- jump to definition for React

Vscode plugins I have installed:
- [Vim Keybindings](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)
- [Project Manager](https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager) - easier to switch between projects using {% raw %}`ALT + CMD + p`{% endraw %}
- [Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks) - {% raw %}`ALT + CMD + k`{% endraw %} to add a bookmark and {% raw %}`ALT + CMD + l`{% endraw %} to jump to the next bookmark
- [File Utils](https://marketplace.visualstudio.com/items?itemName=sleistner.vscode-fileutils) - easier to duplicate or rename files without using the mouse
- [Support for Ruby](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby)
- [Support for Ruby Haml](https://marketplace.visualstudio.com/items?itemName=vayan.haml)
- [Autocompletation for Ruby](https://marketplace.visualstudio.com/items?itemName=castwide.solargraph)
- [Linting for Ruby](https://marketplace.visualstudio.com/items?itemName=misogi.ruby-rubocop)
- [Support for Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
- [Support for Elixir](https://marketplace.visualstudio.com/items?itemName=mjmcloug.vscode-elixir)
- [Support for React](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [One Dark Pro Monokai Darker Theme](https://marketplace.visualstudio.com/items?itemName=eserozvataf.one-dark-pro-monokai-darker) - my favorite color schema

<img src="https://thepracticaldev.s3.amazonaws.com/i/thtlo6h65n8hmfksan23.gif" alt="using vscode to switch to files, bookmark files and jump to bookmarks, and use the integrated terminal" />

That's my experience with text editors. Today I don't have to debug my editor to make simple things happen and I still can customize it for my needs. Yeah, I'm pretty happy with vscode and maybe you should try it too. I hope it was useful for someone.

Also I'm looking forward to hear your opinion and experience about those text editors. Thanks.

*[This post is also available on DEV.](https://dev.to/lucasprag/my-editor-journey-sublime-vim-emacs-vscode-19k0)*


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
