import { MeanTodoPage } from './app.po';

describe('mean-todo App', () => {
  let page: MeanTodoPage;

  beforeEach(() => {
    page = new MeanTodoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
