import { test, expect } from '@playwright/test'
import SignUpPage from '../pages/SignUpPage'

test.describe('Signup New User', () => {
    let signUpPage: SignUpPage

    test.beforeEach(async({page}) => {
        signUpPage = new SignUpPage(page)
        await signUpPage.visit()
    })
    test('should be able to register to our application', async ({page, request}) => {
        await signUpPage.registerAsNewUser()
    })  
})
