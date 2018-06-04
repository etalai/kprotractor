import { browser, by, element, promise, protractor } from 'protractor';


import { BasePage } from '../base.po';

export class ApplicationSSOPage extends BasePage {
    //common: CommonPage = new CommonPage();
    until = protractor.ExpectedConditions;

    fillInLoginCredentials(username, password): promise.Promise<any> {
        browser.wait(async () => {
            return (await browser.driver.findElements(by.id('idToken1'))).length > 0;
        }, 100 * 1000, 'Senate should be redirected to the login page within 100 sec');
        this.fillFields('#idToken1', username);

        return this.fillFields('#idToken2', password);
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
