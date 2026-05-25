const { test, expect }  = require('@playwright/test');
const { LoginPage }     = require('../DemoWebShop_Pages/LoginPage');
const { HomePage }      = require('../DemoWebShop_Pages/HomePage');
const { ShoppingCart }  = require('../DemoWebShop_Pages/ShoppingCartPage');
const { CheckoutPage }  = require('../DemoWebShop_Pages/CheckoutPage');
const testData          = require('../testData/testdata.json');

test.describe('Checkout Page Test Suite', () => {

    test.describe.configure({ mode: 'serial' });
    let loginPage, homePage, shoppingCart, checkoutPage;
    test.beforeEach(async ({ page }) => {
        loginPage    = new LoginPage(page);
        homePage     = new HomePage(page);
        shoppingCart = new ShoppingCart(page);
        checkoutPage = new CheckoutPage(page);

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
    });

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