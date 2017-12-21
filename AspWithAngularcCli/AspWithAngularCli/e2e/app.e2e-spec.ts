import { AaPage } from './app.po';

describe('aa App', () => {
  let page: AaPage;

  beforeEach(() => {
    page = new AaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
