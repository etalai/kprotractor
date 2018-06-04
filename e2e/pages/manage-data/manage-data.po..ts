import { $, browser, by, element, ElementFinder, promise, protractor } from 'protractor';

import { BasePage } from '../base.po';

export class ManageDataPage extends BasePage {
  constructor() {
    super();
  }
  
  waitForPageLoad(): promise.Promise<any> {
    // wait for manage page to load
    const until = protractor.ExpectedConditions;

    return browser.wait(until.presenceOf(this.getFileTreeItemByName('Automation')),
      10 * 1000, 'Manage Data page should be loaded in 10 secs');
  }

  getFileTreeItemByName(fileName): ElementFinder {
    return element(by.xpath(`//td[text()="${fileName}"]`));
  }

}
