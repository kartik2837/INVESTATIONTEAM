import { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Role, TableQueries, User } from '../types'
import { useEffect, useMemo, useState } from 'react'
import { Tooltip } from '@/components/ui'
import { useNavigate } from 'react-router-dom'
import { TbEye, TbPencil } from 'react-icons/tb'
import useUserStore from '@/store/userStore'
import { AdaptiveCard, Container } from '@/components/shared'
import ActionTools from '@/components/template/Table/ActionTools'
import TableTools from '@/components/template/Table/TableTools'
import Table from '@/components/template/Table/ThemeTable'

// const statusColor: Record<string, string> = {
//     active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
//     blocked: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
// }

// const NameColumn = ({ row }: { row }) => {
//     return (
//         <div className="flex items-center">
//             <Avatar size={40} shape="circle" src={row.img} />
//             <Link
//                 className={`hover:text-primary ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
//                 to={`/concepts/customers/customer-details/${row.id}`}
//             >
//                 {row.name}
//             </Link>
//         </div>
//     )
// }

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

const UserList = () => {
    const navigate = useNavigate()

    const { users, isLoading, fetchUsers } = useUserStore((state) => ({
        users: state.users,
        isLoading: state.isLoading,
        fetchUsers: state.fetchUsers,
    }))

    const [tableData, setTableData] = useState<TableQueries>({
        pageIndex: 1,
        pageSize: 5,
        total: users.length,
    })

    const [selectedUser, setselectedUser] = useState<User[]>([])
    const [rowData, setRowData] = useState<User[]>([])
    const [initialLoading, setInitialLoading] = useState(true)

    useEffect(() => {
        if (tableData?.pageIndex && tableData?.pageSize) {
            const start = (tableData?.pageIndex - 1) * tableData?.pageSize
            const end = tableData?.pageIndex * tableData?.pageSize
            const filtered = users?.slice(start, end) as User[]
            setRowData(filtered)
        } else {
            const newUsers = users as User[]
            setRowData(newUsers)
        }
    }, [tableData, users])

    useEffect(() => {
        const loadData = async () => {
            await fetchUsers('671918be802455a27db88e8b')
            setInitialLoading(false)
        }
        loadData()
    }, [])

    const handleEdit = (user: User) => {
        navigate(`/concepts/customers/customer-edit/${user.id}`)
    }

    const handleViewDetails = (user: User) => {
        navigate(`/concepts/customers/customer-details/${user.id}`)
    }

    const handleRowSelect = (checked: boolean, row: Row<User>) => {
        const isPresent = selectedUser?.find((item) => item?.id === row?.id)

        if (isPresent) {
            const filteredList = selectedUser?.filter(
                (item) => item?.id !== row?.id,
            )
            setselectedUser(filteredList)
        } else {
            setselectedUser([...selectedUser, row])
        }
    }

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedUser.length > 0) {
            setselectedUser([])
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

    const handleAllRowSelect = (checked: boolean, rows: Row<User>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setselectedUser(originalRows)
        } else {
            setselectedUser([])
        }
    }

    const columns: ColumnDef<User>[] = useMemo(
        () => [
            {
                header: 'First Name',
                accessorKey: 'first_name',
            },
            {
                header: 'Last Name',
                accessorKey: 'last_name',
            },
            {
                header: 'Username',
                accessorKey: 'username',
            },
            {
                header: 'Email',
                accessorKey: 'email',
            },
            {
                header: 'Role',
                accessorKey: 'roles',
                cell(props) {
                    return (
                        <span>
                            {props
                                ?.getValue()
                                .map((role: Role) => role.name)
                                .join(', ')}
                        </span>
                    )
                },
            },
            {
                header: 'Last Login',
                accessorKey: 'last_login_date',
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
        // <DataTable
        //     selectable
        //     columns={columns}
        //     data={rowData}
        //     noData={false && !rowData?.length}
        //     loading={false}
        //     skeletonAvatarColumns={[0]}
        //     skeletonAvatarProps={{ width: 28, height: 28 }}
        //     pagingData={{
        //         total: users.length,
        //         pageIndex: tableData?.pageIndex as number,
        //         pageSize: tableData?.pageSize as number,
        //     }}
        //     checkboxChecked={(row) =>
        //         selectedCustomer.some((selected) => selected.id === row.id)
        //     }
        //     onPaginationChange={handlePaginationChange}
        //     onSelectChange={handleSelectChange}
        //     onSort={handleSort}
        //     onCheckBoxChange={handleRowSelect}
        //     onIndeterminateCheckBoxChange={handleAllRowSelect}
        // />
        <Container>
            <AdaptiveCard>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3>Users</h3>
                        <ActionTools list={[]} />
                    </div>
                    <TableTools
                        tableData={tableData}
                        setTableData={setTableData}
                    />
                    <Table
                        isSelectable
                        list={users}
                        tableData={tableData}
                        setTableData={setTableData}
                        columns={columns}
                        rowData={rowData}
                        loading={isLoading || initialLoading}
                        pagingData={tableData}
                        selectedData={selectedUser}
                        setSelectedData={setselectedUser}
                        handleTablePagination={handlePaginationChange}
                        handlePageLimit={handleSelectChange}
                        handleSelectAllData={handleAllRowSelect}
                        handleSelectData={handleRowSelect}
                        handleSortData={handleSort}
                    />
                </div>
            </AdaptiveCard>
        </Container>
    )
}

export default UserList
