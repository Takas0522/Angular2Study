import { UseAngularMaterialPage } from './app.po';

describe('use-angular-material App', () => {
  let page: UseAngularMaterialPage;

  beforeEach(() => {
    page = new UseAngularMaterialPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
