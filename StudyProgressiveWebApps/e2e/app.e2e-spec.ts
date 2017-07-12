import { StudyProgressiveWebAppsPage } from './app.po';

describe('study-progressive-web-apps App', () => {
  let page: StudyProgressiveWebAppsPage;

  beforeEach(() => {
    page = new StudyProgressiveWebAppsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
