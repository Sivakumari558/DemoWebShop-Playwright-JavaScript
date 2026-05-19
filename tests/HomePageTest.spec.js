// const { test, expect } = require('@playwright/test');
// const { HomePage } = require('../DemoWebShop_Pages/HomePage');

// test.describe('Home Page Test Suite', () => {
//     let homePage;
//     test.beforeEach(async ({ page }) => {
//      homePage = new HomePage(page);
//      await page.goto('https://demowebshop.tricentis.com/');
//     });

//     test('Verify Website Logo Visibility', async () => {
//         await expect(homePage.logo).toBeVisible();
//     });

//     test('Verify Register Page Navigation', async ({ page }) => {

//         await homePage.openRegisterPage();

//         await expect(page).toHaveURL(/register/);
//     });

//     test('Verify Login Page Navigation', async ({ page }) => {

//         await homePage.openLoginPage();

//         await expect(page).toHaveURL(/login/);
//     });

//     test('Verify Shopping Cart Navigation', async ({ page }) => {

//         await homePage.openShoppingCart();

//         await expect(page).toHaveURL(/cart/);
//     });

//     test('Verify Wishlist Navigation', async ({ page }) => {

//         await homePage.openWishList();

//         await expect(page).toHaveURL(/wishlist/);
//     });

//     test('Verify Product Search', async ({ page }) => {

//         await homePage.searchProduct('Laptop');

//         await expect(page).toHaveURL(/search/);
//     });

//     test('Verify Featured Products Count', async () => {

//         const count = await homePage.getFeaturedProductsCount();

//         expect(count).toBeGreaterThan(0);
//     });

//     test('Verify Books Menu Navigation', async ({ page }) => {

//         await homePage.selectMenu('Books');

//         await expect(page).toHaveURL(/books/);
//     });

//     test('Verify Product Selection', async ({ page }) => {

//         await homePage.selectProduct('Build your own cheap computer');
//         await expect(page).toHaveURL(/build-your-cheap-own-computer/);
//     });

//     test('Verify Newsletter Subscription', async ({ page }) => {

//         await homePage.subscribe(
//             'testuser123@gmail.com'
//         );

//         await expect(page.locator('#newsletter-result-block')).toBeVisible();
//     });

//     test('Verify Community Poll Vote', async ({ page }) => {
//         await homePage.votePoll();
//         await expect(page.locator('.poll-vote-error')).toBeHidden();
//     });

// });





const { test, expect } = require('@playwright/test');
const { HomePage }     = require('../DemoWebShop_Pages/HomePage');

test.describe('Home Page Test Suite', () => {

    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await page.goto('https://demowebshop.tricentis.com/');
        await page.waitForLoadState('networkidle');
    });

    test('Verify website logo is visible', async () => {
        await expect(homePage.logo).toBeVisible();
    });

    test('Verify Register page navigation', async ({ page }) => {
        await homePage.openRegisterPage();
        await expect(page).toHaveURL(/register/);
    });

    test('Verify Login page navigation', async ({ page }) => {
        await homePage.openLoginPage();
        await expect(page).toHaveURL(/login/);
    });

    test('Verify Shopping Cart navigation', async ({ page }) => {
        await homePage.openShoppingCart();
        await expect(page).toHaveURL(/cart/);
    });

    test('Verify Wishlist navigation', async ({ page }) => {
        await homePage.openWishList();
        await expect(page).toHaveURL(/wishlist/);
    });

    test('Verify product search redirects to search page', async ({ page }) => {
        await homePage.searchProduct('Laptop');
        await expect(page).toHaveURL(/search/);
    });

    test('Verify featured products are displayed', async () => {
        const count = await homePage.getFeaturedProductsCount();
        expect(count).toBeGreaterThan(0);
    });

    test('Verify Books menu navigation', async ({ page }) => {
        await homePage.selectMenu('Books');
        await expect(page).toHaveURL(/books/);
    });

    test('Verify product selection opens product page', async ({ page }) => {
        await homePage.selectProduct('Build your own cheap computer');
        await expect(page).toHaveURL(/build-your-cheap-own-computer/);
    });

    test('Verify newsletter subscription shows confirmation', async ({ page }) => {
        await homePage.subscribe('testuser123@gmail.com');
        await expect(page.locator('#newsletter-result-block')).toBeVisible();
    });

    test('Verify community poll vote interaction', async ({ page }) => {
        await homePage.votePoll();
        await expect(page.locator('.poll-vote-error')).toBeHidden();
    });
});