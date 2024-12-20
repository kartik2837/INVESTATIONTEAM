import DataTable, { OnSortParam, Row } from '@/components/shared/DataTable'
import type { TableQueries } from './types'
import { SetStateAction, useState } from 'react'

const Table = ({
    isSelectable,
    tableData,
    setTableData,
    loading,
    list,
    columns,
    rowData,
    pagingData,
    selectedData,
    setSelectedData,
    handleTablePagination,
    handleSortData,
    handlePageLimit,
    handleSelectData,
    handleSelectAllData,
}: {
    isSelectable?: boolean
    tableData: TableQueries
    setTableData: React.Dispatch<React.SetStateAction<TableQueries>>
    list: object[]
    loading?: boolean
    columns: object[]
    rowData: object[]
    pagingData: TableQueries
    selectedData: object[]
    setSelectedData: SetStateAction<object>
    handleTablePagination: (page: number) => void
    handleSortData: (sort: OnSortParam) => void
    handlePageLimit: (value: number) => void
    handleSelectData: (checked: boolean, row: Row<T>) => void
    handleSelectAllData: (checked: boolean, rows: Row<T>[]) => void
}) => {
    const [selectedCustomer, setSelectedCustomer] = useState<Customer[]>([])

    const handleRowSelect = (checked: boolean, row: Row<T>) => {
        handleSelectData(checked, row)
    }

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedCustomer.length > 0) {
            setSelectedCustomer([])
        }
    }

    const handlePaginationChange = (page: number) => {
        handleTablePagination(page)
    }

    const handleSelectChange = (value: number) => {
        handlePageLimit(value)
    }

    const handleSort = (sort: OnSortParam) => {
        handleSortData(sort)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<T>[]) => {
        handleSelectAllData(checked, rows)
    }

    return (
        <DataTable
            selectable={isSelectable}
            columns={columns}
            data={rowData}
            noData={!rowData?.length}
            loading={loading}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            pagingData={{
                total: pagingData?.total as number,
                pageIndex: pagingData?.pageIndex as number,
                pageSize: pagingData?.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedData.some((selected) => selected.id === row.id)
            }
            stripped={true}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
            onCheckBoxChange={handleRowSelect}
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
        />
    )
}

export default Table
