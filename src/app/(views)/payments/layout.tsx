import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Thanh toán'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children
}
