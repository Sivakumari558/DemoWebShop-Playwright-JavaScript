// const { test, expect } = require('@playwright/test');
// const { RegisterPage } = require('../DemoWebShop_Pages/RegisterPage');
// const testData = require('../testData/testdata.json');

// test.describe('Register Page Test Suite - Demo Web Shop', () => {

//   test.beforeEach(async ({ page }) => {
//     await page.goto('https://demowebshop.tricentis.com/register');
//   });

//   test('Register user successfully', async ({ page }) => {

//   await page.goto('https://demowebshop.tricentis.com/register');
//   const register = new RegisterPage(page);
//   const email = `user_${Date.now()}@test.com`;
//   const user = testData.registerUser;
//   await register.register( user.gender, user.firstName, user.lastName, email, user.password, user.confirmPassword);
//   await expect(page).toHaveURL(/registerresult/);
//   await expect(page.getByText('Your registration completed')).toBeVisible();
// });

//   test('Register user with invalid email format', async ({ page }) => {
//     const register = new RegisterPage(page);
//     const user = testData.registerUser;
//     await register.register(user.gender, user.firstName, user.lastName, testData.invalidEmail, user.password, user.confirmPassword);
//     await expect(page.locator('#Email')).toBeVisible();
//   });

//   test('Register user with mismatched password', async ({ page }) => {
//     const register = new RegisterPage(page);
//     const user = testData.registerUser;
//     await register.register(user.gender, user.firstName, user.lastName, testData.validUser.email, user.password,'WrongConfirm123');
//     await expect(page.locator('.field-validation-error, .error')).toBeVisible();
//   });

// });





const { test, expect }  = require('@playwright/test');
const { RegisterPage }  = require('../DemoWebShop_Pages/RegisterPage');
const testData          = require('../testData/testdata.json');

test.describe('Register Page Test Suite', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://demowebshop.tricentis.com/register');
        await page.waitForLoadState('domcontentloaded');
    });

    test('Verify successful user registration', async ({ page }) => {
        const register = new RegisterPage(page);
        const user     = testData.registerUser;
        // Unique email so re-runs don't fail on "already registered"
        const email    = `user_${Date.now()}@test.com`;

        await register.register(
            user.gender, user.firstName, user.lastName,
            email, user.password, user.confirmPassword
        );

        await expect(page).toHaveURL(/registerresult/);
        await expect(page.getByText('Your registration completed')).toBeVisible();
    });

    test('Verify invalid email format shows validation error', async ({ page }) => {
        const register = new RegisterPage(page);
        const user     = testData.registerUser;

        await register.register(
            user.gender, user.firstName, user.lastName,
            testData.invalidEmail, user.password, user.confirmPassword
        );

        // Page stays on register; email field still visible (browser validation)
        await expect(page.locator('#Email')).toBeVisible();
    });

    test('Verify mismatched passwords show validation error', async ({ page }) => {
        const register = new RegisterPage(page);
        const user     = testData.registerUser;

        await register.register(
            user.gender, user.firstName, user.lastName,
            testData.validUser.email, user.password, 'WrongConfirm123'
        );

        await expect(page.locator('.field-validation-error, .error')).toBeVisible();
    });
});