import {
  test as setup,
  expect,
} from '@playwright/test';

import fs from 'fs';

import { LoginPage } from '../../pages/LoginPage';
import { users } from '../../data/users';

const authFile = 'auth/user.json';

setup(
  'authenticate standard user',
  async ({ page }) => {
    fs.mkdirSync('auth', {
      recursive: true,
    });

    const loginPage =
      new LoginPage(page);

    await loginPage.open();

    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await expect(page).toHaveURL(
      /inventory/
    );

    await expect(
      page.locator(
        '[data-test="inventory-list"]'
      )
    ).toBeVisible();

    const cookies =
      await page.context().cookies();

    console.log(
      'Authenticated cookies:',
      cookies.map(cookie => ({
        name: cookie.name,
        value: cookie.value,
      }))
    );

    await page.context().storageState({
      path: authFile,
    });

    if (!fs.existsSync(authFile)) {
      throw new Error(
        'Authentication state file was not created.'
      );
    }
  }
);