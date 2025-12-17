# Blog Post Templates

This directory contains HTML templates used by the GitHub Actions workflow to generate blog posts from markdown files.

## post-template.html

The main template for individual blog posts. This template contains:
- HTML structure and metadata
- Styling for blog post layout
- Placeholders that are replaced during build:
  - `TITLE_PLACEHOLDER` - Replaced with the blog post title
  - `DATE_PLACEHOLDER` - Replaced with the post date
  - `CONTENT_PLACEHOLDER` - Replaced with the converted markdown content

### Usage

The template is automatically used by the `.github/workflows/build-blog.yml` workflow when markdown files in `blog/entries/` are added or modified.

To modify the blog post layout, edit the `post-template.html` file. Changes will automatically trigger a rebuild of all blog posts when pushed to the main branch.
