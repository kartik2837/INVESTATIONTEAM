import {
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'

import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
    {
        key: 'dashboard',
        path: '/dashboard',
        title: 'Dashboard',
        translateKey: 'nav.dashboard',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },

    
    {
        key: 'manage-variables',
        path: '',
        title: 'Manage Variables',
        translateKey: 'nav.employees.employees',
        icon: 'employees',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'variablesType.list',
                path: '/variables-types',
                title: 'Variables Type',
                translateKey: 'nav.variablesType.list',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'variablesMethod.list',
                path: '/variables-method',
                title: 'Variables Method',
                translateKey: 'nav.variablesMethod.list',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
    
    {
        key: 'rolesandpermission',
        path: '',
        title: 'Roles and Permissions',
        translateKey: 'nav.rolesandpermission.rolesandpermission',
        icon: 'security',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'rolesandpermission.users',
                path: '/users',
                title: 'Users',
                translateKey: 'nav.rolesandpermission.users',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'rolesandpermission.roles',
                path: '/roles',
                title: 'Roles',
                translateKey: 'nav.rolesandpermission.roles',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            // {
            //     key: 'rolesandpermission.permissions',
            //     path: '/permissions',
            //     title: 'Permissions',
            //     translateKey: 'nav.rolesandpermission.permissions',
            //     icon: '',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [],
            //     subMenu: [],
            // },
        ],
    },
]

export default navigationConfig
