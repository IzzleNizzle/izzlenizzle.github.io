# IsaacP Web Tools

This directory contains the IsaacP Web Tools page, which showcases a collection of web-based utilities and tools.

## Directory Structure

- `tools.json` - **Source of truth** for all web tools (edit this to add/remove tools)
- `templates/tools-template.html` - HTML template for the web tools page
- `index.html` - **Generated file** (do not edit manually, it will be overwritten)

## How to Add a New Tool

1. Edit `web-tools/tools.json`
2. Add a new entry with the following structure:

```json
{
  "title": "Tool Name",
  "description": "A brief description of what the tool does.",
  "url": "https://example.com/tool",
  "openInPopup": true,
  "popupWidth": 400,
  "popupHeight": 800,
  "tags": ["Tag1", "Tag2", "Tag3"]
}
```

### Field Descriptions

- **title** (required): The display name of the tool
- **description** (required): A brief description (1-2 sentences)
- **url** (required): The URL to the tool
- **openInPopup** (optional): Set to `true` to open in a popup window, `false` to open in the same tab (default: `false`)
- **popupWidth** (optional): Width of the popup window in pixels (default: 400)
- **popupHeight** (optional): Height of the popup window in pixels (default: 800)
- **tags** (optional): Array of tags to categorize the tool

3. Commit and push your changes to the `main` branch
4. The GitHub Actions workflow will automatically regenerate `index.html`

## Build Process

The build process is automated via GitHub Actions (`.github/workflows/build-web-tools.yml`):

1. Triggered when `tools.json` or `tools-template.html` is changed
2. Reads the JSON file and generates HTML cards for each tool
3. Injects the cards into the template at the `TOOLS_PLACEHOLDER` marker
4. Commits the updated `index.html` back to the repository

## Manual Build (for testing)

To manually build the page locally:

```bash
cd /path/to/izzlenizzle.github.io

# Run the build script
bash <<'SCRIPT'
tools_html=""

while IFS= read -r tool; do
  title=$(echo "$tool" | jq -r '.title')
  description=$(echo "$tool" | jq -r '.description')
  url=$(echo "$tool" | jq -r '.url')
  openInPopup=$(echo "$tool" | jq -r '.openInPopup')
  popupWidth=$(echo "$tool" | jq -r '.popupWidth // "400"')
  popupHeight=$(echo "$tool" | jq -r '.popupHeight // "800"')
  
  # Escape HTML special characters
  title_escaped=$(echo "$title" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g; s/"/\&quot;/g; s/'\''/\&#39;/g')
  description_escaped=$(echo "$description" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g; s/"/\&quot;/g; s/'\''/\&#39;/g')
  url_escaped=$(echo "$url" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g; s/"/\&quot;/g; s/'\''/\&#39;/g')
  
  # Build tags HTML
  tags_html=""
  tags=$(echo "$tool" | jq -r '.tags[]?' 2>/dev/null)
  if [ -n "$tags" ]; then
    while IFS= read -r tag; do
      if [ -n "$tag" ]; then
        tag_escaped=$(echo "$tag" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g; s/"/\&quot;/g; s/'\''/\&#39;/g')
        tags_html+="<span class=\"tool-tag\">${tag_escaped}</span>"
      fi
    done <<< "$tags"
  fi
  
  # Build onclick handler
  if [ "$openInPopup" = "true" ]; then
    onclick="onclick=\"window.open('${url_escaped}', '$(echo $title | tr ' ' '_')Popout', 'height=${popupHeight}px,width=${popupWidth}px,scrollbars=no,menubar=no,location=no,titlebar=no,status=no,toolbar=no,top=500,left=500'); return false;\""
  else
    onclick=""
  fi
  
  # Append tool card HTML
  tools_html+="        <article class=\"tool-card\" ${onclick}>
          <span class=\"tool-link-icon\">→</span>
          <h3 class=\"tool-title\">${title_escaped}</h3>
          <p class=\"tool-description\">${description_escaped}</p>
          <div class=\"tool-tags\">${tags_html}</div>
        </article>
        "
done < <(jq -c '.[]' web-tools/tools.json)

# Replace the TOOLS_PLACEHOLDER with pre-rendered HTML
awk -v tools="$tools_html" '
  /TOOLS_PLACEHOLDER/ {
    print tools;
    next;
  }
  { print; }
' web-tools/templates/tools-template.html > web-tools/index.html

echo "Successfully generated web-tools/index.html"
SCRIPT
```

## Styling

The tool cards use CSS defined in the template with the following features:

- Hover effects with gradient overlay
- Responsive grid layout (mobile-friendly)
- Tag badges for categorization
- Arrow icon that animates on hover
- Smooth transitions and transforms

The page inherits the main portfolio styling from `css/isaacpcodes.css`.
