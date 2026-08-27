# SauceDemo Playwright Automation Framework

A professional end-to-end test automation framework built with Playwright and TypeScript for the SauceDemo e-commerce application.

## Project URL

https://www.saucedemo.com/

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model
- Custom Fixtures
- Storage State Authentication
- Environment Variables
- GitHub Actions
- HTML Reporting

## Test Coverage

The framework currently covers:

### Authentication
- Valid login
- Invalid credentials
- Empty username
- Empty password
- Locked-out user
- Performance glitch user

### Products
- Product list validation
- Product count validation
- Product name validation
- Product price validation
- Price sorting
- Name sorting
- Product details validation

### Cart
- Add product to cart
- Add multiple products
- Cart badge validation
- Product validation in cart
- Price validation
- Remove product
- Continue shopping
- Empty cart validation

### Checkout
- Proceed to checkout
- Customer information
- Required field validation
- Checkout overview
- Subtotal validation
- Tax validation
- Total calculation
- Complete order
- Order confirmation

### Edge Cases
- Invalid login scenarios
- Locked-out user
- Problem user
- Performance glitch user
- Empty cart
- Checkout field validation

---

## Framework Architecture

```text
saucedemo-playwright-automation/
│
├── auth/
│   └── user.json
│
├── config/
│   └── env.ts
│
├── constants/
│   └── messages.ts
│
├── data/
│   ├── checkoutData.ts
│   ├── products.ts
│   └── users.ts
│
├── fixtures/
│   └── testFixtures.ts
│
├── pages/
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── InventoryPage.ts
│   ├── LoginPage.ts
│   └── ProductDetailsPage.ts
│
├── tests/
│   ├── auth/
│   │   ├── login.spec.ts
│   │   └── setup.auth.ts
│   │
│   ├── cart/
│   │   └── cart.spec.ts
│   │
│   ├── checkout/
│   │   └── checkout.spec.ts
│   │
│   ├── negative/
│   │   ├── cart-edge.spec.ts
│   │   ├── checkout-edge.spec.ts
│   │   ├── login-negative.spec.ts
│   │   ├── performance-user.spec.ts
│   │   └── problem-user.spec.ts
│   │
│   └── products/
│       └── products.spec.ts
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
└── README.md
