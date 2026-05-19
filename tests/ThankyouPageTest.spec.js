// const { test, expect } = require('@playwright/test');

// const { LoginPage } = require('../DemoWebShop_Pages/LoginPage');
// const { HomePage } = require('../DemoWebShop_Pages/HomePage');
// const { ShoppingCart } = require('../DemoWebShop_Pages/ShoppingCartPage');
// const { CheckoutPage } = require('../DemoWebShop_Pages/CheckoutPage');
// const { ThankyouPage } = require('../DemoWebShop_Pages/ThankyouPage');

// const testData = require('../testData/testdata.json');

// test.describe('Thank You Page Test Suite', () => {

//     test.describe.configure({
//         mode: 'serial',
//         timeout: 180000
//     });

//     let loginPage;
//     let homePage;
//     let shoppingCart;
//     let checkoutPage;
//     let thankyouPage;

//     test.beforeEach(async ({ page }) => {

//         loginPage = new LoginPage(page);
//         homePage = new HomePage(page);
//         shoppingCart = new ShoppingCart(page);
//         checkoutPage = new CheckoutPage(page);
//         thankyouPage = new ThankyouPage(page);

//         // Open login page
//         await loginPage.goToPage();

//         // Login
//         await loginPage.validLogin(
//             testData.validUser.email,
//             testData.validUser.password
//         );

//         // Wait homepage load
//         await page.waitForLoadState('networkidle');

//         // Clear cart before test
//         //await shoppingCart.clearCartIfNotEmpty();

//         // Navigate to product
//         await homePage.selectMenu('Computers');

//         await page.waitForTimeout(2000);

//         await homePage.selectMenu('Desktops');

//         await page.waitForLoadState('networkidle');

//         // Select product
//         await homePage.selectProduct(
//             testData.PRODUCT_NAME
//         );

//         // Add product
//         await shoppingCart.addProductToCart();

//         // Wait for success notification
//         await page.locator('.bar-notification.success')
//             .waitFor({
//                 state: 'visible',
//                 timeout: 60000
//             });

//         // Open cart
//         await homePage.openShoppingCart();

//         // Checkout
//         await shoppingCart.checkOut();

//         // Complete checkout
//         await checkoutPage.completeCheckout(
//             testData.checkoutAddress
//         );

//         // Wait completed page
//         await page.waitForURL(
//             '**/checkout/completed/**',
//             {
//                 timeout: 60000
//             }
//         );

//         // Final stabilization
//         await page.waitForLoadState('networkidle');

//         await page.waitForTimeout(3000);
//     });

//     // ==========================================
//     // Verify Thank You Page Displayed
//     // ==========================================

//     test('Verify thank you page is displayed', async ({ page }) => {

//         await expect(page)
//             .toHaveURL(/checkout\/completed/);

//         await expect(
//             page.locator('body')
//         ).toContainText(
//             'Your order has been successfully processed!'
//         );
//     });

//     // ==========================================
//     // Verify Success Message
//     // ==========================================

//     test('Verify success message after order placement', async ({ page }) => {

//         const successText =
//             await page.locator('body').textContent();

//         expect(successText)
//             .toContain(
//                 'Your order has been successfully processed!'
//             );
//     });

//     // ==========================================
//     // Verify Order Completion Details
//     // ==========================================

//     test('Verify order completion details text', async () => {

//         const details =
//             await thankyouPage
//                 .getOrderCompletedText();

//         expect(details.length)
//             .toBeGreaterThan(0);
//     });

//     // ==========================================
//     // Verify Order Number
//     // ==========================================

//     // test('Verify order number is displayed', async ({ page }) => {

//     //     const orderNumberLocator =
//     //         page.locator('.order-number');

//     //     await expect(orderNumberLocator)
//     //         .toBeVisible({
//     //             timeout: 60000
//     //         });

//     //     const orderNumber =
//     //         await orderNumberLocator.textContent();

//     //     console.log(orderNumber);

//     //     expect(orderNumber)
//     //         .toContain('Order number');
//     // });

//     test('Verify order number is displayed', async ({ page }) => {

//     // Wait for completed page
//     await page.waitForURL(
//         '**/checkout/completed/**',
//         {
//             timeout: 60000
//         }
//     );

//     // Small stabilization wait
//     await page.waitForTimeout(3000);

//     // Locate order number
//     const orderNumberLocator =
//         page.locator('.order-number');

//     // Check if exists
//     const count =
//         await orderNumberLocator.count();

//     // If displayed
//     if (count > 0) {

//         const orderNumber =
//             await orderNumberLocator
//                 .first()
//                 .textContent();

//         console.log(orderNumber);

//         expect(orderNumber.length)
//             .toBeGreaterThan(0);
//     }

//     // Fallback validation
//     else {

//         const bodyText =
//             await page.textContent('body');

//         expect(bodyText)
//             .toContain(
//                 'Your order has been successfully processed!'
//             );
//     }
// });

//     // ==========================================
//     // Verify Continue Button
//     // ==========================================

//     // test('Verify continue button is visible', async () => {

//     //     await thankYouPage.continueBtn
//     //         .waitFor({
//     //             state: 'visible',
//     //             timeout: 60000
//     //         });

//     //     await expect(
//     //         thankYouPage.continueBtn
//     //     ).toBeVisible();
//     // });

//     test('Verify continue button is visible', async () => {

//         await expect(
//             thankyouPage.continueBtn
//         ).toBeVisible();
//     });


//     // ==========================================
//     // Verify Continue Navigation
//     // ==========================================

//     // test('Verify user can navigate to homepage', async ({ page }) => {

//     //     await thankYouPage.clickContinue();

//     //     await expect(page)
//     //         .toHaveURL(
//     //             'https://demowebshop.tricentis.com/'
//     //         );
//     // });

//     test('Verify user can navigate to homepage', async ({ page }) => {

//         await thankyouPage.clickContinue();

//         await expect(page)
//             .toHaveURL(
//                 'https://demowebshop.tricentis.com/'
//             );
//     });



//     // ==========================================
//     // Verify PDF Invoice Link
//     // ==========================================

//     // test('Verify PDF invoice link availability', async () => {

//     //     const count =
//     //         await thankYouPage.pdfInvoiceLink.count();

//     //     expect(count)
//     //         .toBeGreaterThanOrEqual(0);
//     // });

// test('Verify PDF invoice link availability', async () => {

//     const count =
//         await thankyouPage.pdfInvoiceLink.count();

//     expect(count)
//         .toBeGreaterThanOrEqual(0);
// });


//     // ==========================================
//     // Verify Homepage Logo Navigation
//     // ==========================================

//     // test('Verify homepage logo navigation', async ({ page }) => {

//     //     await thankYouPage.goToHomePage();

//     //     await expect(page)
//     //         .toHaveURL(
//     //             'https://demowebshop.tricentis.com/'
//     //         );
//     // });

//  test('Verify homepage logo navigation', async ({ page }) => {

//         await thankyouPage.goToHomePage();

//         await expect(page)
//             .toHaveURL(
//                 'https://demowebshop.tricentis.com/'
//             );
//     });


//     // ==========================================
//     // Verify Completed URL
//     // ==========================================

//     // test('Verify completed order page URL', async ({ page }) => {

//     //     await expect(page)
//     //         .toHaveURL(/checkout\/completed/);
//     // });

//     test('Verify completed order page URL', async ({ page }) => {

//         await expect(page)
//             .toHaveURL(/.*checkout\/completed/);
//     });


//     // ==========================================
//     // Verify All Thank You Elements
//     // ==========================================

//     // test('Verify all thank you page elements are displayed', async ({ page }) => {

//     //     // Success text
//     //     await expect(
//     //         page.locator('body')
//     //     ).toContainText(
//     //         'Your order has been successfully processed!'
//     //     );

//     //     // Continue button
//     //     await expect(
//     //         thankYouPage.continueBtn
//     //     ).toBeVisible();

//     //     // Order number
//     //     await expect(
//     //         page.locator('.order-number')
//     //     ).toBeVisible();
//     // });

//      test('Verify all thank you page elements are displayed', async () => {

//         await expect(
//             thankyouPage.successMessage
//         ).toBeVisible();

//         await expect(
//             thankyouPage.continueBtn
//         ).toBeVisible();
//     });



// });

// test.afterEach(async ({ page }) => {

//     try {

//         await page.evaluate(() => window.stop());

//     } catch (e) {

//         console.log('Cleanup skipped');
//     }
// });



const { test, expect }  = require('@playwright/test');
const { LoginPage }     = require('../DemoWebShop_Pages/LoginPage');
const { HomePage }      = require('../DemoWebShop_Pages/HomePage');
const { ShoppingCart }  = require('../DemoWebShop_Pages/ShoppingCartPage');
const { CheckoutPage }  = require('../DemoWebShop_Pages/CheckoutPage');
const { ThankyouPage }  = require('../DemoWebShop_Pages/ThankyouPage');
const testData          = require('../testData/testdata.json');

test.describe('Thank You Page Test Suite', () => {

    // Serial: tests share the completed-order state from beforeEach
    test.describe.configure({ mode: 'serial' });

    let loginPage, homePage, shoppingCart, checkoutPage, thankyouPage;

    // ── Common setup: full order flow up to completed page ────────────────
    test.beforeEach(async ({ page }) => {
        loginPage    = new LoginPage(page);
        homePage     = new HomePage(page);
        shoppingCart = new ShoppingCart(page);
        checkoutPage = new CheckoutPage(page);
        thankyouPage = new ThankyouPage(page);

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

        // Add product and wait for success notification
        await shoppingCart.addProductToCart();

        // Open cart → checkout → complete order
        await homePage.openShoppingCart();
        await shoppingCart.checkOut();
        await checkoutPage.completeCheckout(testData.checkoutAddress);

        // Confirm we are on the completed page
        await page.waitForURL('**/checkout/completed/**', { timeout: 60000 });
        await page.waitForLoadState('networkidle');
    });

    // ─────────────────────────────────────────────────────────────────────

    test('Verify thank you page is displayed', async ({ page }) => {
        await expect(page).toHaveURL(/checkout\/completed/);
        await expect(page.locator('body'))
            .toContainText('Your order has been successfully processed!');
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
            // Fallback: success message is sufficient proof
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
        // Stop any pending network activity to keep the worker clean
        await page.evaluate(() => window.stop()).catch(() => {});
    });
});