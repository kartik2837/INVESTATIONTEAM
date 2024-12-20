export const apiPrefix = '/api'

const endpointConfig = {
    signIn: 'api/admin/admin-login',
    signOut: '/sign-out',
    signUp: '/auth/register',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',

    protected(userID: string) {
        const baseUrl = `/users/${userID}`
        return {
            users: `${baseUrl}/users`,
            roles: `${baseUrl}/roles`,
            groups: `${baseUrl}/permission-group`,
            permissions: `${baseUrl}/permissions`,
        }
    },
}

export default endpointConfig
