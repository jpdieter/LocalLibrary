import { test, expect } from '@playwright/test';

test('User can navigate to book catalog from landing page', async ({ page }) => {
  // Go to your app
  await page.goto('https://locallibrary-5sbd.onrender.com/');

  // Click "View Collection"
  await page.getByText('View Collection').click();

  // Click "Total Books"
  await page.getByText('Total Books').click();

  // Assert URL is correct
  await expect(page).toHaveURL(/.*catalog\/books/);

  // Assert page contains expected content
  await expect(page.getByText('Book List')).toBeVisible();
});