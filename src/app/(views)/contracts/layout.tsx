import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Hợp đồng'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children
}
