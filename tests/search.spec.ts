import { test, expect } from '@playwright/test';

test('User can search for an exact book and see it in results', async ({ page }) => {
  // ARRANGE: Go to application
  await page.goto('https://locallibrary-5sbd.onrender.com/collection');

  // ACT: Perform search
  const searchInput = page.getByRole('searchbox', { name: 'Search' });
  await searchInput.fill('1984');

  await page.getByRole('button', { name: 'Search' }).click();

  // ASSERT 1: Navigation happened correctly
  await expect(page).toHaveURL(/\/search\/submit/);

  // ASSERT 2: Results are displayed (basic structure check)
  const results = page.locator('ul > li > a');
  await expect(results.first()).toBeVisible();

  // ASSERT 3: Business logic validation (correct result returned)
  await expect(page.locator('text=1984')).toBeVisible();
});

test('User can search using partial book title', async ({ page }) => {
  // ARRANGE: Go to application
  await page.goto('https://locallibrary-5sbd.onrender.com/collection');

  // ACT: Perform search
  const searchInput = page.getByRole('searchbox', { name: 'Search' });
  await searchInput.fill('19');

  await page.getByRole('button', { name: 'Search' }).click();

  // ASSERT 1: Navigation happened correctly
  await expect(page).toHaveURL(/\/search\/submit/);

  // ASSERT 2: Results are displayed (basic structure check)
  const results = page.locator('ul > li > a');
  await expect(results.first()).toBeVisible();

  // ASSERT 3: Business logic validation (correct result returned)
  await expect(page.locator('text=1984')).toBeVisible();
});
