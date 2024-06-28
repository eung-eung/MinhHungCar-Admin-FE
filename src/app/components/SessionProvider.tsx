'use client'
import { Spin } from "antd"
import { useSession } from "next-auth/react"
import Loading from "./Loading"

export default function SessionProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const { status } = useSession()

    return (
        <>
            {status === 'loading' ? <Loading /> : children}
        </>
    )
}