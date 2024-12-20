import { useState } from 'react'
import { FormItem, Form } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import toast from '@/components/ui/toast'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import Checkbox from '@/components/ui/Checkbox'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'
import { TbCloudDownload, TbUserPlus, TbFileImport } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { CSVLink } from 'react-csv'
import { list } from './TableList'
import axios from 'axios'
import { API_BASE_URL, API_KEY } from '@/constants/app.constant'

type FormSchema = z.infer<typeof validationSchema>;

const validationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
});

const TableListActionTools = () => {

    const openNotification = () => {
        toast.push(<Notification type="success" title="Data Added Successfully" />, {
            placement: "top-center",
        })
    }

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control
    } = useForm<FormSchema>({
        defaultValues: {
            name: ''
        },
        resolver: zodResolver(validationSchema),
    });

    const onSubmit = async (values: FormSchema) => {
        try {
            const response = await axios.post(`${API_BASE_URL}api/job-category/create`, values, {
                headers: {
                    'Content-Type': 'application/json',
                     "x-investation-api-keys": API_KEY,
                },
            });

            console.log("response", response.data)

            if (response.data.errorCode ===  0) {
                // Handle success (e.g., show a success message or reset the form)
                openNotification()
                reset();
                setIsOpen(false)
            } else {
                window.alert('Failed to submit data');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            window.alert('An error occurred while submitting data');
        }
    };

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
                <h5 className="mb-4">Add Job Category</h5>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormItem
                        label="Field Name"
                        invalid={Boolean(errors.name)}
                        errorMessage={errors.name?.message}
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) =>
                                <Input
                                    type="name"
                                    autoComplete="off"
                                    placeholder="Field Name"
                                    {...field}
                                />
                            }
                        />
                    </FormItem>
                    
                    <FormItem>
                        <Button
                            type="reset"
                            className="ltr:mr-2 rtl:ml-2"
                            onClick={() => reset()}
                        >
                            Reset
                        </Button>
                        <Button variant="solid" type="submit">
                            Submit
                        </Button>
                    </FormItem>
                </Form>

            </Dialog>
        </div>
    )
}

export default TableListActionTools
