import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const siteOrigin = 'https://trailfront.dev';
const captureDate = '2026-05-25';
const outputRoot = path.resolve(`docs/before-${captureDate}`);
const screenshotDir = path.join(outputRoot, 'screenshots');

const viewports = [
  { name: 'desktop', width: 1440, height: 1200 },
  { name: 'mobile', width: 390, height: 844 },
];

const startingUrls = [
  '/',
  '/blog/',
  '/web-tools/',
  '/web-tools/base64-tools/',
  '/web-tools/h3-power-timer/',
  '/web-tools/heic-converter/',
  '/web-tools/note-tool/',
  '/support',
  '/privacy',
];

const browser = await chromium.launch();
await mkdir(screenshotDir, { recursive: true });

function normalizeUrl(href) {
  const url = new URL(href, siteOrigin);
  url.hash = '';
  if (url.origin !== siteOrigin) return null;
  return url.toString();
}

function slugFor(url) {
  const parsed = new URL(url);
  const pathname = parsed.pathname.replace(/^\/|\/$/g, '') || 'home';
  return pathname.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
}

async function collectLinks(page) {
  return page.evaluate(() =>
    Array.from(document.querySelectorAll('a[href]'), (anchor) => anchor.href)
  );
}

const urls = new Set(startingUrls.map((url) => normalizeUrl(url)).filter(Boolean));
const crawled = new Set();

for (const url of Array.from(urls)) {
  const page = await browser.newPage({ viewport: viewports[0] });
  try {
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    if (!response || !response.ok()) continue;
    crawled.add(url);
    for (const href of await collectLinks(page)) {
      const normalized = normalizeUrl(href);
      if (!normalized) continue;
      const parsed = new URL(normalized);
      if (parsed.pathname.includes('/assets/') || parsed.pathname.includes('/templates/')) continue;
      if (/\.(png|jpg|jpeg|gif|webp|svg|ico|json|xml|txt)$/i.test(parsed.pathname)) continue;
      urls.add(normalized);
    }
  } catch (error) {
    console.warn(`Skipping crawl for ${url}: ${error.message}`);
  } finally {
    await page.close();
  }
}

const records = [];

for (const url of Array.from(urls).sort()) {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
    const slug = slugFor(url);
    const filename = `${slug}-${viewport.name}.png`;
    const screenshotPath = path.join(screenshotDir, filename);

    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      const status = response?.status() ?? null;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      records.push({
        url,
        status,
        viewport: viewport.name,
        size: `${viewport.width}x${viewport.height}`,
        screenshot: `screenshots/${filename}`,
        title: await page.title(),
      });
      console.log(`Captured ${url} (${viewport.name})`);
    } catch (error) {
      records.push({
        url,
        status: null,
        viewport: viewport.name,
        size: `${viewport.width}x${viewport.height}`,
        screenshot: null,
        error: error.message,
      });
      console.warn(`Failed ${url} (${viewport.name}): ${error.message}`);
    } finally {
      await page.close();
    }
  }
}

await browser.close();

const manifest = {
  capturedAtLocalDate: captureDate,
  siteOrigin,
  viewports,
  records,
};

await writeFile(
  path.join(outputRoot, 'manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`
);

const lines = [
  '# Trailfront Before Screenshots',
  '',
  `Captured from ${siteOrigin} on ${captureDate}.`,
  '',
  '## Pages',
  '',
  ...records.map((record) => {
    const target = record.screenshot ? `[${record.screenshot}](${record.screenshot})` : 'capture failed';
    const suffix = record.error ? ` - ${record.error}` : '';
    return `- ${record.viewport} ${record.size}: ${record.url} - ${target}${suffix}`;
  }),
  '',
];

await writeFile(path.join(outputRoot, 'README.md'), lines.join('\n'));
