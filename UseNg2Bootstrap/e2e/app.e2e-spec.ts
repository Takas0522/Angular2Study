import { UseNg2BootstrapPage } from './app.po';

describe('use-ng2-bootstrap App', () => {
  let page: UseNg2BootstrapPage;

  beforeEach(() => {
    page = new UseNg2BootstrapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
