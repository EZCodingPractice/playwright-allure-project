import { Page, Locator, expect, APIRequestContext, BrowserContext } from '@playwright/test'
import UserApi from '../apis/UserApi'
import TodoApi from '../apis/TodoApi'

class TodoPage {
    readonly page: Page
    readonly welcomeMessage: Locator
    readonly addTodo: Locator
    readonly noTodosLabel: Locator
    readonly newTodoInput: Locator
    readonly createTodoButton: Locator
    readonly goBack: Locator
    readonly todoItem: Locator
    readonly deleteButton: Locator

    constructor(page: Page) {
        this.page = page
        this.welcomeMessage = page.locator('[data-testid=welcome]')
        this.addTodo = page.locator('[data-testid=add]')
        this.noTodosLabel = page.locator('[data-testid=no-todos]')
        this.goBack = page.locator('[data-testid=back]')
        this.todoItem = page.locator('[data-testid=todo-item]')
        this.deleteButton = page.locator('[data-testid=delete]')
    }

    getTodoItem(): Locator {
        return this.todoItem
    }

    visit = async () => {
        await this.page.goto('/todo')
    }

    // STEPS
    deleteTodo = async (request: APIRequestContext, context: BrowserContext) => {
        const userApi: UserApi = new UserApi()
        const response = await userApi.signup(request, context)

        const todoApi = new TodoApi()
        await todoApi.addTodo(request, response)
        
        await this.page.goto('/todo')
        await this.deleteButton.waitFor()
        await this.deleteButton.click()

        await this.noTodosLabel.waitFor()
        await expect(this.noTodosLabel).toBeVisible()

        const noTodosMessage = this.noTodosLabel.innerText()
        expect(await noTodosMessage).toEqual('No Available Todos')
    }

}

export default TodoPage