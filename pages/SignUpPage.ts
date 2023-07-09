import { expect, Locator, Page, APIRequestContext, BrowserContext } from '@playwright/test'
import User from '../models/User'
import UserApi from '../apis/UserApi'
import TodoPage from './TodoPage'

class SignUpPage {
    readonly page: Page
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly confirmPasswordInput: Locator
    readonly submitButton: Locator 

    constructor(page: Page) {
        this.page = page 
        this.firstNameInput = page.locator('[data-testid=first-name]')
        this.lastNameInput = page.locator('[data-testid=last-name]')
        this.emailInput = page.locator('[data-testid=email]')
        this.passwordInput = page.locator('[data-testid=password]')
        this.confirmPasswordInput = page.locator('[data-testid=confirm-password]') 

        this.submitButton = page.locator('[data-testid=submit]')

    }

    // METHODS
    visit = async () => {
        await this.page.goto('/signup')
    }

    registerAsNewUser = async () => {
        const user = new User()

        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(user.getFirstName())

        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill(user.getLastName())

        await this.emailInput.waitFor()
        await this.emailInput.fill(user.getEmail())

        await this.passwordInput.waitFor()
        await this.passwordInput.fill(user.getPassword())

        await this.confirmPasswordInput.waitFor()
        await this.confirmPasswordInput.fill(user.getPassword())

        await this.submitButton.waitFor()
        await this.submitButton.click()

        const todo = new TodoPage(this.page)
        await expect(todo.welcomeMessage).toBeVisible()

        const actualWelcomeMessage = await todo.welcomeMessage.innerText()
        expect(actualWelcomeMessage).toContain(user.getFirstName().toUpperCase())
    }

    registerNewUser = async (request: APIRequestContext, context: BrowserContext) => {
        const userApi = new UserApi()
        await userApi.signup(request, context)
    }

}

export default SignUpPage