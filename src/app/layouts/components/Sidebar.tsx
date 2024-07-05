'use client'
import React, { Suspense, useEffect, useState } from 'react'
import "./index.css"
import { sidebarRoutes } from '@/app/routers/routes'
import { Menu, MenuProps } from 'antd'
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import NProgress from "nprogress"
import nProgress from 'nprogress'

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = sidebarRoutes.map((route) => {

    return {
        key: route.link,
        label: route.title,
        icon: route.icon,
        children: route.children ? route.children.map((child) => {
            return {
                key: child.link,
                label: child.title,
                icon: child.icon
            }
        }) : ''
    }
})

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter()
    const pathname = usePathname() as string
    const [path, setPath] = useState<any>()
    NProgress.configure({ showSpinner: false });

    useEffect(() => {
        nProgress.done();
    }, [pathname])
    const handleChangeRoute = (e: any) => {
        if (e.key === '/logout') {
            signOut()
        } else {
            if (e.key !== pathname) {
                nProgress.start();
                router.push(e.key)

            }
        }
    }


    return (
        <div >

            <aside
                style={{ borderInlineEnd: "1px solid rgba(5, 5, 5, 0.06)" }}
                id="sidebar-multi-level-sidebar"
                className="lineBorder fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar">
                <div className='title'>
                    <img
                        style={{ width: '70%' }}
                        className='mt-3'
                        src='/minhhunglogo.png' />
                </div>
                <Menu
                    onClick={handleChangeRoute}
                    defaultSelectedKeys={[pathname]}
                    defaultOpenKeys={['']}
                    selectedKeys={[pathname]}
                    mode="inline"
                    // theme='dark'
                    inlineCollapsed={collapsed}
                    items={items}
                />
            </aside>


        </div>
    )
}
