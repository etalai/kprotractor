import { expect } from 'chai';
import { defineSupportCode, setDefaultTimeout, Given, When, Then, Before, After } from 'cucumber';
import * as path from 'path';
import { browser } from 'protractor';

import { DatabasesPage } from '../../pages/manage-data/databases.po';
import { FilesPage } from '../../pages/manage-data/files.po';
import { PackagePage } from '../../pages/manage-data/package.po';


  let packagePg: PackagePage;
  let automationDBID: any;
  let automationtableID: any;
  let automationPackageID: any;

  Before(() => {
    packagePg = new PackagePage();
  });

  When('I create a new package', { timeout: 360 * 1000 }, async () => {
    const uniqueID = Math.random().toString().slice(2);
    automationPackageID = 'Automation_Package_'.concat(uniqueID);

    await packagePg.waitForPageLoad();
    await packagePg.navigateTo();
    await packagePg.createNewPackage(automationPackageID, 'Automation Package', 'Normal User');
    await browser.sleep(3000);
  });

  Then('package should be created', { timeout: 60 * 1000 }, async () => {
    await packagePg.isConfirmationMsgExists('The package has been successfully created').then (async isExists => {
      await expect(isExists).to.be.true;
     });
  });

