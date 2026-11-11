// import { test, expect } from '../fixtures/base-fixture';

// test('transform response', async ({ page }) => {
//   // handler
//   await page.route(
//     '**/ua/osago/polis-oscpv-vid-**', // matches ?_rsc=... too
//     async (route, request) => {
//       // only touch Next.js RSC requests, let the normal HTML page through
//       if (request.headers()['rsc'] !== '1') {
//         return route.continue();
//       }

//       const response = await route.fetch();
//       let body = await response.text(); // RSC payload is plain text, not JSON

//       // change whatever you need in the text
//       body = body.replaceAll('Гардіан', 'TEST INSURER');

//       const headers = { ...response.headers() };
//       delete headers['content-length']; // body length changed
//       delete headers['content-encoding']; // body is already decoded

//       await route.fulfill({
//         response,
//         headers,
//         body,
//         contentType: 'text/x-component',
//       });
//     },
//   );

//   const rscResponse = page.waitForResponse('**/ua/osago/polis-oscpv-vid-**');

//   await page.goto(
//     'https://hotline.finance/ua/osago/offers#stateNumber=AE1234MC&autoMakerId=214&...',
//   );
//   await rscResponse;

//   await page.waitForResponse('**/ua/osago/polis-oscpv-vid-**');

//   console.log('');
// });


// test('mock osago search response', async ({ page }) => {
//   // same mocked JSON for every /api/insurance/osago/search?id=<any> request
//   await page.route(
//     (url) => url.pathname === '/api/insurance/osago/search',
//     async (route) => {
//       await route.fulfill({
//         status: 200,
//         contentType: 'application/json',
//         path: 'tests/e2e/mocks/osago-search.json',
//       });
//     },
//   );

//   const searchResponse = page.waitForResponse((res) =>
//     res.url().includes('/api/insurance/osago/search'),
//   );

