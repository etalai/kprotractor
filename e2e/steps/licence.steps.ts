import { defineSupportCode } from 'cucumber';
import { browser } from 'protractor';

import { LicencePage } from '../pages/projects/licence.po';
import { ProjectPage } from '../pages/projects/projects.po';

// setDefaultTimeout(60 * 1000);
browser.manage().timeouts().implicitlyWait(4000);
defineSupportCode(({ Given, When, Then, Before, After }) => {
  let licence: LicencePage;
  let project: ProjectPage;

  Before(() => {
    licence = new LicencePage();
    project = new ProjectPage();
  });

  When('I Navigate to Licence Tab', { timeout: 60 * 1000 }, async () => {
    await browser.sleep(2000);
    await project.clickLicenceTab();
    await browser.sleep(2000);
  });

  When('I enter all the licence details', { timeout: 60 * 1000 }, async () => {
    await licence.fillLicenceName();
    await licence.selectLicensee();
    await licence.selectPermittedUse();
    await licence.selectDataPackages();
    await licence.selectEffectiveDates();
    await licence.fillAccessTerm();
    await licence.selectPeriod();
  });

  Then('I verify that the licence status as  {string}', { timeout: 60 * 1000 }, async status => {
    await licence.verifyStatus(status);
  });

  When('I have already a licence created', { timeout: 60 * 1000 }, async () => {
    await licence.clickAvailableLicence();
    await browser.sleep(2000);
  });

  When('I {string} the licence', { timeout: 60 * 1000 }, async action => {
    await licence.submitLicence(action);
    await browser.sleep(2000);
  });

  When('I search for the project', { timeout: 60 * 1000 }, async () => {
    await browser.sleep(1000);
    await licence.SearchProject();
    await browser.sleep(1000);
  });
});
