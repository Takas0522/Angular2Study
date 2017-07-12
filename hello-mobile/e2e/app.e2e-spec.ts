import { HelloMobilePage } from './app.po';

describe('hello-mobile App', () => {
  let page: HelloMobilePage;

  beforeEach(() => {
    page = new HelloMobilePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
