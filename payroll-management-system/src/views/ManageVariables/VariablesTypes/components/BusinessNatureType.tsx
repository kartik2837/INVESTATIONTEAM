import { useState } from 'react'

import { AdaptiveCard } from '@/components/shared'

import BusinessNatureTypeListTable from './businessNatureType/TableList'
import BusinessNatureTypeListActionTools from './businessNatureType/TableListActionTools'
import BusinessNatureTypeListTableTools from './businessNatureType/TableListTableTools'
import { TableQueries } from '../../types'

const BusinessNatureType = () => {
    const [tableData, setTableData] = useState<TableQueries>({
        pageIndex: 1,
        pageSize: 5,
    })

    return (
        <>
            <AdaptiveCard>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3>Business Nature Type</h3>
                        <BusinessNatureTypeListActionTools />
                    </div>
                    <BusinessNatureTypeListTableTools
                        tableData={tableData}
                        setTableData={setTableData}
                    />
                    <BusinessNatureTypeListTable
                        tableData={tableData}
                        setTableData={setTableData}
                    />
                </div>
            </AdaptiveCard>
        </>
    )
}

export default BusinessNatureType
