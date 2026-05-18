class ThankyouPage {
    constructor(page) {
        this.page = page;
        this.successMessage = page.locator('.title').first();
        this.orderCompletedText = page.locator('.section.order-completed .details');
        this.orderNumber = page.locator('.order-number').first();
        this.continueBtn = page.getByRole('button', {name: 'Continue'});
        this.pdfInvoiceLink = page.getByRole('link', {name: 'PDF Invoice'});
        this.homePageLogo = page.locator('.header-logo a');
    }

    async isThankYouPageDisplayed() {
    await this.page.waitForTimeout(3000);
    const currentUrl = this.page.url();
        if (currentUrl.includes('/checkout/completed')) {
        return true;
        }
    const bodyText = await this.page.textContent('body');
    return bodyText.includes('Your order has been successfully processed!');
    }

    async getSuccessMessage() {
    await this.page.waitForTimeout(3000);
    const titleLocator = this.page.locator('.title').first();
    const isVisible = await titleLocator.isVisible().catch(() => false);
        if (isVisible) {
           return await titleLocator.textContent();
        }
    const pageText = await this.page.textContent('body');
    return pageText;
    }

    async getOrderCompletedText() {
        await this.orderCompletedText.waitFor({state: 'visible', timeout: 60000});
        return (await this.orderCompletedText.textContent()).trim();
    }

    async getOrderNumber() {
        const count = await this.orderNumber.count();
        if (count > 0) {
            return (await this.orderNumber.first().textContent()).trim();
        }
        return 'Order number not displayed';
    }

    async clickContinue() {
        await this.continueBtn.waitFor({state: 'visible', timeout: 60000});
        await this.continueBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async isPdfInvoiceVisible() {
        return await this.pdfInvoiceLink.isVisible();
    }

    async goToHomePage() {
        await this.homePageLogo.click();
        await this.page.waitForLoadState('networkidle');
    }

}

module.exports = { ThankyouPage };