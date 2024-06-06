import React, { useState } from 'react';
import { Input, Select, Button, message } from 'antd';
import { useAddMemberByAdminMutation } from '@/redux/slice/auth/authApiSlice';
// import axios from 'axios';
interface MemberAddFormProps {
    memberCreateSuccess: Function;
}
const MemberAddForm: React.FC<MemberAddFormProps> = ({
    memberCreateSuccess
}) => {
    const [addMember] = useAddMemberByAdminMutation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        memberType: 2
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (value: number) => {
        setFormData((prev) => ({
            ...prev,
            memberType: value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            message.error('All fields are required');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            message.error('Please enter a valid email');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            message.error('Passwords do not match');
            return;
        }

        try {
            console.log(formData);
            addMember(formData)
                .unwrap()
                .then((response: any) => {
                    if (response.status) {
                        console.log(response);
                        message.success(response.message);
                        setFormData((prev) => ({
                            ...prev,
                            name: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            memberType: 2
                        }));
                        memberCreateSuccess();

                        // if (role == 2) {
                        //     router.push('/investors');
                        // }
                    }
                })
                .catch((error: any) => {
                    message.error('Sorry Something Wrong Please Try Again');
                });

            // const response = await axios.post('/api/member', formData);
            // if (response.status === 200) {
            //     message.success('Member added successfully');
            // }
        } catch (error) {
            message.error('Error adding member');
        }
    };

    const memberOptions = [
        { value: 2, label: 'Investor' },
        { value: 1, label: 'Manager' }
    ];

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className='grid gap-4 sm:grid-cols-2 sm:gap-6'
            >
                <div className='sm:col-span-2'>
                    <label
                        htmlFor='name'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Name
                    </label>
                    <Input
                        name='name'
                        placeholder='Enter Name'
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className='sm:col-span-2'>
                    <label
                        htmlFor='email'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Email
                    </label>
                    <Input
                        name='email'
                        placeholder='Enter Email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className='w-full sm:col-span-2'>
                    <label
                        htmlFor='password'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Password
                    </label>
                    <Input
                        name='password'
                        type='password'
                        autoComplete='off'
                        placeholder='Enter Password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className='w-full sm:col-span-2'>
                    <label
                        htmlFor='confirmPassword'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Confirm Password
                    </label>
                    <Input
                        name='confirmPassword'
                        type='password'
                        placeholder='Enter Confirm Password'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className='sm:col-span-2'>
                    <label
                        htmlFor='memberType'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Member Type
                    </label>
                    <Select
                        style={{ width: '100%' }}
                        value={formData.memberType}
                        onChange={handleSelectChange}
                        options={memberOptions}
                    />
                </div>
                <div className='sm:col-span-2'>
                    <Button type='primary' htmlType='submit' className='mt-4'>
                        Add Now
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default MemberAddForm;
