import create from 'zustand'
import axios from 'axios'
// import { getAllUsers } from '@/services/userService'
import api from '@/services/axios/axios'
import endpointConfig from '@/configs/endpoint.config'

import { Group } from '@/views/RolesAndPermission/types'
import type { Role } from '@/views/RolesAndPermission/types'

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

interface Permission {
    id: string
    route: string
    description: string
    // Other permission properties here...
}

interface UserStore {
    users: User[]
    roles: Role[]
    groups: Group[]
    permissions: Permission[]
    isLoading: boolean
    processing: boolean
    fetchUsers: (userID: string) => Promise<void>
    fetchRoles: (userID: string) => Promise<void>
    fetchGroups: (userID: string) => Promise<void>
    fetchPermissions: () => Promise<void>
    createUser: (user: User) => Promise<void>
    updateUser: (userId: string, userData: Partial<User>) => Promise<void>
    deleteUser: (userId: string) => Promise<void>
    createRole: (id: string, role: Role, sfn?: () => void) => Promise<void>
    updateRole: (roleId: string, roleData: Partial<Role>) => Promise<void>
    deleteRole: (roleId: string) => Promise<void>
    createGroup: (group: Group) => Promise<void>
    updateGroup: (groupId: string, groupData: Partial<Group>) => Promise<void>
    deleteGroup: (groupId: string) => Promise<void>
    createPermission: (permission: Permission) => Promise<void>
    deletePermission: (permissionId: string) => Promise<void>
}

const initialState: Omit<
    UserStore,
    | 'fetchUsers'
    | 'fetchRoles'
    | 'fetchGroups'
    | 'fetchPermissions'
    | 'createUser'
    | 'updateUser'
    | 'deleteUser'
    | 'createRole'
    | 'updateRole'
    | 'deleteRole'
    | 'createGroup'
    | 'updateGroup'
    | 'deleteGroup'
    | 'createPermission'
    | 'deletePermission'
> = {
    users: [],
    roles: [],
    groups: [],
    permissions: [],
    isLoading: false,
    processing: false,
}

const useUserStore = create<UserStore>((set) => ({
    ...initialState,
    fetchUsers: async (userId) => {
        set({ isLoading: true })
        api.get(endpointConfig.protected(userId).users).then(
            (res) => {
                set({ users: res.data, isLoading: false })
            },
            (error) => {
                console.log('err', error)
                set({ isLoading: false })
            },
        )
    },

    fetchRoles: async (userId) => {
        set({ isLoading: true })
        api.get(endpointConfig.protected(userId).roles).then(
            (res) => {
                set({ roles: res.data?.data, isLoading: false })
            },
            (error) => {
                console.log('err', error)
                set({ isLoading: false })
            },
        )
    },

    fetchGroups: async (userId) => {
        set({ isLoading: true })
        try {
            const response = await api.get(
                `${endpointConfig.protected(userId).groups}/permissions`,
            )
            set({ groups: response.data?.data, isLoading: false })
        } catch (error) {
            console.error('Failed to fetch groups', error)
            set({ isLoading: false })
        }
    },

    fetchPermissions: async () => {
        set({ isLoading: true })
        try {
            const response = await axios.get('/api/permissions')
            set({ permissions: response.data, isLoading: false })
        } catch (error) {
            console.error('Failed to fetch permissions', error)
            set({ isLoading: false })
        }
    },

    createUser: async (user) => {
        try {
            const response = await api.post('/users', user)
            set((state) => ({
                users: [...state.users, response.data],
            }))
        } catch (error) {
            console.error('Error creating user', error)
        }
    },

    updateUser: async (userId, userData) => {
        try {
            const response = await api.put(`/users/${userId}`, userData)
            set((state) => ({
                users: state.users.map((user) =>
                    user.id === userId ? response.data : user,
                ),
            }))
        } catch (error) {
            console.error('Error updating user', error)
        }
    },

    deleteUser: async (userId) => {
        try {
            await api.delete(`/users/${userId}`)
            set((state) => ({
                users: state.users.filter((user) => user.id !== userId),
            }))
        } catch (error) {
            console.error('Error deleting user', error)
        }
    },

    createRole: async (userId, role, sfn) => {
        set(() => ({ processing: true }))
        try {
            await api.post(endpointConfig.protected(userId).roles, role)
            set(() => ({ processing: false }))
            if (sfn) sfn()
        } catch (error) {
            console.error('Error creating role', error)
            set(() => ({ processing: true }))
        }
    },

    updateRole: async (roleId, roleData) => {
        try {
            const response = await api.put(`/roles/${roleId}`, roleData)
            set((state) => ({
                roles: state.roles.map((role) =>
                    role.id === roleId ? response.data : role,
                ),
            }))
        } catch (error) {
            console.error('Error updating role', error)
        }
    },

    deleteRole: async (roleId) => {
        try {
            await api.delete(`/roles/${roleId}`)
            set((state) => ({
                roles: state.roles.filter((role) => role.id !== roleId),
            }))
        } catch (error) {
            console.error('Error deleting role', error)
        }
    },

    createGroup: async (group) => {
        try {
            const response = await api.post('/groups', group)
            set((state) => ({ groups: [...state.groups, response.data] }))
        } catch (error) {
            console.error('Error creating group', error)
        }
    },

    updateGroup: async (groupId, groupData) => {
        try {
            const response = await api.put(`/groups/${groupId}`, groupData)
            set((state) => ({
                groups: state.groups.map((group) =>
                    group._id === groupId ? response.data : group,
                ),
            }))
        } catch (error) {
            console.error('Error updating group', error)
        }
    },

    deleteGroup: async (groupId) => {
        try {
            await api.delete(`/groups/${groupId}`)
            set((state) => ({
                groups: state.groups.filter((group) => group._id !== groupId),
            }))
        } catch (error) {
            console.error('Error deleting group', error)
        }
    },

    createPermission: async (permission) => {
        try {
            const response = await api.post('/permissions', permission)
            set((state) => ({
                permissions: [...state.permissions, response.data],
            }))
        } catch (error) {
            console.error('Error creating permission', error)
        }
    },

    deletePermission: async (permissionId) => {
        try {
            await api.delete(`/permissions/${permissionId}`)
            set((state) => ({
                permissions: state.permissions.filter(
                    (permission) => permission.id !== permissionId,
                ),
            }))
        } catch (error) {
            console.error('Error deleting permission', error)
        }
    },
}))

export default useUserStore
