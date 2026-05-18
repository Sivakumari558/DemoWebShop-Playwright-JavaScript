const { expect } = require('@playwright/test');
class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.billingFirstName = page.locator('#BillingNewAddress_FirstName');
        this.billingLastName = page.locator('#BillingNewAddress_LastName');
        this.billingEmail = page.locator('#BillingNewAddress_Email');
        this.billingCountry = page.locator('#BillingNewAddress_CountryId');
        this.billingCity = page.locator('#BillingNewAddress_City');
        this.billingAddress1 = page.locator('#BillingNewAddress_Address1');
        this.billingZipPostalCode = page.locator('#BillingNewAddress_ZipPostalCode');
        this.billingPhoneNumber = page.locator('#BillingNewAddress_PhoneNumber');
        this.billingContinueBtn = page.locator('#billing-buttons-container input.button-1.new-address-next-step-button');
        this.shippingAddressContinueBtn = page.locator('#shipping-buttons-container .new-address-next-step-button');
        this.shippingMethodContinueBtn = page.locator('#shipping-method-buttons-container input.button-1.shipping-method-next-step-button');
        this.paymentMethodContinueBtn = page.locator('#payment-method-buttons-container input.button-1.payment-method-next-step-button');
        this.paymentInfoContinueBtn = page.locator('.payment-info-next-step-button');
        this.groundShippingMethod = page.locator('#shippingoption_0');
        this.cashOnDelivery = page.locator('input[name="paymentmethod"]').first();
        this.confirmOrderBtn = page.locator('.confirm-order-next-step-button');
        this.orderSuccessMessage = page.locator('.section.order-completed');
        this.orderNumber = page.locator('.order-number');
    }

    async fillBillingAddress(details) {
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('#billing-buttons-container').waitFor({ state: 'visible' });
    const addressDropdown = this.page.locator('#billing-address-select');
    if (await addressDropdown.isVisible()) {
        await addressDropdown.selectOption({label: 'New Address'});
    }
    await this.billingCountry.waitFor({state: 'visible', timeout: 60000});
    await this.billingCountry.selectOption(details.country);
    await this.billingCity.fill(details.city);
    await this.billingAddress1.fill(details.address1);
    await this.billingZipPostalCode.fill(details.postalCode);
    await this.billingPhoneNumber.fill(details.phoneNumber);
    await this.billingContinueBtn.waitFor({state: 'visible'});
    await this.billingContinueBtn.click();
    await this.page.waitForLoadState('networkidle');
    }

    async continueShippingAddress() {
    await this.page.waitForTimeout(2000);
    const shippingSection = this.page.locator('#opc-shipping');
    await shippingSection.waitFor({state: 'visible', timeout: 30000});
    const continueBtn = this.page.locator('#shipping-buttons-container .new-address-next-step-button');
    await continueBtn.click({force: true});
    await this.page.waitForTimeout(1000);
    }

    async selectPaymentMethod() {
    const paymentMethodBtn = this.page.locator('#payment-method-buttons-container .payment-method-next-step-button');
    await paymentMethodBtn.click({force: true});
    await this.page.waitForTimeout(1000);
    }

    async continuePaymentInfo() {
    const paymentInfoBtn = this.page.locator('#payment-info-buttons-container .payment-info-next-step-button');
    await paymentInfoBtn.click({force: true});
    await this.page.waitForTimeout(1000);
    }

    async completeCheckout(details) {
    await this.fillBillingAddress(details);
    await this.continueShippingAddress();
    await this.selectShippingMethod();
    await this.selectPaymentMethod();
    await this.continuePaymentInfo();
    await this.confirmOrder();
    }

async confirmOrder() {
    const confirmBtn = this.page.locator('#confirm-order-buttons-container .confirm-order-next-step-button');
    await confirmBtn.click({force: true});
    await this.page.waitForTimeout(5000);
    }

    async getSuccessMessage() {
    await this.orderSuccessMessage.waitFor({state: 'visible', timeout: 60000});
    return await this.orderSuccessMessage.textContent();
    }

    async getOrderNumber() {
    await this.page.waitForURL('**/checkout/completed/**',{timeout: 60000});
    await this.orderSuccessMessage.waitFor({state: 'visible', timeout: 60000});
    const orderNumberLocator = this.page.locator('.order-number');
    const count = await orderNumberLocator.count();
        if (count > 0) {
        return (
            await orderNumberLocator.first().textContent()).trim();
        }
        return 'Order completed successfully';
    }

    async selectShippingMethod() {
    const shippingMethodBtn = this.page.locator('#shipping-method-buttons-container .shipping-method-next-step-button');
    await shippingMethodBtn.click({force: true});
    await this.page.waitForTimeout(1000);
    }

}

module.exports = { CheckoutPage };