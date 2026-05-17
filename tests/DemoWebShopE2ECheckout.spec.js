const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../DemoWebShop_Pages/LoginPage');
const { HomePage } = require('../DemoWebShop_Pages/HomePage');
const { ShoppingCart } = require('../DemoWebShop_Pages/ShoppingCartPage');
const { CheckoutPage } = require('../DemoWebShop_Pages/CheckoutPage');
const { ThankYouPage } = require('../DemoWebShop_Pages/ThankYouPage');

const testData = require('../testData/testdata.json');

test.describe('Demo Web Shop E2E Test Suite', () => {

    test.describe.configure({
        mode: 'serial',
        timeout: 180000
    });

    let loginPage;
    let homePage;
    let shoppingCart;
    let checkoutPage;
    let thankYouPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        shoppingCart = new ShoppingCart(page);
        checkoutPage = new CheckoutPage(page);
        thankYouPage = new ThankYouPage(page);

        // Open login page
        await loginPage.goToPage();

        // Login
        await loginPage.validLogin(
            testData.validUser.email,
            testData.validUser.password
        );

        // Wait homepage
        await page.waitForLoadState('networkidle');

        // Clear cart before every test
        await shoppingCart.clearCartIfNotEmpty();
    });

    // =====================================================
    // E2E TEST CASE 1
    // Login → Add Product → Checkout → Order Success
    // =====================================================

    test('E2E - User can place order successfully', async ({ page }) => {

        // Navigate to product
        await homePage.selectMenu('Computers');

        await page.waitForTimeout(2000);

        await homePage.selectMenu('Desktops');

        // Select product
        await homePage.selectProduct(
            testData.PRODUCT_NAME
        );

        // Add product
        await shoppingCart.addProductToCart();

        // Verify success notification
        await expect(
            page.locator('.bar-notification.success')
        ).toContainText(
            'The product has been added to your shopping cart'
        );

        // Open cart
        await homePage.openShoppingCart();

        // Verify product exists
        await expect(
            page.locator('.product-name')
        ).toContainText(
            testData.PRODUCT_NAME
        );

        // Checkout
        await shoppingCart.checkOut();

        // Complete checkout
        await checkoutPage.completeCheckout(
            testData.checkoutAddress
        );

        // Verify success page
        await expect(page)
            .toHaveURL(/checkout\/completed/);

        // Verify success message
        const bodyText =
            await page.textContent('body');

        expect(bodyText)
            .toContain(
                'Your order has been successfully processed!'
            );
    });

    // =====================================================
    // E2E TEST CASE 2
    // Search Product → Add To Cart → Verify Cart
    // =====================================================

    test('E2E - User can search and add product to cart', async ({ page }) => {

        // Search product
        await homePage.searchProduct(
            testData.PRODUCT_NAME
        );

        // Open product
        await homePage.selectProduct(
            testData.PRODUCT_NAME
        );

        // Add product
        await shoppingCart.addProductToCart();

        // Open cart
        await homePage.openShoppingCart();

        // Verify cart page
        await expect(page)
            .toHaveURL(/cart/);

        // Verify product visible
        await expect(
            page.locator('.product-name')
        ).toContainText(
            testData.PRODUCT_NAME
        );
    });

    // =====================================================
    // E2E TEST CASE 3
    // Remove Product From Cart
    // =====================================================

    test('E2E - User can remove product from cart', async ({ page }) => {

        // Navigate product
        await homePage.selectMenu('Computers');

        await homePage.selectMenu('Desktops');

        // Select product
        await homePage.selectProduct(
            testData.PRODUCT_NAME
        );

        // Add product
        await shoppingCart.addProductToCart();

        // Open cart
        await homePage.openShoppingCart();

        // Remove item
        await shoppingCart.removeItem();

        // Verify empty cart
        await expect(
            shoppingCart.emptyCartMessage
        ).toContainText(
            'Your Shopping Cart is empty!'
        );
    });

    // =====================================================
    // E2E TEST CASE 4
    // Continue Shopping After Order Placement
    // =====================================================

    test('E2E - User can continue shopping after checkout', async ({ page }) => {

        // Navigate product
        await homePage.selectMenu('Computers');

        await homePage.selectMenu('Desktops');

        // Select product
        await homePage.selectProduct(
            testData.PRODUCT_NAME
        );

        // Add product
        await shoppingCart.addProductToCart();

        // Open cart
        await homePage.openShoppingCart();

        // Checkout
        await shoppingCart.checkOut();

        // Complete checkout
        await checkoutPage.completeCheckout(
            testData.checkoutAddress
        );

        // Click continue
        await thankYouPage.clickContinue();

        // Verify homepage
        await expect(page)
            .toHaveURL(
                'https://demowebshop.tricentis.com/'
            );
    });

    // =====================================================
    // E2E TEST CASE 5
    // Invalid Login
    // =====================================================

    // test('E2E - Invalid login validation', async () => {

    //     // Invalid login
    //     await loginPage.validLogin(
    //         testData.invalidUser.email,
    //         testData.invalidUser.password
    //     );

    //     // Verify error
    //     await expect(
    //         loginPage.errorMessage
    //     ).toContainText(
    //         'Login was unsuccessful'
    //     );
    // });

});