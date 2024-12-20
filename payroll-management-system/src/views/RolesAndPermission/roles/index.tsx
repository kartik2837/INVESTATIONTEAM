import useUserStore from '@/store/userStore'
import { AdaptiveCard, Container } from '@/components/shared'

import RoleDiv from './Role'
import RolePermissionDialog from './RolePermissionDialog'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui'
import Loading from '@/components/shared/Loading'

const RoleList = () => {
    // const navigate = useNavigate()
    // const { id } = useParams()

    const [rolePermissionOpen, setRolePermissionOpen] = useState(false)
    const [dialogType, setDialogType] = useState<'new' | 'edit'>('new')

    const { roles, isLoading, fetchRoles } = useUserStore((state) => ({
        roles: state.roles,
        isLoading: state.isLoading,
        fetchRoles: state.fetchRoles,
    }))

    useEffect(() => {
        fetchRoles('671918be802455a27db88e8b')
    }, [])

    const handleCreateRole = () => {
        setDialogType('new')
        setRolePermissionOpen(true)
    }

    return (
        <>
            <Container>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3>Roles and Permissions</h3>
                        <Button variant="solid" onClick={handleCreateRole}>
                            Create Role
                        </Button>
                    </div>
                    {isLoading ? (
                        <Loading loading={isLoading} />
                    ) : (
                        <RoleDiv roles={roles} />
                    )}
                </div>
            </Container>
            <RolePermissionDialog
                open={rolePermissionOpen}
                setOpen={setRolePermissionOpen}
                dialogType={dialogType}
            />
        </>
    )
}

export default RoleList
