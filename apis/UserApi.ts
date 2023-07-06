import { APIRequestContext, BrowserContext } from '@playwright/test'
import User from '../models/User'
import config from '../playwright.config'

export default class UserApi {

    async signup(request: APIRequestContext, context: BrowserContext) {
        const userInfo = new User()

        const response = await request.post('/api/v1/users/register', {
            data: {
                email: userInfo.getEmail(),
                password: userInfo.getPassword(),
                firstName: userInfo.getFirstName(),
                lastName: userInfo.getLastName()
            }
        })

        const responseBody = await response.json()

        await context.addCookies([
            {
                name: "access_token",
                value: responseBody.access_token,
                url: config.use?.baseURL
            },
            {
                name: "firstName",
                value: responseBody.firstName,
                url: config.use?.baseURL
            },
            {
                name: "userID",
                value: responseBody.userID,
                url: config.use?.baseURL
            }
        ])

        return await response.json()
        
    }
}