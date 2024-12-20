import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'
import { TbCloudDownload, TbUserPlus, TbFileImport } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { CSVLink } from 'react-csv'
import { list } from './TableList'

const TableListActionTools = () => {
    const navigate = useNavigate()
    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e: MouseEvent) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    const onDialogOk = (e: MouseEvent) => {
        console.log('onDialogOk', e)
        setIsOpen(false)
    }

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <Button
                icon={<TbFileImport className="text-sm" />}
                size="sm"
                className="text-sm font-medium rounded-lg"
                onClick={() => navigate('/concepts/customers/customer-create')}
            >
                Import
            </Button>
            <CSVLink className="w-full" filename="customerList.csv" data={list}>
                <Button
                    size="sm"
                    className="text-sm w-full font-medium rounded-lg"
                    icon={<TbCloudDownload className="text-sm" />}
                >
                    Download
                </Button>
            </CSVLink>
            {/* <Button
                variant="solid"
                icon={<TbUserPlus className="text-sm" />}
                size="sm"
                className="text-sm font-medium rounded-lg"
                onClick={() => navigate('add')}
            >
                Add new
            </Button> */}
            <Button
                variant="solid"
                size="sm"
                className="text-sm font-medium rounded-lg"
                onClick={() => openDialog()}>
                Add New
            </Button>
            <Dialog
                isOpen={dialogIsOpen}
                bodyOpenClassName="overflow-hidden"
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">Dialog Title</h5>
                <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which dont
                    look even slightly believable.
                </p>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={onDialogOk}>
                        Okay
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default TableListActionTools
