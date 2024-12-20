import {
    Button,
    Dialog,
    FormItem,
    Input,
    Notification,
    ScrollBar,
    toast,
} from '@/components/ui'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import PermissionGroup from '../permissions/PermissionGroup'
import useUserStore from '@/store/userStore'
import { Role } from '../types'

const RolePermissionDialog = ({
    open,
    setOpen,
    dialogType,
}: {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    dialogType: 'new' | 'edit'
}) => {
    const [data, setData] = useState<{ name: string; description?: string }>({
        name: '',
    })
    const [selected, setSelected] = useState<object>({})

    const {
        groups,
        isLoading,
        fetchGroups,
        createRole,
        fetchRoles,
        processing,
    } = useUserStore((state) => ({
        groups: state.groups,
        isLoading: state.isLoading,
        fetchGroups: state.fetchGroups,
        createRole: state.createRole,
        fetchRoles: state.fetchRoles,
        processing: state.processing,
    }))

    useState(() => {
        fetchGroups('671918be802455a27db88e8b')
    }, [])

    const handleChange =
        (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
            setData({ ...data, [name]: event?.target?.value })
        }

    const handleAddUpdateRole = () => {
        const normalized = Object.values(selected)?.flat(2)

        const payload = { ...data, permissions: normalized } as Role
        if (dialogType === 'new') {
            if (data?.name && data?.description) {
                createRole('671918be802455a27db88e8b', payload, () => {
                    setOpen(false)
                    toast.push(
                        <Notification title="Success" type="success">
                            <p>
                                Role{' '}
                                <span className="font-semibold">
                                    {data.name}
                                </span>{' '}
                                Created Successfully
                            </p>
                        </Notification>,
                    )
                    fetchRoles('671918be802455a27db88e8b')
                })
            }
        } else {
            return
        }
    }

    console.log('processing', processing)

    return (
        <Dialog
            isOpen={open}
            width={900}
            onClose={() => setOpen(false)}
            onRequestClose={() => setOpen(false)}
        >
            <h4>{dialogType === 'new' ? 'Create role' : 'Edit Role'}</h4>

            <div className="px-4">
                {dialogType === 'new' && (
                    <>
                        <FormItem label="Role name">
                            <Input
                                name="name"
                                onChange={handleChange('name')}
                            />
                        </FormItem>
                        <FormItem label="Description">
                            <Input
                                name="description"
                                onChange={handleChange('description')}
                                textArea
                            />
                        </FormItem>
                        <span className="font-semibold mb-2">Permission</span>
                    </>
                )}
                <ScrollBar className="mt-6 max-h-[600px] overflow-y-auto">
                    <div className="flex flex-col gap-5">
                        {isLoading ? (
                            ''
                        ) : groups?.length ? (
                            groups?.map((group) => (
                                <PermissionGroup
                                    label={group?.name}
                                    key={group?._id}
                                    permissions={group?.permissions}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            ))
                        ) : (
                            <p className="my-2">No permissions found</p>
                        )}
                    </div>
                </ScrollBar>
                <div className="flex justify-end mt-6 sticky bottom-0 bg-white">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        // onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={processing}
                        variant="solid"
                        onClick={handleAddUpdateRole}
                    >
                        {processing
                            ? 'Processing...'
                            : dialogType === 'edit'
                              ? 'Update'
                              : 'Create'}
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

export default RolePermissionDialog
