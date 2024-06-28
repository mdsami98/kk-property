'use client';
import React, { useReducer } from 'react';
import { Input, Button, Spin, Select, message } from 'antd';
import { generateUniqueString } from '@/util/helper';
import { useRouter } from 'next/navigation';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import {
    useGetAllInvestorsForProjectCreateQuery,
    useProjectCreateMutation
} from '@/redux/slice/project/projectApiSlice';

// Initial state
const initialState = {
    projectName: '',
    address: '',
    area: 0,
    unitPrice: 0,
    totalPrice: 0,
    sellingPricePerUnit: 0,
    plots: [],
    errors: {}
};

// Reducer function
function reducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD':
            const updatedState = {
                ...state,
                [action.field]: action.value,
                errors: { ...state.errors, [action.field]: '' }
            };
            if (action.field === 'area' || action.field === 'unitPrice') {
                const area =
                    action.field === 'area' ? action.value : state.area;
                const unitPrice =
                    action.field === 'unitPrice'
                        ? action.value
                        : state.unitPrice;
                updatedState.totalPrice =
                    parseFloat(area) * parseFloat(unitPrice) || 0;
            }
            return updatedState;
        case 'ADD_PLOT':
            let newError = { ...state.errors };
            delete newError.plots;
            return {
                ...state,
                errors: { ...newError },
                plots: [
                    ...state.plots,
                    {
                        plotId: generateUniqueString(),
                        plotNumber: '',
                        area: 0,
                        totalPayable: 0,
                        pay: 0,
                        dueAmount: 0,
                        investor: null,
                        investAmount: 0,
                        sellPrice: 0,
                        errors: {}
                    }
                ]
            };
        case 'REMOVE_PLOT':
            return {
                ...state,
                plots: state.plots.filter(
                    (plot) => plot.plotId !== action.plotId
                )
            };
        case 'SET_PLOT_FIELD':
            return {
                ...state,
                plots: state.plots.map((plot) =>
                    plot.plotId === action.plotId
                        ? {
                              ...plot,
                              [action.field]: action.value,
                              errors: { ...plot.errors, [action.field]: '' },
                              ...(action.field === 'area' ||
                              action.field === 'sellPrice'
                                  ? {
                                        totalPayable:
                                            Number(action.value) *
                                                state.sellingPricePerUnit || 0
                                        // parseFloat(
                                        //     action.field === 'area'
                                        //         ? action.value
                                        //         : plot.area
                                        // ) *
                                        //     parseFloat(
                                        //         action.field === 'sellPrice'
                                        //             ? action.value
                                        //             : plot.sellPrice
                                        //     ) || 0
                                    }
                                  : {}),
                              ...(action.field === 'pay'
                                  ? {
                                        dueAmount:
                                            Number(plot.totalPayable) -
                                                parseFloat(action.value) || 0
                                    }
                                  : {})
                          }
                        : plot
                )
            };
        case 'SET_ERRORS':
            return { ...state, errors: action.errors };
        case 'SET_PLOT_ERRORS':
            return {
                ...state,
                plots: state.plots.map((plot) =>
                    plot.plotId === action.plotId
                        ? { ...plot, errors: action.errors }
                        : plot
                )
            };
        case 'RESET_STATE':
            return initialState;
        default:
            throw new Error();
    }
}

const ProjectForm = () => {
    const router = useRouter();
    const { data: investors, isLoading } =
        useGetAllInvestorsForProjectCreateQuery();
    const [projectCreate] = useProjectCreateMutation();
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleBackButtonClick = () => {
        router.push('/admin/project');
    };

    const handleChange = (e) => {
        dispatch({
            type: 'SET_FIELD',
            field: e.target.name,
            value: e.target.value
        });
    };

    const handlePlotChange = (plotId, e) => {
        dispatch({
            type: 'SET_PLOT_FIELD',
            plotId,
            field: e.target.name,
            value: e.target.value
        });
    };

    const handlePlotInvestorChange = (plotId, field, value) => {
        dispatch({
            type: 'SET_PLOT_FIELD',
            plotId,
            field,
            value
        });
    };

    const validateFields = () => {
        const errors = {};
        if (!state.projectName) errors.projectName = 'Project Name is required';
        if (!state.address) errors.address = 'Address is required';
        if (!state.area) errors.area = 'Area is required';
        if (!state.unitPrice) errors.unitPrice = 'Unit Price is required';

        return errors;
    };

    const validatePlotFields = (plot) => {
        const errors = {};
        if (!plot.plotNumber) errors.plotNumber = 'Plot Number is required';
        if (!plot.area) errors.area = 'Area is required';
        // if (!plot.sellPrice) errors.sellPrice = 'Sell Price is required';
        if (!plot.pay) errors.pay = 'Pay is required';

        return errors;
    };

    const addPlot = () => {
        dispatch({ type: 'ADD_PLOT' });
    };

    const removePlot = (plotId) => {
        dispatch({ type: 'REMOVE_PLOT', plotId });
    };

    const handleSubmit = () => {
        console.log(state);

        const errors = validateFields();
        if (Object.keys(errors).length > 0) {
            dispatch({ type: 'SET_ERRORS', errors });
            return;
        }

        const plotErrors = state.plots.map((plot) => ({
            plotId: plot.plotId,
            errors: validatePlotFields(plot)
        }));

        const hasPlotErrors = plotErrors.some(
            (plot) => Object.keys(plot.errors).length > 0
        );

        if (hasPlotErrors) {
            plotErrors.forEach((plotError) => {
                dispatch({
                    type: 'SET_PLOT_ERRORS',
                    plotId: plotError.plotId,
                    errors: plotError.errors
                });
            });
            return;
        }
        console.log(state);
        // return;

        // Handle form submission
        projectCreate(state)
            .unwrap()
            .then((response: any) => {
                if (response.status) {
                    message.success(response.message);
                    dispatch({ type: 'RESET_STATE' });
                    router.push('/admin/project');
                }
            })
            .catch(() => {
                message.error('Sorry Something Went Wrong. Please Try Again');
            });
    };

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <Spin size='large' />
            </div>
        );
    }

    return (
        <div className='p-4'>
            <div className='mb-5 text-right'>
                <Button
                    onClick={handleBackButtonClick}
                    type='primary'
                    icon={<LeftOutlined />}
                >
                    Back
                </Button>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label
                        htmlFor='projectName'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Project Name
                    </label>
                    <Input
                        name='projectName'
                        placeholder='Enter Project Name'
                        value={state.projectName}
                        onChange={handleChange}
                    />
                    {state.errors.projectName && (
                        <p className='text-red mt-1 ml-2 text-sm'>
                            {state.errors.projectName}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor='address'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Address
                    </label>
                    <Input
                        name='address'
                        placeholder='Enter Address'
                        value={state.address}
                        onChange={handleChange}
                    />
                    {state.errors.address && (
                        <p className='text-red mt-1 ml-2 text-sm'>
                            {state.errors.address}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor='area'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Area
                    </label>
                    <Input
                        type='number'
                        name='area'
                        placeholder='Enter Area'
                        value={state.area}
                        onChange={handleChange}
                    />
                    {state.errors.area && (
                        <p className='text-red mt-1 ml-2 text-sm'>
                            {state.errors.area}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor='unitPrice'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Unit Price
                    </label>
                    <Input
                        type='number'
                        name='unitPrice'
                        placeholder='Enter Unit Price'
                        value={state.unitPrice}
                        onChange={handleChange}
                    />
                    {state.errors.unitPrice && (
                        <p className='text-red mt-1 ml-2 text-sm'>
                            {state.errors.unitPrice}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor='totalPrice'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Total Price
                    </label>
                    <Input
                        type='number'
                        name='totalPrice'
                        value={state.totalPrice}
                        onChange={handleChange}
                        disabled
                    />
                </div>
                <div>
                    <label
                        htmlFor='sellingPricePerUnit'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Selling Price Per Unit
                    </label>
                    <Input
                        type='number'
                        name='sellingPricePerUnit'
                        placeholder='Enter Selling Price Per Unit'
                        value={state.sellingPricePerUnit}
                        onChange={handleChange}
                    />
                    {state.errors.sellingPricePerUnit && (
                        <p className='text-red mt-1 ml-2 text-sm'>
                            {state.errors.sellingPricePerUnit}
                        </p>
                    )}
                </div>
            </div>
            <div className='mt-4'>
                <Button
                    onClick={addPlot}
                    className='bg-blue-500 text-white py-2 px-4 rounded'
                >
                    Add Plot +
                </Button>
                {state.errors.plots && (
                    <p className='text-red mt-1 ml-2 text-sm'>
                        {state.errors.plots}
                    </p>
                )}
            </div>
            {state.plots.map((plot) => (
                <div key={plot.plotId} className='mt-4 border p-4 rounded'>
                    <div className='grid grid-cols-3 gap-4'>
                        <div>
                            <label
                                htmlFor={`plotNumber-${plot.plotId}`}
                                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                            >
                                Plot Number
                            </label>
                            <Input
                                name='plotNumber'
                                placeholder='Enter Plot Number'
                                value={plot.plotNumber}
                                onChange={(e) =>
                                    handlePlotChange(plot.plotId, e)
                                }
                            />
                            {plot.errors.plotNumber && (
                                <p className='text-red mt-1 ml-2 text-sm'>
                                    {plot.errors.plotNumber}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor={`investor-${plot.plotId}`}
                                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                            >
                                Select Investor
                            </label>
                            <Select
                                style={{ width: '100%' }}
                                value={plot.investor}
                                onChange={(value) =>
                                    handlePlotInvestorChange(
                                        plot.plotId,
                                        'investor',
                                        value
                                    )
                                }
                                options={investors.map((investor) => ({
                                    value: investor.value,
                                    label: investor.label
                                }))}
                            ></Select>
                            {plot.errors.investor && (
                                <p className='text-red mt-1 ml-2 text-sm'>
                                    {plot.errors.investor}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor={`area-${plot.plotId}`}
                                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                            >
                                Area
                            </label>
                            <Input
                                type='number'
                                name='area'
                                placeholder='Enter Area'
                                value={plot.area}
                                onChange={(e) =>
                                    handlePlotChange(plot.plotId, e)
                                }
                            />
                            {plot.errors.area && (
                                <p className='text-red mt-1 ml-2 text-sm'>
                                    {plot.errors.area}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor={`totalPayable-${plot.plotId}`}
                                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                            >
                                Total Payable
                            </label>
                            <Input
                                type='number'
                                name='totalPayable'
                                value={plot.totalPayable}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                        <div>
                            <label
                                htmlFor={`pay-${plot.plotId}`}
                                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                            >
                                Pay
                            </label>
                            <Input
                                type='number'
                                name='pay'
                                placeholder='Enter Pay'
                                value={plot.pay}
                                onChange={(e) =>
                                    handlePlotChange(plot.plotId, e)
                                }
                            />
                            {plot.errors.pay && (
                                <p className='text-red mt-1 ml-2 text-sm'>
                                    {plot.errors.pay}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor={`dueAmount-${plot.plotId}`}
                                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                            >
                                Due Amount
                            </label>
                            <Input
                                type='number'
                                name='dueAmount'
                                value={plot.dueAmount}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                    </div>
                    <Button
                        onClick={() => removePlot(plot.plotId)}
                        className='bg-red-500 text-white py-2 px-4 mt-4 rounded'
                    >
                        Delete
                    </Button>
                </div>
            ))}
            <div className='mt-4'>
                <Button
                    onClick={handleSubmit}
                    className='bg-green-500 text-white py-2 px-4 rounded'
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default ProjectForm;
