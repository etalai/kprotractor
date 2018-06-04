import { browser, by, element, promise, protractor } from 'protractor';

export class BaseObject {

  /** Click the element or button which  having the texts */
  clickButtonWithText(cssSelector, buttonText): promise.Promise<any> {
    return element.all(by.cssContainingText(cssSelector, buttonText)).first().click();
  }
  /**
   * Function to click the element
   */
  clickFunction(cssSelector): promise.Promise<any> {
    return element(by.css(cssSelector)).click();
  }

  fillFields(cssSelector, value): promise.Promise<any> {

    return element(by.css(cssSelector)).sendKeys(value);
  }

}
