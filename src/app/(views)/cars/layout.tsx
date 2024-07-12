
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Xe'
}

export default function RootLayout({ children, modal }: Readonly<{ children: React.ReactNode, modal: React.ReactNode }>) {
    return <>
        {children}
        {modal}
    </>
}
