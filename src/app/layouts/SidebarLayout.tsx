'use client'

import React, { Suspense } from 'react'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import Header from './components/Header'

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
    return (
        <>

            <Sidebar />
            <Content>
                <Header />
                {children}
            </Content>

        </>
    )
}
