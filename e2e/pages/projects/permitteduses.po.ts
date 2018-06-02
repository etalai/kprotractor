import { $, browser, by, element, ElementFinder, promise, protractor } from 'protractor';

import { BasePage } from '../base.po';

export class PermittedUsesPage extends BasePage  {

  permittedUsesList: ElementFinder;
  createPermittedUseBtn: ElementFinder;
  permittedUseTitletxtBox: ElementFinder;
  typeComboLabel: ElementFinder;
  descriptiontxtBox: ElementFinder;
  recipientsTxtBox: ElementFinder;
  commercialsTxtBox: ElementFinder;
  savePermittedUseBtn: ElementFinder;
  emptypermittedUsesList: ElementFinder;

  constructor() {
    super();
    this.permittedUsesList = $('dr-permitted-use-list');
    this.emptypermittedUsesList = $('dr-layout-page-empty');
    this.createPermittedUseBtn = element(by.cssContainingText('p-header button', 'Create Permitted Use'));
    this.permittedUseTitletxtBox = $('#title');
    this.typeComboLabel = $('p-dropdown label');
    this.descriptiontxtBox = $('#description');
    this.recipientsTxtBox = $('p-chips input');
    this.commercialsTxtBox = $('#commercials');
    this.savePermittedUseBtn = element(by.cssContainingText('dr-layout-tab-panel-create button', 'Create Permitted Use'));
  }

  waitForPageLoad(): promise.Promise<any> {
    const until = protractor.ExpectedConditions;

    return browser.wait(until.or(until.presenceOf(this.permittedUsesList),
      until.presenceOf(this.emptypermittedUsesList)),
      20 * 1000, 'Permitted uses tab in project details page should be loaded in 20 secs');
  }

  createPermittedUse(title, type, description, recipients, commercials): promise.Promise<any> {
    this.createPermittedUseBtn.click();
    this.permittedUseTitletxtBox.sendKeys(title);
    this.typeComboLabel.click();
    element(by.cssContainingText('p-dropdown li', type)).click();
    this.descriptiontxtBox.sendKeys(description);
    this.recipientsTxtBox.sendKeys(recipients);
    this.commercialsTxtBox.sendKeys(commercials);

    return this.savePermittedUseBtn.click();
  }
}
