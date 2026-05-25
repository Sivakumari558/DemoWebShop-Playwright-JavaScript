# Demo Web Shop Playwright Automation Framework

## Project Overview

This project is an automated testing framework developed for the Demo Web Shop application using Playwright with JavaScript following the Page Object Model (POM) design pattern.

The framework automates major end-to-end business flows such as login, product search, add to cart, checkout, order confirmation, cart validation, and shipping estimation.

---

# Tech Stack

- Playwright
- JavaScript
- Node.js
- Page Object Model (POM)
- Git & GitHub
- GitHub Actions CI/CD

---

# Application Under Test

Demo Web Shop Application:

https://demowebshop.tricentis.com/

---

# Framework Features

- End-to-End Automation Testing
- Page Object Model Architecture
- Reusable Page Classes
- Data-Driven Testing using JSON
- Cross Browser Execution
- HTML Reporting
- Screenshot Capture on Failure
- Trace & Video Retention
- GitHub Actions CI/CD Integration
- Explicit Wait Handling
- Modular & Scalable Framework

---

# Project Structure

```text
DemoWebShopFramework/
│
├── DemoWebShop_Pages/
│   ├── HomePage.js 
|   ├── RegisterPage.js
|   ├── LoginPage.js
│   ├── ShoppingCartPage.js
│   ├── CheckoutPage.js
│   └── ThankYouPage.js
│
├── tests/
|   ├── HomePageTest.spec.js 
|   ├── RegisterPageTest.spec.js
│   ├── LoginPageTest.spec.js
│   ├── ShoppingCartPageTest.spec.js
│   ├── CheckoutPageTest.spec.js
|   ├── ThankyouPage.spec.js
│   └── DemoWebShop_E2E_Tests.spec.js
│
├── testData/
│   └── testdata.json
│
├── playwright.config.js
├── package.json
├── .gitignore
└── README.md
```

---

# Test Scenarios Covered

## Login Module
- Valid Login
- Invalid Login Validation
- Logout Validation

## Product Module
- Search Product
- Select Product
- Add Product To Cart

## Shopping Cart Module
- Verify Cart Count
- Remove Product From Cart
- Estimate Shipping
- Update Cart Validation

## Checkout Module
- Complete Checkout Flow
- Billing Address Validation
- Shipping Method Validation
- Payment Method Validation
- Order Confirmation Validation

## End-to-End Scenarios
- Login → Add Product → Checkout → Order Success
- Search Product → Add To Cart → Checkout
- Add Product → Remove Product From Cart
- Continue Shopping After Order Placement

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

## Install Dependencies

```bash
npm install
```

## Install Playwright Browsers

```bash
npx playwright install
```

---

# Run Tests

## Run All Tests

```bash
npx playwright test
```

## Run Specific Test File

```bash
npx playwright test tests/DemoWebShopE2ECheckout.spec.js
```

## Run Tests in Headed Mode

```bash
npx playwright test --headed
```

## Run Tests in Specific Browser

```bash
npx playwright test --project=chromium
```

---

# Reporting

This framework supports:

- HTML Reports
- Screenshots on Failure
- Trace Viewer
- Video Recording for Failed Tests

## Open HTML Report

```bash
npx playwright show-report
```

---

# CI/CD Integration

GitHub Actions CI/CD pipeline is configured to:

- Trigger test execution on code push
- Trigger execution on pull requests
- Generate Playwright reports automatically
- Upload execution artifacts

Workflow File Location:

```text
.github/workflows/playwright.yml
```

---

# Design Pattern Used

## Page Object Model (POM)

The framework follows the Page Object Model design pattern where:
- Each application page has a separate class
- Locators and methods are centralized
- Reusability and maintainability are improved

---

# Author

Sivakumari Yarram

Automation Test Engineer | Playwright | JavaScript | QA Automation

---