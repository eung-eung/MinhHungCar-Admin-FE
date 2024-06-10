'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import NoSidebartLayout from './NoSidebarLayout';
import SidebarLayout from './SidebarLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    if (pathname === "/login") {
        return <NoSidebartLayout>
            {children}
        </NoSidebartLayout>;
    }
    return <SidebarLayout>
        {children}
    </SidebarLayout >

}
