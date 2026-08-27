import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;

  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productName = page.locator(
      '[data-test="inventory-item-name"]'
    );

    this.productDescription = page.locator(
      '[data-test="inventory-item-desc"]'
    );

    this.productPrice = page.locator(
      '[data-test="inventory-item-price"]'
    );

    this.addToCartButton = page.getByRole('button', {
      name: 'Add to cart',
    });

    this.backToProductsButton = page.getByRole('button', {
      name: 'Back to products',
    });
  }

  async verifyProductName(
    expectedName: string
  ): Promise<void> {
    await expect(
      this.productName
    ).toHaveText(expectedName);
  }

  async verifyProductPrice(
    expectedPrice: string
  ): Promise<void> {
    await expect(
      this.productPrice
    ).toHaveText(expectedPrice);
  }

  async verifyProductDescriptionIsVisible(): Promise<void> {
    await expect(
      this.productDescription
    ).toBeVisible();
  }

  async goBackToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }
}