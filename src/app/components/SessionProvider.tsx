'use client'
import { Spin } from "antd"
import { useSession } from "next-auth/react"

export default function SessionProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const { status } = useSession()

    return (
        <>
            {status === 'loading' ? <Spin size="large" fullscreen /> : children}
        </>
    )
}