class HomePage {
 constructor(page) {
  this.page = page;
  this.registerLink = page.getByRole('link', {name: 'Register'});
  this.loginLink = page.getByRole('link', {name: 'Log in'});
  this.shoppingCartLink = page.getByRole('link', {name: 'Shopping cart'}).first();
  this.wishlistLink = page.getByRole('link', {name: 'Wishlist'}).first();
  this.searchInput = page.locator('#small-searchterms');
  this.searchBtn = page.getByRole('button', {name: 'Search'});
   this.menuLinks = (menuName) => page.getByRole('link', { name: menuName, exact: true });
  this.newsletterEmailInput = page.locator('#newsletter-email');
  this.subscribeBtn = page.getByRole('button', {name: 'Subscribe'});
  this.voteBtn = page.getByRole('button', {name: 'Vote'});
  this.featuredProducts = page.locator(".product-item");
  this.logo = page.locator(".header-logo a");
 }

  async searchProduct(productName) {
   await this.searchInput.fill(productName);
   await this.searchBtn.click();
  }

 async openRegisterPage() {
   await this.registerLink.click();
 }

 async openLoginPage() {
   await this.loginLink.click();
 }

 async openShoppingCart() {
   await this.shoppingCartLink.click();
    await this.page.waitForURL('**/cart');
    await this.page.waitForLoadState('networkidle');
 }

 async openWishList() {
   await this.wishlistLink.click();
 }
 
 async subscribe(email) {
    await this.newsletterEmailInput.fill(email);
    await this.subscribeBtn.click();
 }

 async votePoll() {
    await this.voteBtn.click();
 }

async getFeaturedProductsCount() {
  return await this.featuredProducts.count();
  }

async selectMenu(menuName) {
    await this.menuLinks(menuName).first().waitFor({state: 'visible', timeout: 60000});
    await this.menuLinks(menuName).first().click({force: true});
}

async selectProduct(productName) {
    await this.page.getByRole('link', { name: productName }).first().waitFor({ state: 'visible' });
    await this.page.getByRole('link', { name: productName }).first().click();
    await this.page.waitForLoadState('networkidle');
  }

}

module.exports = { HomePage };