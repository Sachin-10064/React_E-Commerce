import { test, expect } from '@playwright/test';

test('basic e-commerce flow', async ({ page }) => {
  // Visit the home page
  await page.goto('/');
  await expect(page).toHaveTitle(/ModernShop/);

  // Check if products are loaded
  await expect(page.locator('.grid')).toBeVisible();
  
  // Filter by category
  const firstCategoryButton = page.locator('button').first();
  await firstCategoryButton.click();
  
  // Visit a product detail page
  const firstProduct = page.locator('a[href^="/product/"]').first();
  await firstProduct.click();
  
  // Add to cart
  const addToCartButton = page.getByText('Add to Cart');
  await addToCartButton.click();
  
  // Check cart
  const cartIcon = page.getByText('1 items');
  await expect(cartIcon).toBeVisible();
  
  // Go to cart page
  await cartIcon.click();
  await expect(page.url()).toContain('/cart');
  
  // Verify cart has items
  await expect(page.getByText('Shopping Cart')).toBeVisible();
});