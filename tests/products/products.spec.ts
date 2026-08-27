import {
  test,
  expect,
} from '../../fixtures/testFixtures';

import { ProductDetailsPage } from '../../pages/ProductDetailsPage';
import { products } from '../../data/products';

test.describe('Product Module', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test(
    'TC-PRODUCT-001: product list should be visible',
    {
      tag: ['@smoke', '@product'],
    },
    async ({ inventoryPage }) => {
      await expect(
        inventoryPage.inventoryItems.first()
      ).toBeVisible();
    }
  );

  test(
    'TC-PRODUCT-002: product count should be correct',
    {
      tag: ['@regression', '@product'],
    },
    async ({ inventoryPage }) => {
      const count =
        await inventoryPage.getProductCount();

      expect(count).toBe(6);
    }
  );

  test(
    'TC-PRODUCT-003: backpack product should be visible',
    {
      tag: ['@regression', '@product'],
    },
    async ({ inventoryPage }) => {
      await inventoryPage.verifyProductExists(
        products.backpack.name
      );
    }
  );

  test(
    'TC-PRODUCT-004: backpack price should be correct',
    {
      tag: ['@regression', '@product'],
    },
    async ({ inventoryPage }) => {
      const productCard =
        inventoryPage.inventoryItems.filter({
          hasText: products.backpack.name,
        });

      await expect(
        productCard.locator(
          '[data-test="inventory-item-price"]'
        )
      ).toHaveText(
        products.backpack.price
      );
    }
  );

  test(
    'TC-PRODUCT-005: products should sort price low to high',
    {
      tag: ['@regression', '@product'],
    },
    async ({ inventoryPage }) => {
      await inventoryPage.sortProducts(
        'lohi'
      );

      const prices =
        await inventoryPage.getProductPrices();

      const numericPrices =
        prices.map(price =>
          Number(
            price.replace('$', '')
          )
        );

      const expectedPrices =
        [...numericPrices].sort(
          (a, b) => a - b
        );

      expect(
        numericPrices
      ).toEqual(
        expectedPrices
      );
    }
  );

  test(
    'TC-PRODUCT-006: products should sort price high to low',
    {
      tag: ['@regression', '@product'],
    },
    async ({ inventoryPage }) => {
      await inventoryPage.sortProducts(
        'hilo'
      );

      const prices =
        await inventoryPage.getProductPrices();

      const numericPrices =
        prices.map(price =>
          Number(
            price.replace('$', '')
          )
        );

      const expectedPrices =
        [...numericPrices].sort(
          (a, b) => b - a
        );

      expect(
        numericPrices
      ).toEqual(
        expectedPrices
      );
    }
  );

  test(
    'TC-PRODUCT-007: products should sort name A to Z',
    {
      tag: ['@regression', '@product'],
    },
    async ({ inventoryPage }) => {
      await inventoryPage.sortProducts(
        'az'
      );

      const names =
        await inventoryPage.getProductNames();

      const expectedNames =
        [...names].sort(
          (a, b) =>
            a.localeCompare(b)
        );

      expect(
        names
      ).toEqual(
        expectedNames
      );
    }
  );

  test(
    'TC-PRODUCT-008: products should sort name Z to A',
    {
      tag: ['@regression', '@product'],
    },
    async ({ inventoryPage }) => {
      await inventoryPage.sortProducts(
        'za'
      );

      const names =
        await inventoryPage.getProductNames();

      const expectedNames =
        [...names].sort(
          (a, b) =>
            b.localeCompare(a)
        );

      expect(
        names
      ).toEqual(
        expectedNames
      );
    }
  );

  test(
    'TC-PRODUCT-009: user should open product details page',
    {
      tag: ['@regression', '@product'],
    },
    async ({
      page,
      inventoryPage,
    }) => {
      const productDetailsPage =
        new ProductDetailsPage(page);

      await inventoryPage.openProduct(
        products.backpack.name
      );

      await productDetailsPage.verifyProductName(
        products.backpack.name
      );
    }
  );

  test(
    'TC-PRODUCT-010: product details should be correct',
    {
      tag: ['@regression', '@product'],
    },
    async ({
      page,
      inventoryPage,
    }) => {
      const productDetailsPage =
        new ProductDetailsPage(page);

      await inventoryPage.openProduct(
        products.backpack.name
      );

      await productDetailsPage.verifyProductName(
        products.backpack.name
      );

      await productDetailsPage.verifyProductPrice(
        products.backpack.price
      );

      await productDetailsPage
        .verifyProductDescriptionIsVisible();
    }
  );
});