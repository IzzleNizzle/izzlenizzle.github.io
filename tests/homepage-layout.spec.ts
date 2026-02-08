import { test, expect } from '@playwright/test';

// ── Desktop Layout (1280x800) ──

test.describe('Desktop Layout', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'Desktop', 'Desktop only');
    await page.goto('/');
  });

  test('nav menu is visible as horizontal flex row', async ({ page }) => {
    const navMenu = page.locator('.nav-menu');
    await expect(navMenu).toBeVisible();

    const display = await navMenu.evaluate((el) => getComputedStyle(el).display);
    expect(display).toBe('flex');

    const flexDirection = await navMenu.evaluate((el) => getComputedStyle(el).flexDirection);
    expect(flexDirection).toBe('row');
  });

  test('hamburger menu icon is not visible', async ({ page }) => {
    const menuIcon = page.locator('.menu-icon');
    await expect(menuIcon).not.toBeVisible();
  });

  test('menu toggle checkbox is hidden', async ({ page }) => {
    const menuToggle = page.locator('#menu-toggle');
    await expect(menuToggle).toBeHidden();
  });

  test('hero section has min-height of 70vh', async ({ page }) => {
    const hero = page.locator('.hero');
    const minHeight = await hero.evaluate((el) => getComputedStyle(el).minHeight);
    // 70vh at 800px viewport height = 560px
    expect(parseFloat(minHeight)).toBeGreaterThanOrEqual(550);
  });

  test('projects grid renders multi-column', async ({ page }) => {
    const grid = page.locator('.projects-grid');
    const columns = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    // Multi-column means more than one value in gridTemplateColumns
    const columnCount = columns.split(/\s+/).filter((s) => s.length > 0).length;
    expect(columnCount).toBeGreaterThanOrEqual(2);
  });

  test('skills grid renders multi-column', async ({ page }) => {
    const grid = page.locator('.skills-grid');
    const columns = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    const columnCount = columns.split(/\s+/).filter((s) => s.length > 0).length;
    expect(columnCount).toBeGreaterThanOrEqual(2);
  });

  test('CTA buttons are in a horizontal row', async ({ page }) => {
    const ctaButtons = page.locator('.cta-buttons');
    const flexDirection = await ctaButtons.evaluate((el) => getComputedStyle(el).flexDirection);
    expect(flexDirection).toBe('row');
  });

  test('container has max-width of 1200px', async ({ page }) => {
    const container = page.locator('.container').first();
    const maxWidth = await container.evaluate((el) => getComputedStyle(el).maxWidth);
    expect(maxWidth).toBe('1200px');
  });

  test('header is sticky', async ({ page }) => {
    const header = page.locator('header');
    const position = await header.evaluate((el) => getComputedStyle(el).position);
    expect(position).toBe('sticky');
  });

  test('section title has accent underline', async ({ page }) => {
    const titleAfter = await page.locator('.section-title').first().evaluate((el) => {
      const styles = getComputedStyle(el, '::after');
      return {
        height: styles.height,
        position: styles.position,
      };
    });
    expect(titleAfter.position).toBe('absolute');
    expect(titleAfter.height).toBe('2px');
  });
});

// ── Tablet Layout (768x1024) ──

test.describe('Tablet Layout', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'Tablet', 'Tablet only');
    await page.goto('/');
  });

  test('hamburger menu icon is visible', async ({ page }) => {
    const menuIcon = page.locator('.menu-icon');
    await expect(menuIcon).toBeVisible();
  });

  test('nav menu is hidden off-screen by default', async ({ page }) => {
    const navMenu = page.locator('.nav-menu');
    // The menu is positioned off-screen with right: -100%
    const boundingBox = await navMenu.boundingBox();
    expect(boundingBox).toBeTruthy();
    // The element's left edge should be beyond the viewport width
    expect(boundingBox!.x).toBeGreaterThanOrEqual(767);
  });

  test('projects grid is single column', async ({ page }) => {
    const grid = page.locator('.projects-grid');
    const columns = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    const columnCount = columns.split(/\s+/).filter((s) => s.length > 0).length;
    expect(columnCount).toBe(1);
  });

  test('skills grid is single column', async ({ page }) => {
    const grid = page.locator('.skills-grid');
    const columns = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    const columnCount = columns.split(/\s+/).filter((s) => s.length > 0).length;
    expect(columnCount).toBe(1);
  });

  test('CTA buttons stack vertically', async ({ page }) => {
    const ctaButtons = page.locator('.cta-buttons');
    const flexDirection = await ctaButtons.evaluate((el) => getComputedStyle(el).flexDirection);
    expect(flexDirection).toBe('column');
  });

  test('buttons are full width', async ({ page }) => {
    const btn = page.locator('.cta-buttons .btn').first();
    const width = await btn.evaluate((el) => getComputedStyle(el).width);
    // Full width means the button should be close to the container width
    expect(parseFloat(width)).toBeGreaterThan(200);
  });

  test('hero does not enforce min-height', async ({ page }) => {
    const hero = page.locator('.hero');
    const minHeight = await hero.evaluate((el) => getComputedStyle(el).minHeight);
    // On tablet, min-height should be auto (0px) not 70vh
    expect(minHeight).toBe('0px');
  });

  test('nav menu is positioned fixed for slide-in', async ({ page }) => {
    const navMenu = page.locator('.nav-menu');
    const position = await navMenu.evaluate((el) => getComputedStyle(el).position);
    expect(position).toBe('fixed');
  });

  test('nav menu has vertical flex direction', async ({ page }) => {
    const navMenu = page.locator('.nav-menu');
    const flexDirection = await navMenu.evaluate((el) => getComputedStyle(el).flexDirection);
    expect(flexDirection).toBe('column');
  });
});

// ── Mobile Layout (375x812) ──

test.describe('Mobile Layout', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'Mobile', 'Mobile only');
    await page.goto('/');
  });

  test('hamburger menu icon is visible', async ({ page }) => {
    const menuIcon = page.locator('.menu-icon');
    await expect(menuIcon).toBeVisible();
  });

  test('nav menu is hidden off-screen by default', async ({ page }) => {
    const navMenu = page.locator('.nav-menu');
    const boundingBox = await navMenu.boundingBox();
    expect(boundingBox).toBeTruthy();
    // The element's left edge should be beyond the viewport width (375px)
    expect(boundingBox!.x).toBeGreaterThanOrEqual(375);
  });

  test('logo is smaller (32px height)', async ({ page }) => {
    const logo = page.locator('.logo');
    const height = await logo.evaluate((el) => getComputedStyle(el).height);
    expect(parseFloat(height)).toBeLessThanOrEqual(32);
  });

  test('nav menu panel is 80% width', async ({ page }) => {
    const navMenu = page.locator('.nav-menu');
    const width = await navMenu.evaluate((el) => getComputedStyle(el).width);
    // 80% of 375px = 300px
    expect(parseFloat(width)).toBeCloseTo(300, -1);
  });

  test('contact links stack vertically', async ({ page }) => {
    const contactLinks = page.locator('.contact-links');
    const flexDirection = await contactLinks.evaluate(
      (el) => getComputedStyle(el).flexDirection
    );
    expect(flexDirection).toBe('column');
  });

  test('email address uses word-break: break-all', async ({ page }) => {
    const email = page.locator('.contact-email');
    const wordBreak = await email.evaluate((el) => getComputedStyle(el).wordBreak);
    expect(wordBreak).toBe('break-all');
  });

  test('projects grid is single column', async ({ page }) => {
    const grid = page.locator('.projects-grid');
    const columns = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    const columnCount = columns.split(/\s+/).filter((s) => s.length > 0).length;
    expect(columnCount).toBe(1);
  });

  test('skills grid is single column', async ({ page }) => {
    const grid = page.locator('.skills-grid');
    const columns = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    const columnCount = columns.split(/\s+/).filter((s) => s.length > 0).length;
    expect(columnCount).toBe(1);
  });

  test('section padding is tighter than desktop', async ({ page }) => {
    const section = page.locator('.section').first();
    const padding = await section.evaluate((el) => getComputedStyle(el).paddingTop);
    // On mobile (480px breakpoint), padding should be var(--space-lg) = 32px
    expect(parseFloat(padding)).toBeLessThanOrEqual(48);
  });
});
