import OrganizationListSearch from './TableListSearch'
// import CustomerTableFilter from './CustomerListTableFilter'
// import { TableQueries } from '../../types'
import OrganizationListTableFilter from './TableListTableFilter'
import { Button, Checkbox, Dropdown } from '@/components/ui'

import { LiaColumnsSolid } from 'react-icons/lia'
import { TableQueries } from '@/views/ManageVariables/types'

const TableListTableTools = ({
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
        <div className="flex items-center gap-2">
            <OrganizationListSearch onInputChange={handleInputChange} />
            <div className="flex gap-2">
                <OrganizationListTableFilter />

                <Dropdown
                    renderTitle={
                        <Button className="text-sm font-medium rounded-lg">
                            <LiaColumnsSolid size={22} />
                        </Button>
                    }
                >
                    <div className="p-3 min-w-64">
                        <h3 className="text-lg mb-6">Column Filter</h3>
                        <Checkbox.Group vertical value={['1']}>
                            <Checkbox value="Selection A">
                                Selection A{' '}
                            </Checkbox>
                            <Checkbox value="Selection B">
                                Selection B{' '}
                            </Checkbox>
                            <Checkbox value="Selection C">
                                Selection C{' '}
                            </Checkbox>
                        </Checkbox.Group>
                        <div className="mt-8 flex gap-3">
                            <Button size="sm" className="text-xs">
                                Clear
                            </Button>
                            <Button
                                size="sm"
                                variant="solid"
                                className="text-xs"
                            >
                                Apply
                            </Button>
                        </div>
                    </div>
                </Dropdown>
            </div>
        </div>
    )
}

export default TableListTableTools
