import { expect } from 'chai';
import { defineSupportCode } from 'cucumber';
import * as path from 'path';
import { browser } from 'protractor';

import { DatabasesPage } from '../pages/manage-data/databases.po';
import { FilesPage } from '../pages/manage-data/files.po';
import { PackagePage } from '../pages/manage-data/package.po';

// setDefaultTimeout(60 * 1000);

defineSupportCode(({ Given, When, Then, Before, After }) => {

  let dbPg: DatabasesPage;
  let filesPg: FilesPage;
  let packagePg: PackagePage;
  let automationDBID: any;
  let automationtableID: any;
  let automationPackageID: any;

  Before(() => {
    dbPg = new DatabasesPage();
    filesPg = new FilesPage();
    packagePg = new PackagePage();
  });

  When('I add a new file {string}', { timeout: 60 * 1000 }, async filepath => {
    const filefullpath = path.join(__dirname, filepath);
    const fileName = path.parse(filefullpath).base;

    await filesPg.waitForPageLoad();
    await filesPg.deleteFile(fileName);
    await filesPg.uploadFile(filefullpath, 'Automation');
  });

  Then('new file should be uploaded', { timeout: 60 * 1000 }, async () => {
    await filesPg.IsConfirmationMsgExists('The file has been succesfully uploaded').then (async isExists => {
       await expect(isExists).to.be.true;
     });
  });

  When('I add a new database', { timeout: 60 * 1000 }, async () => {
    // Write code here that turns the phrase above into concrete actions
    const uniqueID = Math.random().toString().slice(2);
    automationDBID = 'automation_database_'.concat(uniqueID);
    await filesPg.waitForPageLoad();
    await dbPg.navigateToDBTab();
    await dbPg.createDatabase(automationDBID, 'Automation Testing');
  });

  Then('new database should be created', { timeout: 60 * 1000 }, async () => {
    await dbPg.IsConfirmationMsgExists('The database has been successfully created').then (async isExists => {
       await expect(isExists).to.be.true;
     });
  });

  When('I create a new table', { timeout: 60 * 1000 }, async () => {
    // Write code here that turns the phrase above into concrete actions
    const uniqueID = Math.random().toString().slice(2);
    automationtableID = 'automation_table_'.concat(uniqueID);

    await filesPg.waitForPageLoad();
    await dbPg.navigateToDBTab();
    await dbPg.navigateToViewEditDB('automation_db');
    await dbPg.clickOnCreateTable();
    await dbPg.enterTableDetails(automationtableID, 'Test Automation');
    await dbPg.addColumnDetails('age_range', 'age range', 'STRING');
    await dbPg.addColumnDetails('name', 'name', 'STRING');
    await dbPg.clickOnSaveCreateTable();

  });

  Then('table should be created', { timeout: 60 * 1000 }, async () => {
    await dbPg.IsConfirmationMsgExists('The table has been successfully created').then (async isExists => {
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

  When('I create a new package', { timeout: 360 * 1000 }, async () => {
    const uniqueID = Math.random().toString().slice(2);
    automationPackageID = 'Automation_Package_'.concat(uniqueID);

    await filesPg.waitForPageLoad();
    await packagePg.navigateTo();
    await packagePg.createNewPackage(automationPackageID, 'Automation Package', 'Normal User');
    await browser.sleep(3000);
  });

  Then('package should be created', { timeout: 60 * 1000 }, async () => {
    await packagePg.IsConfirmationMsgExists('The package has been successfully created').then (async isExists => {
      await expect(isExists).to.be.true;
     });
  });
});
