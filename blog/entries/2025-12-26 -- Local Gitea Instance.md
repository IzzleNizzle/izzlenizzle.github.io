Hope you had a great holiday season this year. I'm back at home and ready to get back into coding. I've setup a local Gitea instance on my development machine so that my future git work happens faster and backed it all up with Github. 

## Gitea Local Installation

I went ahead and installed Gitea locally and got a few runners going for doing some action workflows.

I've got a perfectly private installation, local to my machine, that runs super fast and super durable. 

I've decided to go this route and to get a little further from Github. One benefit i really enjoy is the speed of navigating the site. Every single link and click you do is almost instantaneous, and after using that for awhile it's hard to go back to Github, it feels super slow. 

### Repository Strategy

My strategy is going to be a Gitea first strategy, with a Github backup. I've created repo's for the projects that I want to work on this year, and i've set up a "Push Mirror" on commit so that when updates come into Gitea, it will also update Github automatically. 

I'm really excited about this setup, i think this is a clean setup that will keep my coding process fast locally, as well as keeping a very strong and durable backup on Github.

### Setting up Gitea Locally

This process was very smooth in fact. I went through the trouble and issues so that you don't have to. You can simply just use this `docker-compose.yml` file and it'll get you started. All the configuration is there for a Gitea instance with two action runners. 

I've not yet gone into the details of doing package storing. I'm hoping one day to do docker images and things like that, but I don't yet have a cloud image store that I like. So i'm not going to tackle that problem today. 

But for my needs, I wanted a super fast local private git platform, that i could ssh clone with, and have some action runners for some workflows.

I hope that this will set the foundation for my local development environment for a fast future building process.

Here's my [gist](https://gist.github.com/IzzleNizzle/56a68e883fc229db3b52b4d3c88c5fcc) that has the docker compose information.

### Setting up Github as a "Push Mirror"

There's two distinct approaches for this. 

1. You already have a Github repository created with code in it
2. Starting from scratch

Either way, you're going to need a Create a GitHub Personal Access Token (PAT) created for the miror. 

### Create a GitHub Personal Access Token (PAT)

Navigate [here](https://github.com/settings/personal-access-tokens) and create a new token. You can select all your repositories or just some select ones. I just selected the few projects i'm working on this year. 

Under the permissions, make sure to add the "Content" permissions,and give it read and write. This will allow it to push and pull from your repository.

Then with that token, lets address the two different directions you may be headed:

#### You already have a Github repository created with code in it

Go into Gitea and create a new repository. There will be a link at the top right that says "Migrate repository".  Click that, then click from Github. Now you'll see some options, one for "This repository will be a mirror". This will set up a "Pull Mirror", that's not the approach I want, so I don't recommend that. Your desires may vary. 

You'll need to paste in the url for your repository (I had to use the HTTPS url), then put your PAT where it asks for your "Access Token".

Once that's created, you go into the repository settings inside the Gitea repository and add a new push mirror. You'll need to paste in the url for your repository again and then for authentication you use your Github username and the PAT for the password.

#### Starting from scratch

Create a brand new repository in both Gitea and Github. They don't have to match names, but I do on mine. 

Then make sure that your Github PAT has that repo under it's scope for permissions. Meaning, when you created your PAT, if you selected only a few repo's, you will need to go and update the list to add the new repo.

Now back in Gitea, go into the repository settings again and add the Push Mirror. You'll need to paste in the url for your Github repository (I had to use the HTTPS url), then for authentication you use your Github username and the PAT for the password.

### Conclusion

This setup should get you to a solid local instance of Gitea, backed up by Github. 

I see Github as a long term backup location with superb durability. But I really enjoy having my primary tool that I'll be interfacing with mostly being Gitea. The gitea instance will run super fast, almost no latency as it's running locally, and I'll have a perfect backup that takes no effort to keep. It's all automatic.

Enjoy!
