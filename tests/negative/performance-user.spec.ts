import {
  test,
  expect,
} from '../../fixtures/testFixtures';

import { users } from '../../data/users';

test.describe('Performance Glitch User', () => {
  test(
    'TC-PERF-001: performance glitch user should eventually login',
    {
      tag: [
        '@regression',
        '@performance',
        '@auth',
      ],
    },
    async ({
      page,
      loginPage,
      inventoryPage,
    }) => {
      await loginPage.open();

      await loginPage.login(
        users.performanceGlitch.username,
        users.performanceGlitch.password
      );

      await expect(page).toHaveURL(
        /inventory/,
        {
          timeout: 15_000,
        }
      );

      await inventoryPage.verifyInventoryPage();
    }
  );
});