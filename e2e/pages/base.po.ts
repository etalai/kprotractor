import { browser, by, element, promise, protractor } from 'protractor';
import { BaseObject } from './baseobject';


export class BasePage extends BaseObject {

  isConfirmationMsgExists(message): promise.Promise<any> {
    const until = protractor.ExpectedConditions;

    return browser.wait(until.presenceOf(element(
      by.cssContainingText('p', message))), 10 * 1000,
      `Confirmation message "${message}" should be displayed in 10 secs`)
      .then(() => true, () => false);

  }
}
