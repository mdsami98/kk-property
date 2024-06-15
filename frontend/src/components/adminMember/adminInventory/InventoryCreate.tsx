import React, { useState } from 'react';
import { Input, Select, Button, message, Spin } from 'antd';
import { useGetAllTagsQuery } from '@/redux/slice/inventory/inventorySlice';

interface MemberAddFormProps {
    createSuccess: Function;
}
const InventoryCreate: React.FC<MemberAddFormProps> = ({ createSuccess }) => {
    const { TextArea } = Input;
    // const [addMember] = useAddMemberByAdminMutation();
    const [defaultValue, setDefaultValue] = useState([]);
    const { data: tags, isLoading: tagIsLoading } = useGetAllTagsQuery();

    const [formData, setFormData] = useState({
        name: '',
        pcode: '',
        quantity: '',
        unit_price: '',
        tags: [],
        description: ''
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (value: any) => {
        console.log(value);
        setFormData((prev) => ({
            ...prev,
            tags: value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (
            !formData.name ||
            // !formData.lastName ||
            // !formData.phone_number ||
            !formData.pcode ||
            !formData.quantity ||
            !formData.unit_price
        ) {
            message.error('All fields are required');
            return;
        }

        console.log(formData);

        // try {
        //     console.log(formData);
        //     addMember(formData)
        //         .unwrap()
        //         .then((response: any) => {
        //             if (response.status) {
        //                 console.log(response);
        //                 message.success(response.message);
        //                 setFormData((prev) => ({
        //                     ...prev,
        //                     name: '',
        //                     lastName: '',
        //                     phone_number: '',
        //                     email: '',
        //                     password: '',
        //                     confirmPassword: '',
        //                     memberType: 2
        //                 }));
        //                 memberCreateSuccess();

        //                 // if (role == 2) {
        //                 //     router.push('/investors');
        //                 // }
        //             }
        //         })
        //         .catch((error: any) => {
        //             message.error('Sorry Something Wrong Please Try Again');
        //         });

        //     // const response = await axios.post('/api/member', formData);
        //     // if (response.status === 200) {
        //     //     message.success('Member added successfully');
        //     // }
        // } catch (error) {
        //     message.error('Error adding member');
        // }
    };

    const textAreaOnChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            description: e.target.value
        }));
    };

    if (tagIsLoading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <Spin size='large' />
            </div>
        );
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className='grid gap-4 sm:grid-cols-2 sm:gap-6'
            >
                {/* <div className='sm:col-span-2'>
                  <label
                      htmlFor='name'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                      Namerrrrr
                  </label>
                  <Input
                      name='name'
                      placeholder='Enter Name'
                      value={formData.name}
                      onChange={handleChange}
                  />
              </div> */}
                <div className='sm:col-span-2 flex space-x-4 p-0 pt-2'>
                    <div className='w-1/2'>
                        <label
                            htmlFor='name'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                            Product Name
                        </label>
                        <Input
                            name='name'
                            placeholder='Enter Product Name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='w-1/2'>
                        <label
                            htmlFor='pcode'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                            Product Code
                        </label>
                        <Input
                            name='pcode'
                            placeholder='Enter product code'
                            value={formData.pcode}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className='sm:col-span-2 flex space-x-4 p-0 pt-2'>
                    <div className='w-1/2'>
                        <label
                            htmlFor='quantity'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                            Quantity
                        </label>
                        <Input
                            name='quantity'
                            placeholder='Enter Product Quantity'
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            type='number'
                        />
                    </div>
                    <div className='w-1/2'>
                        <label
                            htmlFor='unit_price'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                            Product Code
                        </label>
                        <Input
                            name='unit_price'
                            placeholder='Enter Unit Price'
                            value={formData.unit_price}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className='sm:col-span-2 flex space-x-4 p-0 pt-2'>
                    <div className='w-full'>
                        <label
                            htmlFor='category'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                            Category
                        </label>
                        <Select
                            defaultValue={defaultValue}
                            mode='tags'
                            style={{ width: '100%' }}
                            placeholder='Tags Mode'
                            onChange={handleSelectChange}
                            options={tags}
                        />
                    </div>
                </div>
                <div className='sm:col-span-2 flex space-x-4 p-0 pt-2'>
                    <div className='w-full'>
                        <label
                            htmlFor='category'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                            Description
                        </label>
                        <TextArea
                            showCount
                            maxLength={100}
                            onChange={textAreaOnChange}
                            placeholder='Write Description'
                            style={{ height: 120, resize: 'none' }}
                        />
                    </div>
                </div>

                <div className='sm:col-span-2'>
                    <Button type='primary' htmlType='submit' className='mt-4'>
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default InventoryCreate;
