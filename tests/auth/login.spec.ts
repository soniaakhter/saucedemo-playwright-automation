import {
  test,
  expect,
} from '../../fixtures/testFixtures';

import { users } from '../../data/users';
import {
  loginMessages,
} from '../../constants/messages';

test.describe('Login Feature', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test(
    'TC-LOGIN-001: standard user should login successfully',
    {
      tag: ['@smoke', '@auth'],
    },
    async ({
      page,
      loginPage,
      inventoryPage,
    }) => {
      await loginPage.login(
        users.standard.username,
        users.standard.password
      );

      await inventoryPage.verifyInventoryPage();

      await expect(page).toHaveURL(/inventory/);
    }
  );

  test(
    'TC-LOGIN-002: invalid credentials should show error',
    {
      tag: [
        '@regression',
        '@negative',
        '@auth',
      ],
    },
    async ({ loginPage }) => {
      await loginPage.login(
        users.invalid.username,
        users.invalid.password
      );

      await loginPage.verifyErrorMessage(
        loginMessages.invalidCredentials
      );
    }
  );

  test(
    'TC-LOGIN-003: username should be required',
    {
      tag: [
        '@regression',
        '@negative',
        '@auth',
      ],
    },
    async ({ loginPage }) => {
      await loginPage.enterPassword(
        users.standard.password
      );

      await loginPage.clickLogin();

      await loginPage.verifyErrorMessage(
        loginMessages.usernameRequired
      );
    }
  );

  test(
    'TC-LOGIN-004: password should be required',
    {
      tag: [
        '@regression',
        '@negative',
        '@auth',
      ],
    },
    async ({ loginPage }) => {
      await loginPage.enterUsername(
        users.standard.username
      );

      await loginPage.clickLogin();

      await loginPage.verifyErrorMessage(
        loginMessages.passwordRequired
      );
    }
  );

  test(
    'TC-LOGIN-005: locked out user should not login',
    {
      tag: [
        '@regression',
        '@negative',
        '@auth',
      ],
    },
    async ({ loginPage }) => {
      await loginPage.login(
        users.lockedOut.username,
        users.lockedOut.password
      );

      await loginPage.verifyErrorMessage(
        loginMessages.lockedOut
      );
    }
  );
});