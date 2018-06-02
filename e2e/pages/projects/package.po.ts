import { $, browser, by, element, ElementFinder, promise, protractor } from 'protractor';

import { BasePage } from '../base.po';

export class ProjectPackagePage extends BasePage {

  pacakageListDiv: ElementFinder;
  emptyPackageListDiv: ElementFinder;
  addPackageBtn: ElementFinder;
  doneBtn: ElementFinder;
  packageComboLabel: ElementFinder;

  constructor() {
    super();
    this.pacakageListDiv = $('dr-project-package-list');
    this.emptyPackageListDiv = $('dr-layout-page-empty');
    this.addPackageBtn = element(by.cssContainingText('p-header button', 'Add Package'));
    this.packageComboLabel = $('p-dropdown label');
    this.doneBtn = element(by.cssContainingText('p-footer button', 'Done'));
  }

  waitForPageLoad(): promise.Promise<any> {
    const until = protractor.ExpectedConditions;

    return browser.wait(until.or(until.presenceOf(this.pacakageListDiv),
      until.presenceOf(this.emptyPackageListDiv)),
      20 * 1000, 'Packages tab in project details page should be loaded in 20 secs');
  }

  addPackage(packageName): promise.Promise<any> {
    this.addPackageBtn.click();
    this.packageComboLabel.click();
    element(by.cssContainingText('li', packageName)).click();

    return this.doneBtn.click();
  }
}
