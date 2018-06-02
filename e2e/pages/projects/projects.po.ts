import { expect } from 'chai';
import { $, browser, by, element, ElementFinder, promise, protractor } from 'protractor';

import { BasePage } from '../base.po';
import { CommonPage } from '../common.po';

export class ProjectPage extends BasePage {
  common: CommonPage = new CommonPage();
  projectList: ElementFinder;
  emptyProjectList: ElementFinder;
  peopleTab: ElementFinder;
  peolpleList: ElementFinder;
  packageTab: ElementFinder;
  licenceTab: ElementFinder;
  permittedUsesTab: ElementFinder;
  addPeopleEmailtxtBox: ElementFinder;
  addPersonBtn: ElementFinder;
  createNewProjectBtn: ElementFinder;
  projectNameTxtBox: ElementFinder;
  projectDescTxtArea: ElementFinder;
  saveProjectBtn: ElementFinder;

  constructor() {
    super();
    this.projectList = $('dr-project-list');
    this.emptyProjectList = $('dr-layout-page-empty');
    this.peopleTab = element(by.cssContainingText('span.ui-menuitem-text', 'People'));
    this.peolpleList = $('p-datatable');
    this.packageTab = element(by.cssContainingText('span.ui-menuitem-text', 'Packages'));
    this.licenceTab = element(by.cssContainingText('span.ui-menuitem-text', 'Licences'));
    this.permittedUsesTab = element(by.cssContainingText('span.ui-menuitem-text', 'Permitted Uses'));
    this.addPeopleEmailtxtBox = $('#email');
    this.addPersonBtn = element(by.cssContainingText('dr-user-list button', 'Add Person'));
    this.createNewProjectBtn = element(by.cssContainingText('mat-toolbar button', 'Create New Project'));
    this.projectNameTxtBox = $('dr-project-form input');
    this.projectDescTxtArea = $('dr-project-form textarea');
    this.saveProjectBtn = element(by.cssContainingText('mat-card-actions button', 'Create Project'));
  }
  clickCreateNewProjectBtn(): promise.Promise<any> {
    return this.common.clickButtonWithText('span', 'Create New Project');
  }
  fillProjectTitle(title): promise.Promise<any> {
    return this.common.fillFields('input.ng-pristine', title);
  }
  clickCreateProjectBtn(): promise.Promise<any> {
    return this.common.clickButtonWithText('span', 'Create Project');
  }
  clickCreatedProject(): promise.Promise<any> {
    return this.common.clickButtonWithText('span.ui-button-text', 'View Project');
  }
  clickUsersTab(): promise.Promise<any> {
    return this.common.clickButtonWithText('a > span.ui-menuitem-text', 'People');
  }

  addUserToProject(): promise.Promise<any> {
    return this.common.fillFields('#email', 'manoujitha+neworg@datarepublic.com');
  }
  clickAddPersonBtn(): promise.Promise<any> {
    return this.common.clickButtonWithText('span.ui-button-text', 'Add Person');
  }

  clickPermittedUsesTab(): promise.Promise<any> {
    return this.common.clickButtonWithText('a > span.ui-menuitem-text', 'Permitted Uses');
  }

  clickCreatePermittedUseBtn(): promise.Promise<any> {
    return this.common.clickButtonWithText('span.ui-button-text', 'Create Permitted Use');
  }
  createPermittedUse(): promise.Promise<any> {
    this.common.fillFields('#title', 'Permitted Use Sample');
    this.common.selectDropDown('Data Product');
    this.common.fillFields('#description', 'Description of the Permitted Use');
    this.common.fillFields('ul.ui-inputtext li input', 'Data users');

    return this.common.fillFields('#commercials', '500AUD');
  }

  clickPackagesTab(): promise.Promise<any> {
    return this.common.clickButtonWithText('a > span.ui-menuitem-text', 'Packages');
  }

  setupPackages(): promise.Promise<any> {
    return this.common.clickButtonWithText('span.ui-button-text', 'Add Package');
  }
  selectThePackage(): promise.Promise<any> {
    return this.common.selectDropDown('May01Package');
  }

  confirmPackage(): promise.Promise<any> {
    // return this.common.clickButtonWithText('.ng-tns-c18-10 span.ui-button-text', 'Done');
    return this.common.clickButtonWithXpathAndText('Done');
  }

  clickLicenceTab(): promise.Promise<any> {
    return this.common.clickButtonWithText('a > span.ui-menuitem-text', 'Licences');
  }

  waitForPageLoad(): promise.Promise<any> {
    const until = protractor.ExpectedConditions;

    return browser.wait(until.or(until.presenceOf(this.projectList),
      until.presenceOf(this.emptyProjectList)),
      20 * 1000, 'Projects page should be loaded in 20 sec');
  }

  navigateToPeopleTab(): promise.Promise<any> {
    const until = protractor.ExpectedConditions;

    this.peopleTab.click();

    return browser.wait(until.presenceOf(this.peolpleList), 15 * 1000,
      'Peoples tab in project page has to be displayed in 15 secs');
  }

  navigateToPackagesTab(): promise.Promise<any> {
    return this.packageTab.click();
  }

  navigateToLicenceTab(): promise.Promise<any> {
    return this.licenceTab.click();
  }

  navigateToPermittedUsesTab(): promise.Promise<any> {
    return this.permittedUsesTab.click();
  }

  addPeople(username): promise.Promise<any> {
    this.addPeopleEmailtxtBox.sendKeys(username);

    return this.addPersonBtn.click();
  }

  createNewProject(projectName, description): promise.Promise<any> {

    this.createNewProjectBtn.click();
    this.projectNameTxtBox.sendKeys(projectName);
    this.projectDescTxtArea.sendKeys(description);

    return this.saveProjectBtn.click();
  }

  viewProject(projectName): promise.Promise<any> {
    // dr-layout-page-list-item
    this.waitForPageLoad();

    return element(by.cssContainingText('dr-layout-page-list-item', projectName))
      .element(by.cssContainingText('button', 'View Project')).click();
  }

  waitForProjectLoad(projectName): promise.Promise<any> {
    this.waitForPageLoad();

    return element.all(by.cssContainingText('dr-project-list dr-layout-page-list-item', projectName))
      .then(async items => {
        await expect(items.length).to.be.above(0);
      });
  }
}
