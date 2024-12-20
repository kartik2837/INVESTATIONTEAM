import { AdaptiveCard, Container } from '@/components/shared'
import ArrangementMethodListTable from './components/arrangementMethod/TableList'
import ArrangementMethodListActionTools from './components/arrangementMethod/TableListActionTools'
import ArrangementMethodListTableTools from './components/arrangementMethod/TableListTableTools'

import JobCategoryListTable from './components/jobCategory/TableList'
import JobCategoryListActionTools from './components/jobCategory/TableListActionTools'
import JobCategoryListTableTools from './components/jobCategory/TableListTableTools'

import PaymentMethodListTable from './components/paymentMethod/TableList'
import PaymentMethodListActionTools from './components/paymentMethod/TableListActionTools'
import PaymentMethodListTableTools from './components/paymentMethod/TableListTableTools'

import { useState } from 'react'
import { TableQueries } from '../types'
import Tabs from '@/components/ui/Tabs'

const { TabNav, TabList, TabContent } = Tabs

const Home = () => {
    const [tableData, setTableData] = useState<TableQueries>({
        pageIndex: 1,
        pageSize: 5,
    })

    return (
        <>
            <Container>
                <Tabs defaultValue="arrangementMethod" variant="pill">
                    <TabList>
                        <TabNav value="arrangementMethod">Arrangement Method</TabNav>
                        <TabNav value="paymentMethod">Payment Method</TabNav>
                        <TabNav value="qualification">Qualification</TabNav>
                        <TabNav value="jobCategory">Job Category</TabNav>
                    </TabList>
                    <div className="p-4">
                        <TabContent value="arrangementMethod">
                            <AdaptiveCard>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                        <h3>Arrangement Method</h3>
                                        <ArrangementMethodListActionTools />
                                    </div>
                                    <ArrangementMethodListTableTools
                                        tableData={tableData}
                                        setTableData={setTableData}
                                    />
                                    <ArrangementMethodListTable
                                        tableData={tableData}
                                        setTableData={setTableData}
                                    />
                                </div>
                            </AdaptiveCard>
                        </TabContent>

                        <TabContent value="paymentMethod">
                            <AdaptiveCard>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                        <h3>Payment Method</h3>
                                        <JobCategoryListActionTools />
                                    </div>
                                    <JobCategoryListTableTools
                                        tableData={tableData}
                                        setTableData={setTableData}
                                    />
                                    <JobCategoryListTable
                                        tableData={tableData}
                                        setTableData={setTableData}
                                    />
                                </div>
                            </AdaptiveCard>
                        </TabContent>

                        <TabContent value="qualification">
                            <AdaptiveCard>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                        <h3>Qualification</h3>
                                        {/* <AssociateUpdationFieldTypeListActionTools /> */}
                                    </div>
                                    {/* <AssociateUpdationFieldTypeListTableTools
                                        tableData={tableData}
                                        setTableData={setTableData}
                                    />
                                    <AssociateUpdationFieldTypeListTable
                                        tableData={tableData}
                                        setTableData={setTableData}
                                    /> */}
                                </div>
                            </AdaptiveCard>
                        </TabContent>

                        <TabContent value="jobCategory">
                            <AdaptiveCard>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                        <h3>Job Category</h3>
                                        <PaymentMethodListActionTools />
                                    </div>
                                    <PaymentMethodListTableTools
                                        tableData={tableData}
                                        setTableData={setTableData}
                                    />
                                    <PaymentMethodListTable
                                        tableData={tableData}
                                        setTableData={setTableData}
                                    />
                                </div>
                            </AdaptiveCard>
                        </TabContent>

                    </div>
                </Tabs>

            </Container>
        </>
    )
}

export default Home
