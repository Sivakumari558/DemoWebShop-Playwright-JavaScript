const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../DemoWebShop_Pages/LoginPage');
const { HomePage } = require('../DemoWebShop_Pages/HomePage');
const { ShoppingCart } = require('../DemoWebShop_Pages/ShoppingCartPage');
const { CheckoutPage } = require('../DemoWebShop_Pages/CheckoutPage');
const { ThankyouPage } = require('../DemoWebShop_Pages/ThankyouPage');

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
        await loginPage.goToPage();
        await loginPage.validLogin(testData.validUser.email, testData.validUser.password);
        await page.waitForLoadState('networkidle');
        await shoppingCart.clearCartIfNotEmpty();
    });

    test('E2E - User can place order successfully', async ({ page }) => {
        await homePage.selectMenu('Computers');
        await page.waitForTimeout(2000);
        await homePage.selectMenu('Desktops');
        await homePage.selectProduct(testData.PRODUCT_NAME);
        await shoppingCart.addProductToCart();
        await expect(page.locator('.bar-notification.success')).toContainText('The product has been added to your shopping cart');
        await homePage.openShoppingCart();
        await expect(page.locator('.product-name')).toContainText(testData.PRODUCT_NAME);
        await shoppingCart.checkOut();
        await checkoutPage.completeCheckout(testData.checkoutAddress);
        await expect(page).toHaveURL(/checkout\/completed/);
        const bodyText = await page.textContent('body');
        expect(bodyText).toContain('Your order has been successfully processed!');
    });

    test('E2E - User can search and add product to cart', async ({ page }) => {
        await homePage.searchProduct(testData.PRODUCT_NAME);
        await homePage.selectProduct(testData.PRODUCT_NAME);
        await shoppingCart.addProductToCart();
        await homePage.openShoppingCart();
        await expect(page).toHaveURL(/cart/);
        await expect(page.locator('.product-name')).toContainText(testData.PRODUCT_NAME);
    });

    test('E2E - User can remove product from cart', async ({ page }) => {
        await homePage.selectMenu('Computers');
        await homePage.selectMenu('Desktops');
        await homePage.selectProduct(testData.PRODUCT_NAME);
        await shoppingCart.addProductToCart();
        await homePage.openShoppingCart();
        await shoppingCart.removeItem();
        await expect(shoppingCart.emptyCartMessage).toContainText('Your Shopping Cart is empty!');
    });

    test('E2E - User can continue shopping after checkout', async ({ page }) => {
        await homePage.selectMenu('Computers');
        await homePage.selectMenu('Desktops');
        await homePage.selectProduct(testData.PRODUCT_NAME);
        await shoppingCart.addProductToCart();
        await homePage.openShoppingCart();
        await shoppingCart.checkOut();
        await checkoutPage.completeCheckout(testData.checkoutAddress);
        await thankYouPage.clickContinue();
        await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    });

});