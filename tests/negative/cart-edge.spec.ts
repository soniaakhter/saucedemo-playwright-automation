import {
  test,
  expect,
} from '../../fixtures/testFixtures';

import { products } from '../../data/products';

test.describe('Cart Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test(
    'TC-CART-EDGE-001: empty cart should have zero items',
    async ({
      inventoryPage,
      cartPage,
    }) => {
      await inventoryPage.openCart();

      const count =
        await cartPage.getCartItemCount();

      expect(count).toBe(0);
    }
  );

  test(
    'TC-CART-EDGE-002: removing only product should make cart empty',
    async ({
      inventoryPage,
      cartPage,
    }) => {
      await inventoryPage.addProductToCart(
        products.backpack.name
      );

      await inventoryPage.openCart();

      await cartPage.removeProduct(
        products.backpack.name
      );

      expect(
        await cartPage.getCartItemCount()
      ).toBe(0);
    }
  );

  test(
    'TC-CART-EDGE-003: removing one of two products should keep the other',
    async ({
      inventoryPage,
      cartPage,
    }) => {
      await inventoryPage.addProductToCart(
        products.backpack.name
      );

      await inventoryPage.addProductToCart(
        products.bikeLight.name
      );

      await inventoryPage.openCart();

      await cartPage.removeProduct(
        products.backpack.name
      );

      await cartPage.verifyProductNotInCart(
        products.backpack.name
      );

      await cartPage.verifyProductInCart(
        products.bikeLight.name
      );

      expect(
        await cartPage.getCartItemCount()
      ).toBe(1);
    }
  );
});