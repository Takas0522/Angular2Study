import { UseBootstrapTooltipPage } from './app.po';

describe('use-bootstrap-tooltip App', () => {
  let page: UseBootstrapTooltipPage;

  beforeEach(() => {
    page = new UseBootstrapTooltipPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
