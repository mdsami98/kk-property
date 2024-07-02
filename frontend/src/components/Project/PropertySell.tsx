import React, { useState } from 'react';
import { Input, Button, DatePicker, message } from 'antd';
import dayjs from 'dayjs';

interface FormErrors {
    buyerName?: string;
    salePrice?: string;
    saleDate?: string;
    dueAmount?: string;
}

interface FormState {
    buyerName: string;
    salePrice: number | undefined;
    saleDate: any;
    dueAmount: number | undefined;
}

const PlotSale = ({ plot, onSaleSubmit }) => {
    const [formState, setFormState] = useState<FormState>({
        buyerName: '',
        salePrice: undefined,
        saleDate: dayjs(new Date()),
        dueAmount: undefined
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [disableBtn, setDisableBtn] = useState<boolean>(false);

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

    const validateFields = (): FormErrors => {
        const errors: FormErrors = {};
        if (!formState.buyerName) errors.buyerName = 'Buyer Name is required';
        if (!formState.salePrice) errors.salePrice = 'Sale Price is required';
        if (!formState.saleDate) errors.saleDate = 'Sale Date is required';
        if (!formState.dueAmount) errors.dueAmount = 'Due Amount is required';
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
            await onSaleSubmit({ ...formState, plotId: plot.id });
            message.success('Plot sale details submitted successfully');
            setDisableBtn(false);
        } catch (error) {
            setDisableBtn(false);
            message.error('Failed to submit plot sale details');
        }
    };

    return (
        <div className='p-4'>
            <div className='grid grid-cols-1 gap-4'>
                <div>
                    <label
                        htmlFor='buyerName'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Buyer Name
                    </label>
                    <Input
                        name='buyerName'
                        placeholder='Enter Buyer Name'
                        value={formState.buyerName}
                        onChange={handleChange}
                    />
                    {formErrors.buyerName && (
                        <p className='text-red-500 mt-1 ml-2 text-sm'>
                            {formErrors.buyerName}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor='salePrice'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Sale Price
                    </label>
                    <Input
                        type='number'
                        name='salePrice'
                        placeholder='Enter Sale Price'
                        value={formState.salePrice}
                        onChange={handleChange}
                    />
                    {formErrors.salePrice && (
                        <p className='text-red-500 mt-1 ml-2 text-sm'>
                            {formErrors.salePrice}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor='saleDate'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Sale Date
                    </label>
                    <DatePicker
                        showTime
                        defaultValue={formState.saleDate}
                        onChange={(value, dateString) => {
                            setFormState((prevState) => ({
                                ...prevState,
                                saleDate: value
                            }));
                            setFormErrors((prevErrors) => ({
                                ...prevErrors,
                                saleDate: undefined
                            }));
                        }}
                    />
                    {formErrors.saleDate && (
                        <p className='text-red-500 mt-1 ml-2 text-sm'>
                            {formErrors.saleDate}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor='dueAmount'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Due Amount
                    </label>
                    <Input
                        type='number'
                        name='dueAmount'
                        placeholder='Enter Due Amount'
                        value={formState.dueAmount}
                        onChange={handleChange}
                    />
                    {formErrors.dueAmount && (
                        <p className='text-red-500 mt-1 ml-2 text-sm'>
                            {formErrors.dueAmount}
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

export default PlotSale;
