import { test, expect } from '@playwright/test';

// ── Mobile Menu Toggle (Tablet & Mobile) ──

test.describe('Mobile Menu Toggle', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'Desktop', 'Tablet and Mobile only');
    await page.goto('/');
  });

  test('clicking hamburger opens the nav menu', async ({ page }) => {
    const menuIcon = page.locator('.menu-icon');
    const navMenu = page.locator('.nav-menu');

    // Get viewport width for dynamic checks
    const viewportWidth = page.viewportSize()!.width;

    // Menu should be off-screen initially (positioned beyond viewport right edge)
    const boxBefore = await navMenu.boundingBox();
    expect(boxBefore).toBeTruthy();
    expect(boxBefore!.x).toBeGreaterThanOrEqual(viewportWidth);

    // Click the hamburger icon
    await menuIcon.click();
    await page.waitForTimeout(400);

    // Menu should now be visible (right: 0, x should be within viewport)
    const boxAfter = await navMenu.boundingBox();
    expect(boxAfter).toBeTruthy();
    expect(boxAfter!.x).toBeLessThan(viewportWidth);
  });

  test('clicking hamburger again closes the nav menu', async ({ page }) => {
    const menuIcon = page.locator('.menu-icon');
    const navMenu = page.locator('.nav-menu');

    const viewportWidth = page.viewportSize()!.width;

    // Open menu
    await menuIcon.click();
    await page.waitForTimeout(400);
    const boxOpen = await navMenu.boundingBox();
    expect(boxOpen).toBeTruthy();
    expect(boxOpen!.x).toBeLessThan(viewportWidth);

    // Close menu
    await menuIcon.click();

    // Wait for the transition to complete
    await page.waitForTimeout(400);
    const boxClosed = await navMenu.boundingBox();
    expect(boxClosed).toBeTruthy();
    expect(boxClosed!.x).toBeGreaterThanOrEqual(viewportWidth);
  });

  test('nav link items become visible when menu is open', async ({ page }) => {
    const menuIcon = page.locator('.menu-icon');

    // Verify items start with opacity 0
    const navItems = page.locator('.nav-menu li');
    const firstItemOpacityBefore = await navItems.first().evaluate(
      (el) => getComputedStyle(el).opacity
    );
    expect(parseFloat(firstItemOpacityBefore)).toBe(0);

    // Open menu
    await menuIcon.click();

    // Wait for staggered animations to complete (last item has 0.3s delay + 0.3s transition)
    await page.waitForTimeout(800);

    // Check that nav items are now visible
    const count = await navItems.count();
    for (let i = 0; i < count; i++) {
      const opacity = await navItems.nth(i).evaluate((el) => getComputedStyle(el).opacity);
      expect(parseFloat(opacity)).toBe(1);
    }
  });

  test('hamburger transforms to X when menu is open', async ({ page }) => {
    const menuIcon = page.locator('.menu-icon');

    // Open menu
    await menuIcon.click();
    await page.waitForTimeout(400);

    // Middle span should have opacity 0 (hidden as part of X animation)
    const middleSpan = page.locator('.menu-icon span:nth-child(2)');
    const opacity = await middleSpan.evaluate((el) => getComputedStyle(el).opacity);
    expect(parseFloat(opacity)).toBe(0);
  });

  test('clicking a nav link closes the menu', async ({ page }) => {
    const menuIcon = page.locator('.menu-icon');
    const menuToggle = page.locator('#menu-toggle');

    // Open menu
    await menuIcon.click();
    await page.waitForTimeout(400);

    // Click a nav link (e.g., "Projects")
    const projectsLink = page.locator('.nav-menu .nav-link').first();
    await projectsLink.click();

    // Menu toggle checkbox should be unchecked
    await expect(menuToggle).not.toBeChecked();
  });
});

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

  test('nav link "About" scrolls to about section', async ({ page }, testInfo) => {
    // On mobile/tablet, need to open menu first
    if (testInfo.project.name !== 'Desktop') {
      await page.locator('.menu-icon').click();
      await page.waitForTimeout(400);
    }

    await page.locator('.nav-menu a[href="#about"]').click();
    await page.waitForTimeout(800);

    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeInViewport();
  });

  test('nav link "Skills" scrolls to skills section', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'Desktop') {
      await page.locator('.menu-icon').click();
      await page.waitForTimeout(400);
    }

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
