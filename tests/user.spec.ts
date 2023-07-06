import { test, expect } from '@playwright/test'
import SignupPage from '../pages/SignupPage'

test.describe('Signup New User', () => {
    test('should be able to register to our application', async ({page, request}) => {
        const signUp = new SignupPage(page)
    
        await signUp.visit()
        await signUp.registerAsNewUser()

    })  
})
