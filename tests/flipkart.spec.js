const {test, expect} = require('@playwright/test');
test('Flipkart Dashboard', async({page}) => {
 await page.goto('https://www.flipkart.com/');
 //await expect(page).toBeVisible(/dashboard/);
 await expect(page).toHaveURL('https://www.flipkart.com/');
});