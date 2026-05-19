const { expect } = require('@playwright/test');

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.billingFirstName       = page.locator('#BillingNewAddress_FirstName');
        this.billingLastName        = page.locator('#BillingNewAddress_LastName');
        this.billingEmail           = page.locator('#BillingNewAddress_Email');
        this.billingCountry         = page.locator('#BillingNewAddress_CountryId');
        this.billingCity            = page.locator('#BillingNewAddress_City');
        this.billingAddress1        = page.locator('#BillingNewAddress_Address1');
        this.billingZipPostalCode   = page.locator('#BillingNewAddress_ZipPostalCode');
        this.billingPhoneNumber     = page.locator('#BillingNewAddress_PhoneNumber');
        this.billingContinueBtn     = page.locator('#billing-buttons-container input.button-1.new-address-next-step-button');
        this.shippingAddressContinueBtn = page.locator('#shipping-buttons-container .new-address-next-step-button');
        this.shippingMethodContinueBtn  = page.locator('#shipping-method-buttons-container input.button-1.shipping-method-next-step-button');
        this.paymentMethodContinueBtn   = page.locator('#payment-method-buttons-container input.button-1.payment-method-next-step-button');
        this.paymentInfoContinueBtn     = page.locator('.payment-info-next-step-button');
        this.confirmOrderBtn            = page.locator('.confirm-order-next-step-button');
        this.orderSuccessMessage        = page.locator('.section.order-completed');
        this.orderNumber                = page.locator('.order-number');
    }

    async fillBillingAddress(details) {
        await this.page.waitForLoadState('networkidle');
        await this.page.locator('#billing-buttons-container').waitFor({ state: 'visible', timeout: 30000 });
        const addressDropdown = this.page.locator('#billing-address-select');
        if (await addressDropdown.isVisible()) {
            await addressDropdown.selectOption({ label: 'New Address' });
            await this.page.waitForLoadState('networkidle');
        }
        await this.billingCountry.waitFor({ state: 'visible', timeout: 30000 });
        await this.billingCountry.selectOption(details.country);
        await this.billingCity.fill(details.city);
        await this.billingAddress1.fill(details.address1);
        await this.billingZipPostalCode.fill(details.postalCode);
        await this.billingPhoneNumber.fill(details.phoneNumber);
        await this.billingContinueBtn.waitFor({ state: 'visible', timeout: 20000 });
        await this.billingContinueBtn.scrollIntoViewIfNeeded();
        await this.billingContinueBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async continueShippingAddress() {
        await this.page.locator('#opc-shipping').waitFor({ state: 'visible', timeout: 30000 });
        await this.page.waitForLoadState('networkidle');

        const continueBtn = this.shippingAddressContinueBtn;
        await continueBtn.waitFor({ state: 'visible', timeout: 20000 });
        await continueBtn.scrollIntoViewIfNeeded();
        await continueBtn.click({ force: true });
        await this.page.waitForLoadState('networkidle');
    }

    async selectShippingMethod() {
        await this.page.locator('#opc-shipping_method').waitFor({ state: 'visible', timeout: 30000 });
        await this.page.waitForLoadState('networkidle');
        const continueBtn = this.shippingMethodContinueBtn;
        await continueBtn.waitFor({ state: 'visible', timeout: 20000 });
        await continueBtn.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(800); 
        await continueBtn.click();
        await this.page.locator('#opc-payment_method').waitFor({ state: 'visible', timeout: 30000 });
    }

    async selectPaymentMethod() {
        await this.page.locator('#opc-payment_method').waitFor({ state: 'visible', timeout: 30000 });
        await this.page.waitForLoadState('networkidle');
        const paymentOption = this.page.locator('input[name="paymentmethod"]').first();
        await paymentOption.waitFor({ state: 'visible', timeout: 20000 });
        await paymentOption.check();
        const continueBtn = this.paymentMethodContinueBtn;
        await continueBtn.waitFor({ state: 'visible', timeout: 20000 });
        await continueBtn.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(800);
        await continueBtn.click();
        await this.page.locator('#opc-payment_info').waitFor({ state: 'visible', timeout: 30000 });
    }

    async continuePaymentInfo() {
        await this.page.locator('#opc-payment_info').waitFor({ state: 'visible', timeout: 30000 });
        await this.page.waitForLoadState('networkidle');
        const continueBtn = this.paymentInfoContinueBtn;
        await continueBtn.waitFor({ state: 'visible', timeout: 20000 });
        await continueBtn.scrollIntoViewIfNeeded();
        await continueBtn.click({ force: true });
        await this.page.locator('#opc-confirm_order').waitFor({ state: 'visible', timeout: 30000 });
        await this.page.waitForLoadState('networkidle');
    }

    async confirmOrder() {
        await this.page.waitForLoadState('networkidle');
        const confirmBtn = this.confirmOrderBtn;
        await confirmBtn.waitFor({ state: 'visible', timeout: 30000 });
        await confirmBtn.scrollIntoViewIfNeeded();
        await confirmBtn.click({ force: true });
        await expect(this.page.getByText('Your order has been successfully processed!')).toBeVisible({ timeout: 60000 });
        await expect(this.page).toHaveURL(/checkout\/completed/);
    }

    async completeCheckout(details) {
        await this.fillBillingAddress(details);
        await this.continueShippingAddress();
        await this.selectShippingMethod();
        await this.selectPaymentMethod();
        await this.continuePaymentInfo();
        await this.confirmOrder();
    }

    async getSuccessMessage() {
        await this.orderSuccessMessage.waitFor({ state: 'visible', timeout: 60000 });
        return await this.orderSuccessMessage.textContent();
    }

    async getOrderNumber() {
        await this.page.waitForURL('**/checkout/completed/**', { timeout: 60000 });
        await this.orderSuccessMessage.waitFor({ state: 'visible', timeout: 60000 });
        const count = await this.orderNumber.count();
        if (count > 0) {
            return (await this.orderNumber.first().textContent()).trim();
        }
        return 'Order completed successfully';
    }
}

module.exports = { CheckoutPage };