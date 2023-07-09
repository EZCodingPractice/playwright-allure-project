import { test } from '@playwright/test'
import SignUpPage from '../pages/SignUpPage'
import TodoPage from '../pages/TodoPage'
import NewTodoPage from '../pages/NewTodoPage'

test.describe.parallel('Add new todo', () => {
    let signUpPage: SignUpPage
    let todoPage: TodoPage
    let newTodoPage: NewTodoPage

    test.beforeEach(async({page}) => {
        signUpPage = new SignUpPage(page)
        todoPage = new TodoPage(page)
        newTodoPage = new NewTodoPage(page)
    })

    test('should be able to add a new todo', async ({page}) => {
        await signUpPage.visit()
        await signUpPage.registerAsNewUser()
        await newTodoPage.addNewTodo()
    })

    test('should be able to add a new todo item using API', async ({page, request, context}) => {
        await signUpPage.registerNewUser(request, context)  // Using API
        await newTodoPage.visit()
        await newTodoPage.addNewTodoItem(request, context)  // Using API
    })

    test('should be able to delete a todo', async ({page, request, context}) => {
        await signUpPage.registerNewUser(request, context)  // Using API
        await todoPage.visit()
        await todoPage.deleteTodo(request, context)
    })
})
