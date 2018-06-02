import { $, browser, by, element, ElementFinder, promise, protractor } from 'protractor';

import { BasePage } from '../base.po';

export class FilesPage extends BasePage {

  loadingDiv: ElementFinder;
  confirmDeleteBtn: ElementFinder;
  deleteBtn: ElementFinder;
  addFileBtn: ElementFinder;

  constructor() {
    super();
    this.loadingDiv = $('div.loading');
    this.confirmDeleteBtn = element(by.cssContainingText('button span', 'Confirm Delete'));
    this.deleteBtn = element(by.cssContainingText('button', 'Delete'));
    this.addFileBtn = element(by.css('input[type="file"]'));
  }
  getFileTreeItemByName(fileName): ElementFinder {
    return element(by.xpath(`//td[text()="${fileName}"]`));
  }

  waitForPageLoad(): promise.Promise<any> {
    // wait for manage page to load
    const until = protractor.ExpectedConditions;

    return browser.wait(until.presenceOf(this.getFileTreeItemByName('Automation')),
      10 * 1000, 'Manage Data page should be loaded in 10 secs');
  }

  deleteFile(fileName): promise.Promise<any> {
    const until = protractor.ExpectedConditions;
    const deferred = protractor.promise.defer();

    browser.findElements(by.cssContainingText('td', fileName)).then(async elems => {
      if (elems.length > 0) {
        browser.wait(until.not(until.presenceOf(this.loadingDiv)), 5000);
        this.getFileTreeItemByName(fileName).click();
        this.deleteBtn.click();
        browser.wait(until.not(until.presenceOf(this.loadingDiv)), 5000);
        this.confirmDeleteBtn.click();

        browser.wait(until.presenceOf(element(by.cssContainingText('p', 'The path has been succesfully deleted'))),
          10 * 1000, 'Confirmation message "The path has been succesfully deleted" should be displayed in 10 secs')
          .then(() => {
            deferred.fulfill('File deleted successfully');
          }, () => {
            deferred.reject('Confirmation message "The path has been succesfully deleted" should be displayed in 10 secs');
          });

      } else {
        deferred.fulfill(`${fileName} is already deleted`);
      }
    });

    return deferred.promise;
  }

  uploadFile(filePath, foldername): promise.Promise<any> {
    // wait for manage page to load
    this.getFileTreeItemByName(foldername).click();

    return this.addFileBtn.sendKeys(filePath);
  }
}
