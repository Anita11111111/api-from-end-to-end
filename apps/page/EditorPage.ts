export class EditorPage {

  async open() {
    await this.page.goto('articles/editor');
  }

  async fillForm(article: ArticleFormData) {
    await this.titleInput.fill(article.title);
    await this.descriptionInput.fill(article.description);
    await this.bodyInput.fill(article.body);
  }

  async publish(article: ArticleFormData) {
    await this.fillForm(article);


    const promiseResponse = this.page.waitForResponse('**/api/articles');
    const promiseRequest = this.page.waitForRequest('**/api/articles')

    await this.submitButton.click();

    const request = await promiseRequest;
    const response = await promiseResponse;

    const json = await response.json()

    return json.article.slug
  }
}