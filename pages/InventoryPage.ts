import {
    Page,
    Locator,
    expect,
  } from '@playwright/test';
  
  export class InventoryPage {
    readonly page: Page;
  
    readonly pageTitle: Locator;
  
    readonly inventoryItems: Locator;
    readonly inventoryItemNames: Locator;
    readonly inventoryItemPrices: Locator;
  
    readonly sortDropdown: Locator;
  
    readonly cartLink: Locator;
    readonly cartBadge: Locator;
  
    readonly menuButton: Locator;
    readonly logoutLink: Locator;
  
    constructor(page: Page) {
      this.page = page;
  
      this.pageTitle = page.locator(
        '[data-test="title"]'
      );
  
      // Use stable SauceDemo inventory classes
      this.inventoryItems = page.locator(
        '.inventory_item'
      );
  
      this.inventoryItemNames = page.locator(
        '.inventory_item_name'
      );
  
      this.inventoryItemPrices = page.locator(
        '.inventory_item_price'
      );
  
      this.sortDropdown = page.locator(
        '[data-test="product-sort-container"]'
      );
  
      this.cartLink = page.locator(
        '[data-test="shopping-cart-link"]'
      );
  
      this.cartBadge = page.locator(
        '[data-test="shopping-cart-badge"]'
      );
  
      this.menuButton = page.getByRole(
        'button',
        {
          name: 'Open Menu',
        }
      );
  
      this.logoutLink = page.getByRole(
        'link',
        {
          name: 'Logout',
        }
      );
    }
  
    async verifyInventoryPage(): Promise<void> {
      await expect(
        this.page
      ).toHaveURL(
        /inventory/
      );
  
      await expect(
        this.pageTitle
      ).toHaveText(
        'Products'
      );
  
      await expect(
        this.inventoryItems.first()
      ).toBeVisible();
    }
  
    async getProductCount(): Promise<number> {
      return await this.inventoryItems.count();
    }
  
    async getProductNames(): Promise<string[]> {
      return await this.inventoryItemNames.allTextContents();
    }
  
    async getProductPrices(): Promise<string[]> {
      return await this.inventoryItemPrices.allTextContents();
    }
  
    async sortProducts(
      option: 'az' | 'za' | 'lohi' | 'hilo'
    ): Promise<void> {
      await this.sortDropdown.selectOption(option);
    }
  
    async verifyProductExists(
      productName: string
    ): Promise<void> {
      const product =
        this.inventoryItemNames.filter({
          hasText: productName,
        });
  
      await expect(
        product
      ).toBeVisible();
    }
  
    async openProduct(
      productName: string
    ): Promise<void> {
      await this.inventoryItemNames
        .filter({
          hasText: productName,
        })
        .click();
    }
  
    async getProductCard(
      productName: string
    ): Promise<Locator> {
      const productCard =
        this.inventoryItems.filter({
          has: this.page
            .locator('.inventory_item_name')
            .filter({
              hasText: productName,
            }),
        });
  
      await expect(
        productCard
      ).toBeVisible();
  
      return productCard;
    }
  
    async addProductToCart(
      productName: string
    ): Promise<void> {
      const productCard =
        await this.getProductCard(
          productName
        );
  
      await productCard
        .getByRole(
          'button',
          {
            name: 'Add to cart',
          }
        )
        .click();
    }
  
    async removeProductFromInventory(
      productName: string
    ): Promise<void> {
      const productCard =
        await this.getProductCard(
          productName
        );
  
      await productCard
        .getByRole(
          'button',
          {
            name: 'Remove',
          }
        )
        .click();
    }
  
    async openCart(): Promise<void> {
      await this.cartLink.click();
    }
  
    async verifyCartBadge(
      expectedCount: string
    ): Promise<void> {
      await expect(
        this.cartBadge
      ).toHaveText(
        expectedCount
      );
    }
  
    async verifyCartBadgeIsHidden(): Promise<void> {
      await expect(
        this.cartBadge
      ).toBeHidden();
    }
  
    async logout(): Promise<void> {
      await this.menuButton.click();
  
      await this.logoutLink.click();
    }
  }