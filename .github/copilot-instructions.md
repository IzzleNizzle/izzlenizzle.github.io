# GitHub Copilot Instructions

## Repository Context

This is a personal portfolio and blog site hosted on GitHub Pages.

## Blog System Architecture

### Important: Source vs. Build Artifacts

- **Source Files**: `/blog/entries/` - These are the **source markdown files** that should be edited when creating or modifying blog posts
- **Build Artifacts**: `/blog/posts/` - These files are **automatically generated** by the build system and should **NOT be edited manually**

### Build Process

The blog uses an automated build system defined in `.github/workflows/build-blog.yml`:

1. **Source**: Markdown files in `/blog/entries/` are the source of truth
2. **Trigger**: When changes are pushed to markdown files in `/blog/entries/`, the GitHub Actions workflow is triggered
3. **Build Process**: 
   - Converts markdown files to styled HTML pages
   - Extracts dates and titles from filenames (format: `YYYY-MM-DD -- title.md`)
   - Generates individual blog post pages in `/blog/posts/`
   - Updates the blog index (`/blog/index.html`) with the list of posts
4. **Output**: HTML files in `/blog/posts/` and updated `list.json`

### Guidelines for Contributors and AI Assistants

- **DO** edit files in `/blog/entries/` to create or modify blog posts
- **DO NOT** manually edit files in `/blog/posts/` - they will be overwritten by the build process
- **DO** refer to `.github/workflows/build-blog.yml` to understand the build process
- **DO** follow the filename convention: `YYYY-MM-DD -- title-with-hyphens.md` for blog entries
- **DO** consult `/blog/README.md` for detailed instructions on adding blog posts

### Blog Post Filename Convention

Blog entries should follow this naming pattern:
- Format: `YYYY-MM-DD -- title-with-hyphens.md` (with space-dash-dash-space separator)
- Alternative: `YYYY-MM-DD-title-with-hyphens.md` (single dash separator)
- The build system extracts the date and converts the title to proper case

### Site Structure

- `/` - Main portfolio site (index.html)
- `/blog/` - Blog landing page
- `/blog/entries/` - **Source markdown files**
- `/blog/posts/` - **Generated HTML files** (do not edit)
- `/assets/`, `/css/`, `/js/` - Static assets
- `/.github/workflows/` - CI/CD automation
