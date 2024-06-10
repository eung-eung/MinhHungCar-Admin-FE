import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tài khoản'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children
}
