import {
  test,
  expect,
} from '../../fixtures/testFixtures';

import {
  checkoutMessages,
} from '../../constants/messages';

import {
  checkoutData,
} from '../../data/checkoutData';

test.describe('Checkout Edge Cases', () => {
  test.beforeEach(async ({
    page,
    inventoryPage,
  }) => {
    await page.goto('/inventory.html');

    await inventoryPage.openCart();
  });

  test(
    'TC-CHECKOUT-EDGE-001: user should be able to open checkout with empty cart',
    async ({
      page,
      cartPage,
    }) => {
      await cartPage.proceedToCheckout();

      await expect(page).toHaveURL(
        /checkout-step-one/
      );
    }
  );

  test(
    'TC-CHECKOUT-EDGE-002: empty customer information should show first name error',
    async ({
      cartPage,
      checkoutPage,
    }) => {
      await cartPage.proceedToCheckout();

      await checkoutPage.continueCheckout();

      await checkoutPage.verifyErrorMessage(
        checkoutMessages.firstNameRequired
      );
    }
  );

  test(
    'TC-CHECKOUT-EDGE-003: postal code should be required',
    async ({
      cartPage,
      checkoutPage,
    }) => {
      await cartPage.proceedToCheckout();

      await checkoutPage.enterCustomerInformation(
        checkoutData.validCustomer.firstName,
        checkoutData.validCustomer.lastName,
        ''
      );

      await checkoutPage.continueCheckout();

      await checkoutPage.verifyErrorMessage(
        checkoutMessages.postalCodeRequired
      );
    }
  );
});