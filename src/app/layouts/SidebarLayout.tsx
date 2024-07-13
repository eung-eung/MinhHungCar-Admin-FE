'use client'

import React, { useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import Header from './components/Header'
import '../globals.css'
import { WebSocketNotiProvider } from '../store/WebsocketNotiProvider'

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
    return (
        <>  <WebSocketNotiProvider>
            <Sidebar />
            <Content>
                <Header />
                <div style={{
                    padding: "0 15px",
                    background: "#fbfcfd"
                }}>
                    {children}
                </div>
            </Content>
        </WebSocketNotiProvider>
        </>
    )
}
