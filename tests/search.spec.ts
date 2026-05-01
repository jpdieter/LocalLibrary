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

test('User can search by author name', async ({ page }) => {
  // ARRANGE: Go to application
  await page.goto('https://locallibrary-5sbd.onrender.com/collection');

  // ACT: Perform search
  const searchInput = page.getByRole('searchbox', { name: 'Search' });
  await searchInput.fill('George Orwell');

  await page.getByRole('button', { name: 'Search' }).click();

  // ASSERT 1: Navigation happened correctly
  await expect(page).toHaveURL(/\/search\/submit/);

  // ASSERT 2: Results are displayed (basic structure check)
  const results = page.locator('ul > li > a');
  await expect(results.first()).toBeVisible();

    
  // ASSERT 3: Business logic validation (correct result returned)
  // NOTE: Full author match does not return results.
  // Partial matches (Orwell / George) work as expected.
  await expect(page.locator('text=George Orwell')).toBeVisible();
});

test('User cannot search with empty query', async ({ page }) => {

  await page.goto('https://locallibrary-5sbd.onrender.com/collection');

  await page.getByRole('button', { name: 'Search' }).click();

  // Assert: Expect no results
  const results = page.locator('ul > li > a');
  await expect(results).toHaveCount(0);
  // Empty search returns a full list of books, authors and genres and 
  // does not match expected result.
});