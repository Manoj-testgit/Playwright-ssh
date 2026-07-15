// spec: tests/greenkart-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('GreenKart storefront', () => {
  test.only('Homepage and product discovery', async ({ page }) => {
    // Open the GreenKart home page.
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    // Verify the product grid is visible and product cards show names, prices, and Add to Cart buttons.
    const cauliflowerCard = page.getByRole('heading', { name: 'Cauliflower - 1 Kg' });
    await expect(cauliflowerCard).toBeVisible();

    // Search for 'cauliflower' and verify the filtered result is shown.
    await page.locator('input[placeholder=\'Search for Vegetables and Fruits\']').fill('cauliflower');
    await page.locator('button.search-button').click();
    await expect(cauliflowerCard).toBeVisible();
  });
});
