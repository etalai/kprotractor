import { defineSupportCode } from 'cucumber';

import { CommonPage } from '../pages/common.po';

defineSupportCode(({ Given, When, Then, Before, After }) => {
  let common: CommonPage;

  Before(() => {
    common = new CommonPage();
  });

  When('I click {string} button', { timeout: 60 * 1000 }, async buttonName => {
    await common.clickButtonWithText('span.ui-button-text', buttonName);
  });

});
