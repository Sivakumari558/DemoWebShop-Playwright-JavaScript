class ShoppingCart {
    constructor(page) {
        this.page = page;
        this.cartRows = page.locator('table.cart tbody tr.cart-item-row');
        this.emptyCartMessage = page.locator('.order-summary-content');
        this.removeCheckbox = page.locator('input[name="removefromcart"]');
        this.productName = page.locator('.product-name a');
        this.unitPrice = page.locator('.product-unit-price');
        this.processorRadio = page.locator('#product_attribute_72_5_18_65');
        this.ramRadio = page.locator('#product_attribute_72_6_19_55');
        this.hddRadio = page.locator('#product_attribute_72_3_20_57');
        this.osRadio = page.locator('#product_attribute_72_4_21_61');
        this.softwareCheckbox = page.locator('#product_attribute_72_8_22_69');
        this.addToCartBtn = page.locator('#add-to-cart-button-72');
        this.contShoppingBtn = page.getByRole('button', {name: 'Continue shopping'});
        this.updateShoppingBtn = page.getByRole('button', {name: 'Update shopping cart'});
        this.countryInput = page.locator('#CountryId');
        this.stateInput = page.locator('#StateProvinceId');
        this.postalCode = page.getByLabel('Zip / postal code');
        this.estimateShipBtn = page.getByRole('button', {name: 'Estimate shipping'});
        this.couponInput = page.locator('#discountcouponcode');
        this.couponBtn = page.getByRole('button', {name: 'Apply coupon'});
        this.couponMessage = page.locator('.message');
        this.giftCardInput = page.locator('#giftcardcouponcode');
        this.giftCardBtn = page.getByRole('button', {name: 'Add gift card'});
        this.termsCheck = page.locator('#termsofservice');
        this.checkOutBtn = page.locator('#checkout');
    }

    async isCartEmpty() {
        return await this.emptyCartMessage.isVisible();
    }

    async addProductToCart() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1000);
    const addBtn = this.addToCartBtn;
    const count = await addBtn.count();
    if (count === 0) {
        throw new Error('Add to cart button not found');
    }
    const isVisible = await addBtn.isVisible().catch(() => false);
    if (isVisible) {
        await addBtn.click({force: true});
    }
    else {
        console.log('Using JS click for add to cart');
        await this.page.evaluate(() => {
            const btn = document.querySelector('#add-to-cart-button-72');
            if (btn) {
                btn.click();
            }
        });
    }
    await this.page.waitForTimeout(3000);
    const successBar = this.page.locator('.bar-notification.success');
        if (await successBar.count() > 0) {
             console.log('Product added successfully');
        }
    }

    async getCartItemCount() {
        return await this.cartRows.count();
    }

    async continueShopping() {
        await this.contShoppingBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async updateShoppingCart() {
        await this.updateShoppingBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async removeItem(rowIndex = 0) {
        await this.removeCheckbox.nth(rowIndex).check();
        await this.updateShoppingBtn.click();
    }

    async removeAllItems() {
        const count = await this.removeCheckbox.count();
        for (let i = 0; i < count; i++) {
            await this.removeCheckbox.nth(i).check();
        }
        await this.updateShoppingBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async estimateShipping(cntry, state, postal) {
        await this.countryInput.selectOption(cntry);
        await this.stateInput.selectOption(state);
        await this.postalCode.fill(postal);

        await this.estimateShipBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async getCouponMessage() {
        return (await this.couponMessage.textContent()).trim();
    }

    async checkOut() {
        await this.termsCheck.check();

        await this.checkOutBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async clearCartIfNotEmpty() {
    await this.page.goto('https://demowebshop.tricentis.com/cart');
    await this.page.waitForLoadState('networkidle');
    const removeCount = await this.removeCheckbox.count();
        if (removeCount > 0) {
        for (let i = 0; i < removeCount; i++) {
            await this.removeCheckbox.nth(i).check();
        }
        await this.updateShoppingBtn.click();
        await this.page.waitForLoadState('networkidle');
        }
    }
}

module.exports = { ShoppingCart };