// const { test, expect } = require('@playwright/test');

// const { LoginPage } = require('../DemoWebShop_Pages/LoginPage');
// const { HomePage } = require('../DemoWebShop_Pages/HomePage');
// const { ShoppingCart } = require('../DemoWebShop_Pages/ShoppingCartPage');
// const { CheckoutPage } = require('../DemoWebShop_Pages/CheckoutPage');

// const testData = require('../testData/testdata.json');

// test.describe('Checkout Page Test Suite', () => {

//     test.describe.configure({
//         timeout: 120000,
//         mode: 'serial'
//     });

//     let loginPage;
//     let homePage;
//     let shoppingCart;
//     let checkoutPage;

//     test.beforeEach(async ({ page }) => {

//         loginPage = new LoginPage(page);
//         homePage = new HomePage(page);
//         shoppingCart = new ShoppingCart(page);
//         checkoutPage = new CheckoutPage(page);

//         // Open login page
//         await loginPage.goToPage();

//         // Login
//         await loginPage.validLogin(
//             testData.validUser.email,
//             testData.validUser.password
//         );

//         // Wait for homepage
//         await page.waitForLoadState('domcontentloaded');

//         // Clear cart
//         //await shoppingCart.clearCartIfNotEmpty();

//         // Navigate to product
//         await homePage.selectMenu('Computers');

//         await homePage.selectMenu('Desktops');

//         // Select product
//         await homePage.selectProduct(
//             testData.PRODUCT_NAME
//         );

//         // Add to cart
//         await shoppingCart.addProductToCart();

//         // Open shopping cart
//         await homePage.openShoppingCart();

//         // Checkout
//         await shoppingCart.checkOut();
//     });

//     // ============================================
//     // Verify Checkout Page Loaded
//     // ============================================

//     test('Verify user navigates to checkout page', async ({ page }) => {

//         await expect(page)
//             .toHaveURL(/.*onepagecheckout/);
//     });

//     // ============================================
//     // Verify Billing Address Step
//     // ============================================

//     test('Verify billing address step completed', async ({ page }) => {

//         await checkoutPage.fillBillingAddress(
//             testData.checkoutAddress
//         );

//         await expect(page)
//             .toHaveURL(/.*onepagecheckout/);
//     });

//     // ============================================
//     // Verify Shipping Address Step
//     // ============================================

//     test('Verify shipping address step completed', async ({ page }) => {

//         await checkoutPage.fillBillingAddress(
//             testData.checkoutAddress
//         );

//         await checkoutPage.continueShippingAddress();

//         await expect(page)
//             .toHaveURL(/.*onepagecheckout/);
//     });

//     // ============================================
//     // Verify Shipping Method Step
//     // ============================================

//     test('Verify shipping method step completed', async ({ page }) => {

//         await checkoutPage.fillBillingAddress(
//             testData.checkoutAddress
//         );

//         await checkoutPage.continueShippingAddress();

//         await checkoutPage.selectShippingMethod();

//         await expect(page)
//             .toHaveURL(/.*onepagecheckout/);
//     });

//     // ============================================
//     // Verify Payment Method Step
//     // ============================================

//     test('Verify payment method step completed', async ({ page }) => {

//         await checkoutPage.fillBillingAddress(
//             testData.checkoutAddress
//         );

//         await checkoutPage.continueShippingAddress();

//         await checkoutPage.selectShippingMethod();

//         await checkoutPage.selectPaymentMethod();

//         await expect(page)
//             .toHaveURL(/.*onepagecheckout/);
//     });

//     // ============================================
//     // Verify Payment Information Step
//     // ============================================

//     test('Verify payment information step completed', async ({ page }) => {

//         await checkoutPage.fillBillingAddress(
//             testData.checkoutAddress
//         );

//         await checkoutPage.continueShippingAddress();

//         await checkoutPage.selectShippingMethod();

//         await checkoutPage.selectPaymentMethod();

//         await checkoutPage.continuePaymentInfo();

//         await expect(page)
//             .toHaveURL(/.*onepagecheckout/);
//     });

//     // ============================================
//     // Verify Complete Checkout
//     // ============================================

//     test('Verify user can complete checkout successfully', async ({ page }) => {

//         await checkoutPage.completeCheckout(
//             testData.checkoutAddress
//         );

//         // Verify completed URL
//         await expect(page)
//             .toHaveURL(/.*checkout\/completed/);

//         // Verify success message
//         await expect(
//             checkoutPage.orderSuccessMessage
//         ).toContainText(
//             'Your order has been successfully processed!'
//         );
//     });

//     // ============================================
//     // Verify Order Placement
//     // ============================================

//     test('Verify order placed successfully', async ({ page }) => {

//         await checkoutPage.completeCheckout(
//             testData.checkoutAddress
//         );

//         // Verify completed page
//         await expect(page)
//             .toHaveURL(/.*checkout\/completed/);

//         // Get order details
//         const result =
//             await checkoutPage.getOrderNumber();

//         console.log(result);

//         // Verify success message
//         await expect(
//             checkoutPage.orderSuccessMessage
//         ).toContainText(
//             'Your order has been successfully processed!'
//         );
//     });

//     // ============================================
//     // Verify Success Message
//     // ============================================

//     test('Verify success message displayed after order placement', async ({ page }) => {

//         await checkoutPage.completeCheckout(
//             testData.checkoutAddress
//         );

//         // Verify success page
//         await expect(page)
//             .toHaveURL(/.*checkout\/completed/);

//         // Verify success message
//         await expect(
//             checkoutPage.orderSuccessMessage
//         ).toContainText(
//             'Your order has been successfully processed!'
//         );
//     });

// });
// test.afterEach(async ({ page }) => {

//     try {

//         // Stop pending loads
//         await page.evaluate(() => window.stop());

//     } catch (e) {

//         console.log('Cleanup skipped');
//     }
// });




// const { test, expect } = require('@playwright/test');
// const { LoginPage } = require('../DemoWebShop_Pages/LoginPage');
// const { HomePage } = require('../DemoWebShop_Pages/HomePage');
// const { ShoppingCart } = require('../DemoWebShop_Pages/ShoppingCartPage');
// const { CheckoutPage } = require('../DemoWebShop_Pages/CheckoutPage');

// const testData = require('../testData/testdata.json');

// test.setTimeout(120000);
// test.describe('Checkout Page Test Suite', () => {

//      test.describe.configure({
//         timeout: 120000
//     });
//     let loginPage;
//     let homePage;
//     let shoppingCart;
//     let checkoutPage;

//     test.beforeEach(async ({ page }) => {

//         loginPage = new LoginPage(page);
//         homePage = new HomePage(page);
//         shoppingCart = new ShoppingCart(page);
//         checkoutPage = new CheckoutPage(page);

//         // Open Login Page
//         await loginPage.goToPage();

//         // Login
//         await loginPage.validLogin(
//             testData.validUser.email,
//             testData.validUser.password
//         );

//          //await shoppingCart.clearCartIfNotEmpty();

//         // // Open Computers Menu
//         // await homePage.selectMenu('Computers');

//         // // Select Product
//         // await homePage.selectProduct(
//         //     testData.PRODUCT_NAME
//         // );

//         await homePage.selectMenu('Computers');

// await homePage.selectMenu('Desktops');

// await homePage.selectProduct(
//     testData.PRODUCT_NAME
// );
//         // Add Product To Cart
//         await shoppingCart.addProductToCart();

//         // Open Shopping Cart
//         await homePage.openShoppingCart();

//         // Checkout
//         await shoppingCart.checkOut();
//     });

//     // ==============================
//     // Verify Billing Address Page
//     // ==============================
//     test('Verify user can fill billing address', async () => {

//         await checkoutPage.fillBillingAddress(
//             testData.checkoutAddress
//         );

//         await expect(
//             checkoutPage.shippingAddressContinueBtn
//         ).toBeVisible();
//     });

//     // ==============================
//     // Verify Shipping Address Step
//     // ==============================
//     test('Verify user can continue shipping address step', async () => {

//         await checkoutPage.fillBillingAddress(
//             testData.checkoutAddress
//         );

//         await checkoutPage.continueShippingAddress();

//         await expect(
//             checkoutPage.shippingMethodContinueBtn
//         ).toBeVisible();
//     });

//     // ==============================
//     // Verify Shipping Method
//     // ==============================
//     test('Verify user can select shipping method', async () => {

//         await checkoutPage.fillBillingAddress(
//             testData.checkoutAddress
//         );

//         await checkoutPage.continueShippingAddress();

//         await checkoutPage.selectShippingMethod();

//         await expect(
//             checkoutPage.paymentMethodContinueBtn
//         ).toBeVisible();
//     });

//     // ==============================
//     // Verify Payment Method
//     // ==============================
//     test('Verify user can select payment method', async () => {

//         await checkoutPage.fillBillingAddress(
//             testData.checkoutAddress
//         );

//         await checkoutPage.continueShippingAddress();

//         await checkoutPage.selectShippingMethod();

//         await checkoutPage.selectPaymentMethod();

//         await expect(
//             checkoutPage.paymentInfoContinueBtn
//         ).toBeVisible();
//     });

//     // ==============================
//     // Verify Payment Information
//     // ==============================
//     test('Verify user can continue payment information step', async () => {

//         await checkoutPage.fillBillingAddress(
//             testData.checkoutAddress
//         );

//         await checkoutPage.continueShippingAddress();

//         await checkoutPage.selectShippingMethod();

//         await checkoutPage.selectPaymentMethod();

//         await checkoutPage.continuePaymentInfo();

//         await expect(
//             checkoutPage.confirmOrderBtn
//         ).toBeVisible();
//     });

//     // ==============================
//     // Verify Complete Checkout
//     // ==============================
//     test('Verify user can complete checkout successfully', async () => {

//         await checkoutPage.completeCheckout(
//             testData.checkoutAddress
//         );

//         const successMessage =
//             await checkoutPage.getSuccessMessage();

//         await expect(successMessage)
//             .toContain(
//                 'Your order has been successfully processed!'
//             );
//     });

//     // ==============================
//     // Verify Order Number Generated
//     // ==============================
//    test('Verify order placed successfully', async () => {

//     await checkoutPage.completeCheckout(
//         testData.checkoutAddress
//     );

//     const result =
//         await checkoutPage.getOrderNumber();

//     console.log(result);

//     await expect(
//         checkoutPage.orderSuccessMessage
//     ).toContainText(
//         'Your order has been successfully processed!'
//     );
// });
//     // ==============================
//     // Verify Checkout URL
//     // ==============================
//     test('Verify user navigates to checkout page', async ({ page }) => {

//         await expect(page)
//             .toHaveURL(/.*onepagecheckout/);
//     });

//     // ==============================
//     // Verify Confirm Order Button
//     // ==============================
//     test('Verify confirm order button is visible', async () => {

//         await checkoutPage.fillBillingAddress(
//             testData.checkoutAddress
//         );

//         await checkoutPage.continueShippingAddress();

//         await checkoutPage.selectShippingMethod();

//         await checkoutPage.selectPaymentMethod();

//         await checkoutPage.continuePaymentInfo();

//         await expect(
//             checkoutPage.confirmOrderBtn
//         ).toBeVisible();
//     });

//     // ==============================
//     // Verify Success Message Visible
//     // ==============================
//     test('Verify success message is displayed after order placement', async () => {

//         await checkoutPage.completeCheckout(
//             testData.checkoutAddress
//         );

//         await expect(
//             checkoutPage.orderSuccessMessage
//         ).toBeVisible();
//     });

// });









const { test, expect }  = require('@playwright/test');
const { LoginPage }     = require('../DemoWebShop_Pages/LoginPage');
const { HomePage }      = require('../DemoWebShop_Pages/HomePage');
const { ShoppingCart }  = require('../DemoWebShop_Pages/ShoppingCartPage');
const { CheckoutPage }  = require('../DemoWebShop_Pages/CheckoutPage');
const testData          = require('../testData/testdata.json');

test.describe('Checkout Page Test Suite', () => {

    // Serial mode: each test builds on a fresh cart → checkout entry point
    test.describe.configure({ mode: 'serial' });

    let loginPage, homePage, shoppingCart, checkoutPage;

    // ── Common setup: login → add product → open cart → start checkout ────
    test.beforeEach(async ({ page }) => {
        loginPage    = new LoginPage(page);
        homePage     = new HomePage(page);
        shoppingCart = new ShoppingCart(page);
        checkoutPage = new CheckoutPage(page);

        // Login
        await loginPage.goToPage();
        await loginPage.validLogin(testData.validUser.email, testData.validUser.password);
        await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible({ timeout: 20000 });

        // Clear cart
        await shoppingCart.clearCartIfNotEmpty();

        // Navigate to product
        await homePage.selectMenu('Computers');
        await homePage.selectMenu('Desktops');
        await homePage.selectProduct(testData.PRODUCT_NAME);

        // Add to cart
        await shoppingCart.addProductToCart();

        // Open cart → checkout
        await homePage.openShoppingCart();
        await shoppingCart.checkOut();
    });

    // ─────────────────────────────────────────────────────────────────────

    test('Verify user navigates to checkout page', async ({ page }) => {
        await expect(page).toHaveURL(/onepagecheckout/);
    });

    test('Verify billing address step is completed', async () => {
        await checkoutPage.fillBillingAddress(testData.checkoutAddress);
        await expect(checkoutPage.shippingAddressContinueBtn).toBeVisible();
    });

    test('Verify shipping address step is completed', async () => {
        await checkoutPage.fillBillingAddress(testData.checkoutAddress);
        await checkoutPage.continueShippingAddress();
        await expect(checkoutPage.shippingMethodContinueBtn).toBeVisible();
    });

    test('Verify shipping method step is completed', async () => {
        await checkoutPage.fillBillingAddress(testData.checkoutAddress);
        await checkoutPage.continueShippingAddress();
        await checkoutPage.selectShippingMethod();
        await expect(checkoutPage.paymentMethodContinueBtn).toBeVisible();
    });

    test('Verify payment method step is completed', async () => {
        await checkoutPage.fillBillingAddress(testData.checkoutAddress);
        await checkoutPage.continueShippingAddress();
        await checkoutPage.selectShippingMethod();
        await checkoutPage.selectPaymentMethod();
        await expect(checkoutPage.paymentInfoContinueBtn).toBeVisible();
    });

    test('Verify payment information step is completed', async () => {
        await checkoutPage.fillBillingAddress(testData.checkoutAddress);
        await checkoutPage.continueShippingAddress();
        await checkoutPage.selectShippingMethod();
        await checkoutPage.selectPaymentMethod();
        await checkoutPage.continuePaymentInfo();
        await expect(checkoutPage.confirmOrderBtn).toBeVisible();
    });

    test('Verify confirm order button is visible', async () => {
        await checkoutPage.fillBillingAddress(testData.checkoutAddress);
        await checkoutPage.continueShippingAddress();
        await checkoutPage.selectShippingMethod();
        await checkoutPage.selectPaymentMethod();
        await checkoutPage.continuePaymentInfo();
        await expect(checkoutPage.confirmOrderBtn).toBeVisible();
    });

    test('Verify user can complete checkout successfully', async () => {
        await checkoutPage.completeCheckout(testData.checkoutAddress);
        const successMessage = await checkoutPage.getSuccessMessage();
        expect(successMessage).toContain('Your order has been successfully processed!');
    });

    test('Verify order placed and order number is generated', async () => {
        await checkoutPage.completeCheckout(testData.checkoutAddress);
        const orderNumber = await checkoutPage.getOrderNumber();
        console.log('Order number:', orderNumber);
        await expect(checkoutPage.orderSuccessMessage)
            .toContainText('Your order has been successfully processed!');
    });

    test('Verify success message is displayed after order placement', async () => {
        await checkoutPage.completeCheckout(testData.checkoutAddress);
        await expect(checkoutPage.orderSuccessMessage).toBeVisible();
    });
});