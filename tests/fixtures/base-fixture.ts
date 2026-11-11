import { test as base, expect, request } from '@playwright/test';
import { CreateUserRequest, UserResponse, UserController } from '../../apps/controllers/UserController';
import { faker } from '@faker-js/faker';

type MyFixtures = {
  login: void;
  token: string;
  userData: CreateUserRequest
  userController: UserController
  createNewUser: UserResponse['user']
  authorizeBrowserAsNewUser: void 
  newUserToken: string
};

const test = base.extend<MyFixtures>({
   userData: [ {user: {username: faker.internet.username(), email: faker.internet.email(),  password: '123456'}},
    {option: true}
  ],

  userController: async ({baseURL}, use) => {
    const context = await request.newContext({baseURL})
    const userController = new UserController(context)
    await use(userController)
  },

  createNewUser: async ({userController,  userData}, use) => {
    const response = await userController.createUser(userData)
    await use(response.user)
   },

   newUserToken: async ({ createNewUser }, use) => {
  await use(createNewUser.token);
 },

 authorizeBrowserAsNewUser: async ({ context, baseURL, newUserToken }, use) => {
  await context.setStorageState(createLocalStorage(baseURL!, newUserToken));  // only writes storage
  await use();
},

  token: async ({}, use) => {
    const context = await request.newContext({});
    const response = await context.post('http://104.168.59.50/api/users/login', {
      data: { user: { email: 'olena@example.com', password: 'password' } },
      failOnStatusCode: true,
    });

    const json = await response.json();
    const token = json.user.token;

    await use(token);
  },

  login: async ({ context, baseURL, token }, use) => {
    const localStorage = createLocalStorage(baseURL!, token);
    await context.setStorageState(localStorage);

    await use();
  },

  request: async ({ token }, use) => {
    const context = await request.newContext({
      extraHTTPHeaders: {
        authorization: 'Token ' + token,
      },
    });

    await use(context);
  },
});

function createLocalStorage(baseUrl: string, token: string) {
  return {
    cookies: [],
    origins: [
      {
        origin: new URL(baseUrl!).origin,
        localStorage: [
          { name: 'qa-dojo.token', value: token },
          { name: 'qa-dojo.senpai', value: 'cool' },
        ],
      },
    ],
  };
}

export { test, expect };
