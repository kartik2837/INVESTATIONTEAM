import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus, TbFileImport } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { CSVLink } from 'react-csv'
import { Checkbox, Dropdown } from '@/components/ui'
import { MdOutlineRemoveRedEye } from 'react-icons/md'

const ActionTools = ({ list }: { list: object[] }) => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <div className="flex gap-2">
                <Button
                    icon={<TbFileImport className="text-sm" />}
                    size="sm"
                    className="text-sm w-full font-medium rounded-lg"
                    onClick={() =>
                        navigate('/concepts/customers/customer-create')
                    }
                >
                    Import
                </Button>
                <CSVLink
                    className="w-full"
                    filename="employees.xlsx"
                    data={list}
                >
                    <Button
                        size="sm"
                        className="text-sm w-full font-medium rounded-lg"
                        icon={<TbCloudDownload className="text-sm" />}
                    >
                        Export
                    </Button>
                </CSVLink>
                <Dropdown
                    renderTitle={
                        <Button
                            size="sm"
                            className="text-sm w-full text-center font-medium rounded-lg"
                        >
                            <span>
                                <MdOutlineRemoveRedEye size={20} />
                            </span>
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
            <Button
                variant="solid"
                icon={<TbUserPlus className="text-sm" />}
                size="sm"
                className="text-sm font-medium rounded-lg"
                onClick={() => navigate('add')}
            >
                Add new
            </Button>
        </div>
    )
}

export default ActionTools
