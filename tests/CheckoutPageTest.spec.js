const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../DemoWebShop_Pages/LoginPage');
const { HomePage } = require('../DemoWebShop_Pages/HomePage');
const { ShoppingCart } = require('../DemoWebShop_Pages/ShoppingCartPage');
const { CheckoutPage } = require('../DemoWebShop_Pages/CheckoutPage');

const testData = require('../testData/testdata.json');

test.describe('Checkout Page Test Suite', () => {

    test.describe.configure({
        timeout: 120000,
        mode: 'serial'
    });

    let loginPage;
    let homePage;
    let shoppingCart;
    let checkoutPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        shoppingCart = new ShoppingCart(page);
        checkoutPage = new CheckoutPage(page);

        // Open login page
        await loginPage.goToPage();

        // Login
        await loginPage.validLogin(
            testData.validUser.email,
            testData.validUser.password
        );

        // Wait for homepage
        await page.waitForLoadState('domcontentloaded');

        // Clear cart
        await shoppingCart.clearCartIfNotEmpty();

        // Navigate to product
        await homePage.selectMenu('Computers');

        await homePage.selectMenu('Desktops');

        // Select product
        await homePage.selectProduct(
            testData.PRODUCT_NAME
        );

        // Add to cart
        await shoppingCart.addProductToCart();

        // Open shopping cart
        await homePage.openShoppingCart();

        // Checkout
        await shoppingCart.checkOut();
    });

    // ============================================
    // Verify Checkout Page Loaded
    // ============================================

    test('Verify user navigates to checkout page', async ({ page }) => {

        await expect(page)
            .toHaveURL(/.*onepagecheckout/);
    });

    // ============================================
    // Verify Billing Address Step
    // ============================================

    test('Verify billing address step completed', async ({ page }) => {

        await checkoutPage.fillBillingAddress(
            testData.checkoutAddress
        );

        await expect(page)
            .toHaveURL(/.*onepagecheckout/);
    });

    // ============================================
    // Verify Shipping Address Step
    // ============================================

    test('Verify shipping address step completed', async ({ page }) => {

        await checkoutPage.fillBillingAddress(
            testData.checkoutAddress
        );

        await checkoutPage.continueShippingAddress();

        await expect(page)
            .toHaveURL(/.*onepagecheckout/);
    });

    // ============================================
    // Verify Shipping Method Step
    // ============================================

    test('Verify shipping method step completed', async ({ page }) => {

        await checkoutPage.fillBillingAddress(
            testData.checkoutAddress
        );

        await checkoutPage.continueShippingAddress();

        await checkoutPage.selectShippingMethod();

        await expect(page)
            .toHaveURL(/.*onepagecheckout/);
    });

    // ============================================
    // Verify Payment Method Step
    // ============================================

    test('Verify payment method step completed', async ({ page }) => {

        await checkoutPage.fillBillingAddress(
            testData.checkoutAddress
        );

        await checkoutPage.continueShippingAddress();

        await checkoutPage.selectShippingMethod();

        await checkoutPage.selectPaymentMethod();

        await expect(page)
            .toHaveURL(/.*onepagecheckout/);
    });

    // ============================================
    // Verify Payment Information Step
    // ============================================

    test('Verify payment information step completed', async ({ page }) => {

        await checkoutPage.fillBillingAddress(
            testData.checkoutAddress
        );

        await checkoutPage.continueShippingAddress();

        await checkoutPage.selectShippingMethod();

        await checkoutPage.selectPaymentMethod();

        await checkoutPage.continuePaymentInfo();

        await expect(page)
            .toHaveURL(/.*onepagecheckout/);
    });

    // ============================================
    // Verify Complete Checkout
    // ============================================

    test('Verify user can complete checkout successfully', async ({ page }) => {

        await checkoutPage.completeCheckout(
            testData.checkoutAddress
        );

        // Verify completed URL
        await expect(page)
            .toHaveURL(/.*checkout\/completed/);

        // Verify success message
        await expect(
            checkoutPage.orderSuccessMessage
        ).toContainText(
            'Your order has been successfully processed!'
        );
    });

    // ============================================
    // Verify Order Placement
    // ============================================

    test('Verify order placed successfully', async ({ page }) => {

        await checkoutPage.completeCheckout(
            testData.checkoutAddress
        );

        // Verify completed page
        await expect(page)
            .toHaveURL(/.*checkout\/completed/);

        // Get order details
        const result =
            await checkoutPage.getOrderNumber();

        console.log(result);

        // Verify success message
        await expect(
            checkoutPage.orderSuccessMessage
        ).toContainText(
            'Your order has been successfully processed!'
        );
    });

    // ============================================
    // Verify Success Message
    // ============================================

    test('Verify success message displayed after order placement', async ({ page }) => {

        await checkoutPage.completeCheckout(
            testData.checkoutAddress
        );

        // Verify success page
        await expect(page)
            .toHaveURL(/.*checkout\/completed/);

        // Verify success message
        await expect(
            checkoutPage.orderSuccessMessage
        ).toContainText(
            'Your order has been successfully processed!'
        );
    });

});
test.afterEach(async ({ page }) => {

    try {

        // Stop pending loads
        await page.evaluate(() => window.stop());

    } catch (e) {

        console.log('Cleanup skipped');
    }
});