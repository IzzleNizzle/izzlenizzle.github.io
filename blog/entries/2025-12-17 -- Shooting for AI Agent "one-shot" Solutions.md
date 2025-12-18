AI is no stranger to the spotlight in the last few years. But how have the tools been working for you? 

I see a lot of different opinions, but the area I'd like to focus on is the "one-shot" solutions. Meaning there will be no follow up and you can expect it to work first try. Lets make sure that we set good expectations for these tools and we won't come out frustrated. 

When working with AI agents in their various forms, I often find myself pleasantly surprised by it's efficacy. However I've also found myself scratching my head wondering how they could have done such a bad job. 

Most of that comes down to expectations. Let me give a few examples of working with AI agents and conclude with my thoughts on this subject.

## When to use Github's Copilot Web Agent, or VSC Coding Agent

From my experience using these tools, I believe Github's web based Agent is a bit more in depth than the agent in VSC. However it takes more time to complete the requests. So plan accordingly. If you have a simple small task, your VSC agent will be the most efficient way to get that updated. But if it's a bit more involved, consider using the web agent. 

Case and point, I'll share an example where it's an easy enough task that I think AI can do it perfectly, however i would prefer to use their web based UI in order to request the change: 

In my profile/blog repository on Github, i have my profile pages at the root directory, and then i have a sub directory for my blog at `/blog`. However somewhere in the past I had created a blog post to the root directory. In looking into that post, i noticed that the blog post had some screenshots that were references to assets inside the root `/assets` directory. 

I'd like that assets directory to specifically be for my home website pages, and I'd like to have a separate place for blog post assets. 

I also wanted the name of the new blog post file to include the date when the blog post was first created. 

So with a fairly simple prompt i was able to include all of these requirements. I could simply make these changes myself, but in this new world I thin kit's a simple demonstration of what this can do for us without having to think about the details. 

When reviewing the pull request, I was simply delighted to see that all the changes were made as I wanted them to. The files were all moved correctly, the blog post name was updated, and even some typo's I made in teh blog post were updated. 

Thanks to the system of Git, i was able to carefully review each change to ensure that it wasn't trying to rewrite the whole blog post. I don't want it to erase my voice. It was surgical in changing the files and those updates. 

## Lowering Developer Mental Cognitive Load

I can definitely recommend these tools to other developers out there. I think if you check your expectations, practice often with the tools to understand where each agent's strengths and weaknesses come into play, these tools can definitely help you in your development tasks and goals. 

One of the greatest benefits I see in these new AI tools is the lowering of the mental cognitive demands of the developer. I'm not saying it's rotting our brains or anything, but simply it's easier to go farther and make more changes with these tools than if you had to think about each of these fine details at every step. 

You will always have to be careful with these tools, and also carefully test them afterwords to ensure they did what you wanted. But we already have to do that with code anyways. It's quite often you write code and it doesn't do what it looks like it will do. Prompting AI agents is no different in my mind. 

## Now an example where VSC wins

Now as an example of one i can do myself really easily but using the AI agent inside of VSC.

Same repo inside of my `/blog` directory i noticed this update i wanted. I have my index.html which serves as the page for all of my posts to be displayed. It references a png file that is used for my branding right there in the `/blog` directory. I want that to point to the same png file but in the `/assets` directory. I  want the blog to leverage that file. 

So this will be a file move, and then a reference update for a few html files. I will bring those html files into context for VSC, and with a simple prompt I'm sure it'll get it right the first time. 

And sure enough, in both of these use cases I was able to get the right solution the first try without any follow up work!

## Conclusion

So all in all, it does come down to a little bit of subjective usage and preferences. I think the principles to remember are that most AI tasks need to be kept quite simple and small. You'll be quite pleased when you don't give the agent moderate or even difficult tasks. 

You definitely can use agents to get started on such things, but I'm specifically talking about having the expectation of a "one-shot" solution. Meaning there will be no follow up and you can expect it to work first try. 

If you have moderate or difficult tasks to do, be mentally prepared that there are no silver bullets. AI can aid and guide you, but complexity needs to be monitored and reviewed carefully. So with that in mind if you want to work very asynchronously you can use Github's web agent, otherwise you'll likely want to use the VSC agent as that's happening right in front of you, you can interact with it quite smoothly and it's the fastest option. 

Happy coding!
