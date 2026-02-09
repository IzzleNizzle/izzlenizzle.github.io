import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Full Page', () => {
  test('full page screenshot', async ({ page }) => {
    await page.goto('/');
    // Wait for fonts and images to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('full-page.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
});

test.describe('Visual Regression - Sections', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'Desktop', 'Desktop section screenshots only');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
  });

  test('header section', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toHaveScreenshot('section-header.png', {
      maxDiffPixelRatio: 0.01,
    });
  });

  test('hero section', async ({ page }) => {
    const hero = page.locator('.hero');
    await expect(hero).toHaveScreenshot('section-hero.png', {
      maxDiffPixelRatio: 0.01,
    });
  });

  test('about section', async ({ page }) => {
    const about = page.locator('#about');
    await about.scrollIntoViewIfNeeded();
    await expect(about).toHaveScreenshot('section-about.png', {
      maxDiffPixelRatio: 0.01,
    });
  });

  test('projects section', async ({ page }) => {
    const projects = page.locator('#projects');
    await projects.scrollIntoViewIfNeeded();
    await expect(projects).toHaveScreenshot('section-projects.png', {
      maxDiffPixelRatio: 0.01,
    });
  });

  test('skills section', async ({ page }) => {
    const skills = page.locator('#skills');
    await skills.scrollIntoViewIfNeeded();
    await expect(skills).toHaveScreenshot('section-skills.png', {
      maxDiffPixelRatio: 0.01,
    });
  });

  test('contact section', async ({ page }) => {
    const contact = page.locator('#contact');
    await contact.scrollIntoViewIfNeeded();
    await expect(contact).toHaveScreenshot('section-contact.png', {
      maxDiffPixelRatio: 0.01,
    });
  });

  test('footer section', async ({ page }) => {
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toHaveScreenshot('section-footer.png', {
      maxDiffPixelRatio: 0.01,
    });
  });
});
