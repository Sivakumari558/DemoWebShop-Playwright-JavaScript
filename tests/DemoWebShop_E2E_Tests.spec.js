const { test, expect } = require('@playwright/test');

const { LoginPage }    = require('../DemoWebShop_Pages/LoginPage');
const { HomePage }     = require('../DemoWebShop_Pages/HomePage');
const { ShoppingCart } = require('../DemoWebShop_Pages/ShoppingCartPage');
const { CheckoutPage } = require('../DemoWebShop_Pages/CheckoutPage');
const { ThankyouPage } = require('../DemoWebShop_Pages/ThankyouPage');

const testData = require('../testData/testdata.json');

test.describe('E2E - Login to Thank You Page', () => {
    test.describe.configure({ mode: 'serial' });
    let loginPage, homePage, shoppingCart, checkoutPage, thankyouPage;

    test.beforeEach(async ({ page }) => {
        loginPage    = new LoginPage(page);
        homePage     = new HomePage(page);
        shoppingCart = new ShoppingCart(page);
        checkoutPage = new CheckoutPage(page);
        thankyouPage = new ThankyouPage(page);

        await loginPage.goToPage();
        await loginPage.validLogin(testData.validUser.email, testData.validUser.password);
        await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible({ timeout: 20000 });
        await shoppingCart.clearCartIfNotEmpty();
    });

    test('E2E-01 | User can login successfully', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'My account' })).toBeVisible();
    });

    test('E2E-02 | User can search and open product detail page', async ({ page }) => {
        await homePage.searchProduct(testData.PRODUCT_NAME);
        await homePage.selectProduct(testData.PRODUCT_NAME);
        await expect(page).toHaveURL(/build-your-cheap-own-computer/);
    });

    test('E2E-03 | User can add product to cart', async ({ page }) => {
        await homePage.searchProduct(testData.PRODUCT_NAME);
        await homePage.selectProduct(testData.PRODUCT_NAME);
        await shoppingCart.addProductToCart();
        await homePage.openShoppingCart();
        await expect(page.locator('.product-name').first()).toContainText(testData.PRODUCT_NAME);
    });

    test('E2E-04 | User can proceed to checkout from cart', async ({ page }) => {
        await homePage.searchProduct(testData.PRODUCT_NAME);
        await homePage.selectProduct(testData.PRODUCT_NAME);
        await shoppingCart.addProductToCart();
        await homePage.openShoppingCart();
        await shoppingCart.checkOut();
        await expect(page).toHaveURL(/onepagecheckout/);
    });

    test('E2E-05 | User can complete full order and reach thank you page', async ({ page }) => {
        await homePage.searchProduct(testData.PRODUCT_NAME);
        await homePage.selectProduct(testData.PRODUCT_NAME);
        await shoppingCart.addProductToCart();
        await homePage.openShoppingCart();
        await shoppingCart.checkOut();
        await checkoutPage.completeCheckout(testData.checkoutAddress);
        await expect(page).toHaveURL(/checkout\/completed/);
        await expect(page.locator('body')).toContainText('Your order has been successfully processed!');
    });

    test('E2E-06 | User can click Continue on thank you page and return to home', async ({ page }) => {
        await homePage.searchProduct(testData.PRODUCT_NAME);
        await homePage.selectProduct(testData.PRODUCT_NAME);
        await shoppingCart.addProductToCart();
        await homePage.openShoppingCart();
        await shoppingCart.checkOut();
        await checkoutPage.completeCheckout(testData.checkoutAddress);
        await thankyouPage.clickContinue();

        await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    });
});