import {
  test,
  expect,
} from '../../fixtures/testFixtures';

import { users } from '../../data/users';

import {
  loginMessages,
} from '../../constants/messages';

test.describe('Negative Login Scenarios', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test(
    'TC-NEG-LOGIN-001: locked out user should not login',
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

  test(
    'TC-NEG-LOGIN-002: invalid credentials should show error',
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
    'TC-NEG-LOGIN-003: username should be required',
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
    'TC-NEG-LOGIN-004: password should be required',
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
    'TC-NEG-LOGIN-005: empty username and password should not login',
    {
      tag: [
        '@regression',
        '@negative',
        '@auth',
      ],
    },
    async ({
      page,
      loginPage,
    }) => {
      await loginPage.clickLogin();

      await loginPage.verifyErrorMessage(
        loginMessages.usernameRequired
      );

      await expect(page).not.toHaveURL(
        /inventory/
      );
    }
  );
});