import { browser, by, element, promise, protractor } from 'protractor';
import { BasePage } from './base.po';

export class AppPage extends BasePage{
  navigateTo(): promise.Promise<any> {
    browser.waitForAngularEnabled(false);

    return browser.get('/');
  }

  getTitleText(): promise.Promise<any> {
    return element(by.css('dr-dashboard-getting-started h1')).getText();
  }

  navigateToPage(pageNm): promise.Promise<any> {
    const until = protractor.ExpectedConditions;
    browser.wait(until.not(until.presenceOf(element(by.css('.loading')))), 5000);
    element(by.cssContainingText('span.ui-menuitem-text', pageNm)).click();
    browser.sleep(500);

    return browser.wait(until.not(until.presenceOf(element(by.css('.loading')))), 20000);
  }

  waitForPageLoad(): promise.Promise<any> {
    // wait for manage page to load

    return  browser.wait(async () => {
      return (await browser.driver.findElements(by.id('idToken1'))).length > 0;
    }, 120 * 1000, 'Senate should be redirected to the login page within 120 sec');


  }

  loginToSenate(username, password): promise.Promise<any> {
    const deferred = protractor.promise.defer();
    const until = protractor.ExpectedConditions;

    browser.driver.getCurrentUrl().then(async url => {
      if (url.indexOf('sso.') === -1) {
        await browser.wait(until.presenceOf(element(by.css('dr-layout-toolbar-header i.senate-profile'))),
          10 * 1000, 'Logout menu item should appear within 10 sec');

        await browser.wait(until.not(until.presenceOf(element(by.css('.loading')))), 2000);
        await element(by.css('dr-layout-toolbar-header i.senate-profile')).click();
        await browser.sleep(200);
        await element(by.cssContainingText('mat-list mat-list-item', 'Logout')).click();
      }
    });

    // wait for login page to load
    this.waitForPageLoad();

    element(by.id('idToken1')).sendKeys(username);
    element(by.id('idToken2')).sendKeys(password);
    element(by.id('loginButton_0')).click();

    browser.wait(until.presenceOf(element(by.css('dr-layout-toolbar-header i.senate-profile'))),
      120 * 1000, 'After login senate should be redirected to the home page within 120 sec').then(() => {
        deferred.fulfill('Login successful');
      }, () => {
        deferred.reject('After login senate should be redirected to the home page within 25 sec');
      });

    browser.driver.findElements(by.xpath('//div[text()="Go to My listings"]')).then(async elems => {
      if (elems.length > 0) {
        element(by.xpath('//*[@id="wm-shoutout-94510"]//div[text()="x"]')).click();
      }
    });

    browser.driver.findElements(by.xpath('//div[text()="Get Started"]')).then(async elems => {
      if (elems.length > 0) {
        browser.driver.findElement(by.xpath('//div[text()="x"]')).click();
      }
    });

    // waitForAngular is set to true
    return deferred.promise;
  }
}
