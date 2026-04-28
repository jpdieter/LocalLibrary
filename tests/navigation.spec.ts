import { test, expect } from '@playwright/test';

test('User can navigate to book catalog from landing page', async ({ page }) => {
  await page.goto('https://locallibrary-5sbd.onrender.com/');

  // Click "View Collection"
  await page.getByRole('link', { name: 'View Collection' }).click()

  // Click "Total Books"
  await page.getByRole('link', { name: 'Total Books:' }).click();

  // Assert URL
  await expect(page).toHaveURL(/.*catalog\/books/);

  // Assert content
  await expect(page.getByRole('heading', { name: 'Book List' })).toBeVisible();
});

test('User can navigate to book details page', async ({ page }) => {

  await page.goto('https://locallibrary-5sbd.onrender.com/collection');

  await page.getByRole('link', { name: 'Total Books:' }).click();

  await page.getByRole('link', { name: '1984' }).click();

  // Assert URL
  await expect(page).toHaveURL(/\/catalog\/book\//);

  // Assert content
  await expect(page.getByRole('heading', { name: /1984/ })).toBeVisible();
});