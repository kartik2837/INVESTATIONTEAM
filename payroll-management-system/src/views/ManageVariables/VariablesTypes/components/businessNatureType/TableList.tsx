import DataTable, {
    OnSortParam,
    ColumnDef,
    Row,
} from '@/components/shared/DataTable'
import type {
    Customer,
    LeaveType,
    TableQueries,
} from '@/views/ManageVariables/types'
import { useEffect, useMemo, useState } from 'react'
import { Avatar, Tag, Tooltip } from '@/components/ui'
import { FormItem, Form } from '@/components/ui/Form'
import { Link, useNavigate } from 'react-router-dom'
import { TbPencil, TbTrash } from 'react-icons/tb'
import { MdDeleteOutline } from 'react-icons/md'
import { API_BASE_URL, API_KEY } from '@/constants/app.constant'
import Dialog from '@/components/ui/Dialog'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

// export const list: Customer[] = [
//     {
//         id: 1,
//         name: 'Dilip BK',
//         firstName: 'Dilip',
//         lastName: 'B.K',
//         email: 'dilipbk.dev@gmail.com',
//         totalSpending: 10000,
//         status: 'married',
//         img: 'img/logo/logo-dark-streamline.png',
//     },
//     {
//         id: 2,
//         name: 'Ravi Kumar',
//         firstName: 'Ravi',
//         lastName: 'Kumar',
//         email: 'ravikumar@example.com',
//         totalSpending: 5000,
//         status: 'single',
//     },
//     {
//         id: 3,
//         name: 'Anita Sharma',
//         firstName: 'Anita',
//         lastName: 'Sharma',
//         email: 'anitasharma@example.com',
//         totalSpending: 12000,
//         status: 'married',
//     },
//     {
//         id: 4,
//         name: 'Priya Singh',
//         firstName: 'Priya',
//         lastName: 'Singh',
//         email: 'priyasingh@example.com',
//         totalSpending: 8000,
//         status: 'single',
//     },
//     {
//         id: 5,
//         name: 'Ajay Verma',
//         firstName: 'Ajay',
//         lastName: 'Verma',
//         email: 'ajayverma@example.com',
//         totalSpending: 15000,
//         status: 'married',
//     },
//     {
//         id: 6,
//         name: 'Sonal Gupta',
//         firstName: 'Sonal',
//         lastName: 'Gupta',
//         email: 'sonalgupta@example.com',
//         totalSpending: 11000,
//         status: 'single',
//     },
//     {
//         id: 7,
//         name: 'Karan Mehta',
//         firstName: 'Karan',
//         lastName: 'Mehta',
//         email: 'karanmehta@example.com',
//         totalSpending: 7000,
//         status: 'married',
//     },
// ]

const statusColor: Record<string, string> = {
    active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    blocked: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

const NameColumn = ({ row }: { row: LeaveType }) => {
    return (
        <div className="flex items-center">
            {/* <Avatar size={40} shape="circle" src={row.img} /> */}
            <Link
                className={`hover:text-primary ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                to="#"
            >
                {row.name}
            </Link>
        </div>
    )
}

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
}: {
    tableData: TableQueries
    setTableData: React.Dispatch<React.SetStateAction<TableQueries>>
}) => {
    useEffect(() => {
        if (tableData?.pageSize !== 10) {
            const updatedTableData = {
                ...tableData,
                pageSize: 10,
            }

            setTableData(updatedTableData)
        }
    }, [tableData, setTableData])

    const navigate = useNavigate()
    interface LeaveType {
        _id: number
        name: string
    }

    const [selectedCustomer, setSelectedCustomer] = useState<LeaveType[]>([])
    // const [rowData, setRowData] = useState<LeaveType[]>([])
    const [rowData, setRowData] = useState<LeaveType[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalRecords, setTotalRecords] = useState(0)

    const [deleteModel, setDeleteModel] = useState(false)
    const [updateModel, setUpdateModel] = useState(false)

    const [elementId, setElementId] = useState<string | number>()

    useEffect(() => {
        const fetchLeaves = async () => {
            setLoading(true)

            console.log('Page:', page)
            try {
                const response = await axios.get(
                    `${API_BASE_URL}api/leave/get-all-data?page=${page}&limit=${pageSize}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'x-investation-api-keys': API_KEY,
                        },
                    },
                )

                // const data: LeaveType[] = response?.data?.data || []

                setRowData(response?.data?.data)
                setTotalRecords(response?.data?.total || 0)
                console.log('All DATA_Leave:', response?.data)
            } catch (error) {
                console.error('Failed to fetch leaves:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchLeaves()
    }, [page, pageSize])

    const handleRowSelect = (checked: boolean, row: LeaveType) => {
        const isPresent = selectedCustomer.find(
            (item) => item?._id === row?._id,
        )
        if (isPresent) {
            setSelectedCustomer(
                selectedCustomer.filter((item) => item?._id !== row?._id),
            )
        } else {
            setSelectedCustomer([...selectedCustomer, row])
        }
    }

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

    const columns: ColumnDef<LeaveType>[] = useMemo(
        () => [
            {
                header: 'Action',
                accessorKey: 'Action',
                cell: (props) => (
                    <ActionColumn
                        onEdit={() => handleEdit(props.row.original)}
                        onDelete={() => handleDeleteModel(props.row.original)}
                    />
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    const handleEdit = (LeaveType: LeaveType) => {
        navigate(`/concepts/customers/customer-edit/${LeaveType._id}`)
    }

    const handleDeleteModel = (LeaveType: LeaveType) => {
        setDeleteModel(true)
        setElementId(LeaveType._id.toString())
        console.log('ID', LeaveType._id)
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
                        leaveIds: [elementId],
                    },
                },
            )

            console.log('Delete successful', response.data)

            // Additional logic here, like updating the UI or notifying the user
        } catch (error) {
            console.error('Error deleting leave record:', error)
        }
    }

    return (
        <>
            <DataTable
                selectable
                columns={columns}
                data={rowData}
                noData={false && !rowData?.length}
                loading={loading}
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

            {/* ==================================== Delete Model Start ======================================= */}

            <Dialog
                isOpen={deleteModel}
                bodyOpenClassName="overflow-hidden"
                onClose={() => setDeleteModel(false)}
                onRequestClose={() => setDeleteModel(false)}
            >
                <h5 className="mb-1">Confirm Delete</h5>
                <p className="mb-4">
                    Are you sure you want to delete this? Once deleted, it will
                    be permanently removed.
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
                        Submit
                    </Button>
                </div>
            </Dialog>

            {/* ==================================== Delete Model End ======================================= */}

        </>
    )
}

export default TableList
