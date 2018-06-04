import { expect } from 'chai';
import { defineSupportCode, setDefaultTimeout, Given, When, Then, Before, After } from 'cucumber';
import * as path from 'path';
import { browser } from 'protractor';

import { DatabasesPage } from '../../pages/manage-data/databases.po';
import { FilesPage } from '../../pages/manage-data/files.po';
import { PackagePage } from '../../pages/manage-data/package.po';

// setDefaultTimeout(60 * 1000);



let dbPg: DatabasesPage;
let automationDBID: any;
let automationtableID: any;
let automationPackageID: any;

Before(() => {
  dbPg = new DatabasesPage();
});





When('I add a new database', { timeout: 60 * 1000 }, async () => {
  // Write code here that turns the phrase above into concrete actions
  const uniqueID = Math.random().toString().slice(2);
  automationDBID = 'automation_database_'.concat(uniqueID);
  await dbPg.waitForPageLoad();
  await dbPg.navigateToDBTab();
  await dbPg.createDatabase(automationDBID, 'Automation Testing');
});

Then('new database should be created', { timeout: 60 * 1000 }, async () => {
  await dbPg.isConfirmationMsgExists('The database has been successfully created').then(async isExists => {
    await expect(isExists).to.be.true;
  });
});

When('I create a new table', { timeout: 60 * 1000 }, async () => {
  // Write code here that turns the phrase above into concrete actions
  const uniqueID = Math.random().toString().slice(2);
  automationtableID = 'automation_table_'.concat(uniqueID);

  await dbPg.waitForPageLoad();
  await dbPg.navigateToDBTab();
  await dbPg.navigateToViewEditDB('automation_db');
  await dbPg.clickOnCreateTable();
  await dbPg.enterTableDetails(automationtableID, 'Test Automation');
  await dbPg.addColumnDetails('age_range', 'age range', 'STRING');
  await dbPg.addColumnDetails('name', 'name', 'STRING');
  await dbPg.clickOnSaveCreateTable();

});

Then('table should be created', { timeout: 60 * 1000 }, async () => {
  await dbPg.isConfirmationMsgExists('The table has been successfully created').then(async isExists => {
    await expect(isExists).to.be.true;
  });
});

When('I loaded data from {string} file', { timeout: 360 * 1000 }, async filename => {
  await dbPg.loadData(automationtableID, filename);
});

Then('Number of records loaded should be {string}', { timeout: 60 * 1000 }, async expRecordsCount => {
  await dbPg.navigateToDBTab();
  await dbPg.navigateToViewEditDB('automation_db');
  await dbPg.waitForDBTableLoad(automationtableID);
  await dbPg.verifyRecordCount(automationtableID, expRecordsCount);
});


