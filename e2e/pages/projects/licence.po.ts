import { expect } from 'chai';
import { $, browser, by, element, ElementFinder, promise, protractor } from 'protractor';

import { BasePage } from '../base.po';
import { CommonPage } from '../common.po';

export class LicencePage extends BasePage {
  common: CommonPage = new CommonPage();
  loadingDiv: ElementFinder;
  licenceList: ElementFinder;
  emptyLicenseList: ElementFinder;
  createLicenceBtn: ElementFinder;
  licenceNameTxtBox: ElementFinder;
  licenceEffectiveDateTxtBox: ElementFinder;
  accessTermTxtBox: ElementFinder;
  periodComboLabel: ElementFinder;
  saveLicenseBtn: ElementFinder;
  licenceDetailsForm: ElementFinder;
  licenceSubmitBtn: ElementFinder;
  licenceApproveBtn: ElementFinder;

  constructor() {
    super();
    this.loadingDiv = $('div.loading');
    this.licenceList = $('dr-licence-list');
    this.emptyLicenseList = $('dr-layout-page-empty');
    this.createLicenceBtn = element(by.cssContainingText('p-header button', 'Create Licence'));
    this.licenceNameTxtBox = $('#name');
    this.licenceEffectiveDateTxtBox = $('p-calendar#effectiveDate input');
    this.accessTermTxtBox = $('p-spinner#accessTerm input');
    this.periodComboLabel = $('p-dropdown label');
    this.saveLicenseBtn = element(by.cssContainingText('dr-licence-create button', 'Create Licence'));
    this.licenceDetailsForm = $('dr-licence-detail');
    this.licenceSubmitBtn = element(by.cssContainingText('dr-licence-detail button', 'Submit'));
    this.licenceApproveBtn = element(by.cssContainingText('dr-nuxeo-workflow-actions button', 'Approve'));
  }

  getLicenceCellByName(name): ElementFinder {
    return element(by.cssContainingText('dr-licence-list', name));
  }

  fillLicenceName(): promise.Promise<any> {
    return this.common.fillFields('#name', 'Licence 01');
  }

  selectLicensee(): promise.Promise<any> {
    return this.common.clickButtonWithText('span', 'Banana Inc');
  }
  selectPermittedUse(): promise.Promise<any> {
    return this.common.clickFunction('#permittedUses:nth-child(1)');
  }

  selectDataPackages(): promise.Promise<any> {
    return this.common.clickFunction('#packageCommercials .ui-listbox-item:nth-child(1)');
  }
  selectEffectiveDates(): promise.Promise<any> {
    return this.common.clickCalendarCurrentDate();
  }
  fillAccessTerm(): promise.Promise<any> {
    return this.common.fillFields('.ui-spinner input', '12');
  }
  selectPeriod(): promise.Promise<any> {
    return this.common.selectDropDown('Month(s)');
  }

  verifyStatus(status): void {
    element(by.css('span')).getText().then(async text => {
      expect(text).to.equal(status);
    });
  }

  clickAvailableLicence(): promise.Promise<any> {
    return this.common.clickButtonWithText('.ui-button-text', 'View or Edit Licence');
  }

  submitLicence(action): promise.Promise<any> {
    return this.common.clickButtonWithText('.ui-button-text', action);
  }
  SearchProject(): promise.Promise<any> {
    return this.common.fillFields('.mat-input-infix input', 'Automation Project');
  }

  waitForPageLoad(): promise.Promise<any> {
    const until = protractor.ExpectedConditions;

    return browser.wait(until.or(until.presenceOf(this.licenceList),
      until.presenceOf(this.emptyLicenseList)),
      20 * 1000, 'Permitted uses tab in project details page should be loaded in 20 secs');
  }

  createLicence(name, organisation, permittedUses, datapackages, effectiveDate, accessTerm, period): promise.Promise<any> {
    this.createLicenceBtn.click();
    this.licenceNameTxtBox.sendKeys(name);
    element(by.cssContainingText('p-listbox#licensee li', organisation)).click();
    element(by.cssContainingText('p-listbox#permittedUses li', permittedUses)).click();
    element(by.cssContainingText('p-listbox#packageCommercials li', datapackages)).click();
    this.licenceEffectiveDateTxtBox.sendKeys(effectiveDate);
    this.accessTermTxtBox.sendKeys(accessTerm);
    this.periodComboLabel.click();
    element(by.cssContainingText('p-dropdown li', period)).click();

    return this.saveLicenseBtn.click();
  }

  viewLicence(name): promise.Promise<any> {
    const until = protractor.ExpectedConditions;
    browser.wait(until.presenceOf(this.getLicenceCellByName(name)),
      20 * 1000, 'Licences tab in project details page should be loaded in 20 secs');

    return this.getLicenceCellByName(name).element(by.cssContainingText('button', 'View or Edit Licence')).click();
  }

  submitLicences(): promise.Promise<any> {
    const until = protractor.ExpectedConditions;
    browser.wait(until.presenceOf(this.licenceDetailsForm),
      20 * 1000, 'Licence details page should be loaded in 20 secs');

    return this.licenceSubmitBtn.click();
  }

  approveLicence(): promise.Promise<any> {
    const until = protractor.ExpectedConditions;
    browser.wait(until.presenceOf(this.licenceDetailsForm),
      20 * 1000, 'Licence details page should be loaded in 20 secs');

    return this.licenceApproveBtn.click();
  }
}
