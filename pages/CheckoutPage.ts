import {
  Page,
  Locator,
  expect,
} from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;

  readonly continueButton: Locator;

  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  readonly finishButton: Locator;

  readonly completeHeader: Locator;
  readonly completeText: Locator;

  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput =
      page.getByPlaceholder(
        'First Name'
      );

    this.lastNameInput =
      page.getByPlaceholder(
        'Last Name'
      );

    this.postalCodeInput =
      page.getByPlaceholder(
        'Zip/Postal Code'
      );

    this.continueButton =
      page.getByRole(
        'button',
        {
          name: 'Continue',
        }
      );

    this.subtotalLabel =
      page.locator(
        '[data-test="subtotal-label"]'
      );

    this.taxLabel =
      page.locator(
        '[data-test="tax-label"]'
      );

    this.totalLabel =
      page.locator(
        '[data-test="total-label"]'
      );

    this.finishButton =
      page.getByRole(
        'button',
        {
          name: 'Finish',
        }
      );

    this.completeHeader =
      page.locator(
        '[data-test="complete-header"]'
      );

    this.completeText =
      page.locator(
        '[data-test="complete-text"]'
      );

    this.errorMessage =
      page.locator(
        '[data-test="error"]'
      );
  }

  async enterCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.firstNameInput.fill(
      firstName
    );

    await this.lastNameInput.fill(
      lastName
    );

    await this.postalCodeInput.fill(
      postalCode
    );
  }

  async continueCheckout(): Promise<void> {
    await this.continueButton.click();
  }

  async verifyOverviewPage(): Promise<void> {
    await expect(
      this.page
    ).toHaveURL(
      /checkout-step-two/
    );
  }

  async getSubtotal(): Promise<number> {
    const subtotalText =
      await this.subtotalLabel.textContent();

    return Number(
      subtotalText?.replace(
        'Item total: $',
        ''
      )
    );
  }

  async getTax(): Promise<number> {
    const taxText =
      await this.taxLabel.textContent();

    return Number(
      taxText?.replace(
        'Tax: $',
        ''
      )
    );
  }

  async getTotal(): Promise<number> {
    const totalText =
      await this.totalLabel.textContent();

    return Number(
      totalText?.replace(
        'Total: $',
        ''
      )
    );
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  async verifyOrderSuccess(): Promise<void> {
    await expect(
      this.page
    ).toHaveURL(
      /checkout-complete/
    );

    await expect(
      this.completeHeader
    ).toHaveText(
      'Thank you for your order!'
    );

    await expect(
      this.completeText
    ).toBeVisible();
  }

  async verifyErrorMessage(
    expectedMessage: string
  ): Promise<void> {
    await expect(
      this.errorMessage
    ).toHaveText(
      expectedMessage
    );
  }
}