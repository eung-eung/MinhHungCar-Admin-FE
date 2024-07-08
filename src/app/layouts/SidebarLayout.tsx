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
                <div style={{
                    padding: "0 15px",
                    // minHeight: '88vh',
                    background: "#fbfcfd"
                }}>
                    {children}
                </div>
            </Content>

        </>
    )
}
