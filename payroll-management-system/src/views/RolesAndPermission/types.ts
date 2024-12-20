export type User = {
    id: string
    first_name: string
    last_name: string
    full_name: string
    username: string
    email: string
    role: string
    status: string
    last_login: string
}

export type TableQueries = {
    total?: number
    pageIndex?: number
    pageSize?: number
    query?: string
    sort?: {
        order: 'asc' | 'desc' | ''
        key: string | number
    }
}

export type Role = {
    name: string
    id: string
    description?: string
    created_at: string
    updated_at: string
    permissions?: string[]
}

export type Permission = {
    _id: string
    slug: string
    name: string
    route: string
    method: string
    description?: string
}

export type Group = {
    name: string
    _id: string
    slug: string
    permissions: Permission[]
}
