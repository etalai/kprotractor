import { expect } from 'chai';
import { $, browser, by, element, ElementFinder, promise, protractor } from 'protractor';

import { BasePage } from '../base.po';

export class DatabasesPage extends BasePage {

  databaseTab: ElementFinder;
  createTableBtn: ElementFinder;
  saveTableBtn: ElementFinder;
  tableIdTxtBox: ElementFinder;
  tableCommentsTxtBox: ElementFinder;
  dbColumnNameTxtBox: ElementFinder;
  dbColumnDescTxtBox: ElementFinder;
  dbColumnTypeCombo: ElementFinder;
  dbAddColumnButton: ElementFinder;
  createDatabaseBtn: ElementFinder;
  databaseIdTxtBox: ElementFinder;
  databaseDescTxtBox: ElementFinder;
  saveDataBaseBtn: ElementFinder;
  loadingDiv: ElementFinder;
  goToLoadDataBtn: ElementFinder;
  loadDataJobList: ElementFinder;
  refreshJobsBtn: ElementFinder;
  headerRowsTxtBox: ElementFinder;
  loadDataBtn: ElementFinder;

  constructor() {
    super();
    this.databaseTab = element(by.cssContainingText('span', 'Databases'));
    this.createTableBtn = element(by.cssContainingText('button', 'Create table'));
    this.saveTableBtn = $('dr-database-table-create').element(by.cssContainingText('button', 'Create table'));
    this.tableIdTxtBox = $('dr-database-table-form #tableId');
    this.tableCommentsTxtBox = $('dr-database-table-form #comment');
    this.dbColumnNameTxtBox = element(by.xpath('//table/tbody/tr[count(//table/tbody/tr)]//input[@placeholder="Name"]'));
    this.dbColumnDescTxtBox = element(by.xpath('//table/tbody/tr[count(//table/tbody/tr)]//input[@placeholder="Description"]'));
    this.dbColumnTypeCombo = element(by.xpath('//table/tbody/tr[count(//table/tbody/tr)]//p-dropdown')).element(by.css('label'));
    this.dbAddColumnButton = element(by.xpath('//table/tbody/tr[count(//table/tbody/tr)]'))
      .element(by.cssContainingText('button', 'Add Column'));
    this.createDatabaseBtn = $('dr-database-home').element(by.cssContainingText('span', 'Create Database'));
    this.databaseIdTxtBox = $('#databaseId');
    this.databaseDescTxtBox = $('#comment');
    this.saveDataBaseBtn = $('dr-database-create').element(by.cssContainingText('button', 'Create Database'));
    this.loadingDiv = $('div.loading');
    this.goToLoadDataBtn = element(by.cssContainingText('button', 'Go to Load Jobs'));
    this.loadDataJobList = element(by.css('mat-list mat-list-item'));
    this.refreshJobsBtn = element(by.cssContainingText('button', 'Refresh Jobs'));
    this.headerRowsTxtBox = element(by.xpath('//p-spinner//input'));
    this.loadDataBtn = element(by.cssContainingText('button', 'Done, Load Data'));
  }

  getRowCountCellByDBTableName(automationtableID): ElementFinder {
    return element(by.cssContainingText('tr', automationtableID))
      .element(by.xpath('//span[contains(.,"Row count")]/following-sibling::span/div'));
  }

  getViewEditDbBtnByDBName(databaseName): ElementFinder {
    return element(by.cssContainingText('dr-layout-page-list-item', databaseName))
      .element(by.cssContainingText('button', 'View or Edit Database'));
  }

  getLoadDataBtnByTableName(tablename): ElementFinder {
    return element(by.cssContainingText('tr', tablename))
      .element(by.cssContainingText('button', 'Load Data'));
  }

  navigateToDBTab(): promise.Promise<any> {
    // Click and wait for Databases tab to load
    this.databaseTab.click();
    const until = protractor.ExpectedConditions;

    return browser.wait(until.presenceOf(this.getViewEditDbBtnByDBName('automation_database')), 10 * 1000,
      'Databases tab in Manage Data page should be loaded in 10 secs');
  }

  clickOnCreateTable(): promise.Promise<any> {
    return this.createTableBtn.click();
  }

  clickOnSaveCreateTable(): promise.Promise<any> {
    return this.saveTableBtn.click();
  }

  enterTableDetails(databaseName, comments): promise.Promise<any> {
    this.tableIdTxtBox.sendKeys(databaseName);

    return this.tableCommentsTxtBox.sendKeys(comments);

  }

  addColumnDetails(name, description, columnType): promise.Promise<any> {
    this.dbColumnNameTxtBox.sendKeys(name);
    this.dbColumnDescTxtBox.sendKeys(description);
    this.dbColumnTypeCombo.click();
    element(by.cssContainingText('li', columnType)).click();

    return this.dbAddColumnButton.click();
  }

  createDatabase(databasename, description): promise.Promise<any> {
    this.createDatabaseBtn.click();
    this.databaseIdTxtBox.sendKeys(databasename);
    this.databaseDescTxtBox.sendKeys(description);

    return this.saveDataBaseBtn.click();
  }

  waitForDBTableLoad(automationtableID): promise.Promise<any> {
    const until = protractor.ExpectedConditions;

    return browser.wait(until.presenceOf(this.getLoadDataBtnByTableName(automationtableID)), 20 * 1000,
      `Table ${automationtableID} should be loaded in 20 secs`);
  }

  verifyRecordCount(automationtableID, expRecordsCount): promise.Promise<any> {
    return this.getRowCountCellByDBTableName(automationtableID).getAttribute('innerText').then(async text => {
        expect(text).to.equal(expRecordsCount);
      });
  }

  navigateToViewEditDB(databaseName): promise.Promise<any> {
    const until = protractor.ExpectedConditions;
    browser.wait(until.presenceOf(this.getViewEditDbBtnByDBName(databaseName)), 5 * 1000,
      'Databases tab in Manage Data page should be loaded in 5 secs');
    browser.wait(until.not(until.presenceOf(element(by.css('div.loading')))), 5000);

    this.getViewEditDbBtnByDBName(databaseName).click();

    return browser.wait(until.presenceOf(this.getLoadDataBtnByTableName('school_directory')), 20 * 1000,
      'Database details page should be loaded in 20 secs');
  }

  loadData(tablename, filename): promise.Promise<any> {
    const until = protractor.ExpectedConditions;
    browser.wait(until.presenceOf(this.getLoadDataBtnByTableName(tablename)), 20 * 1000,
      'Database details page should be loaded in 20 secs');

    this.getLoadDataBtnByTableName(tablename).click();
    browser.sleep(400);

    browser.wait(until.not(until.presenceOf(this.loadingDiv)), 5000);
    element(by.xpath(`//td[text()="${filename}"]`)).click();
    browser.wait(until.not(until.presenceOf(this.loadingDiv)), 5000);

    this.headerRowsTxtBox.sendKeys(1);
    this.loadDataBtn.click();
    browser.sleep(400);
    browser.wait(until.not(until.presenceOf(this.loadingDiv)), 15000);
    browser.sleep(15000);

    this.goToLoadDataBtn.click();

    browser.wait(until.presenceOf(this.loadDataJobList), 20 * 1000,
      'Load Jobs page should be loaded in 20 secs');

    browser.wait(async () => {
      return element.all(by.css('mat-list mat-list-item')).then(async list => {
        return list[0].getText().then(async text => {
          browser.sleep(2000);
          browser.wait(until.not(until.presenceOf(this.loadingDiv)), 15000);
          this.refreshJobsBtn.click();

          return (text.indexOf('Validation Status:') !== -1);
        });
      });
    }, 180 * 1000, 'Validation status is not updated in 180 secs');

    return browser.wait(until.not(until.presenceOf(element(by.css('div.loading')))), 15000);
  }
}
