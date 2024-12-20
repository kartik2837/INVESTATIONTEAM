import { AdaptiveCard, Container } from '@/components/shared'
import Loading from '@/components/shared/Loading'
import useUserStore from '@/store/userStore'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PermissionGroup from '../permissions/PermissionGroup'

const CardDiv = ({
    label,
    value,
}: {
    label: string
    value: string | number
}) => {
    return (
        <div>
            <p>{label}</p>
            <p className="font-semibold">{value ?? '-'}</p>
        </div>
    )
}

const UpdateRole = () => {
    // const { id } = useParams()

    const { groups, isLoading, fetchGroups } = useUserStore((state) => ({
        groups: state.groups,
        isLoading: state.isLoading,
        fetchGroups: state.fetchGroups,
    }))

    useState(() => {
        fetchGroups('671918be802455a27db88e8b')
    }, [])

    return (
        <Container>
            <AdaptiveCard>
                <div className="flex flex-wrap gap-16">
                    <CardDiv label="Name" value="Administrator" />
                    <CardDiv label="Created At" value="2023 jan 14" />
                </div>
                <div className="mt-4">
                    <h2 className="text-base border-b pb-1.5 text-gray-600 dark:text-gray-300 dark:border-gray-400">
                        Permissions
                    </h2>
                    {isLoading ? (
                        <Loading loading={isLoading} />
                    ) : (
                        <div className="flex flex-col gap-6 mt-5">
                            {groups?.length ? (
                                groups?.map((group) => (
                                    <PermissionGroup
                                        key={group?._id}
                                        label={group.name}
                                        permissions={group?.permissions}
                                    />
                                ))
                            ) : (
                                <p>No Permission Group Found</p>
                            )}
                        </div>
                    )}
                </div>
            </AdaptiveCard>
        </Container>
    )
}

export default UpdateRole
