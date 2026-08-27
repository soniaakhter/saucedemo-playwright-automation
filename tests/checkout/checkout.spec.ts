import {
  test,
  expect,
} from '../../fixtures/testFixtures';

import { products } from '../../data/products';
import {
  checkoutData,
} from '../../data/checkoutData';

import {
  checkoutMessages,
} from '../../constants/messages';

test.describe('Checkout Module', () => {
  test.beforeEach(
    async ({
      page,
      inventoryPage,
    }) => {
      await page.goto('/inventory.html');
      await inventoryPage
      .verifyInventoryPage();

      await inventoryPage.addProductToCart(
        products.backpack.name
      );

      await inventoryPage.openCart();
    }
  );

  test(
    'TC-CHECKOUT-001: user should proceed to checkout',
    {
      tag: ['@smoke', '@checkout'],
    },
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
    'TC-CHECKOUT-002: user should continue with valid customer information',
    {
      tag: ['@regression', '@checkout'],
    },
    async ({
      cartPage,
      checkoutPage,
    }) => {
      await cartPage.proceedToCheckout();

      await checkoutPage.enterCustomerInformation(
        checkoutData.validCustomer.firstName,
        checkoutData.validCustomer.lastName,
        checkoutData.validCustomer.postalCode
      );

      await checkoutPage.continueCheckout();

      await checkoutPage.verifyOverviewPage();
    }
  );

  test(
    'TC-CHECKOUT-003: checkout subtotal should match product price',
    {
      tag: ['@regression', '@checkout'],
    },
    async ({
      cartPage,
      checkoutPage,
    }) => {
      await cartPage.proceedToCheckout();

      await checkoutPage.enterCustomerInformation(
        checkoutData.validCustomer.firstName,
        checkoutData.validCustomer.lastName,
        checkoutData.validCustomer.postalCode
      );

      await checkoutPage.continueCheckout();

      const subtotal =
        await checkoutPage.getSubtotal();

      const expectedSubtotal =
        Number(
          products.backpack.price.replace(
            '$',
            ''
          )
        );

      expect(
        subtotal
      ).toBe(
        expectedSubtotal
      );
    }
  );

  test(
    'TC-CHECKOUT-004: total should equal subtotal plus tax',
    {
      tag: ['@regression', '@checkout'],
    },
    async ({
      cartPage,
      checkoutPage,
    }) => {
      await cartPage.proceedToCheckout();

      await checkoutPage.enterCustomerInformation(
        checkoutData.validCustomer.firstName,
        checkoutData.validCustomer.lastName,
        checkoutData.validCustomer.postalCode
      );

      await checkoutPage.continueCheckout();

      const subtotal =
        await checkoutPage.getSubtotal();

      const tax =
        await checkoutPage.getTax();

      const total =
        await checkoutPage.getTotal();

      expect(total).toBeCloseTo(
        subtotal + tax,
        2
      );
    }
  );

  test(
    'TC-CHECKOUT-005: user should complete order successfully',
    {
      tag: ['@smoke', '@checkout'],
    },
    async ({
      cartPage,
      checkoutPage,
    }) => {
      await cartPage.proceedToCheckout();

      await checkoutPage.enterCustomerInformation(
        checkoutData.validCustomer.firstName,
        checkoutData.validCustomer.lastName,
        checkoutData.validCustomer.postalCode
      );

      await checkoutPage.continueCheckout();

      await checkoutPage.verifyOverviewPage();

      await checkoutPage.finishOrder();

      await checkoutPage.verifyOrderSuccess();
    }
  );

  test(
    'TC-CHECKOUT-006: first name should be required',
    {
      tag: [
        '@regression',
        '@negative',
        '@checkout',
      ],
    },
    async ({
      cartPage,
      checkoutPage,
    }) => {
      await cartPage.proceedToCheckout();

      await checkoutPage.enterCustomerInformation(
        '',
        checkoutData.validCustomer.lastName,
        checkoutData.validCustomer.postalCode
      );

      await checkoutPage.continueCheckout();

      await checkoutPage.verifyErrorMessage(
        checkoutMessages.firstNameRequired
      );
    }
  );

  test(
    'TC-CHECKOUT-007: last name should be required',
    {
      tag: [
        '@regression',
        '@negative',
        '@checkout',
      ],
    },
    async ({
      cartPage,
      checkoutPage,
    }) => {
      await cartPage.proceedToCheckout();

      await checkoutPage.enterCustomerInformation(
        checkoutData.validCustomer.firstName,
        '',
        checkoutData.validCustomer.postalCode
      );

      await checkoutPage.continueCheckout();

      await checkoutPage.verifyErrorMessage(
        checkoutMessages.lastNameRequired
      );
    }
  );

  test(
    'TC-CHECKOUT-008: postal code should be required',
    {
      tag: [
        '@regression',
        '@negative',
        '@checkout',
      ],
    },
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