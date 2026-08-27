import {
  test,
  expect,
} from '../../fixtures/testFixtures';

import { products } from '../../data/products';

test.describe('Cart Module', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test(
    'TC-CART-001: user should add a product to cart',
    {
      tag: ['@smoke', '@cart'],
    },
    async ({ inventoryPage }) => {
      await inventoryPage.addProductToCart(
        products.backpack.name
      );

      await inventoryPage.verifyCartBadge('1');
    }
  );

  test(
    'TC-CART-002: user should add multiple products to cart',
    {
      tag: ['@regression', '@cart'],
    },
    async ({ inventoryPage }) => {
      await inventoryPage.addProductToCart(
        products.backpack.name
      );

      await inventoryPage.addProductToCart(
        products.bikeLight.name
      );

      await inventoryPage.verifyCartBadge('2');
    }
  );

  test(
    'TC-CART-003: added product should appear in cart',
    {
      tag: ['@smoke', '@cart'],
    },
    async ({
      inventoryPage,
      cartPage,
    }) => {
      await inventoryPage.addProductToCart(
        products.backpack.name
      );

      await inventoryPage.openCart();

      await cartPage.verifyCartPage();

      await cartPage.verifyProductInCart(
        products.backpack.name
      );
    }
  );

  test(
    'TC-CART-004: product price should be correct in cart',
    {
      tag: ['@regression', '@cart'],
    },
    async ({
      inventoryPage,
      cartPage,
    }) => {
      await inventoryPage.addProductToCart(
        products.backpack.name
      );

      await inventoryPage.openCart();

      await cartPage.verifyProductPrice(
        products.backpack.name,
        products.backpack.price
      );
    }
  );

  test(
    'TC-CART-005: multiple cart items should be displayed',
    {
      tag: ['@regression', '@cart'],
    },
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

      const itemCount =
        await cartPage.getCartItemCount();

      expect(itemCount).toBe(2);
    }
  );

  test(
    'TC-CART-006: user should remove product from cart',
    {
      tag: ['@regression', '@cart'],
    },
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

      await cartPage.verifyProductNotInCart(
        products.backpack.name
      );
    }
  );

  test(
    'TC-CART-007: cart badge should update after removing product',
    {
      tag: ['@regression', '@cart'],
    },
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

      await inventoryPage.verifyCartBadge('2');

      await inventoryPage.openCart();

      await cartPage.removeProduct(
        products.backpack.name
      );

      await inventoryPage.verifyCartBadge('1');
    }
  );

  test(
    'TC-CART-008: cart badge should disappear when cart becomes empty',
    {
      tag: ['@regression', '@cart'],
    },
    async ({ inventoryPage }) => {
      await inventoryPage.addProductToCart(
        products.backpack.name
      );

      await inventoryPage.removeProductFromInventory(
        products.backpack.name
      );

      await inventoryPage.verifyCartBadgeIsHidden();
    }
  );

  test(
    'TC-CART-009: user should continue shopping from cart',
    {
      tag: ['@regression', '@cart'],
    },
    async ({
      inventoryPage,
      cartPage,
    }) => {
      await inventoryPage.addProductToCart(
        products.backpack.name
      );

      await inventoryPage.openCart();

      await cartPage.continueShopping();

      await inventoryPage.verifyInventoryPage();
    }
  );

  test(
    'TC-CART-010: empty cart should contain no products',
    {
      tag: [
        '@regression',
        '@negative',
        '@cart',
      ],
    },
    async ({
      inventoryPage,
      cartPage,
    }) => {
      await inventoryPage.openCart();

      const itemCount =
        await cartPage.getCartItemCount();

      expect(itemCount).toBe(0);
    }
  );
});