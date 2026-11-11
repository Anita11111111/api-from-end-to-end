import { test, expect } from '../fixtures/base-fixture.ts';
import { APIRequestContext } from '@playwright/test';
import { ArticleController } from '../../apps/controllers/ArticleController';

test('get token - check that user logged', async ({ request }) => {
  const response = await request.post('http://104.168.59.50/api/users/login', {
    data: { user: { email: 'olena@example.com', password: 'password' } },
    failOnStatusCode: true,
  });

  const isOk = response.ok();
  const text = await response.text();
  const json = await response.json();

  const token = json.user.token;

  console.log(token);
});

test('get articles - check body', async ({ request }) => {
  const response = await request.get('http://104.168.59.50/api/articles', {
    params: {
      sort: 'newest',
      limit: 10,
      offset: 0,
    },
    failOnStatusCode: true,
  });

  const json = await response.json();

  console.log(json);
});

test('create article, should be successfull', async ({ request }) => {
  let response = await request.post('http://104.168.59.50/api/users/login', {
    data: { user: { email: 'olena@example.com', password: 'password' } },
    failOnStatusCode: true,
  });

  const json = await response.json();
  const token = json.user.token;

  response = await request.post('http://104.168.59.50/api/articles', {
    headers: {
      Authorization: 'Token ' + token,
    },
    data: {
      article: {
        title: 'test',
        description: 'test',
        body: 'test',
        tagList: [],
        category: 'general',
        visibility: 'public',
        allowComments: true,
        cover: '',
      },
    },
    failOnStatusCode: true,
  });

  console.log(response.headers());
});


