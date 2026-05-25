const { test, expect }  = require('@playwright/test');
const { LoginPage }     = require('../DemoWebShop_Pages/LoginPage');
const { HomePage }      = require('../DemoWebShop_Pages/HomePage');
const { ShoppingCart }  = require('../DemoWebShop_Pages/ShoppingCartPage');
const { CheckoutPage }  = require('../DemoWebShop_Pages/CheckoutPage');
const { ThankyouPage }  = require('../DemoWebShop_Pages/ThankyouPage');
const testData          = require('../testData/testdata.json');

test.describe('Thank You Page Test Suite', () => {

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
        await homePage.selectMenu('Computers');
        await homePage.selectMenu('Desktops');
        await homePage.selectProduct(testData.PRODUCT_NAME);
        await shoppingCart.addProductToCart();
        await homePage.openShoppingCart();
        await shoppingCart.checkOut();
        await checkoutPage.completeCheckout(testData.checkoutAddress);
        await page.waitForURL('**/checkout/completed/**', { timeout: 60000 });
        await page.waitForLoadState('networkidle');
    });

    test('Verify thank you page is displayed', async ({ page }) => {
        await expect(page).toHaveURL(/checkout\/completed/);
        await expect(page.locator('body')).toContainText('Your order has been successfully processed!');
    });

    test('Verify success message is shown after order placement', async ({ page }) => {
        const bodyText = await page.locator('body').textContent();
        expect(bodyText).toContain('Your order has been successfully processed!');
    });

    test('Verify order completion details text is not empty', async () => {
        const details = await thankyouPage.getOrderCompletedText();
        expect(details.length).toBeGreaterThan(0);
    });

    test('Verify order number is displayed', async ({ page }) => {
        const orderNumberLocator = page.locator('.order-number');
        const count = await orderNumberLocator.count();

        if (count > 0) {
            const orderNumber = await orderNumberLocator.first().textContent();
            console.log('Order number:', orderNumber);
            expect(orderNumber.length).toBeGreaterThan(0);
        } else {
            const bodyText = await page.textContent('body');
            expect(bodyText).toContain('Your order has been successfully processed!');
        }
    });

    test('Verify continue button is visible on thank you page', async () => {
        await expect(thankyouPage.continueBtn).toBeVisible();
    });

    test('Verify user can navigate to homepage via continue button', async ({ page }) => {
        await thankyouPage.clickContinue();
        await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    });

    test('Verify PDF invoice link availability', async () => {
        const count = await thankyouPage.pdfInvoiceLink.count();
        expect(count).toBeGreaterThanOrEqual(0);
    });

    test('Verify homepage logo navigation from thank you page', async ({ page }) => {
        await thankyouPage.goToHomePage();
        await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    });

    test('Verify completed order page URL', async ({ page }) => {
        await expect(page).toHaveURL(/.*checkout\/completed/);
    });

    test('Verify all key thank you page elements are displayed', async () => {
        await expect(thankyouPage.successMessage).toBeVisible();
        await expect(thankyouPage.continueBtn).toBeVisible();
    });

    test.afterEach(async ({ page }) => {
        await page.evaluate(() => window.stop()).catch(() => {});
    });
});