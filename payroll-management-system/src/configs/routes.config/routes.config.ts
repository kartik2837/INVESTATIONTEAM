import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'dashboard',
        path: '/dashboard',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    // ========variablesType====
    {
        key: 'variablesType.list',
        path: '/variables-types',
        component: lazy(() => import('@/views/ManageVariables/VariablesTypes/index')),
        authority: [],
    },
    {
        key: 'variablesMethod.list',
        path: '/variables-method',
        component: lazy(() => import('@/views/ManageVariables/VariablesMethod/index')),
        authority: [],
    },

    // =========end========
    

   
    

   
    // routes for roles and permissions

    {
        key: 'rolesandpermission.users',
        path: '/users',
        component: lazy(() => import('@/views/RolesAndPermission/users/index')),
        authority: [],
    },
    {
        key: 'rolesandpermission.roles',
        path: '/roles',
        component: lazy(() => import('@/views/RolesAndPermission/roles/index')),
        authority: [],
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
        },
    },

    {
        key: 'rolesandpermission.roles',
        path: '/roles/edit/:id',
        component: lazy(
            () => import('@/views/RolesAndPermission/roles/UpdateRole'),
        ),
        authority: [],
        meta: {
            header: {
                title: 'Update Role',
                description: 'Update Role and assign groups',
                contained: true,
            },
            footer: false,
        },
    },

    // {
    //     key: 'rolesandpermission.permissions',
    //     path: '/permissions',
    //     component: lazy(() => import('@/views/Customers/CustomerList/index')),
    //     authority: [],
    // },

    ...othersRoute,
]
