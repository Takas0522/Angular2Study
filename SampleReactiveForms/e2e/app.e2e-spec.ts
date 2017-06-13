import { SampleReactiveFormsPage } from './app.po';

describe('sample-reactive-forms App', () => {
  let page: SampleReactiveFormsPage;

  beforeEach(() => {
    page = new SampleReactiveFormsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
