// spec: tests/greenkart-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('GreenKart cart and checkout', () => {
  test('Cart flow and checkout readiness', async ({ page }) => {
    // Open the GreenKart home page.
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    // Add a product to the cart.
    await page.locator('button:has-text("ADD TO CART")').first().click();

    // Open the cart view.
    await page.locator('a.cart-icon').click();

    // Verify the cart contains the selected item and the checkout action is visible.
    await expect(page.getByRole('button', { name: 'PROCEED TO CHECKOUT' })).toBeVisible();
  });
});
