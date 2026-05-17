const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../DemoWebShop_Pages/RegisterPage');
const testData = require('../testData/testdata.json');

test.describe('Register Page Test Suite - Demo Web Shop', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/register');
  });

  test('Register user successfully', async ({ page }) => {

  await page.goto('https://demowebshop.tricentis.com/register');
  const register = new RegisterPage(page);
  const email = `user_${Date.now()}@test.com`;
  const user = testData.registerUser;
  await register.register( user.gender, user.firstName, user.lastName, email, user.password, user.confirmPassword);
  await expect(page).toHaveURL(/registerresult/);
  await expect(page.getByText('Your registration completed')).toBeVisible();
});

  test('Register user with invalid email format', async ({ page }) => {
    const register = new RegisterPage(page);
    const user = testData.registerUser;
    await register.register(user.gender, user.firstName, user.lastName, testData.invalidEmail, user.password, user.confirmPassword);
    await expect(page.locator('#Email')).toBeVisible();
  });

  test('Register user with mismatched password', async ({ page }) => {
    const register = new RegisterPage(page);
    const user = testData.registerUser;
    await register.register(user.gender, user.firstName, user.lastName, testData.validUser.email, user.password,'WrongConfirm123');
    await expect(page.locator('.field-validation-error, .error')).toBeVisible();
  });

});