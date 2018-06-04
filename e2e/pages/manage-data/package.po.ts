import { $, browser, by, element, ElementFinder, promise, protractor } from 'protractor';

import { ManageDataPage } from './manage-data.po.';

export class PackagePage extends ManageDataPage {

  packageDiv: ElementFinder;
  createNewPackageBtn: ElementFinder;
  loadingDiv: ElementFinder;
  packageTitleTxtBox: ElementFinder;
  packageDescTxtBox: ElementFinder;
  responsibleComboLabel: ElementFinder;
  savePackageBtn: ElementFinder;

  constructor() {
    super();
    this.packageDiv = element(by.cssContainingText('span', 'Packages'));
    this.createNewPackageBtn = element(by.cssContainingText('button', 'Create New Package'));
    this.loadingDiv = $('div.loading');
    this.packageTitleTxtBox = $('input[formcontrolname="title"]');
    this.packageDescTxtBox = $('textarea[formcontrolname="description"]');
    this.responsibleComboLabel = $('p-multiselect[formcontrolname="responsibles"] label');
    this.savePackageBtn = element(by.cssContainingText('p-footer button', 'Create New Package'));

}

  getPackageCellByName(packageName): ElementFinder {
    return element(by.cssContainingText('h2', packageName));
  }

  navigateTo(): promise.Promise<any> {
    const until = protractor.ExpectedConditions;
    this.packageDiv.click();

    return browser.wait(until.presenceOf(this.getPackageCellByName('automation_package')),
      20 * 1000, 'Package details tab in manage data page should be loaded in 20 secs');
  }

  createNewPackage(packageName, description, responsible): promise.Promise<any> {
    const until = protractor.ExpectedConditions;

    this.createNewPackageBtn.click();
    browser.sleep(300);
    browser.wait(until.not(until.presenceOf(this.loadingDiv)), 15000);
    this.packageTitleTxtBox.sendKeys(packageName);
    this.packageDescTxtBox.sendKeys(description);
    this.responsibleComboLabel.click();
    element(by.cssContainingText('li', responsible)).click();
    browser.sleep(300);
    this.responsibleComboLabel.click();

    return this.savePackageBtn.click();
  }
}
