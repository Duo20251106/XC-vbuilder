import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3001/app/layout');
  await page.getByRole('button').first().click();
  await page.locator('div').filter({ hasText: /^Image$/ }).nth(1).click();
  await page.locator('div').filter({ hasText: /^View$/ }).nth(1).click();
  await page.locator('.i-icon.i-icon-copy > svg').click();
  await page.getByText('导出 JSON').click();
  await page.getByRole('link', { name: 'Data' }).click();
  await page.locator('.dvn-scroller').dblclick();
  await page.getByRole('link', { name: 'Actions' }).click();
  await page.getByRole('link', { name: 'Math math' }).click();
  await page.getByRole('group').nth(3).click();
  await page.locator('.buttons').click();
  await page.getByText('Number Node').click();
});