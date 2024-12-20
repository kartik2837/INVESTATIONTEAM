import { TableQueries } from '@/views/ManageVariables/types'
import TableListSearch from './TableListSearch'
// import TableTableFilter from './TableListTableFilter'
import TableListTableFilter from './TableListTableFilter'

const TablesListTableTools = ({
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
                <TableListTableFilter />
            </div>

            <div className="grow">
                <TableListSearch onInputChange={handleInputChange} />
            </div>
        </div>
    )
}

export default TablesListTableTools
