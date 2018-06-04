import { browser, protractor } from "protractor";
import { SearchPageObject } from "../pages/searchPage";
const { Given, setDefaultTimeout, Before, When, Then } = require("cucumber");
const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;

const search: SearchPageObject = new SearchPageObject();


Given(/^I am on "(.*?)" search page$/, async (text) => {
    if (text === 'google') {
        await expect(browser.getTitle()).to.eventually.equal("Google");
    } else if (text === 'cucumber') {
        await expect(browser.getTitle()).to.eventually.equal(text + " - Google Search");
    } else if (text === 'protractor') {
        await expect(browser.getTitle()).to.eventually.equal(text + " - Google Search");
    }
});


Before(() => {
   // browser.driver.get('/');
    search.isExpected();
    setDefaultTimeout(4 * 1000);
});

When(/^I type "(.*?)"$/, async (text) => {
    await search.searchTextBox.sendKeys(text);
});

When(/^I click on search button$/, async () => {
    await browser.actions().sendKeys(protractor.Key.ENTER).perform();
});

Then(/^I click on google logo$/, async () => {
    await search.logo.click();
});

Then(/^I clear the search text$/, {timeout: 100000}, async () => {
    await search.searchTextBox.clear();
    browser.sleep(10000);
    // let txtsearchBox: string;
    // search.searchTextBox.getText().then( text=>{
    //     txtsearchBox= text;
    //     console.log(txtsearchBox);
    // });
    // while(txtsearchBox !== ''){
    //     search.searchTextBox.clear();
    //     search.searchTextBox.getText().then( text =>{
    //         txtsearchBox= text;
    //     });
    // }
});
