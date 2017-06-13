import { UnitTestStudyPage } from './app.po';

describe('unit-test-study App', () => {
  let page: UnitTestStudyPage;

  beforeEach(() => {
    page = new UnitTestStudyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
