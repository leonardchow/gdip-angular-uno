import { UnoAppPage } from './app.po';

describe('uno-app App', () => {
  let page: UnoAppPage;

  beforeEach(() => {
    page = new UnoAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
