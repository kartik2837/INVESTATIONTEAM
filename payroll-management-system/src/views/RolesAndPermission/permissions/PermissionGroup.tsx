import { Button, Checkbox } from '@/components/ui'
import { Permission } from '../types'
import PermissionBox from './Permission'
import { Dispatch, SetStateAction, SyntheticEvent } from 'react'

const PermissionGroup = ({
    label,
    permissions,
    selected,
    setSelected,
}: {
    label?: string
    permissions: Permission[]
    selected: object
    setSelected: Dispatch<SetStateAction<object>>
}) => {
    const handleChange = (options: string[], e: SyntheticEvent) => {
        setSelected({ ...selected, [label]: options })
    }

    const handleSelectAll = () => {
        if (selected?.[label]?.length === permissions?.length) {
            setSelected({ ...selected, [label]: [] })
            return
        }
        const allIds = permissions?.map((permission) => permission?._id)
        setSelected({ ...selected, [label]: allIds })
    }

    return (
        <div className="border dark:border-gray-400 rounded-lg p-4">
            {label ? (
                <label className="mb-4 flex items-center w-fit gap-2 cursor-pointer">
                    <p className="font-semibold text-base">{label}</p>
                    <Checkbox
                        value="all"
                        checked={
                            selected?.[label]?.length === permissions?.length
                        }
                        style={{ width: '16px', height: '16px' }}
                        onChange={handleSelectAll}
                    />
                </label>
            ) : null}
            <Checkbox.Group
                value={selected?.[label]}
                onChange={handleChange}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-3"
            >
                {permissions?.map((permission) => (
                    <PermissionBox
                        key={permission?.name}
                        permission={permission}
                    />
                ))}
            </Checkbox.Group>
        </div>
    )
}

export default PermissionGroup
