'use client';
import '@/css/satoshi.css';
import '@/css/style.css';
import React, { useEffect, useState } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export default function RootLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // const [loading, setLoading] = useState < boolean > true;

    // const pathname = usePathname();

    // useEffect(() => {
    //     setTimeout(() => setLoading(false), 1000);
    // }, []);

    return (
        <html lang='en'>
            <body suppressHydrationWarning={true}>
                <div className='dark:bg-boxdark-2 dark:text-bodydark'>
                    <AntdRegistry>{children}</AntdRegistry>
                </div>
            </body>
        </html>
    );
}
