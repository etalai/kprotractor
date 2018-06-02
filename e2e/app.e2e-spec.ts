import { AppPage } from './app.po';

xdescribe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display message saying app works', async () => {
    page.navigateTo();
    expect(await page.getTitleText()).toEqual('Welcome to Senate, Powerful.');
  });
});
