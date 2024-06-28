'use client';
import React, { useState } from 'react';
import { Input, Button, DatePicker, message } from 'antd';
import { useRouter } from 'next/navigation';
import moment, { Moment } from 'moment';
import dayjs from 'dayjs';
import { useCreateExpenseMutation } from '@/redux/slice/expense/expenseApiSlice';

interface FormErrors {
    amount?: string;
    name?: string;
    date?: string;
}

interface FormState {
    amount: number | undefined;
    name: string;
    description: string;
    date: any;
}

interface DailyExpenseCreateFormProps {
    createSuccess: Function;
}

const DailyExpenseCreateForm: React.FC<DailyExpenseCreateFormProps> = ({
    createSuccess
}) => {
    const router = useRouter();
    // const [dailyExpenseCreate] = useDailyExpenseCreateMutation();
    const [createExpense, isLoading, isError] = useCreateExpenseMutation();

    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [disableBtn, setDisableBtn] = useState<boolean>(false);
    const [formState, setFormState] = useState<FormState>({
        amount: 0,
        name: '',
        description: '',
        date: dayjs(new Date())
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: undefined
        }));
    };

    const onOk = (value: any) => {
        setFormState((prevState) => ({
            ...prevState,
            date: value
        }));
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            date: undefined
        }));
    };

    const validateFields = (): FormErrors => {
        const errors: FormErrors = {};

        // if (formState.amount) {
        //     errors.amount = 'Amount is required';
        // } else if (isNaN(formState.amount)) {
        //     errors.amount = 'Amount must be a number';
        // }

        if (!formState.name) {
            errors.name = 'Name is required';
        }

        if (!formState.date) {
            errors.date = 'Date is required';
        }

        return errors;
    };

    const handleSubmit = async () => {
        setDisableBtn(true);
        const errors = validateFields();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setDisableBtn(false);
            return;
        }
        try {
            createExpense(formState)
                .unwrap()
                .then((response: any) => {
                    if (response.status) {
                        message.success(response.message);
                        createSuccess();
                        setDisableBtn(false);
                        // router.push('/daily-expenses');
                    }
                })
                .catch((error: any) => {
                    setDisableBtn(false);
                    message.error('Sorry Something Wrong Please Try Again');
                });
        } catch (error) {
            setDisableBtn(false);
            message.error('Failed to add daily expense');
        }
    };

    return (
        <div className='p-4'>
            <div className='grid grid-cols-1 gap-4'>
                <div>
                    <label
                        htmlFor='amount'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Amount
                    </label>
                    <Input
                        type='number'
                        name='amount'
                        placeholder='Enter Amount'
                        value={formState.amount}
                        onChange={handleChange}
                    />
                    {formErrors.amount && (
                        <p className='text-red-500 mt-1 ml-2 text-sm'>
                            {formErrors.amount}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor='name'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Name
                    </label>
                    <Input
                        name='name'
                        placeholder='Enter Name'
                        value={formState.name}
                        onChange={handleChange}
                    />
                    {formErrors.name && (
                        <p className='text-red-500 mt-1 ml-2 text-sm'>
                            {formErrors.name}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor='description'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Description
                    </label>
                    <Input
                        name='description'
                        placeholder='Enter Description'
                        value={formState.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label
                        htmlFor='date'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Date
                    </label>
                    <DatePicker
                        showTime
                        defaultValue={formState.date}
                        onChange={(value, dateString) => {
                            console.log('Selected Time: ', value);
                            console.log(
                                'Formatted Selected Time: ',
                                dateString
                            );
                            setFormState((prevState) => ({
                                ...prevState,
                                date: value
                            }));
                            setFormErrors((prevErrors) => ({
                                ...prevErrors,
                                date: undefined
                            }));
                        }}
                        onOk={onOk}
                    />
                    {formErrors.date && (
                        <p className='text-red-500 mt-1 ml-2 text-sm'>
                            {formErrors.date}
                        </p>
                    )}
                </div>
            </div>
            <div className='mt-4'>
                <Button
                    onClick={handleSubmit}
                    disabled={disableBtn}
                    className='bg-green-500 text-white py-2 px-4 rounded'
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default DailyExpenseCreateForm;
