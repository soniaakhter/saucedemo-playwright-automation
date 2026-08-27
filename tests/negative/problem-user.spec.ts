import {
  test,
  expect,
} from '../../fixtures/testFixtures';

import { users } from '../../data/users';
import { products } from '../../data/products';

test.describe('Problem User Scenarios', () => {
  test.beforeEach(async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.open();

    await loginPage.login(
      users.problem.username,
      users.problem.password
    );

    await inventoryPage.verifyInventoryPage();
  });

  test(
    'TC-PROBLEM-001: problem user should reach inventory page',
    async ({ inventoryPage }) => {
      await inventoryPage.verifyInventoryPage();
    }
  );

  test(
    'TC-PROBLEM-002: problem user product list should still be visible',
    async ({ inventoryPage }) => {
      await expect(
        inventoryPage.inventoryItems.first()
      ).toBeVisible();
    }
  );

  test(
    'TC-PROBLEM-003: problem user should attempt add to cart',
    async ({ inventoryPage }) => {
      await inventoryPage.addProductToCart(
        products.backpack.name
      );

      await expect(
        inventoryPage.cartLink
      ).toBeVisible();
    }
  );
});