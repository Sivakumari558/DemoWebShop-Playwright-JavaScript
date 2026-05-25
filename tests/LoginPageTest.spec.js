const { test, expect } = require('@playwright/test');
const { LoginPage }    = require('../DemoWebShop_Pages/LoginPage');
const testData         = require('../testData/testdata.json');

test.describe('Login Page Test Suite', () => {

    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goToPage();
    });

    test('Verify login page URL', async ({ page }) => {
        await expect(page).toHaveURL(/login/);
    });

    test('Verify valid login navigates to home', async ({ page }) => {
        await loginPage.validLogin(testData.validUser.email, testData.validUser.password);
        await expect(page.getByRole('link', { name: 'My account' })).toBeVisible();
    });

    test('Verify invalid login shows error message', async () => {
        await loginPage.validLogin(testData.invalidUser.email, testData.invalidUser.password);
        await expect(loginPage.errorMessage).toBeVisible();
    });

    test('Verify empty credentials show error message', async () => {
        await loginPage.loginBtn.click();
        await expect(loginPage.errorMessage).toBeVisible();
    });

    test('Verify password field is masked', async () => {
        await expect(loginPage.password).toHaveAttribute('type', 'password');
    });
});