# GreenKart Test Plan

## Application Overview

Test plan for the GreenKart demo ecommerce app covering storefront browsing, cart actions, checkout flow, validation, and edge cases.

## Test Scenarios

### 1. GreenKart storefront

**Seed:** `tests/seed.spec.ts`

#### 1.1. Homepage and product discovery

**File:** `tests/GreenKart-storefront.spec.ts`

**Steps:**
  1. Open the GreenKart home page
    - expect: The page loads successfully and the product grid is visible.
  2. Verify that product cards display product names, prices, and Add to Cart actions
    - expect: Each visible product shows a name, price, and add-to-cart action.
  3. Search for a known product such as cauliflower
    - expect: The product list is filtered to the expected item.
  4. Test search with partial text, different casing, and no-result queries
    - expect: Valid searches return matching products and unknown queries show a clear no-result state.
  5. Open any available product details view
    - expect: Product details are displayed correctly and navigation back to the catalog works.

#### 1.2. Cart flow

**File:** `tests/GreenKart-storefront.spec.ts`

**Steps:**
  1. Add a single product to the cart
    - expect: The cart count increases and the selected product appears in the cart.
  2. Add multiple different products to the cart
    - expect: All chosen items are listed and the subtotal updates correctly.
  3. Increase and decrease the quantity of an item
    - expect: The quantity changes and totals are recalculated accurately.
  4. Remove a product from the cart
    - expect: The item disappears from the cart and the total is updated.
  5. Empty the cart completely
    - expect: The cart becomes empty and no stale totals or items remain.
  6. Refresh the page or navigate away and back during cart activity
    - expect: The cart state remains consistent without broken totals or missing items.

#### 1.3. Checkout readiness

**File:** `tests/GreenKart-storefront.spec.ts`

**Steps:**
  1. Proceed from the cart to checkout
    - expect: The checkout flow opens and the user is guided into the ordering process.
  2. Submit checkout with blank or incomplete required fields
    - expect: Validation messages appear and the order is not placed.
  3. Enter valid customer information and place the order
    - expect: A success confirmation message or order confirmation page appears.
  4. Try invalid values such as missing name, invalid email, or incomplete contact details
    - expect: The app prevents submission and shows clear validation feedback.
  5. Verify the post-order experience
    - expect: The user can review confirmation details and return to shopping smoothly.

#### 1.4. Negative and edge cases

**File:** `tests/GreenKart-storefront.spec.ts`

**Steps:**
  1. Attempt checkout with an empty cart
    - expect: The app blocks checkout or shows a clear message that no products are selected.
  2. Rapidly click Add to Cart multiple times for the same product
    - expect: The quantity increases correctly and the cart remains consistent.
  3. Search using spaces, special characters, or an item that does not exist
    - expect: The application handles the input gracefully and shows an appropriate result state.
  4. Use browser back, forward, and refresh during browsing and checkout
    - expect: The application remains stable and does not lose core functionality unexpectedly.
