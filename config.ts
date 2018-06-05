import * as path from "path";
import { browser, Config } from "protractor";
import { Reporter } from "./e2e/support/reporter";
const jsonReports = process.cwd() + "/reports/json";

export const config: Config = {

    seleniumAddress: "http://127.0.0.1:4444/wd/hub",
    allScriptsTimeout: 60000,
    rootElement: 'dr-root',
    useAllAngular2AppRoots: true,
    //SELENIUM_PROMISE_MANAGER: false,

    baseUrl: "https://app.qa.datarepublic.com.au",//"https://www.google.com",

    capabilities: {
        browserName: "chrome",
        'chromeOptions': {
            'args': ['no-sandbox', 'disable-gpu']
          }
    },

    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),

    specs: [
        "../e2e/features/*.feature",
    ],
    beforeLaunch: function () {
        require('ts-node')
          .register({
            project: 'e2e/tsconfig.e2e.json'
          });
      },
    onPrepare: () => {
        browser.ignoreSynchronization = true;
        browser.manage().window().maximize();
        Reporter.createDirectory(jsonReports);
    },

    cucumberOpts: {
        compiler: [],
        format: "json:./reports/json/cucumber_report.json",
        require: ['../e2e/**/*.steps.ts','../e2e/support/*.ts'],
        strict: true,
        tags: "@refactor",
    },
    plugins: [{
        package: 'protractor-multiple-cucumber-html-reporter-plugin',
        options: {
          // read the options part
          automaticallyGenerateReport: true,
          removeExistingJsonReportFile: true
        }
      }],
    onComplete: () => {
        Reporter.createHTMLReport();
    },
};
