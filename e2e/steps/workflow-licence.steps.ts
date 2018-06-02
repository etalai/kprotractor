import { expect } from 'chai';
import { defineSupportCode } from 'cucumber';
import { browser } from 'protractor';

import { Utils } from '../helper/utils';
import { LicencePage } from '../pages/projects/licence.po';
import { ProjectPackagePage } from '../pages/projects/package.po';
import { PermittedUsesPage } from '../pages/projects/permitteduses.po';
import { ProjectPage } from '../pages/projects/projects.po';

// setDefaultTimeout(60 * 1000);

defineSupportCode(({ Given, When, Then, Before, After }) => {
  let project: ProjectPage;
  let projectPackagePg: ProjectPackagePage;
  let permittedUsesPg: PermittedUsesPage;
  let licencePage: LicencePage;
  let utils: Utils;
  let projectName: any = 'automationprojx06cxgfiy';
  // tslint:disable-next-line:no-require-imports
  const testdataconfig = require('../testdata/e2e.test.config.json');

  Before(() => {
    project = new ProjectPage();
    projectPackagePg = new ProjectPackagePage();
    permittedUsesPg = new PermittedUsesPage();
    licencePage = new LicencePage();
    utils = new Utils();
  });

  When('Create a new Project with the name {string}', { timeout: 60 * 1000 }, async projName => {
    await project.clickCreateNewProjectBtn();
    await project.fillProjectTitle(projName);
    await project.clickCreateProjectBtn();
  });

  Given('Added people to the project', { timeout: 60 * 1000 }, async () => {
    await project.clickUsersTab();
    await browser.sleep(2000);
    await project.addUserToProject();
    await browser.sleep(2000);
    await project.clickAddPersonBtn();
    await browser.sleep(4000);

  });

  Given('Created a Permitted use', { timeout: 60 * 1000 }, async () => {
    await project.clickPermittedUsesTab();
    await project.clickCreatePermittedUseBtn();
    await project.createPermittedUse();
    await project.clickCreatePermittedUseBtn();
  });
  Given('set up packages', { timeout: 60 * 1000 }, async () => {
    await project.clickPackagesTab();
    await project.setupPackages();
    await project.selectThePackage();
    await project.confirmPackage();
  });

  Given('I navigate to the created project', { timeout: 60 * 1000 }, async () => {
    await browser.sleep(1000);
    await project.clickCreatedProject();
  });

  When('I create a new Project', { timeout: 60 * 1000 }, async () => {
    const uniqueID = Math.random().toString().slice(2);
    projectName = 'Automation_Project_'.concat(uniqueID);

    await project.waitForPageLoad();
    await project.createNewProject(projectName, 'test automation project');
  });

  Then('Project should be created', { timeout: 60 * 1000 }, async () => {
    await project.IsConfirmationMsgExists('The project has been successfully created').then (async isExists => {
       await expect(isExists).to.be.true;
     });
  });

  When('I add {string} to project', { timeout: 60 * 1000 }, async user => {
    // Write code here that turns the phrase above into concrete actions
    const username = testdataconfig.organisation.users[user].username;
    await project.waitForPageLoad();
    await project.viewProject(projectName);
    await project.navigateToPeopleTab();
    await project.addPeople(username);
  });

  Then('{string} should be added to project', { timeout: 60 * 1000 }, async user => {
    const username = testdataconfig.organisation.users[user].username;
    await project.IsConfirmationMsgExists(`Success! Your request to add ${username} has been received.`).then (async isExists => {
       await expect(isExists).to.be.true;
     });
  });

  Then('project should be displayed', { timeout: 60 * 1000 }, async () => {
    await project.waitForProjectLoad(projectName);
  });

  When('I add a package to project', { timeout: 60 * 1000 }, async () => {
    await project.waitForPageLoad();
    await project.viewProject(projectName);
    await project.navigateToPackagesTab();
    await projectPackagePg.waitForPageLoad();
    await projectPackagePg.addPackage('automation_package');
  });

  Then('package should be added to project', { timeout: 60 * 1000 }, async () => {
    await projectPackagePg.IsConfirmationMsgExists('The package has been successfully added to the project').then (async isExists => {
       await expect(isExists).to.be.true;
     });
  });

  When('I create a permitted use to project', { timeout: 60 * 1000 }, async () => {
    // Write code here that turns the phrase above into concrete actions

    await project.waitForPageLoad();
    await project.viewProject(projectName);
    await project.navigateToPermittedUsesTab();
    await permittedUsesPg.waitForPageLoad();
    await permittedUsesPg.createPermittedUse('automation testing', 'Data Product', 'autotes',
      'Research Analysts', 'Commercials for automation testing');

  });

  Then('Permitted use should be added to project', { timeout: 60 * 1000 }, async () => {
    await permittedUsesPg.IsConfirmationMsgExists('The permitted use has been successfully created').then (async isExists => {
       await expect(isExists).to.be.true;
     });
  });

  When('I create a new licence', { timeout: 60 * 1000 }, async () => {
    const effectiveDate = utils.getTodaysDate();
    await project.viewProject(projectName);
    await project.navigateToLicenceTab();
    await licencePage.waitForPageLoad();
    await licencePage.createLicence('automation testing', 'Automation', 'automation testing',
      'automation_package', effectiveDate, '1', 'Month(s)');
  });

  Then('Licence should be created', { timeout: 60 * 1000 }, async () => {
    await licencePage.IsConfirmationMsgExists('The licence has been successfully created').then (async isExists => {
       await expect(isExists).to.be.true;
     });
  });

  When('I submit licence', { timeout: 60 * 1000 }, async () => {
    await project.viewProject(projectName);
    await project.navigateToLicenceTab();
    await licencePage.waitForPageLoad();
    await licencePage.viewLicence('automation testing');
    await browser.sleep(2000);
    await licencePage.submitLicences();
  });

  Then('Licence should be submitted', { timeout: 60 * 1000 }, async () => {
    await licencePage.IsConfirmationMsgExists('The licence has been successfully submitted').then (async isExists => {
       await expect(isExists).to.be.true;
     });
  });

  When('I approve licence', { timeout: 60 * 1000 }, async () => {
    await project.viewProject(projectName);
    await project.navigateToLicenceTab();
    await licencePage.waitForPageLoad();
    await licencePage.viewLicence('automation testing');
    await browser.sleep(2000);
    await licencePage.approveLicence();
  });

  Then('Licence should be approved', { timeout: 60 * 1000 }, async () => {
    await licencePage.IsConfirmationMsgExists('The request has been successfully sent').then (async isExists => {
       await expect(isExists).to.be.true;
     });
  });
});
