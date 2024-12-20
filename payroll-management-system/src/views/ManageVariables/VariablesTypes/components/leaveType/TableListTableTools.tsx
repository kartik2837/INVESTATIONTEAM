import TableListSearch from './TableListSearch'
import { TableQueries } from '@/views/ManageVariables/types'
import TableListTableFilter from './TableListTableFilter'
import LeaveType from '../LeaveType'

const TableListTableTools = ({
    tableData,
    setTableData,
    setGetData,
    getData,
    SetSearchQuery,
}: {
    tableData: TableQueries
    setTableData: React.Dispatch<React.SetStateAction<TableQueries>>
    setGetData: React.Dispatch<React.SetStateAction<Array<any>>>
    getData: LeaveType[]
    SetSearchQuery: React.Dispatch<React.SetStateAction<string>>
}) => {
    const handleInputChange = (val: string) => {
        const newTableData = { ...tableData, query: val, pageIndex: 1 }
        setTableData(newTableData)
        SetSearchQuery(val)
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

export default TableListTableTools
