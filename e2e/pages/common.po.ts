import {  by, element, promise } from 'protractor';

export class CommonPage {
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

  selectDropDown(value): promise.Promise<any> {
    element(by.css('span.ui-clickable.fa.fa-fw.fa-caret-down')).click();

    return element(by.cssContainingText('span.ng-star-inserted', value)).click();
  }

  clickButtonWithXpathAndText(value): promise.Promise<any> {
    // tslint:disable-next-line:prefer-template
    return element(by.xpath('//*[@id=\'ui-dialog-1-label\']/../following-sibling::div/p-footer/button/span[text()=\''
      + value + '\']')).click();
  }

  clickCalendarCurrentDate(): promise.Promise<any> {
    element(by.css('.ui-calendar input')).click();

    return element(by.css('.ui-calendar a.ui-state-highlight')).click();
  }

  getTodaysDate(): string {
    const today = new Date();
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1; // January is 0!
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }

    return `${dd}-${mm}-${yyyy}`;
  }

}
