# izzlenizzle.github.io

[![wakatime](https://wakatime.com/badge/user/32870911-52df-4de0-abe7-3ed3cf8fb97d.svg)](https://wakatime.com/@32870911-52df-4de0-abe7-3ed3cf8fb97d)

My Portfolio

## Testing:

`npx playwright install chromium`

## Blog Posts

This site includes an automated blog system that converts markdown files to HTML.

### Adding a New Blog Post

1. Create a new markdown file in `blog/entries/`
2. Start your post with a `##` heading (this will be the title)
3. Write your content using standard markdown
4. Commit and push to the `main` branch
5. The GitHub Action will automatically generate the HTML page

The generated blog posts will be available at:

- Blog index: `/blog/index.html`
- Individual posts: `/blog/posts/{filename}.html`

See `blog/entries/README.md` for more details.

## About This Repository

This repository hosts the built artifacts for my personal website and tools.

The source code for each project lives in separate repositories and is
compiled and deployed here via CI.

### Source Repositories

- h3-power-timer Tool: https://github.com/IzzleNizzle/h3-power-timer
- Note Tool: https://github.com/IzzleNizzle/noteTool
