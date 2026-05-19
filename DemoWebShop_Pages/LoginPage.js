// class LoginPage {
//      constructor(page) {
//         this.page = page;
//         this.email = page.getByLabel("Email");
//         this.password = page.getByLabel('Password');
//         this.loginBtn = page.getByRole('button', {name: 'Log in'});
//         this.errorMessage = page.getByText('Login was unsuccessful');
//      }

//      async goToPage() {
//        await this.page.goto('https://demowebshop.tricentis.com/login');
//      }

//      async validLogin(mail, pass) {
//        await this.email.fill(mail);
//        await this.password.fill(pass);
//       await this.loginBtn.click()
//     }
// }

// module.exports = { LoginPage };




class LoginPage {
    constructor(page) {
        this.page     = page;
        this.email    = page.getByLabel('Email');
        this.password = page.getByLabel('Password');
        this.loginBtn = page.getByRole('button', { name: 'Log in' });
        this.errorMessage = page.getByText('Login was unsuccessful');
    }

    async goToPage() {
        await this.page.goto('https://demowebshop.tricentis.com/login');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async validLogin(mail, pass) {
        await this.email.waitFor({ state: 'visible', timeout: 20000 });
        await this.email.fill(mail);
        await this.password.fill(pass);
        await this.loginBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { LoginPage };