class HomePage {
    constructor(page) {
        this.page = page;
        this.registerLink      = page.getByRole('link', { name: 'Register' });
        this.loginLink         = page.getByRole('link', { name: 'Log in' });
        this.shoppingCartLink  = page.getByRole('link', { name: 'Shopping cart' }).first();
        this.wishlistLink      = page.getByRole('link', { name: 'Wishlist' }).first();
        this.searchInput       = page.locator('#small-searchterms');
        this.searchBtn         = page.getByRole('button', { name: 'Search' });
        this.newsletterInput   = page.locator('#newsletter-email');
        this.subscribeBtn      = page.getByRole('button', { name: 'Subscribe' });
        this.voteBtn           = page.getByRole('button', { name: 'Vote' });
        this.featuredProducts  = page.locator('.product-item');
        this.logo              = page.locator('.header-logo a');
        this.menuLinks = (name) => page.getByRole('link', { name, exact: true });
    }

    async searchProduct(productName) {
        await this.searchInput.waitFor({ state: 'visible', timeout: 30000 });
        await this.searchInput.clear();
        await this.searchInput.fill(productName);
        await this.searchBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async openRegisterPage() {
        await this.registerLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async openLoginPage() {
        await this.loginLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async openShoppingCart() {
        await this.shoppingCartLink.waitFor({ state: 'visible', timeout: 20000 });
        await this.shoppingCartLink.click();
        await this.page.waitForURL('**/cart', { timeout: 30000 });
        await this.page.waitForLoadState('networkidle');
    }

    async openWishList() {
        await this.wishlistLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async subscribe(email) {
        await this.newsletterInput.fill(email);
        await this.subscribeBtn.click();
    }

    async votePoll() {
        await this.voteBtn.click();
    }

    async getFeaturedProductsCount() {
        return await this.featuredProducts.count();
    }

    async selectMenu(menuName) {
        const link = this.menuLinks(menuName).first();
        await link.waitFor({ state: 'visible', timeout: 30000 });
        await link.click({ force: true });
        await this.page.waitForLoadState('domcontentloaded');
    }

    async selectProduct(productName) {
        const link = this.page.getByRole('link', { name: productName }).first();
        await link.waitFor({ state: 'visible', timeout: 30000 });
        await link.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { HomePage };