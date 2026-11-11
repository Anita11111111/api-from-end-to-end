import { test, expect } from '../fixtures/base-fixture';
import { APIRequestContext, request as newContext } from '@playwright/test';
import { ArticleController } from '../../apps/controllers/ArticleController';
import { UserController } from '../../apps/controllers/UserController';
import { faker } from '@faker-js/faker';

test('login via api - user should be logged', async ({
  page,
  request,
  login,
}) => {
  /* 
    1. нового юзера
    2. під цим юзером створити артікл
    3. авторизуватись під оленою
    4. додати артікл з кроку 2 у фейворіт
    5. перевірити що він додався
  */

  const userController = new UserController(request);

  // 1 create user
  const userData = {
    email: faker.internet.email(),
    password: '123456',
    username: faker.internet.username(),
  };

  await userController.createUser({
    user: userData,
  });

  // login as create user
  const token = await userController.loginAsUser(
    userData.email,
    userData.password,
  );

  // create context with token
  const apiContext = await newContext.newContext({
    extraHTTPHeaders: {
      authorization: 'Token ' + token,
    },
  });

  await page.goto(`http://104.168.59.50/articles`);

  // контроллер під новоствореним користувачем
  const articleController = new ArticleController(apiContext);

  const title = faker.book.title();
  const body = {
    article: {
      title: title,
      description: 'test',
      body: 'test',
      tagList: [],
      category: 'general',
      visibility: 'public',
      allowComments: true,
      cover: '',
    },
  };

  const { article } = await articleController.createArticle(body);
  const slug = article.slug;

  // повертаємось до олени і переходимо на сторінку створенного артікла

  await page.goto(`/articles/article/${slug}`);
  // wait until the backend has actually saved the favorite
  const favoriteResponse = page.waitForResponse(
    (res) => res.url().includes('/favorite') && res.request().method() === 'POST',
  );
  await page.getByTestId('article-favorite-button').click();
  await favoriteResponse;

  await page.getByTestId('nav-profile').click();
  await page.getByTestId('profile-tab-favorited').click();

  // retry: reload the page until the article appears in the list
  await expect(async () => {
    await page.reload();
    await expect(page.getByTestId('article-list')).toContainText(title);
  }).toPass();
});
