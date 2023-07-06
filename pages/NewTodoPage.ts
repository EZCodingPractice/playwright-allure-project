import { expect, Locator, Page, APIRequestContext, BrowserContext } from '@playwright/test'
import UserApi from '../apis/UserApi'
import TodoApi from '../apis/TodoApi'
import TodoPage from '../pages/TodoPage'

export default class NewTodoPage {
    readonly page: Page
    readonly newTodoInput: Locator
    readonly createTodoButton: Locator

    constructor(page: Page)  {
        this.page = page
        this.newTodoInput = page.locator('[data-testid=new-todo]')
        this.createTodoButton = page.locator('[data-testid=submit-newTask]')
    }

     // METHODS
     visit = async () => {
        await this.page.goto('/todo/new')
    }

    // API CALLS
    addNewTodoItem = async (request: APIRequestContext, context: BrowserContext) => {
        const userApi: UserApi = new UserApi()
        const response = await userApi.signup(request, context)

        const todoApi = new TodoApi()
        await todoApi.addTodo(request, response)

        await this.page.goto('/todo')
    }

    addNewTodo = async () => {
        const todoPage = new TodoPage(this.page)
        await todoPage.addTodo.waitFor()
        await todoPage.addTodo.click()

        await this.newTodoInput.waitFor()
        await this.newTodoInput.fill('Learning Playwright')

        await this.createTodoButton.waitFor()
        await this.createTodoButton.click()

        const todoItemText = todoPage.getTodoItem().innerText()
        expect (await todoItemText).toEqual('Learning Playwright')
    }
}