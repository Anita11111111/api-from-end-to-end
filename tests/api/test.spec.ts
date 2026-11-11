// import { ArticlePage } from '../../pages/ArticlePage';

// test('logged-in user creates an article via the editor (page objects)', async ({
//   page,
//   login,
// }) => {
//   const homePage = new HomePage(page);
//   const editorPage = new EditorPage(page);
//   const articlePage = new ArticlePage(page);

// //     let responseCounter = 0;

// //   page.on('request', async (response) => {
// //     if (response.url().includes('**/api/articles')) {
// //         responseCounter++;
// //         console.log(await response.json())
// //     }
// //   })

// //     let requestCounter = 0;

// //   page.on('request', async (request) => {
// //     if (request.url().includes('**/api/articles')) {
// //         requestCounter++;
// //         console.log(request.url())
// //     }
// //   })


//   // handler
//   page.route("**/api/artiles?**", async (route, request) => {
//     if (request.method() === 'GET') {
//         await route.abort()
//     }
//     console.log(request.method(), request.url())
//     await route.continue()
//   })

//   const article = {
//     title: `Title-${faker.string.alphanumeric(10)}`,
//     description: faker.lorem.sentence(),
//     body: faker.lorem.paragraph(),
//   };

//   await homePage.open();
//   await homePage.openNewArticleEditor();
//   const slug = await editorPage.publish(article);

//   console.log();

//   await expect(articlePage.title).toHaveText(article.title);
//   await expect(articlePage.body).toContainText(article.body);

//   // Нова стаття має з'явитись першою в Global feed (сортування newest)
//   await homePage.open();
//   await homePage.openGlobalFeed();
//   await expect(homePage.previewTitles.first()).toHaveText(article.title);
// });

// test('transform request', async ({
//   page,
//   login,
// }) => {
//   const homePage = new HomePage(page);
//   const editorPage = new EditorPage(page);
//   const articlePage = new ArticlePage(page);

// //     let responseCounter = 0;

// //   page.on('request', async (response) => {
// //     if (response.url().includes('**/api/articles')) {
// //         responseCounter++;
// //         console.log(await response.json())
// //     }
// //   })

// //     let requestCounter = 0;

// //   page.on('request', async (request) => {
// //     if (request.url().includes('**/api/articles')) {
// //         requestCounter++;
// //         console.log(request.url())
// //     }
// //   })


//   // handler
// // handler
// await page.route('**/api/articles?**', async (route, request) => {
//       const homePage = new HomePage(page);
//   const editorPage = new EditorPage(page);
//   const articlePage = new ArticlePage(page);
//   await route.continue({
//     url: 'http://104.168.59.50/api/articles?sort=oldest&limit=1&offset=0',
//   });
// });

// await homePage.open();

// for (let i = 0; i < 10; i++) {
//     await page.waitForLoadState('load')
//     await page.reload();
// }

//   const article = {
//     title: `Title-${faker.string.alphanumeric(10)}`,
//     description: faker.lorem.sentence(),
//     body: faker.lorem.paragraph(),
//   };
// });
