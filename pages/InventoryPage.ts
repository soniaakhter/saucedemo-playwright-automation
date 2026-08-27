import { Page, Locator, expect } from '@playwright/test';

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

        this.pageTitle = page.locator('[data-test="title"]');

        this.inventoryItems = page.locator(
            '[data-test="inventory-item"]'
        );

        this.inventoryItemNames = page.locator(
            '[data-test="inventory-item-name"]'
        );

        this.inventoryItemPrices = page.locator(
            '[data-test="inventory-item-price"]'
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

        this.menuButton = page.getByRole('button', {
            name: 'Open Menu',
        });

        this.logoutLink = page.getByRole('link', {
            name: 'Logout',
        });
    }

    async verifyInventoryPage(): Promise<void> {
        await expect(this.page).toHaveURL(/inventory/);

        await expect(
            this.pageTitle
        ).toHaveText('Products');
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

    async openProduct(productName: string): Promise<void> {
        await this.page
            .getByText(productName, { exact: true })
            .click();
    }

    async verifyProductExists(
        productName: string
    ): Promise<void> {
        await expect(
            this.page.getByText(productName, { exact: true })
        ).toBeVisible();
    }
    async addProductToCart(productName: string): Promise<void> {
        const productCard = this.inventoryItems.filter({
            hasText: productName,
        });

        await productCard
            .getByRole('button', { name: 'Add to cart' })
            .click();
    }

    async removeProductFromInventory(
        productName: string
    ): Promise<void> {
        const productCard = this.inventoryItems.filter({
            hasText: productName,
        });

        await productCard
            .getByRole('button', { name: 'Remove' })
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
        ).toHaveText(expectedCount);
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