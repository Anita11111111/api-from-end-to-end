import { faker } from '@faker-js/faker';
import { test, expect } from '../fixtures/base-fixture';
import { UserController } from '../../apps/controllers/UserController';

test.describe('Update user avatar', () => {
    const email = faker.internet.email();
    const username =  faker.internet.username();
    const password = '123456';
    const image = faker.image.avatar()

    test.use({ userData: { user: { username, email, password } } })


test('new user registration', async({ createNewUser, newUserToken, authorizeBrowserAsNewUser, page, request}) => {
     const userController = new UserController(request)
    expect(createNewUser.email).toEqual(email)
    expect(createNewUser.username).toEqual(username)

    const token = createNewUser.token
    expect(token.length).toBeGreaterThan(0)

    const loginToken = await userController.loginAsUser(email, password)
    expect(loginToken.length).toBeGreaterThan(0)

     await page.goto('/articles') 
     const userLink = page.getByRole('link', { name: username });
    await expect(userLink).toBeVisible();   // wait until the user is loaded
    await userLink.click();  
    
    await page.getByRole('link', { name: 'Edit profile' }).click();
    await expect(page).toHaveURL(/\/articles\/settings/);
   
    
     await expect(page.getByTestId('settings-username')).toHaveValue(username)
     await expect(page.getByTestId('settings-email')).toHaveValue(email)
     await page.getByTestId('settings-image').clear()
        await page.getByTestId('settings-image').fill(image)
     await page.getByTestId('settings-submit').click()

     const avatar = page.getByTestId('settings-avatar-preview').locator('img');
     await expect(avatar).toHaveAttribute('src', image)

     await page.reload()
     await userLink.click();
     await page.getByRole('link', { name: 'Edit profile' }).click();
     await expect(page.getByTestId('settings-image')).toHaveValue(image)
     await expect(avatar).toHaveAttribute('src', image)

})
    
})

