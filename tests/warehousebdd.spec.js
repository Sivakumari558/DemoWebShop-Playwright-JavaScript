const {test, expect} = require('@playwright/test');
test.beforeEach(async ({page}) => {
await page.goto('https://www.thewarehouse.co.nz', {waitUntil: 'domcontentloaded'});
await expect(page).toHaveURL('https://www.thewarehouse.co.nz');
await expect(page).toHaveTitle("The Warehouse NZ | Everyday Low Prices - Kiwi Owned");
});

test.describe('To Navigation to warehouse dashboard', async() => {

await test.step('Verify category root', async({page}) =>{
    
 const categoryRoot = page.locator("[data-test-id= category-root]")
 categoryRoot.hover();
 await expect(categoryRoot).toBeVisible(); 
});
 await test.step('To category homegarden from menu', async({page}) =>{
    
 await page.locator('.mega-menu-content-wrapper >> #category-homegarden').hover();
 await expect(page.locator('.mega-menu-content-wrapper').locator('#category-homegarden').first()).toHaveAttribute("data-target", "#mega-menu-category-homegarden");
 
});


});

test.afterEach(async ({page}) => {
await page.screenshot({path: 'warehouse.png'});

});