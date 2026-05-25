const { test, expect } = require('@playwright/test');
const { LoginPage }    = require('../DemoWebShop_Pages/LoginPage');
const { HomePage }     = require('../DemoWebShop_Pages/HomePage');
const { ShoppingCart } = require('../DemoWebShop_Pages/ShoppingCartPage');
const testData         = require('../testData/testdata.json');

test.describe('Shopping Cart Test Suite', () => {

    let loginPage, homePage, shoppingCart;
    test.beforeEach(async ({ page }) => {
        loginPage    = new LoginPage(page);
        homePage     = new HomePage(page);
        shoppingCart = new ShoppingCart(page);
        await loginPage.goToPage();
        await loginPage.validLogin(testData.validUser.email, testData.validUser.password);
        await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible({ timeout: 20000 });
        await shoppingCart.clearCartIfNotEmpty();
        await homePage.searchProduct(testData.PRODUCT_NAME);
        await homePage.selectProduct(testData.PRODUCT_NAME);
    });

    test('Verify user can add product to shopping cart', async ({ page }) => {
        await shoppingCart.addProductToCart();
        await homePage.openShoppingCart();
        await expect(page.getByRole('link', { name: testData.PRODUCT_NAME }).first()).toBeVisible();
    });

    test('Verify product name is displayed in cart', async ({ page }) => {
        await shoppingCart.addProductToCart();
        await page.goto('https://demowebshop.tricentis.com/cart');
        await page.waitForLoadState('networkidle');

        await expect(page.locator('.product-name').first())
            .toContainText(testData.PRODUCT_NAME);
    });

    test('Verify remove item from cart', async ({ page }) => {
        await shoppingCart.addProductToCart();
        await homePage.openShoppingCart();
        await shoppingCart.removeItem();
        await expect(shoppingCart.emptyCartMessage).toContainText('Your Shopping Cart is empty!');
    });

    test('Verify update shopping cart button keeps user on cart page', async ({ page }) => {
        await shoppingCart.addProductToCart();
        await homePage.openShoppingCart();
        await shoppingCart.updateShoppingCart();
        await expect(page).toHaveURL(/cart/);
    });

    test('Verify estimate shipping shows results', async ({ page }) => {
        await shoppingCart.addProductToCart();
        await homePage.openShoppingCart();
        await shoppingCart.estimateShipping(testData.shippingAddress.country, testData.shippingAddress.state, testData.shippingAddress.postalCode);
        await expect(page.locator('.shipping-results')).toBeVisible();
    });

    test('Verify continue shopping navigates away from cart', async ({ page }) => {
        await shoppingCart.addProductToCart();
        await homePage.openShoppingCart();
        await shoppingCart.continueShopping();
        await expect(page).not.toHaveURL(/cart/);
    });

    test('Verify checkout button navigates to checkout page', async ({ page }) => {
        await shoppingCart.addProductToCart();
        await homePage.openShoppingCart();
        await shoppingCart.checkOut();
        await expect(page).toHaveURL(/onepagecheckout/);
    });

    test('Verify remove all items empties the cart', async ({ page }) => {

        await shoppingCart.addProductToCart();
        await homePage.searchProduct(testData.PRODUCT_NAME);
        await homePage.selectProduct(testData.PRODUCT_NAME);
        await shoppingCart.addProductToCart();
        await homePage.openShoppingCart();
        await shoppingCart.removeAllItems();
        await expect(shoppingCart.emptyCartMessage).toBeVisible();
    });
});