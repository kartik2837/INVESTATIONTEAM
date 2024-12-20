import { useState } from 'react'
import { z } from 'zod'
import { CSVLink } from 'react-csv'
import { useNavigate } from 'react-router-dom'
import { Checkbox, Dropdown } from '@/components/ui'
import { FormItem, Form } from '@/components/ui/Form'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { API_BASE_URL, API_KEY } from '@/constants/app.constant'
import { TbCloudDownload, TbFileImport, TbPlus } from 'react-icons/tb'
import axios from 'axios'
import Input from '@/components/ui/Input'
import toast from '@/components/ui/toast'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'

type FormSchema = z.infer<typeof validationSchema>

const validationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
})

interface LeaveTypeListActionToolsProps {
    setRender: React.Dispatch<React.SetStateAction<boolean>>
}

const TableListActionTools: React.FC<LeaveTypeListActionToolsProps> = ({
    setRender,
}) => {
    const openNotification = () => {
        toast.push(
            <Notification type="success" title="Data Added Successfully" />,
            {
                placement: 'top-center',
            },
        )
    }

    const navigate = useNavigate()
    const [dialogIsOpen, setIsOpen] = useState(false)

    // ================================= Form Handler Start ====================================== //

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<FormSchema>({
        defaultValues: {
            name: '',
        },
        resolver: zodResolver(validationSchema),
    })

    // ================================= Form Handler Start ====================================== //

    const [isSubmitting, setIsSubmitting] = useState(false)

    // ================================= Create Method Start ===================================== //

    const onSubmit = async (values: FormSchema) => {
        if (isSubmitting) return

        setIsSubmitting(true)
        try {
            const response = await axios.post(
                `${API_BASE_URL}api/leave/create`,
                values,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-investation-api-keys': API_KEY,
                    },
                },
            )

            console.log('response', response.data)

            if (response.data.errorCode === 0) {
                openNotification()
                reset()
                setRender(true)
                setIsOpen(false)
            } else {
                window.alert('Failed to submit data')
            }
        } catch (error) {
            console.error('Error submitting data:', error)
            window.alert('An error occurred while submitting data')
        } finally {
            setIsSubmitting(false) // Unlock submission
        }
    }

    // ================================= Create Method End ======================================= //

    return (
        <>
            <div className="flex flex-col md:flex-row gap-3">
                <div className="flex gap-2">
                    <Button
                        icon={<TbFileImport className="text-sm" />}
                        size="sm"
                        className="text-sm w-full font-medium rounded-lg"
                        onClick={() =>
                            navigate('/concepts/customers/customer-create')
                        }
                        disabled
                    >
                        Import
                    </Button>
                    <CSVLink
                        className="w-full"
                        filename="employees.xlsx"
                        data={[]}
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
                        disabled
                        renderTitle={
                            <Button
                                size="sm"
                                className="text-sm w-full text-center font-medium rounded-lg"
                                disabled
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
                    icon={<TbPlus className="text-sm" />}
                    size="sm"
                    className="text-sm font-medium rounded-lg"
                    onClick={() => setIsOpen(true)}
                >
                    Add New
                </Button>
            </div>

            {/* =================================== Create Model Start ================================ */}

            <Dialog
                isOpen={dialogIsOpen}
                bodyOpenClassName="overflow-hidden"
                onClose={() => setIsOpen(false)}
                onRequestClose={() => setIsOpen(false)}
            >
                <h5 className="mb-4">Create Leave Type</h5>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormItem
                        label="Leave"
                        invalid={Boolean(errors.name)}
                        errorMessage={errors.name?.message}
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="name"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder=""
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>

                    <Button
                        type="reset"
                        className="ltr:mr-2 rtl:ml-2"
                        onClick={() => reset()}
                    >
                        Reset
                    </Button>
                    <Button
                        variant="solid"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </Form>
            </Dialog>

            {/* =================================== Create Model End ================================== */}
        </>
    )
}

export default TableListActionTools
