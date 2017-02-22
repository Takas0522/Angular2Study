import { UseFullCalenderPage } from './app.po';

describe('use-full-calender App', () => {
  let page: UseFullCalenderPage;

  beforeEach(() => {
    page = new UseFullCalenderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
