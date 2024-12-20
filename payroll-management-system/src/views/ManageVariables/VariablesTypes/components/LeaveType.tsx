import { useEffect, useState } from 'react'
import { TableQueries } from '../../types'
import { AdaptiveCard } from '@/components/shared'
import { API_BASE_URL, API_KEY } from '@/constants/app.constant'
import axios from 'axios'
import LeaveTypeListTable from './leaveType/TableList'
import LeaveTypeListTableTools from './leaveType/TableListTableTools'
import LeaveTypeListActionTools from './leaveType/TableListActionTools'

interface LeaveType {
    _id: number
    name: string
}

const LeaveType = () => {
    const [tableData, setTableData] = useState<TableQueries>({
        pageIndex: 1,
        pageSize: 10,
    })

    const [getData, setGetData] = useState<Array<any>>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const [totalRecords, setTotalRecords] = useState<number>(0)
    const [searchQuery, SetSearchQuery] = useState<string>('')
    const [render, setRender] = useState<boolean>(false)

    const fetchLeaves = async () => {
        setIsLoading(true)

        try {
            let url = `${API_BASE_URL}api/leave/get-all-data`

            const params = []

            if (page) {
                params.push(`page=${page}`)
            }
            if (pageSize) {
                params.push(`limit=${pageSize}`)
            }
            if (searchQuery) {
                params.push(`q=${encodeURIComponent(searchQuery)}`)
            }

            if (params.length) {
                url += `?${params.join('&')}`
            }

            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-investation-api-keys': API_KEY,
                },
            })

            setGetData(response?.data?.data)
            setTotalRecords(response?.data?.total || 0)
        } catch (error) {
            console.error('Failed to fetch leaves:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (render) setRender(false)
        fetchLeaves()
    }, [page, pageSize, render, searchQuery])

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <h3>Leave Type</h3>
                <LeaveTypeListActionTools setRender={setRender} />
            </div>
            <LeaveTypeListTableTools
                tableData={tableData}
                setTableData={setTableData}
                getData={getData}
                setGetData={setGetData}
                SetSearchQuery={SetSearchQuery}
            />
            <LeaveTypeListTable
                tableData={tableData}
                setTableData={setTableData}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                getData={getData}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalRecords={totalRecords}
                setRender={setRender}
            />
        </div>
    )
}

export default LeaveType
