# Blog

This directory contains the blog landing page. Blog posts are stored in the `/_posts/` directory at the repo root.

## How to Add a New Blog Post

1. Create a new markdown (`.md`) file in the `/_posts/` directory at the repo root
2. Use Jekyll's filename format: `YYYY-MM-DD-slug-with-hyphens.md`
3. Add YAML front matter at the top of the file:

```yaml
---
layout: post
title: "Your Post Title Here"
date: YYYY-MM-DD
---
```

4. Write your content using standard markdown syntax below the front matter
5. Commit and push the file to the `main` branch
6. Jekyll (via GitHub Pages) will automatically:
   - Convert the markdown to a styled HTML blog post using the `post` layout
   - Add the post to the blog index page
   - Generate a clean URL based on the post slug

## Filename Format

Your filename should follow this pattern: `YYYY-MM-DD-slug-with-hyphens.md`

**Examples:**
- `2025-12-26-local-gitea-instance.md`
- `2025-12-17-shooting-for-ai-agent-one-shot-solutions.md`
- `2025-12-15-my-choice-visual-studio-code-extensions.md`

**Important:** The title displayed on the blog comes from the `title` field in the front matter, NOT the filename. The filename slug is only used for the URL.

## Example

**Filename:** `_posts/2025-12-01-my-awesome-blog-post.md`

```markdown
---
layout: post
title: "My Awesome Blog Post"
date: 2025-12-01
---

This is the introduction to my blog post.

## Section 1

Content for section 1...

## Section 2

More content here...
```

This will create a blog post with:
- **Title:** "My Awesome Blog Post"
- **Date:** December 1, 2025
- **URL:** `/blog/posts/my-awesome-blog-post/`

## Supported Markdown Features

- Headings (`#`, `##`, `###`, etc.)
- Links `[text](url)`
- Code blocks with syntax highlighting
- Lists (ordered and unordered)
- Bold and italic text
- Blockquotes
- Images
- Tables
- And more!

## Notes

- The date displayed on the post comes from the `date` field in the front matter
- The title comes from the `title` field in the front matter
- Blog posts are sorted by date, newest first
- The post layout automatically includes a "Back to Blog" link, title, and formatted date
- All styling is handled by the shared `isaacpcodes.css` design system