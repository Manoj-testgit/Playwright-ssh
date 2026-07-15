// spec: tests/greenkart-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('GreenKart edge cases', () => {
  test('Search and cart edge behavior', async ({ page }) => {
    // Open the GreenKart home page.
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    // Search with a partial term and verify the result is still shown.
    await page.locator('input[placeholder=\'Search for Vegetables and Fruits\']').fill('cauli');
    await page.locator('button.search-button').click();
    await expect(page.getByRole('heading', { name: 'Cauliflower - 1 Kg' })).toBeVisible();

    // Add the same product twice and verify the cart state remains consistent.
    await page.locator('button:has-text("ADD TO CART")').click();
    await page.locator('button:has-text("ADD TO CART")').click();
    await page.locator('a.cart-icon').click();
    await expect(page.getByRole('button', { name: 'PROCEED TO CHECKOUT' })).toBeVisible();
  });
});
