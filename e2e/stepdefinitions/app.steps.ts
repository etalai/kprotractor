import { expect } from 'chai';
import { defineSupportCode, setDefaultTimeout, Given, When, Then, Before, After } from 'cucumber';
import { browser, By } from 'protractor';

import { AppPage } from '../pages/app.po';


let app: AppPage;
// tslint:disable-next-line:no-require-imports
const testdataconfig = require('../../../e2e/testdata/e2e.test.config.json');

Before(() => {
  app = new AppPage();
});

Given('I am not logged in',
  () => undefined);

Given('{string} is logged in', { timeout: 60 * 1000 },
  async user => {
    // Write code here that turns the phrase above into concrete actions
    browser.waitForAngularEnabled(false);
    browser.get('/');
    const username = testdataconfig.organisation.users[user].username;
    const password = testdataconfig.organisation.users[user].password;

    await app.loginToSenate(username, password);
  });

When('I navigate to {string} page', { timeout: 60 * 1000 }, async pageNm => {
  await app.navigateToPage(pageNm);
});

When('I am navigating to Senate', { timeout: 60 * 1000 },
  () => app.navigateTo());

// code developed as part of sample tests not in use, to be deleted later
Then('I should be redirected to the login page', { timeout: 60 * 1000 },
  async () => {
    const expectedUrl =
      'https://sso.qa.datarepublic.com.au/am/XUI/#login/&goto=http%3A%2F%2Fapp.qa.datarepublic.com.au%3A80%2F';

    await browser.wait(async () => {
      return await browser.driver.getCurrentUrl() === expectedUrl;
    }, 10 * 1000, 'Senate should be redirected to the page within 10 sec');

    return expect(await browser.driver.getCurrentUrl()).to.equal(expectedUrl);
  });

When('I enter my credentials',
  async () => {
    await browser.wait(async () => {
      return (await browser.driver.findElements(By.id('idToken1'))).length > 0;
    }, 10 * 1000, 'Senate should be redirected to the page within 10 sec');

    const userNameInput = await browser.driver.findElement(By.id('idToken1'));
    userNameInput.sendKeys('laxmane@adaps.com.au');

    const passwordInput = await browser.driver.findElement(By.id('idToken2'));
    passwordInput.sendKeys('lenspace1!');

    return (await browser.driver.findElement(By.id('loginButton_0'))).click();
  });

Then('I should be redirected back to Senate', { timeout: 60 * 1000 },
  async () => {
    const expectedUrl =
      'https://app.qa.datarepublic.com.au/getting-started';
    await browser.sleep(10000);
    await browser.wait(async () => {
      return await browser.driver.getCurrentUrl() === expectedUrl;
    }, 10 * 1000, 'It should be redirected back to the senate home page within 10 sec');

    return expect(await browser.driver.getCurrentUrl()).to.equal(expectedUrl);
  });

