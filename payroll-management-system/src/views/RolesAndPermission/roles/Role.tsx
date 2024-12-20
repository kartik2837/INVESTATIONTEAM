import Button from '@/components/ui/Button'
// import { useRolePermissionsStore } from '../store/rolePermissionsStore'
import UsersAvatarGroup from '@/components/shared/UsersAvatarGroup'
import { TbArrowRight } from 'react-icons/tb'
import { Role } from '../types'

const RoleDiv = ({ roles }: { roles: Role[] }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {roles.map((role) => (
                <div
                    key={role.id}
                    className="flex flex-col justify-between rounded-2xl p-5 bg-gray-100 dark:bg-gray-700 min-h-[140px]"
                >
                    <div className="flex items-center justify-between">
                        <h6 className="font-bold">{role.name}</h6>
                    </div>
                    <p className="mt-2">{role?.description || 'N/A'}</p>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex flex-col">
                            <div className="-ml-2">
                                <UsersAvatarGroup
                                    avatarProps={{
                                        className:
                                            'cursor-pointer -mr-2 border-2 border-white dark:border-500',
                                        size: 28,
                                    }}
                                    avatarGroupProps={{ maxCount: 3 }}
                                    chained={false}
                                    // users={role.users}
                                />
                            </div>
                        </div>
                        <Button
                            variant="plain"
                            size="sm"
                            className="py-0 h-auto"
                            icon={<TbArrowRight />}
                            iconAlignment="end"
                            // onClick={() => handleEditRoleClick(role.id)}
                        >
                            Edit role
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RoleDiv
