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
    sellingPrice: 0,
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

                updatedState.sellingPrice =
                    parseFloat(area) * parseFloat(unitPrice) || 0;
            }
            return updatedState;
        case 'ADD_PLOT':
            return {
                ...state,
                plots: [
                    ...state.plots,
                    {
                        plotId: generateUniqueString(),
                        plotNumber: '',
                        investor: null,
                        investAmount: 0,
                        dueAmount: 0,
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
                              errors: { ...plot.errors, [action.field]: '' }
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
            return {
                ...state,
                projectName: '',
                address: '',
                area: 0,
                unitPrice: 0,
                totalPrice: 0,
                sellingPrice: 0,
                plots: [],
                errors: {}
            };
        default:
            throw new Error();
    }
}

const ProjectForm = () => {
    const router = useRouter();
    const { data: investors, isLoading } =
        useGetAllInvestorsForProjectCreateQuery();

    const [projectCreate] = useProjectCreateMutation();

    console.log(investors);
    const handleBackButtonClick = () => {
        router.push('/admin/project');
    };
    const [state, dispatch] = useReducer(reducer, initialState);

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
        if (!plot.investor) errors.investor = 'Investor is required';
        if (!plot.investAmount)
            errors.investAmount = 'Invest Amount is required';
        if (!plot.dueAmount) errors.dueAmount = 'Due Amount is required';
        // if (!plot.other) errors.other = 'Other is required';
        return errors;
    };

    const addPlot = () => {
        dispatch({ type: 'ADD_PLOT' });
    };

    const removePlot = (plotId) => {
        dispatch({ type: 'REMOVE_PLOT', plotId });
    };

    const handleSubmit = () => {
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

        // Handle form submission
        projectCreate(state)
            .unwrap()
            .then((response: any) => {
                if (response.status) {
                    console.log(response);
                    message.success(response.message);
                    dispatch({ type: 'RESET_STATE' });
                    router.push('/admin/project');
                }
            })
            .catch((error: any) => {
                message.error('Sorry Something Wrong Please Try Again');
            });
        // message.success('Form submitted successfully!');
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
                        htmlFor='sellingPrice'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Selling Price
                    </label>
                    <Input
                        name='sellingPrice'
                        placeholder='Enter Selling Price'
                        value={state.sellingPrice}
                        onChange={handleChange}
                    />
                    {state.errors.sellingPrice && (
                        <p className='text-red mt-1 ml-2 text-sm'>
                            {state.errors.sellingPrice}
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
                                htmlFor={`investAmount-${plot.plotId}`}
                                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                            >
                                Invest Amount
                            </label>
                            <Input
                                type='number'
                                name='investAmount'
                                placeholder='Enter Invest Amount'
                                value={plot.investAmount}
                                onChange={(e) =>
                                    handlePlotChange(plot.plotId, e)
                                }
                            />
                            {plot.errors.investAmount && (
                                <p className='text-red mt-1 ml-2 text-sm'>
                                    {plot.errors.investAmount}
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
                                placeholder='Enter Due Amount'
                                value={plot.dueAmount}
                                onChange={(e) =>
                                    handlePlotChange(plot.plotId, e)
                                }
                            />
                            {plot.errors.dueAmount && (
                                <p className='text-red mt-1 ml-2 text-sm'>
                                    {plot.errors.dueAmount}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor={`sellPrice-${plot.plotId}`}
                                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                            >
                                Sell Price
                            </label>
                            <Input
                                type='number'
                                name='sellPrice'
                                placeholder='Enter Sell Price'
                                value={plot.sellPrice}
                                onChange={(e) =>
                                    handlePlotChange(plot.plotId, e)
                                }
                            />
                            {plot.errors.sellPrice && (
                                <p className='text-red mt-1 ml-2 text-sm'>
                                    {plot.errors.sellPrice}
                                </p>
                            )}
                        </div>
                        {/* <div>
                            <label
                                htmlFor={`other-${plot.plotId}`}
                                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                            >
                                Other
                            </label>
                            <Input
                                name='other'
                                placeholder='Enter Other'
                                value={plot.other}
                                onChange={(e) => handlePlotChange(plot.plotId, e)}
                            />
                            {plot.errors.other && (
                                <p className='text-red mt-1 ml-2 text-sm'>
                                    {plot.errors.other}
                                </p>
                            )}
                        </div> */}
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
