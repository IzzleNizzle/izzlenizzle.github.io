import { test, expect } from '@playwright/test';

// ── Anchor Navigation ──

test.describe('Anchor Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('clicking "View Projects" scrolls to projects section', async ({ page }) => {
    const viewProjectsBtn = page.locator('.cta-buttons a:has-text("View Projects")');
    await viewProjectsBtn.click();

    // Wait for smooth scroll
    await page.waitForTimeout(800);

    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeInViewport();
  });

  test('clicking "Get In Touch" scrolls to contact section', async ({ page }) => {
    const getInTouchBtn = page.locator('.cta-buttons a:has-text("Get In Touch")');
    await getInTouchBtn.click();

    // Wait for smooth scroll
    await page.waitForTimeout(800);

    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();
  });

  test('nav link "About" scrolls to about section', async ({ page }) => {
    await page.locator('.nav-menu a[href="#about"]').click();
    await page.waitForTimeout(800);

    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeInViewport();
  });

  test('nav link "Skills" scrolls to skills section', async ({ page }) => {
    await page.locator('.nav-menu a[href="#skills"]').click();
    await page.waitForTimeout(800);

    const skillsSection = page.locator('#skills');
    await expect(skillsSection).toBeInViewport();
  });
});

// ── Sticky Header ──

test.describe('Sticky Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('header remains visible after scrolling down', async ({ page }) => {
    // Scroll down significantly
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(300);

    const header = page.locator('header');
    await expect(header).toBeInViewport();

    // Verify header is at the top of the viewport
    const headerBox = await header.boundingBox();
    expect(headerBox).toBeTruthy();
    expect(headerBox!.y).toBeLessThanOrEqual(1);
  });
});

// ── External Link Safety ──

test.describe('External Link Attributes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('all target="_blank" links have rel="noopener"', async ({ page }) => {
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const rel = await externalLinks.nth(i).getAttribute('rel');
      expect(rel).toContain('noopener');
    }
  });

  test('project links open in new tab', async ({ page }) => {
    const projectLinks = page.locator('.project-links a[target="_blank"]');
    const count = await projectLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
