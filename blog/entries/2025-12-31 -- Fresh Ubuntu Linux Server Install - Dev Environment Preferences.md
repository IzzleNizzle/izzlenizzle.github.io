Currently I'm using Ubuntu 24 LTS.

Here are the steps i took right after the initial installation:

```sh
sudo apt update; sudo apt upgrade

ssh-keygen -t rsa -b 4096 -C "pehisaac@gmail.com"

git config --global user.email "pehisaac@gmail.com"
git config --global user.name "Isaac P"
git config --global init.defaultBranch main
git config --global pull.rebase false

sudo apt-get install -y zip htop vim tree
```

Install NVM by following [docs](https://github.com/nvm-sh/nvm#installing-and-updating)

Install docker by following [docs](https://docs.docker.com/engine/install/ubuntu/)

Pyenv is a little hairy, [here's a blog](https://kfields.me/blog/pyenv_on_ubuntu_22) i used to download the correct dependencies

```sh
nvm install --lts
nvm use --lts

pyenv install 3.12
pyenv global 3.12

mkdir ~/code
```

That's how I like to set up my host development machine!
