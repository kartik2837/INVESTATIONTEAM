export type User = {
    id: string
    first_name: string
    last_name: string
    username: string
    email: string
    role: string
    status: string
    last_login: string
}

export type UserState = {
    allUsers: User[] | []
    loaders: { [key: string]: boolean }
    errors: { [key: string]: unknown }
}
