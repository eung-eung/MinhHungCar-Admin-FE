'use client'

import React from 'react'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import Header from './components/Header'
import '../globals.css'

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Sidebar />
            <Content>
                <Header />
                <div className='box'>
                    {children}
                </div>
            </Content>

        </>
    )
}
