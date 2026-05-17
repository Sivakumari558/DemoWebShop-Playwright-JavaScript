const {test, expect} = require('@playwright/test');
test('Verify product names on swag labs', async ({page}) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
   
    const products = page.locator('.inventory_item_name');
    const count = await page.products.count();
    //console.log("products available", count);
    for (let i = 0; i < count; i++) {
    console.log(await products.nth(i).textContent());
  }
    //for(let i = 0; i < count; i++)
    //{
        //const productName = await products.nth(i).textContents();
        //console.log(productName);

    //}
    await expect("products").toHaveCount(6);
});