import { test, expect } from '@playwright/test';

test.describe('Bookshelf page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/bookshelf/');
  });

  test('loads bookshelf page metadata and hero copy', async ({ page }) => {
    await expect(page).toHaveTitle('Bookshelf - Trailfront');
    await expect(page.locator('h1')).toHaveText('Bookshelf');
    await expect(page.locator('.page-subtitle')).toContainText(
      'A curated collection of books that have shaped how I think, build, and live.'
    );
    await expect(page.locator('.bookshelf-intro')).toContainText(
      "I don't track every book I read."
    );
  });

  test('renders books from JSON data with reflections and accessible covers', async ({ page }) => {
    const cards = page.locator('.book-card');
    await expect(cards).toHaveCount(2);

    await expect(cards.nth(0).locator('.book-title')).toHaveText('Atomic Habits');
    await expect(cards.nth(0).locator('.book-author')).toHaveText('by James Clear');
    await expect(cards.nth(0).locator('.book-reflection')).toContainText(
      'goals and systems'
    );
    await expect(cards.nth(0).locator('.book-cover')).toHaveAttribute(
      'alt',
      'Custom bookshelf cover for Atomic Habits by James Clear'
    );

    await expect(cards.nth(1).locator('.book-title')).toHaveText('Deep Work');
    await expect(cards.nth(1).locator('.book-reflection')).toContainText(
      'focus and distraction'
    );
  });

  test('builds category filter options from JSON data', async ({ page }) => {
    const options = page.locator('#bookshelf-filter option');
    await expect(options).toHaveCount(5);
    await expect(options).toContainText([
      'All categories',
      'Business',
      'Personal Development',
      'Psychology',
      'Technology',
    ]);
  });

  test('filters books by category', async ({ page }) => {
    await page.locator('#bookshelf-filter').selectOption('Technology');

    const cards = page.locator('.book-card');
    await expect(cards).toHaveCount(1);
    await expect(cards.first().locator('.book-title')).toHaveText('Deep Work');
    await expect(page.locator('#bookshelf-count')).toHaveText('Showing 1 of 2 book');
  });

  test('sorts books by title', async ({ page }) => {
    await page.locator('#bookshelf-sort').selectOption('title');

    const titles = page.locator('.book-title');
    await expect(titles.nth(0)).toHaveText('Atomic Habits');
    await expect(titles.nth(1)).toHaveText('Deep Work');
  });
});

test.describe('Bookshelf responsive layout', () => {
  test('uses two columns on tablet', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'Tablet', 'Tablet only');
    await page.goto('/bookshelf/');

    const grid = page.locator('.bookshelf-grid');
    await expect(page.locator('.book-card')).toHaveCount(2);
    const columns = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    const columnCount = columns.split(/\s+/).filter((column) => column.length > 0).length;
    expect(columnCount).toBe(2);
  });

  test('uses one column on mobile', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'Mobile', 'Mobile only');
    await page.goto('/bookshelf/');

    const grid = page.locator('.bookshelf-grid');
    await expect(page.locator('.book-card')).toHaveCount(2);
    const columns = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    const columnCount = columns.split(/\s+/).filter((column) => column.length > 0).length;
    expect(columnCount).toBe(1);
  });
});
