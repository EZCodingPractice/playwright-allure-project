export interface UserInfo {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}

export interface User {
    users: UserInfo[]
}