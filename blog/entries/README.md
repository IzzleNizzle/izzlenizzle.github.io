# Blog Entries

This directory contains markdown files that are automatically converted to HTML blog posts.

## How to Add a New Blog Post

1. Create a new markdown (`.md`) file in this directory with the format: `YYYY-MM-DD-title-with-hyphens.md`
2. Write your content using standard markdown syntax
3. Commit and push the file to the `main` branch
4. The GitHub Action will automatically:
   - Extract the date from the filename
   - Create a clean title from the filename (converting hyphens to spaces and capitalizing words)
   - Convert the markdown to HTML
   - Create a styled blog post page
   - Update the blog index with your new post

## Filename Format

Your filename should follow this pattern: `YYYY-MM-DD-title-with-hyphens.md`

**Examples:**
- `2024-12-15-my-first-blog-post.md` → Title: "My First Blog Post", Date: 2024-12-15
- `2024-01-20-learning-python-basics.md` → Title: "Learning Python Basics", Date: 2024-01-20
- `2024-11-03-ubuntu-installation-guide.md` → Title: "Ubuntu Installation Guide", Date: 2024-11-03

If you don't include a date in the filename, the system will use the git commit date instead.

## Example

**Filename:** `2024-12-01-my-awesome-blog-post.md`

```markdown
This is the introduction to my blog post.

## Section 1

Content for section 1...

## Section 2

More content here...
```

This will create a blog post with:
- **Title:** "My Awesome Blog Post"
- **Date:** December 1, 2024

## Supported Markdown Features

- Headings (`#`, `##`, `###`, etc.)
- Links `[text](url)`
- Code blocks with syntax highlighting
- Lists (ordered and unordered)
- Bold and italic text
- Blockquotes
- And more!

## Notes

- The date is extracted from the filename in YYYY-MM-DD format
- The title is created by converting hyphens to spaces and capitalizing each word
- If no date is found in the filename, the git commit date will be used
- Blog posts are sorted by date, newest first
