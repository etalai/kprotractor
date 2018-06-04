import { expect } from 'chai';
import { defineSupportCode, setDefaultTimeout, Given, When, Then, Before, After } from 'cucumber';
import { browser } from 'protractor';

import { ApplicationSSOPage } from '../../pages/application-sso/application-sso.po';

//defineSupportCode(({ Given, When, Then, Before, After }) => {
let login: ApplicationSSOPage = new ApplicationSSOPage();
// tslint:disable-next-line:no-require-imports
const userDataConfig = require('c:/kprotractor/e2e/testdata/e2e.test.sso.json');

Given('I have entered the {string} and {string}', { timeout: 60 * 1000 },
    async (userName, passwordText) => {
        // Write code here that turns the phrase above into concrete actions
        browser.waitForAngularEnabled(false);
        browser.get('/');
        const username = userDataConfig.credentials[userName];
        const password = userDataConfig.credentials[passwordText];

        await login.fillInLoginCredentials(username, password);
    });

Given('I click login button',
    async () => {
        await login.clickLoginButton();
    });

Then('I am redirected to the homepage', { timeout: 60 * 1000 },
    async () => {
        const expectedUrl = userDataConfig.urls['home-page-url'];

        return expect(await login.getHomePageUrl()).to.equal(expectedUrl);
    });

Then('I see the {string} error message', async errorMessage => {

});

Then('I am redirected to the loginPage', async () => {

});

