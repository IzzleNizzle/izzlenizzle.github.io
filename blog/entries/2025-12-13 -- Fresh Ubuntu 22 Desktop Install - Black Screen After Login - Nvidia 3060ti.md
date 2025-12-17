## Describe the issue

Right after the install, logging into the desktop it goes black screen right after logging in. I can see the log in screen, until i put my password in then it goes black screen

Thankfully, GPT said this was a "**very common ... issue**,... The good news: it’s almost always fixable in a few minutes."

## Solution: 

### Step 1: Get to a terminal (TTY)

I had a black blank screen, but i was able to get a terminal by pressing the following keys: 

`Ctrl + Alt + F3`

I saw a text login prompt, logged in with:

- my **username**
- my **password**

### Step 2: Install the proper NVIDIA driver

I ran the following commands:

```sh
sudo apt update
sudo ubuntu-drivers devices
```

I was presented with a list of driver options? GPT informed me to look for one with a "recommended" near it, there was one option like that:

`driver   : nvidia-driver-580-open - distro non-free recommended`

So i ran: 

`sudo apt install nvidia-driver-580-open`

### Step 3: Disable Wayland

```sh
sudo nano /etc/gdm3/custom.conf
# Find this line: 
# WaylandEnable=false
# Uncomment it so it becomes:
WaylandEnable=false
# Save and exit
```

### Step 4: Reboot

After i edited the file and while i waited the restart, i saw a bunch of lines on the screen repeating: 

`NVRM: GPU 0000:01:00.0 is already bound to nouveau`

I was worried about that, but GPT said it's ok. And ever since that restart and subsequent restarts, i have not seen that screen repeated. 

## Conclusion

I have now been able to log in and everything seems to be working correctly. I have not made any further changes and I'm glad things are working. OBS Studio seems to work ok, as well as a video editor, Kdenlive

### References

[GPT Chat](https://chatgpt.com/share/693de519-5e8c-8008-813f-1da10f0962d8)
