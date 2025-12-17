I've been working inside Visual Studio Code (VSC) for about 6 years now, and roughly 3k hours. I'm not claiming that I've tried every single extension out there and tested each one, but I do believe that I've come across some really neat ones that I'd like to share today. 

So here are the active VSC extensions that I currently use today: 


## Choice VSC Extensions

`bierner.markdown-emoji`
I like being able to bring in emojis with this syntax `:joy:`


`cardinal90.multi-cursor-case-preserve`
When you have hightlited/selected multiple copies of the same word, and they may be capitalized differently, this ensures that if you replace those strings, the case is preserved. This is quite  helpful in a scenario like hte following: 

```js
const something = ''
Class Something = ...
```

Here if you want to rename `something` to another name, it'll keep the case preservation choice.


`chrisdias.vscode-opennewinstance`
Context for right click menu on directories. Allows you to open a directory in a new instance of VSC.


`dsznajder.es7-react-js-snippets`
React snippets. With AI tools today, i use this less than ever.


`github.copilot
github.copilot-chat`
I use the Github copilot extensions, but I'm not thrilled that they're installed whether you want them or not. 


`golang.go`
Golang niceties like formatting and a few other helpful features.


`mrmlnc.vscode-duplicate`
Quickly duplicate files/directories with the right click context menu.


`ms-azuretools.vscode-containers`
This basically replaces Docker Desktop app for me. I manage my docker containers/images/volumes/networks at a glance with this tool.


`ms-python.black-formatter
ms-python.debugpy
ms-python.flake8
ms-python.isort
ms-python.python
ms-python.vscode-pylance
ms-python.vscode-python-envs
ms-toolsai.jupyter
ms-toolsai.jupyter-keymap
ms-toolsai.jupyter-renderers
ms-toolsai.vscode-jupyter-cell-tags
ms-toolsai.vscode-jupyter-slideshow`
These are all lumped into Python/Jupyter tools. They make developing in python easier. From formatting to linting to sorting imports.


`ritwickdey.liveserver`
This is helpful for being able to startup a quick web server to host the html files in the directory that is currently opened for the VSC window.


`wakatime.vscode-wakatime`
Wakatime is a tool for keeping track of your time usage in VSC. It has a few extensions for tools like Chrome or Obsidian as well. Ultimately i keep track of the time i spend coding with it. 


### FWIW

Here's the full list as it came from the terminal

```sh
$ code --list-extensions

bierner.markdown-emoji
cardinal90.multi-cursor-case-preserve
chrisdias.vscode-opennewinstance
dsznajder.es7-react-js-snippets
github.copilot
github.copilot-chat
golang.go
mrmlnc.vscode-duplicate
ms-azuretools.vscode-containers
ms-python.black-formatter
ms-python.debugpy
ms-python.flake8
ms-python.isort
ms-python.python
ms-python.vscode-pylance
ms-python.vscode-python-envs
ms-toolsai.jupyter
ms-toolsai.jupyter-keymap
ms-toolsai.jupyter-renderers
ms-toolsai.vscode-jupyter-cell-tags
ms-toolsai.vscode-jupyter-slideshow
ritwickdey.liveserver
wakatime.vscode-wakatime
```

