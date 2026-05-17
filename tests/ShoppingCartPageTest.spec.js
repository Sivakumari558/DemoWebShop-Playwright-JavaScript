const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../DemoWebShop_Pages/LoginPage');
const { HomePage } = require('../DemoWebShop_Pages/HomePage');
const { ShoppingCartPage } = require('../DemoWebShop_Pages/ShoppingCartPage');

const testData = require('../testData/testdata.json');

test.describe('Shopping Cart Test Suite', () => {

    let loginPage;
    let homePage;
    let shoppingCart;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        shoppingCart = new ShoppingCart(page);

        // Open login page
        await loginPage.goToPage();

        // Login
        await loginPage.validLogin(
            testData.validUser.email,
            testData.validUser.password
        );

        await expect(
    page.getByRole('link', {
        name: 'Log out'
    })
).toBeVisible();
        // wait after login
        await page.waitForLoadState('networkidle');

        // Search product
        await homePage.searchProduct(testData.PRODUCT_NAME);

        // Open product
        await homePage.selectProduct(testData.PRODUCT_NAME);
    });

    test('Verify user can add product to shopping cart', async ({ page }) => {

    //search product
     await homePage.searchProduct(
        testData.PRODUCT_NAME
    );

    // Open product
    await homePage.selectProduct(
        testData.PRODUCT_NAME
    );

    await shoppingCart.addProductToCart();
    // Wait for notification to disappear
    await page.waitForTimeout(3000);

    // Open shopping cart
    await homePage.openShoppingCart();

    // Wait for cart page
    await page.waitForURL('**/cart');

    // Verify product visible
    await expect(
        page.locator('.product-name').first()
    ).toContainText(testData.PRODUCT_NAME);
});

    test('Verify product name is displayed in cart', async ({ page }) => {

        await homePage.searchProduct(
        testData.PRODUCT_NAME
    );

    // Open product
    await homePage.selectProduct(
        testData.PRODUCT_NAME
    );

    // Add product
    await shoppingCart.addProductToCart();

    // Wait for success message disappear
    await page.waitForTimeout(4000);

    // Open cart directly
    await page.goto(
        'https://demowebshop.tricentis.com/cart'
    );

    // Wait for cart page
    //await page.waitForLoadState('networkidle');

    // Verify product exists
    await expect(
        page.locator('.product-name').first()
    ).toContainText(testData.PRODUCT_NAME);
    });

    test('Verify remove item from cart', async ({ page }) => {

        await shoppingCart.addProductToCart();

        await homePage.openShoppingCart();

        // Remove item
        await shoppingCart.removeItem();

        // Verify cart empty message
        // await expect(
        //     shoppingCart.emptyCartMessage
        // ).toBeVisible();
         await expect(shoppingCart.emptyCartMessage).toContainText('Your Shopping Cart is empty!');

    });

    test('Verify update shopping cart button', async ({ page }) => {

        await shoppingCart.addProductToCart();

        await homePage.openShoppingCart();

        await shoppingCart.updateShoppingCart();

        // Verify page still visible
        await expect(page).toHaveURL(/cart/);
    });

    // test('Verify apply invalid coupon code', async ({ page }) => {

    //     await shoppingCart.addProductToCart();

    //     await homePage.openShoppingCart();

    //     await shoppingCart.applyCoupon(
    //         testData.couponCode
    //     );

    //     // Verify coupon message
    //     await expect(
    //         shoppingCart.couponMessage
    //     ).toContainText('The coupon code you entered couldn\'t be applied');
    // });


    test('Verify estimate shipping', async ({ page }) => {

        await shoppingCart.addProductToCart();

        await homePage.openShoppingCart();

        await shoppingCart.estimateShipping(
            testData.shippingAddress.country,
            testData.shippingAddress.state,
            testData.shippingAddress.postalCode
        );

        // Verify shipping section visible
        await expect(
            page.locator('.shipping-results')
        ).toBeVisible();
    });

    test('Verify continue shopping button', async ({ page }) => {

        await shoppingCart.addProductToCart();

        await homePage.openShoppingCart();

        await shoppingCart.continueShopping();

        // Verify redirected from cart page
        await expect(page).not.toHaveURL(/cart/);
    });

    test('Verify checkout button', async ({ page }) => {

        await shoppingCart.addProductToCart();

        await homePage.openShoppingCart();

        await shoppingCart.checkOut();

        // Verify checkout page opened
        await expect(page).toHaveURL(/onepagecheckout/);
    });

    test('Verify remove all items from cart', async ({ page }) => {

        // Add first product
        await shoppingCart.addProductToCart();

        // Add second product
        await homePage.searchProduct(testData.PRODUCT_NAME);

        await homePage.selectProduct(testData.PRODUCT_NAME);

        await shoppingCart.addProductToCart();

        // Open cart
        await homePage.openShoppingCart();

        // Remove all products
        await shoppingCart.removeAllItems();

        // Verify cart empty
        await expect(
            shoppingCart.emptyCartMessage
        ).toBeVisible();
    });

});
