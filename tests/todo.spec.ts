import { test, expect } from '@playwright/test'
import SignupPage from '../pages/SignupPage'
import TodoPage from '../pages/TodoPage'
import NewTodoPage from '../pages/NewTodoPage'

test.describe('Add new todo', () => {
    test('should be able to add a new todo', async ({page}) => {
        const signUp = new SignupPage(page)
        const newTodoPage = new NewTodoPage(page)
    
        await signUp.visit()
        await signUp.registerAsNewUser()
        await newTodoPage.addNewTodo()
    })

    test('should be able to add a new todo item using API', async ({page, request, context}) => {
        const signupPage = new SignupPage(page)
        const newTodoPage = new NewTodoPage(page)

        await signupPage.registerNewUser(request, context)  // Using API
        await newTodoPage.visit()
        await newTodoPage.addNewTodoItem(request, context)  // Using API
    })

    test('should be able to delete a todo', async ({page, request, context}) => {
        const signupPage = new SignupPage(page)
        const todoPage = new TodoPage(page)

        await signupPage.registerNewUser(request, context)  // Using API
        await todoPage.visit()
        await todoPage.deleteTodo(request, context)
    })
})
