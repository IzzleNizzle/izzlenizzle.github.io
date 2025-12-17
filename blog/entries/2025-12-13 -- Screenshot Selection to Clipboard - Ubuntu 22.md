## Describe the issue

In windows its `Windows Button + Shift + S`, on MacOS it's `Command+Shift+4`.

These keyboard shortcuts enable you select a portion of your screen to be screenshot and then you can copy it your clipboard. 

You have to take an extra step to get it to your clipboard, so i think i've found an even easier option on Ubuntu linux, however a bit more technical. 

The problem I was running into was I'm also running OBS studio, and it was catching all the `Print Screen` commands and making it not work. 

After doing a bit of online research, i found a workaround for this specific use case.


## Solution

After searching and trying a few options that did not serve me well, I found this solution:

A few things to install, install gnome-screenshot & xclip: 

```sh
sudo apt install gnome-screenshot xclip
```

Now navigate to the GUI for your Ubuntu settings, 

`Settings → Keyboard → Keyboard Shortcuts`

At the bottom there is an option for `Custom Shortcuts`. Click on that and click Add, you'll have a few options to fill out: 


Name: give it whatever name you wish, mine is: 

`Screenshot Selection to Clipboard`

Command: 

`bash -c 'gnome-screenshot -a --file=/tmp/foo.png && xclip -selection clipboard -t image/png -i /tmp/foo.png'`

Essentially this saves the screenshot to a temp directory, then pulls that file and adds it to your clipboard.

### One Enhancement:

How can i enhance this so that it saves the screenshot with a dated name in my `~/Pictures` directory, and also applies it to the clipboard? 

If your feeling comfortable with how far we've come already, you may enhance things a bit like this: 

```sh
bash -c '
file="$HOME/Pictures/Screenshot-$(date +"%Y-%m-%d_%H-%M-%S").png" &&
gnome-screenshot -a --file="$file" &&
xclip -selection clipboard -t image/png -i "$file"
'
```

Here is a one liner that is easier to paste into the dialog box. I kept the above code for readability, so you can see and understand what steps it is taking: 

`bash -c 'file="$HOME/Pictures/Screenshot-$(date +"%Y-%m-%d_%H-%M-%S").png" && gnome-screenshot -a --file="$file" && xclip -selection clipboard -t image/png -i "$file"'`

## Conclusion

The last command gives great functionality improvement, saving the selected area screenshot to disk and also to clipboard. 

You may want to customize this behavior, maybe removing the clipboard, or removing the file storage. You can edit the command as you wish. I like it to save to disk and clipboard, I find that especially useful if you're saving many subsequent screenshots at a time. 


## References

[Reddit Post](https://www.reddit.com/r/Ubuntu/comments/vkrolx/how_to_screenshot_area_and_copy_to_clipboard/)
