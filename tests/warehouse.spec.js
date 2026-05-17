const {test, expect} = require('@playwright/test');
test.describe('Warehouse page', async() => {
      
await test.step('navigation to warehouse', async({page}) => {
await page.goto('https://www.thewarehouse.co.nz', {waitUntil: 'domcontentloaded'});
await expect(page).toHaveURL('https://www.thewarehouse.co.nz');
await expect(page).toHaveTitle("The Warehouse NZ | Everyday Low Prices - Kiwi Owned");
const categoryRoot = page.locator("[data-test-id= category-root]")
 categoryRoot.hover();
 await expect(categoryRoot).toBeVisible(); 
});
 await test.step('clicking on homegarden', async({page}) => {
 await page.locator('.mega-menu-content-wrapper >> #category-homegarden').hover();
 await expect(page.locator('.mega-menu-content-wrapper')
      .locator('#category-homegarden')
      .first()).toHaveAttribute("data-target", "#mega-menu-category-homegarden");
});
});
