'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import SidebarLinkGroup from './SidebarLinkGroup';
import { HomeOutlined } from '@ant-design/icons';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
    const pathname = usePathname();

    const trigger = useRef<any>(null);
    const sidebar = useRef<any>(null);

    let storedSidebarExpanded = 'true';

    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null
            ? false
            : storedSidebarExpanded === 'true'
    );

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ key }: KeyboardEvent) => {
            if (!sidebarOpen || key !== 'Escape') return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    useEffect(() => {
        localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector('body')?.classList.add('sidebar-expanded');
        } else {
            document
                .querySelector('body')
                ?.classList.remove('sidebar-expanded');
        }
    }, [sidebarExpanded]);

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            {/* <!-- SIDEBAR HEADER --> */}
            <div className='flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 text-white'>
                <Link href='/'>Logo</Link>
            </div>
            {/* <!-- SIDEBAR HEADER --> */}

            <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
                {/* <!-- Sidebar Menu --> */}
                <nav className='mt-5 px-4 py-4 lg:mt-9 lg:px-6'>
                    {/* <!-- Menu Group --> */}
                    <div>
                        {/* <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3> */}

                        <ul className='mb-6 flex flex-col gap-1.5'>
                            {/* <!-- Menu Item Calendar --> */}
                            <li>
                                <Link
                                    href='/calendar'
                                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        pathname.includes('calendar') &&
                                        'bg-graydark dark:bg-meta-4'
                                    }`}
                                >
                                    <HomeOutlined />
                                    Dashboard
                                </Link>
                            </li>
                            {/* <!-- Menu Item Calendar --> */}
                        </ul>
                    </div>
                </nav>
                {/* <!-- Sidebar Menu --> */}
            </div>
        </aside>
    );
};

export default Sidebar;