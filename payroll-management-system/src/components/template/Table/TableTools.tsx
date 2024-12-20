import CustomerListSearch from './SearchTable'
import { TableQueries } from './types'
import CustomerListTableFilter from './TableFilter'
import TableFilter from './TableFilter'
import SearchTable from './SearchTable'

const TableTools = ({
    tableData,
    setTableData,
}: {
    tableData: TableQueries
    setTableData: React.Dispatch<React.SetStateAction<TableQueries>>
}) => {
    const handleInputChange = (val: string) => {
        const newTableData = structuredClone(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            setTableData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            setTableData(newTableData)
        }
    }

    return (
        <div className="flex flex-col md:flex-row-reverse md:items-center gap-3">
            <div>
                <TableFilter />
            </div>

            <div className="grow">
                <SearchTable onInputChange={handleInputChange} />
            </div>
        </div>
    )
}

export default TableTools
