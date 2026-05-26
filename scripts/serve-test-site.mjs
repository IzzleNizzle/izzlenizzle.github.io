import { createServer } from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';

const root = process.cwd();
const port = Number(process.argv[2] || process.env.PORT || 3000);

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.m4a': 'audio/mp4',
  '.md': 'text/markdown; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.webp': 'image/webp',
};

function parseFrontMatter(source) {
  if (!source.startsWith('---')) {
    return { data: {}, content: source };
  }

  const end = source.indexOf('\n---', 3);
  if (end === -1) {
    return { data: {}, content: source };
  }

  const rawData = source.slice(3, end).trim();
  const content = source.slice(end + 4).trimStart();
  const data = {};

  for (const line of rawData.split('\n')) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[match[1]] = value;
  }

  return { data, content };
}

function relativeUrl(value) {
  if (!value || value === '/') return '/';
  return value.startsWith('/') ? value : `/${value}`;
}

function renderLiquid(source, page, content) {
  let rendered = source;

  rendered = rendered.replace(
    /{%\s*include\s+([A-Za-z0-9_/-]+\.html)\s*%}/g,
    (_match, includePath) =>
      renderLiquid(readFileSync(join(root, '_includes', includePath), 'utf8'), page, content)
  );

  rendered = rendered.replace(
    /{%\s*if\s+page\.preload_image\s*%}([\s\S]*?){%\s*endif\s*%}/g,
    (_match, body) => (page.preload_image ? body : '')
  );

  rendered = rendered.replace(
    /{%\s*if\s+page\.url\s+contains\s+['"]([^'"]+)['"]\s*%}([\s\S]*?){%\s*endif\s*%}/g,
    (_match, needle, body) => (page.url?.includes(needle) ? body : '')
  );

  rendered = rendered.replace(/{{\s*content\s*}}/g, content);

  rendered = rendered.replace(/{{\s*page\.([A-Za-z0-9_]+)\s*}}/g, (_match, key) => page[key] || '');

  rendered = rendered.replace(
    /{{\s*page\.([A-Za-z0-9_]+)\s*\|\s*relative_url\s*}}/g,
    (_match, key) => relativeUrl(page[key] || '')
  );

  rendered = rendered.replace(
    /{{\s*['"]([^'"]+)['"]\s*\|\s*relative_url\s*}}/g,
    (_match, value) => relativeUrl(value)
  );

  return rendered;
}

function renderPage(filePath, url) {
  const { data, content } = parseFrontMatter(readFileSync(filePath, 'utf8'));
  const page = { ...data, url };
  const layout = readFileSync(join(root, '_layouts', `${data.layout || 'default'}.html`), 'utf8');
  return renderLiquid(layout, page, content);
}

function send(response, status, body, contentType) {
  response.writeHead(status, { 'Content-Type': contentType });
  response.end(body);
}

createServer((request, response) => {
  const url = new URL(request.url || '/', `http://127.0.0.1:${port}`);
  const requestPath = decodeURIComponent(url.pathname);

  if (requestPath === '/' || requestPath === '/index.html') {
    send(response, 200, renderPage(join(root, 'index.html'), '/'), mimeTypes['.html']);
    return;
  }

  const filePath = resolve(root, `.${normalize(requestPath)}`);
  if (!filePath.startsWith(root)) {
    send(response, 403, 'Forbidden', 'text/plain; charset=utf-8');
    return;
  }

  try {
    const stats = statSync(filePath);
    if (!stats.isFile()) {
      send(response, 404, 'Not found', 'text/plain; charset=utf-8');
      return;
    }
    send(response, 200, readFileSync(filePath), mimeTypes[extname(filePath)] || 'application/octet-stream');
  } catch {
    send(response, 404, 'Not found', 'text/plain; charset=utf-8');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`Serving rendered test site at http://127.0.0.1:${port}`);
});
