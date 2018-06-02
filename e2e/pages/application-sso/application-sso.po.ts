import { browser, by, element, promise, protractor } from 'protractor';

import { CommonPage } from '../common.po';

export class ApplicationSSOPage {
    common: CommonPage = new CommonPage();
    until = protractor.ExpectedConditions;

    fillInLoginCredentials(username, password): promise.Promise<any> {
        browser.wait(async () => {
            return (await browser.driver.findElements(by.id('idToken1'))).length > 0;
        }, 10 * 1000, 'Senate should be redirected to the login page within 10 sec');
        this.common.fillFields('#idToken1', username);

        return this.common.fillFields('#idToken2', password);
    }

    clickLoginButton(): promise.Promise<any> {
        return browser.driver.findElement(by.id('loginButton_0')).click();
    }
    getHomePageUrl(): promise.Promise<any> {
        browser.wait(this.until.presenceOf(element(by.css('dr-dashboard-getting-started h1'))), 2000);

        return browser.driver.getCurrentUrl();
    }

    verifyLoginPage(): promise.Promise<any> {
        return (browser.driver.findElement(by.id('idToken1')).isDisplayed());
    }

}
