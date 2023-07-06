import { APIRequestContext } from "@playwright/test";

export default class TodoApi {
    
    async addTodo(request: APIRequestContext, response) {
        return await request.post('/api/v1/tasks', {
            data: {
                isCompleted: false,
                item: "Learn Playwright"
            },
            headers: {
                Authorization: `Bearer ${response.access_token}`
            }
        })
    }
}