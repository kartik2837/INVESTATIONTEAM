import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { TbFilter } from 'react-icons/tb'
import { Input, Radio, Select } from '@/components/ui'
// import Addon from '@/components/ui/InputGroup/Addon'

const TableFilter = () => {
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)

    return (
        <>
            <Button
                className="w-full"
                icon={<TbFilter />}
                onClick={() => setDialogIsOpen(true)}
            >
                Filter
            </Button>

            <Dialog
                isOpen={dialogIsOpen}
                onClose={() => setDialogIsOpen(false)}
                onRequestClose={() => setDialogIsOpen(false)}
            >
                <h4 className="mb-4">Filter</h4>
                <div className="flex gap-2 mt-6">
                    <Radio.Group value={'basic_filters'} name="filters">
                        <Radio value={'basic_filters'}>Basic Filters</Radio>
                        <Radio value={'advanced_filters'}>
                            Advanced Filters
                        </Radio>
                    </Radio.Group>
                </div>
                <div className="mt-8 flex flex-col gap-4">
                    <Input
                        placeholder="Search by Name"
                        // prefix={<IoPersonOutline size={20} />}
                    />
                    <Select
                        isClearable
                        placeholder="Filter by Company"
                        options={[
                            { label: 'Company 1', value: 1 },
                            { label: 'Company 2', value: 2 },
                        ]}
                    />
                    <Select
                        isClearable
                        placeholder="Filter by Sub Location"
                        options={[
                            { label: 'Sub Location 1', value: 1 },
                            { label: 'Sub Location 2', value: 2 },
                        ]}
                    />
                </div>
                <div className="flex justify-end gap-3 mt-8">
                    <Button>Cancel</Button>
                    <Button variant="solid">Apply</Button>
                </div>
            </Dialog>
        </>
    )
}

export default TableFilter
