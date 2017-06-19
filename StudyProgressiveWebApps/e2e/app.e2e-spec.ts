import { StudyProgressiveWebAppsPage } from './app.po';

describe('study-progressive-web-apps App', () => {
  let page: StudyProgressiveWebAppsPage;

  beforeEach(() => {
    page = new StudyProgressiveWebAppsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
