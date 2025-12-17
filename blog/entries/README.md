# Blog Entries

This directory contains markdown files that are automatically converted to HTML blog posts.

## How to Add a New Blog Post

1. Create a new markdown (`.md`) file in this directory
2. Start your blog post with a `#` heading (this will be used as the title)
3. Write your content using standard markdown syntax
4. Commit and push the file to the `main` branch
5. The GitHub Action will automatically:
   - Convert the markdown to HTML
   - Create a styled blog post page
   - Update the blog index with your new post

## Example

```markdown
# My Awesome Blog Post

This is the introduction to my blog post.

## Section 1

Content for section 1...

## Section 2

More content here...
```

## Supported Markdown Features

- Headings (`#`, `##`, `###`, etc.)
- Links `[text](url)`
- Code blocks with syntax highlighting
- Lists (ordered and unordered)
- Bold and italic text
- Blockquotes
- And more!

## Notes

- The first `#` heading in your markdown file will be used as the blog post title
- If no `#` heading is found, the filename will be used as the title
- Blog posts are sorted by date, newest first
- The date is taken from the git commit history
