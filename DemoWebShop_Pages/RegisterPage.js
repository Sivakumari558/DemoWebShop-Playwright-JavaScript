class RegisterPage {
    constructor(page) {
        this.page            = page;
        this.genderMale      = page.locator('#gender-male');
        this.genderFemale    = page.locator('#gender-female');
        this.firstName       = page.getByLabel('First name');
        this.lastName        = page.getByLabel('Last name');
        this.email           = page.getByLabel('Email');
        this.passWord        = page.locator('#Password');
        this.confirmPassword = page.locator('#ConfirmPassword');
        this.registerBtn     = page.getByRole('button', { name: 'Register' });
    }

    async register(gen, fn, ln, em, pass, cnfmPass) {
        await this.page.waitForLoadState('domcontentloaded');
        await this.genderMale.waitFor({ state: 'visible', timeout: 20000 });

        if (gen?.toLowerCase() === 'male') {
            await this.genderMale.check();
        } else {
            await this.genderFemale.click({ force: true });
        }

        await this.firstName.fill(fn);
        await this.lastName.fill(ln);
        await this.email.fill(em);
        await this.passWord.fill(pass);
        await this.confirmPassword.fill(cnfmPass);
        await this.registerBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { RegisterPage };