class ShoppingCart {
    constructor(page) {
        this.page              = page;
        this.cartRows          = page.locator('table.cart tbody tr.cart-item-row');
        this.emptyCartMessage  = page.locator('.order-summary-content');
        this.removeCheckbox    = page.locator('input[name="removefromcart"]');
        this.productName       = page.locator('.product-name a');
        this.unitPrice         = page.locator('.product-unit-price');
        this.addToCartBtn      = page.locator('#add-to-cart-button-72');
        this.contShoppingBtn   = page.getByRole('button', { name: 'Continue shopping' });
        this.updateShoppingBtn = page.getByRole('button', { name: 'Update shopping cart' });
        this.countryInput      = page.locator('#CountryId');
        this.stateInput        = page.locator('#StateProvinceId');
        this.postalCode        = page.getByLabel('Zip / postal code');
        this.estimateShipBtn   = page.getByRole('button', { name: 'Estimate shipping' });
        this.couponInput       = page.locator('#discountcouponcode');
        this.couponBtn         = page.getByRole('button', { name: 'Apply coupon' });
        this.couponMessage     = page.locator('.message');
        this.giftCardInput     = page.locator('#giftcardcouponcode');
        this.giftCardBtn       = page.getByRole('button', { name: 'Add gift card' });
        this.termsCheck        = page.locator('#termsofservice');
        this.checkOutBtn       = page.locator('#checkout');
    }

    async isCartEmpty() {
        return await this.emptyCartMessage.isVisible();
    }

    async addProductToCart() {
        await this.page.waitForLoadState('networkidle');
        await this.addToCartBtn.waitFor({ state: 'visible', timeout: 30000 });
        await this.addToCartBtn.scrollIntoViewIfNeeded();
        await this.addToCartBtn.click({ force: true });
        const successBar = this.page.locator('.bar-notification.success');
        await successBar.waitFor({ state: 'visible', timeout: 30000 });
        console.log('Product added to cart successfully');
        const closeBtn = successBar.locator('.close');
        if (await closeBtn.count() > 0) {
            await closeBtn.click();
            await successBar.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
        }
        await this.page.waitForLoadState('networkidle');
    }

    async getCartItemCount() {
        return await this.cartRows.count();
    }

    async continueShopping() {
        await this.contShoppingBtn.waitFor({ state: 'visible', timeout: 20000 });
        await this.contShoppingBtn.scrollIntoViewIfNeeded();
        await this.contShoppingBtn.click({ force: true });
        await this.page.waitForLoadState('networkidle');
    }

    async updateShoppingCart() {
        await this.page.waitForLoadState('networkidle');
        await this.updateShoppingBtn.waitFor({ state: 'visible', timeout: 20000 });
        await this.updateShoppingBtn.scrollIntoViewIfNeeded();
        await this.updateShoppingBtn.click({ force: true });
        await this.page.waitForLoadState('networkidle');
    }

    async removeItem(rowIndex = 0) {
        await this.removeCheckbox.nth(rowIndex).check();
        await this.updateShoppingBtn.click();
        await this.page.waitForLoadState('networkidle');
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
        await this.page.waitForLoadState('networkidle');
        const estimatorToggle = this.page.locator('.estimate-shipping .title, .estimate-shipping h4');
        if (await estimatorToggle.count() > 0) {
            const isCollapsed = await this.page.locator('.estimate-shipping .formlist').isHidden().catch(() => false);
            if (isCollapsed) {
                await estimatorToggle.click();
                await this.page.waitForTimeout(600);
            }
        }
        await this.countryInput.waitFor({ state: 'visible', timeout: 30000 });
        await this.countryInput.scrollIntoViewIfNeeded();
        await this.countryInput.selectOption(cntry);
        await this.stateInput.waitFor({ state: 'visible', timeout: 15000 });
        await this.stateInput.selectOption(state);
        await this.postalCode.waitFor({ state: 'visible', timeout: 10000 });
        await this.postalCode.fill(postal);
        await this.estimateShipBtn.scrollIntoViewIfNeeded();
        await this.estimateShipBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async getCouponMessage() {
        return (await this.couponMessage.textContent()).trim();
    }

    async checkOut() {
        await this.page.waitForURL('**/cart', { timeout: 30000 });
        await this.page.waitForLoadState('networkidle');
        const notificationClose = this.page.locator('.bar-notification .close');
        if (await notificationClose.count() > 0 && await notificationClose.first().isVisible()) {
            await notificationClose.first().click();
        }
        const itemCount = await this.page.locator('.cart-item-row').count();
        if (itemCount === 0) throw new Error('Cannot checkout — cart is empty');
        const termsCheckbox = this.page.locator('#termsofservice');
        await termsCheckbox.waitFor({ state: 'visible', timeout: 20000 });
        await termsCheckbox.scrollIntoViewIfNeeded();
        if (!(await termsCheckbox.isChecked())) {
            await termsCheckbox.click({ force: true });
        }
        const checkoutBtn = this.page.locator('#checkout');
        await checkoutBtn.waitFor({ state: 'visible', timeout: 20000 });
        await checkoutBtn.scrollIntoViewIfNeeded();
        await checkoutBtn.click({ force: true });
        await this.page.waitForURL('**/onepagecheckout', { timeout: 45000 });
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