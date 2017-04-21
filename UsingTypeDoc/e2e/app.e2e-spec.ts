import { UsingTypeDocPage } from './app.po';

describe('using-type-doc App', () => {
  let page: UsingTypeDocPage;

  beforeEach(() => {
    page = new UsingTypeDocPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
