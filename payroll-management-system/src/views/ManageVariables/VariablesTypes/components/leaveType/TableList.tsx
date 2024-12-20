import DataTable, {
    OnSortParam,
    ColumnDef,
    Row,
} from '@/components/shared/DataTable'
import axios from 'axios'
import Input from '@/components/ui/Input'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import { z } from 'zod'
import { useMemo, useState } from 'react'
import { TbChecks, TbPencil, TbTrash } from 'react-icons/tb'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormItem, Form } from '@/components/ui/Form'
import { useForm, Controller } from 'react-hook-form'
import { API_BASE_URL, API_KEY } from '@/constants/app.constant'
import { Notification, Tag, toast, Tooltip } from '@/components/ui'
import type { LeaveType, TableQueries } from '@/views/ManageVariables/types'
import { StickyFooter } from '@/components/shared'

type FormSchema = z.infer<typeof validationSchema>

const validationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
})

const ActionColumn = ({
    onEdit,
    onDelete,
}: {
    onEdit: () => void
    onDelete: () => void
}) => {
    return (
        <div className="flex items-center gap-3">
            <Tooltip title="Edit">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onEdit}
                >
                    <TbPencil />
                </div>
            </Tooltip>
            <Tooltip title="Delete">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onDelete}
                >
                    <TbTrash />
                </div>
            </Tooltip>
        </div>
    )
}

const TableList = ({
    tableData,
    setTableData,
    isLoading,
    setIsLoading,
    getData,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalRecords,
    setRender,
}: {
    tableData: TableQueries
    setTableData: React.Dispatch<React.SetStateAction<TableQueries>>
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    getData: LeaveType[]
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    pageSize: number
    setPageSize: React.Dispatch<React.SetStateAction<number>>
    totalRecords: number
    setRender: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const openNotification = () => {
        toast.push(
            <Notification type="success" title="Data Updated Successfully" />,
            {
                placement: 'top-center',
            },
        )
    }

    const [selectedCustomer, setSelectedCustomer] = useState<LeaveType[]>([])
    const [deleteModel, setDeleteModel] = useState(false)
    const [updateModel, setUpdateModel] = useState(false)
    const [elementId, setElementId] = useState<number | string>()

    // ================================= Table Functionalities Start ============================= //

    const handleRowSelect = (checked: boolean, row: LeaveType) => {
        const isPresent = selectedCustomer.some((item) => item._id === row._id)

        if (isPresent) {
            setSelectedCustomer(
                selectedCustomer.filter((item) => item._id !== row._id),
            )
        } else {
            setSelectedCustomer([...selectedCustomer, row])
        }
    }

    // To get only the IDs of the selected customers when needed:
    const selectedCustomerIds = selectedCustomer.map((item) => item._id)

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)

        if (selectedCustomer.length > 0) {
            setSelectedCustomer([])
        }
    }

    const handlePaginationChange = (page: number) => {
        setPage(page)
        const newTableData = structuredClone(tableData)
        newTableData.pageIndex = page
        handleSetTableData(newTableData)
    }

    const handleSelectChange = (value: number) => {
        setPageSize(value)
        const newTableData = structuredClone(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        handleSetTableData(newTableData)
    }

    const handleSort = (sort: OnSortParam) => {
        const newTableData = structuredClone(tableData)
        newTableData.sort = sort
        handleSetTableData(newTableData)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<LeaveType>[]) => {
        setSelectedCustomer(checked ? rows.map((row) => row.original) : [])
    }

    // ================================= Table Functionalities End =============================== //

    // ================================= Form Handler Start ====================================== //

    const selectedLeaveType = getData.find(
        (leaveType) => leaveType._id === elementId,
    )

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<FormSchema>({
        defaultValues: {
            name: selectedLeaveType?.name || '',
        },
        resolver: zodResolver(validationSchema),
    })

    // ================================= Form Handler End ========================================== //

    // ================================= Update Method Start ======================================= //

    const handleEdit = (LeaveType: LeaveType) => {
        setUpdateModel(true)
        setElementId(LeaveType?._id)
        reset({
            name: LeaveType?.name || '',
        })
    }
    const [isSubmitting, setIsSubmitting] = useState(false)
    const onSubmit = async (values: FormSchema) => {
        if (isSubmitting) return
        setIsSubmitting(true)
        try {
            const updatedValues = {
                ...values,
                leaveId: elementId,
            }

            const response = await axios.patch(
                `${API_BASE_URL}api/leave/update`,
                updatedValues,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-investation-api-keys': API_KEY,
                    },
                },
            )

            if (response?.data?.errorCode === 0) {
                openNotification()
                reset()
                setRender(true)
                setUpdateModel(false)
            } else {
                window.alert('Failed to submit data')
            }
        } catch (error) {
            console.error('Error submitting data:', error)
            window.alert('An error occurred while submitting data')
        } finally {
            setIsSubmitting(false) // Unlock submission
        }
    }

    // ================================= Update Method End ========================================= //

    // ================================= Delete Method Start ======================================= //

    const handleDeleteModel = (LeaveType: LeaveType) => {
        setDeleteModel(true)
        setElementId(LeaveType?._id)
    }

    const handleBulkDelete = () => {
        setDeleteModel(true)
    }

    const handleDelete = async () => {
        try {
            console.log('Delete', elementId)

            const response = await axios.delete(
                `${API_BASE_URL}api/leave/deletes`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-investation-api-keys': API_KEY,
                    },
                    data: {
                        leaveIds: selectedCustomerIds
                            ? selectedCustomerIds
                            : [elementId],
                    },
                },
            )

            setSelectedCustomer([])
            setRender(true)
            setDeleteModel(false)
        } catch (error) {
            console.error('Error deleting leave record:', error)
        }
    }

    // ================================= Delete Method End ========================================= //

    // ================================= Table Column Start ======================================== //

    const columns: ColumnDef<LeaveType>[] = useMemo(
        () => [
            {
                header: 'Action',
                accessorKey: 'Action',
                cell: (props) => (
                    // <ActionColumn
                    //     onEdit={() => handleEdit(props.row.original)}
                    //     onDelete={() => handleDeleteModel(props.row.original)}
                    // />
                    <div className="flex items-center gap-3">
                        <Tooltip title="Edit">
                            <div
                                className={`text-xl cursor-pointer select-none font-semibold`}
                                role="button"
                                onClick={() => handleEdit(props.row.original)}
                            >
                                <TbPencil />
                            </div>
                        </Tooltip>
                        {/* <Tooltip title="Delete">
                            <div
                                className={`text-xl cursor-pointer select-none font-semibold`}
                                role="button"
                                onClick={() =>
                                    handleDeleteModel(props.row.original)
                                }
                            >
                                <TbTrash />
                            </div>
                        </Tooltip> */}
                    </div>
                ),
            },
            {
                header: 'Name',
                accessorKey: 'name',
                // cell: (props) => {
                //     const row = props.row.original
                //     return (
                //         <div className="flex items-center">
                //             <Link
                //                 className={`hover:text-primary ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                //                 to="#"
                //             >
                //                 {row.name}
                //             </Link>
                //         </div>
                //     )
                // },
            },
            // {
            //     header: 'Email',
            //     accessorKey: 'email',
            // },
            // {
            //     header: 'Status',
            //     accessorKey: 'status',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (
            //             <div className="flex items-center">
            //                 <Tag
            //                     className={
            //                         row.status && statusColor[row.status]
            //                     }
            //                 >
            //                     <span className="capitalize">{row.status}</span>
            //                 </Tag>
            //             </div>
            //         )
            //     },
            // },
            // {
            //     header: 'Spent',
            //     accessorKey: 'totalSpending',
            //     cell: (props) => {
            //         return <span>${props.row.original.totalSpending}</span>
            //     },
            // },
        ],
        [],
    )

    // ================================= Table Column End ========================================== //

    return (
        <>
            <DataTable
                selectable
                columns={columns}
                data={getData}
                noData={false && !getData?.length}
                loading={isLoading}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                pagingData={{
                    total: totalRecords,
                    pageIndex: page,
                    pageSize: pageSize,
                }}
                checkboxChecked={(row) =>
                    selectedCustomer.some(
                        (selected) => selected._id === row._id,
                    )
                }
                onPaginationChange={handlePaginationChange}
                onSelectChange={handleSelectChange}
                onCheckBoxChange={handleRowSelect}
                onIndeterminateCheckBoxChange={handleAllRowSelect}
            />

            {/* ==================================== Selected list ==================================== */}

            {selectedCustomer.length > 0 && (
                <StickyFooter
                    className=" flex items-center justify-between py-4 bg-white dark:bg-gray-800"
                    stickyClass="-mx-4 sm:-mx-8 border-t border-gray-200 dark:border-gray-700 px-8"
                    defaultClass="container mx-auto px-8 rounded-xl border border-gray-200 dark:border-gray-600 mt-4"
                >
                    <div className="container mx-auto">
                        <div className="flex items-center justify-between">
                            <span>
                                {selectedCustomer.length > 0 && (
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg text-primary">
                                            <TbChecks />
                                        </span>
                                        <span className="font-semibold flex items-center gap-1">
                                            <span className="heading-text">
                                                {selectedCustomer.length}{' '}
                                                Customers
                                            </span>
                                            <span>selected</span>
                                        </span>
                                    </span>
                                )}
                            </span>

                            <div className="flex items-center">
                                <Button
                                    size="sm"
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    customColorClass={() =>
                                        'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error'
                                    }
                                    onClick={() => handleBulkDelete()}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </StickyFooter>
            )}

            {/* ==================================== End ====================================================== */}

            {/* ==================================== Delete Model Start ======================================= */}

            <Dialog
                isOpen={deleteModel}
                bodyOpenClassName="overflow-hidden"
                onClose={() => setDeleteModel(false)}
                onRequestClose={() => setDeleteModel(false)}
            >
                <h5 className="mb-1">Confirm Delete</h5>
                <p>Are you sure you want to delete this?</p>
                <p className="mb-4">
                    Once deleted, it will be permanently removed.
                </p>

                <div className="flex justify-end items-end">
                    <Button
                        type="reset"
                        className="ltr:mr-2 rtl:ml-2"
                        onClick={() => setDeleteModel(false)}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={() => handleDelete()}>
                        Delete
                    </Button>
                </div>
            </Dialog>

            {/* ==================================== Delete Model End ======================================= */}

            {/* ==================================== Update Model Start ===================================== */}

            <Dialog
                isOpen={updateModel}
                bodyOpenClassName="overflow-hidden"
                onClose={() => setUpdateModel(false)}
                onRequestClose={() => setUpdateModel(false)}
            >
                <h5 className="mb-1">Update Leave Type</h5>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormItem
                        label="Leave"
                        invalid={Boolean(errors.name)}
                        errorMessage={errors.name?.message}
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="name"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder=""
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>

                    <Button
                        type="reset"
                        className="ltr:mr-2 rtl:ml-2"
                        onClick={() => reset()}
                    >
                        Reset
                    </Button>
                    <Button
                        variant="solid"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Updating...' : 'Update'}
                    </Button>
                </Form>
            </Dialog>

            {/* ==================================== Update Model End ===================================== */}
        </>
    )
}

export default TableList
