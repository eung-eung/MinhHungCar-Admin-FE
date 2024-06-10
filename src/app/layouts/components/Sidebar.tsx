'use client'
import React, { Suspense, useState } from 'react'
import "./index.css"
import { sidebarRoutes } from '@/app/routers/routes'
import { ConfigProvider, Menu, MenuProps } from 'antd'
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Image from 'next/image'

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
    const path = usePathname() as string
    const handleChangeRoute = (e: any) => {
        if (e.key === '/logout') {
            signOut()
        } else {
            router.push(e.key)
        }
    }


    return (
        <div >

            <aside id="sidebar-multi-level-sidebar" className="lineBorder fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className='title'>
                    <Image
                        alt='minh hung' src='/Minhhung.png' width={50} height={50}
                        className='titleImage'
                    />
                    <p className='titleContent'>MinhHungCar</p>
                </div>
                <ConfigProvider theme={{
                    components: {
                        Menu: {
                            itemSelectedBg: "#b7b6fd2b",
                            darkItemSelectedColor: '#b7b6fd2b',
                            itemColor: '#fff',
                            itemHoverColor: '#773BFF',
                            itemActiveBg: '#13131A'
                        },

                    }
                }}>

                    <Menu
                        onClick={handleChangeRoute}
                        defaultSelectedKeys={[path]}
                        defaultOpenKeys={['']}
                        mode="inline"
                        // theme='dark'
                        inlineCollapsed={collapsed}
                        items={items}

                    />
                </ConfigProvider>

            </aside>


        </div>
    )
}
