import { expect } from 'chai';

import * as path from 'path';
import { browser } from 'protractor';
import { defineSupportCode, setDefaultTimeout, Given, When, Then, Before, After } from 'cucumber';
import { DatabasesPage } from '../../pages/manage-data/databases.po';
import { FilesPage } from '../../pages/manage-data/files.po';
import { PackagePage } from '../../pages/manage-data/package.po';


let filesPg: FilesPage;

let automationDBID: any;
let automationtableID: any;
let automationPackageID: any;

Before(() => {
   
  filesPg = new FilesPage();
  
});

When('I add a new file {string}', { timeout: 60 * 1000 }, async filepath => {
  const filefullpath = path.join(__dirname, filepath);
  const fileName = path.parse(filefullpath).base;

  await filesPg.waitForPageLoad();
  await filesPg.deleteFile(fileName);
  await filesPg.uploadFile(filefullpath, 'Automation');
});

Then('new file should be uploaded', { timeout: 60 * 1000 }, async () => {
  await filesPg.isConfirmationMsgExists('The file has been succesfully uploaded').then(async isExists => {
    await expect(isExists).to.be.true;
  });
});
