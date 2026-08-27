import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.locator(
      '[data-test="title"]'
    );

    this.cartItems = page.locator(
      '[data-test="inventory-item"]'
    );

    this.itemNames = page.locator(
      '[data-test="inventory-item-name"]'
    );

    this.itemPrices = page.locator(
      '[data-test="inventory-item-price"]'
    );

    this.continueShoppingButton = page.getByRole(
      'button',
      { name: 'Continue Shopping' }
    );

    this.checkoutButton = page.getByRole(
      'button',
      { name: 'Checkout' }
    );
  }

  async verifyCartPage(): Promise<void> {
    await expect(
      this.page
    ).toHaveURL(/cart/);

    await expect(
      this.pageTitle
    ).toHaveText('Your Cart');
  }

  async verifyProductInCart(
    productName: string
  ): Promise<void> {
    await expect(
      this.page.getByText(productName, {
        exact: true,
      })
    ).toBeVisible();
  }

  async verifyProductPrice(
    productName: string,
    expectedPrice: string
  ): Promise<void> {
    const productCard = this.cartItems.filter({
      hasText: productName,
    });

    await expect(
      productCard.locator(
        '[data-test="inventory-item-price"]'
      )
    ).toHaveText(expectedPrice);
  }

  async removeProduct(
    productName: string
  ): Promise<void> {
    const productCard = this.cartItems.filter({
      hasText: productName,
    });

    await productCard
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async verifyProductNotInCart(
    productName: string
  ): Promise<void> {
    await expect(
      this.page.getByText(productName, {
        exact: true,
      })
    ).toBeHidden();
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}