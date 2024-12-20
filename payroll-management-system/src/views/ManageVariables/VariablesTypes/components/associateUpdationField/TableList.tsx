import DataTable, {
    OnSortParam,
    ColumnDef,
    Row,
} from '@/components/shared/DataTable'
import type { Customer, TableQueries } from '@/views/ManageVariables/types'
import { useEffect, useMemo, useState } from 'react'
import { Avatar, Tag, Tooltip } from '@/components/ui'
import { Link, useNavigate } from 'react-router-dom'
import { TbEye, TbPencil } from 'react-icons/tb'

export const list: Customer[] = [
    {
        id: 1,
        name: 'Dilip BK',
        firstName: 'Dilip',
        lastName: 'B.K',
        email: 'dilipbk.dev@gmail.com',
        totalSpending: 10000,
        status: 'married',
        img: 'img/logo/logo-dark-streamline.png',
    },
    {
        id: 2,
        name: 'Ravi Kumar',
        firstName: 'Ravi',
        lastName: 'Kumar',
        email: 'ravikumar@example.com',
        totalSpending: 5000,
        status: 'single',
    },
    {
        id: 3,
        name: 'Anita Sharma',
        firstName: 'Anita',
        lastName: 'Sharma',
        email: 'anitasharma@example.com',
        totalSpending: 12000,
        status: 'married',
    },
    {
        id: 4,
        name: 'Priya Singh',
        firstName: 'Priya',
        lastName: 'Singh',
        email: 'priyasingh@example.com',
        totalSpending: 8000,
        status: 'single',
    },
    {
        id: 5,
        name: 'Ajay Verma',
        firstName: 'Ajay',
        lastName: 'Verma',
        email: 'ajayverma@example.com',
        totalSpending: 15000,
        status: 'married',
    },
    {
        id: 6,
        name: 'Sonal Gupta',
        firstName: 'Sonal',
        lastName: 'Gupta',
        email: 'sonalgupta@example.com',
        totalSpending: 11000,
        status: 'single',
    },
    {
        id: 7,
        name: 'Karan Mehta',
        firstName: 'Karan',
        lastName: 'Mehta',
        email: 'karanmehta@example.com',
        totalSpending: 7000,
        status: 'married',
    },
    {
        id: 8,
        name: 'Pooja Reddy',
        firstName: 'Pooja',
        lastName: 'Reddy',
        email: 'poojareddy@example.com',
        totalSpending: 9500,
        status: 'single',
    },
    {
        id: 9,
        name: 'Rahul Bose',
        firstName: 'Rahul',
        lastName: 'Bose',
        email: 'rahulbose@example.com',
        totalSpending: 6000,
        status: 'married',
    },
    {
        id: 10,
        name: 'Nisha Kapoor',
        firstName: 'Nisha',
        lastName: 'Kapoor',
        email: 'nishakapoor@example.com',
        totalSpending: 14000,
        status: 'single',
    },
    {
        id: 11,
        name: 'Gaurav Patel',
        firstName: 'Gaurav',
        lastName: 'Patel',
        email: 'gauravpatel@example.com',
        totalSpending: 16000,
        status: 'married',
    },
    {
        id: 12,
        name: 'Divya Thakur',
        firstName: 'Divya',
        lastName: 'Thakur',
        email: 'divyathakur@example.com',
        totalSpending: 13500,
        status: 'single',
    },
    {
        id: 13,
        name: 'Aman Joshi',
        firstName: 'Aman',
        lastName: 'Joshi',
        email: 'amanjoshi@example.com',
        totalSpending: 7500,
        status: 'married',
    },
    {
        id: 14,
        name: 'Sneha Desai',
        firstName: 'Sneha',
        lastName: 'Desai',
        email: 'snehadesai@example.com',
        totalSpending: 10500,
        status: 'single',
    },
    {
        id: 15,
        name: 'Vikas Jain',
        firstName: 'Vikas',
        lastName: 'Jain',
        email: 'vikasjain@example.com',
        totalSpending: 9000,
        status: 'married',
    },
    {
        id: 16,
        name: 'Neha Arora',
        firstName: 'Neha',
        lastName: 'Arora',
        email: 'nehaarora@example.com',
        totalSpending: 13000,
        status: 'single',
    },
    {
        id: 17,
        name: 'Rohit Singh',
        firstName: 'Rohit',
        lastName: 'Singh',
        email: 'rohitsingh@example.com',
        totalSpending: 9200,
        status: 'married',
    },
    {
        id: 18,
        name: 'Meera Khan',
        firstName: 'Meera',
        lastName: 'Khan',
        email: 'meerakhan@example.com',
        totalSpending: 8900,
        status: 'single',
    },
    {
        id: 19,
        name: 'Suresh Pillai',
        firstName: 'Suresh',
        lastName: 'Pillai',
        email: 'sureshpillai@example.com',
        totalSpending: 12500,
        status: 'married',
    },
    {
        id: 20,
        name: 'Rina Chauhan',
        firstName: 'Rina',
        lastName: 'Chauhan',
        email: 'rinachauhan@example.com',
        totalSpending: 10000,
        status: 'single',
    },
    {
        id: 21,
        name: 'Arjun Yadav',
        firstName: 'Arjun',
        lastName: 'Yadav',
        email: 'arjunyadav@example.com',
        totalSpending: 6700,
        status: 'married',
    },
    {
        id: 22,
        name: 'Kavita Pandey',
        firstName: 'Kavita',
        lastName: 'Pandey',
        email: 'kavitapandey@example.com',
        totalSpending: 14500,
        status: 'single',
    },
    {
        id: 23,
        name: 'Siddharth Nair',
        firstName: 'Siddharth',
        lastName: 'Nair',
        email: 'siddharthnair@example.com',
        totalSpending: 16000,
        status: 'married',
    },
    {
        id: 24,
        name: 'Anjali Roy',
        firstName: 'Anjali',
        lastName: 'Roy',
        email: 'anjaliroy@example.com',
        totalSpending: 11500,
        status: 'single',
    },
    {
        id: 25,
        name: 'Vivek Sharma',
        firstName: 'Vivek',
        lastName: 'Sharma',
        email: 'viveksharma@example.com',
        totalSpending: 10800,
        status: 'married',
    },
    {
        id: 26,
        name: 'Pallavi Dutta',
        firstName: 'Pallavi',
        lastName: 'Dutta',
        email: 'pallavidutta@example.com',
        totalSpending: 9900,
        status: 'single',
    },
    {
        id: 27,
        name: 'Anand Chauhan',
        firstName: 'Anand',
        lastName: 'Chauhan',
        email: 'anandchauhan@example.com',
        totalSpending: 10200,
        status: 'married',
    },
    {
        id: 28,
        name: 'Suman Joshi',
        firstName: 'Suman',
        lastName: 'Joshi',
        email: 'sumanjoshi@example.com',
        totalSpending: 9600,
        status: 'single',
    },
    {
        id: 29,
        name: 'Isha Kapoor',
        firstName: 'Isha',
        lastName: 'Kapoor',
        email: 'ishakapoor@example.com',
        totalSpending: 11800,
        status: 'married',
    },
    {
        id: 30,
        name: 'Nitin Deshmukh',
        firstName: 'Nitin',
        lastName: 'Deshmukh',
        email: 'nitindeshmukh@example.com',
        totalSpending: 13500,
        status: 'single',
    },
    {
        id: 1,
        name: 'Dilip BK',
        firstName: 'Dilip',
        lastName: 'B.K',
        email: 'dilipbk.dev@gmail.com',
        totalSpending: 10000,
        status: 'married',
        img: 'img/logo/logo-dark-streamline.png',
    },
    {
        id: 2,
        name: 'Ravi Kumar',
        firstName: 'Ravi',
        lastName: 'Kumar',
        email: 'ravikumar@example.com',
        totalSpending: 5000,
        status: 'single',
    },
    {
        id: 3,
        name: 'Anita Sharma',
        firstName: 'Anita',
        lastName: 'Sharma',
        email: 'anitasharma@example.com',
        totalSpending: 12000,
        status: 'married',
    },
    {
        id: 4,
        name: 'Priya Singh',
        firstName: 'Priya',
        lastName: 'Singh',
        email: 'priyasingh@example.com',
        totalSpending: 8000,
        status: 'single',
    },
    {
        id: 5,
        name: 'Ajay Verma',
        firstName: 'Ajay',
        lastName: 'Verma',
        email: 'ajayverma@example.com',
        totalSpending: 15000,
        status: 'married',
    },
    {
        id: 6,
        name: 'Sonal Gupta',
        firstName: 'Sonal',
        lastName: 'Gupta',
        email: 'sonalgupta@example.com',
        totalSpending: 11000,
        status: 'single',
    },
    {
        id: 7,
        name: 'Karan Mehta',
        firstName: 'Karan',
        lastName: 'Mehta',
        email: 'karanmehta@example.com',
        totalSpending: 7000,
        status: 'married',
    },
    {
        id: 8,
        name: 'Pooja Reddy',
        firstName: 'Pooja',
        lastName: 'Reddy',
        email: 'poojareddy@example.com',
        totalSpending: 9500,
        status: 'single',
    },
    {
        id: 9,
        name: 'Rahul Bose',
        firstName: 'Rahul',
        lastName: 'Bose',
        email: 'rahulbose@example.com',
        totalSpending: 6000,
        status: 'married',
    },
    {
        id: 10,
        name: 'Nisha Kapoor',
        firstName: 'Nisha',
        lastName: 'Kapoor',
        email: 'nishakapoor@example.com',
        totalSpending: 14000,
        status: 'single',
    },
    {
        id: 11,
        name: 'Gaurav Patel',
        firstName: 'Gaurav',
        lastName: 'Patel',
        email: 'gauravpatel@example.com',
        totalSpending: 16000,
        status: 'married',
    },
    {
        id: 12,
        name: 'Divya Thakur',
        firstName: 'Divya',
        lastName: 'Thakur',
        email: 'divyathakur@example.com',
        totalSpending: 13500,
        status: 'single',
    },
    {
        id: 13,
        name: 'Aman Joshi',
        firstName: 'Aman',
        lastName: 'Joshi',
        email: 'amanjoshi@example.com',
        totalSpending: 7500,
        status: 'married',
    },
    {
        id: 14,
        name: 'Sneha Desai',
        firstName: 'Sneha',
        lastName: 'Desai',
        email: 'snehadesai@example.com',
        totalSpending: 10500,
        status: 'single',
    },
    {
        id: 15,
        name: 'Vikas Jain',
        firstName: 'Vikas',
        lastName: 'Jain',
        email: 'vikasjain@example.com',
        totalSpending: 9000,
        status: 'married',
    },
    {
        id: 16,
        name: 'Neha Arora',
        firstName: 'Neha',
        lastName: 'Arora',
        email: 'nehaarora@example.com',
        totalSpending: 13000,
        status: 'single',
    },
    {
        id: 17,
        name: 'Rohit Singh',
        firstName: 'Rohit',
        lastName: 'Singh',
        email: 'rohitsingh@example.com',
        totalSpending: 9200,
        status: 'married',
    },
    {
        id: 18,
        name: 'Meera Khan',
        firstName: 'Meera',
        lastName: 'Khan',
        email: 'meerakhan@example.com',
        totalSpending: 8900,
        status: 'single',
    },
    {
        id: 19,
        name: 'Suresh Pillai',
        firstName: 'Suresh',
        lastName: 'Pillai',
        email: 'sureshpillai@example.com',
        totalSpending: 12500,
        status: 'married',
    },
    {
        id: 20,
        name: 'Rina Chauhan',
        firstName: 'Rina',
        lastName: 'Chauhan',
        email: 'rinachauhan@example.com',
        totalSpending: 10000,
        status: 'single',
    },
    {
        id: 21,
        name: 'Arjun Yadav',
        firstName: 'Arjun',
        lastName: 'Yadav',
        email: 'arjunyadav@example.com',
        totalSpending: 6700,
        status: 'married',
    },
    {
        id: 22,
        name: 'Kavita Pandey',
        firstName: 'Kavita',
        lastName: 'Pandey',
        email: 'kavitapandey@example.com',
        totalSpending: 14500,
        status: 'single',
    },
    {
        id: 23,
        name: 'Siddharth Nair',
        firstName: 'Siddharth',
        lastName: 'Nair',
        email: 'siddharthnair@example.com',
        totalSpending: 16000,
        status: 'married',
    },
    {
        id: 24,
        name: 'Anjali Roy',
        firstName: 'Anjali',
        lastName: 'Roy',
        email: 'anjaliroy@example.com',
        totalSpending: 11500,
        status: 'single',
    },
    {
        id: 25,
        name: 'Vivek Sharma',
        firstName: 'Vivek',
        lastName: 'Sharma',
        email: 'viveksharma@example.com',
        totalSpending: 10800,
        status: 'married',
    },
    {
        id: 26,
        name: 'Pallavi Dutta',
        firstName: 'Pallavi',
        lastName: 'Dutta',
        email: 'pallavidutta@example.com',
        totalSpending: 9900,
        status: 'single',
    },
    {
        id: 27,
        name: 'Anand Chauhan',
        firstName: 'Anand',
        lastName: 'Chauhan',
        email: 'anandchauhan@example.com',
        totalSpending: 10200,
        status: 'married',
    },
    {
        id: 28,
        name: 'Suman Joshi',
        firstName: 'Suman',
        lastName: 'Joshi',
        email: 'sumanjoshi@example.com',
        totalSpending: 9600,
        status: 'single',
    },
    {
        id: 29,
        name: 'Isha Kapoor',
        firstName: 'Isha',
        lastName: 'Kapoor',
        email: 'ishakapoor@example.com',
        totalSpending: 11800,
        status: 'married',
    },
    {
        id: 30,
        name: 'Nitin Deshmukh',
        firstName: 'Nitin',
        lastName: 'Deshmukh',
        email: 'nitindeshmukh@example.com',
        totalSpending: 13500,
        status: 'single',
    },
]

const statusColor: Record<string, string> = {
    active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    blocked: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

const NameColumn = ({ row }: { row: Customer }) => {
    return (
        <div className="flex items-center">
            <Avatar size={40} shape="circle" src={row.img} />
            <Link
                className={`hover:text-primary ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                to={`/concepts/customers/customer-details/${row.id}`}
            >
                {row.name}
            </Link>
        </div>
    )
}

const ActionColumn = ({
    onEdit,
    onViewDetail,
}: {
    onEdit: () => void
    onViewDetail: () => void
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
            <Tooltip title="View">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onViewDetail}
                >
                    <TbEye />
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
    const navigate = useNavigate()

    const [selectedCustomer, setSelectedCustomer] = useState<Customer[]>([])
    const [rowData, setRowData] = useState<Customer[]>([])

    useEffect(() => {
        if (tableData?.pageIndex && tableData?.pageSize) {
            const start = (tableData?.pageIndex - 1) * tableData?.pageSize
            const end = tableData?.pageIndex * tableData?.pageSize
            const filtered = list?.slice(start, end)
            setRowData(filtered)
        } else {
            setRowData(list)
        }
    }, [tableData])

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setIsLoading(false)
    //     }, 0)

    //     return () => clearTimeout(timer)
    // }, [])

    const handleEdit = (customer: Customer) => {
        navigate(`/concepts/customers/customer-edit/${customer.id}`)
    }

    const handleViewDetails = (customer: Customer) => {
        navigate(`/concepts/customers/customer-details/${customer.id}`)
    }

    const handleRowSelect = (checked: boolean, row: Customer) => {
        const isPresent = selectedCustomer?.find((item) => item?.id === row?.id)

        if (isPresent) {
            const filteredList = selectedCustomer?.filter(
                (item) => item?.id !== row?.id,
            )
            setSelectedCustomer(filteredList)
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
        const newTableData = structuredClone(tableData)
        newTableData.pageIndex = page
        handleSetTableData(newTableData)
    }

    const handleSelectChange = (value: number) => {
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

    const handleAllRowSelect = (checked: boolean, rows: Row<Customer>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectedCustomer(originalRows)
        } else {
            setSelectedCustomer([])
        }
    }

    const columns: ColumnDef<Customer>[] = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <NameColumn row={row} />
                },
            },
            {
                header: 'Email',
                accessorKey: 'email',
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Tag
                                className={
                                    row.status && statusColor[row.status]
                                }
                            >
                                <span className="capitalize">{row.status}</span>
                            </Tag>
                        </div>
                    )
                },
            },
            {
                header: 'Spent',
                accessorKey: 'totalSpending',
                cell: (props) => {
                    return <span>${props.row.original.totalSpending}</span>
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        onEdit={() => handleEdit(props.row.original)}
                        onViewDetail={() =>
                            handleViewDetails(props.row.original)
                        }
                    />
                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    return (
        <DataTable
            selectable
            columns={columns}
            data={rowData}
            noData={false && !rowData?.length}
            loading={false}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            pagingData={{
                total: list.length,
                pageIndex: tableData?.pageIndex as number,
                pageSize: tableData?.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedCustomer.some((selected) => selected.id === row.id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default TableList
