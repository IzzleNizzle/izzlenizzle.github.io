import { test, expect } from '@playwright/test';

const pages = [
  '/',
  '/blog/',
  '/bookshelf/',
  '/web-tools/',
  '/web-tools/base64-tools/',
  '/support.html',
  '/privacy.html',
];

const oldThemeColors = new Set([
  '#2b241e',
  '#cdb79e',
  'rgb(43, 36, 30)',
  'rgb(205, 183, 158)',
]);

test.describe('GitHub-style theme smoke tests', () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'Desktop', 'Theme smoke tests only need one viewport');
  });

  for (const colorScheme of ['light', 'dark'] as const) {
    test(`uses GitHub-like ${colorScheme} colors on core pages`, async ({ page }) => {
      await page.emulateMedia({ colorScheme });

      const expected = colorScheme === 'light'
        ? {
            bg: '#ffffff',
            accent: '#0969da',
            success: '#2da44e',
            body: 'rgb(255, 255, 255)',
            logo: 'wordmark-github-light.svg',
          }
        : {
            bg: '#0d1117',
            accent: '#2f81f7',
            success: '#3fb950',
            body: 'rgb(13, 17, 23)',
            logo: 'wordmark-github-dark.svg',
          };

      for (const path of pages) {
        await page.goto(path);

        const theme = await page.evaluate(() => {
          const root = getComputedStyle(document.documentElement);
          const body = getComputedStyle(document.body);
          const hero = document.querySelector('.page-hero');
          const headerLogo = document.querySelector<HTMLImageElement>('header .logo');

          return {
            bg: root.getPropertyValue('--bg').trim().toLowerCase(),
            accent: root.getPropertyValue('--accent').trim().toLowerCase(),
            success: root.getPropertyValue('--forest').trim().toLowerCase(),
            bodyBg: body.backgroundColor,
            heroBg: hero ? getComputedStyle(hero).backgroundColor : '',
            logoSrc: headerLogo?.currentSrc || '',
          };
        });

        expect(theme.bg).toBe(expected.bg);
        expect(theme.accent).toBe(expected.accent);
        expect(theme.success).toBe(expected.success);
        expect(theme.bodyBg).toBe(expected.body);
        expect(theme.logoSrc).toContain(expected.logo);

        for (const value of Object.values(theme)) {
          expect(oldThemeColors.has(String(value).toLowerCase())).toBe(false);
        }
      }
    });
  }
});
