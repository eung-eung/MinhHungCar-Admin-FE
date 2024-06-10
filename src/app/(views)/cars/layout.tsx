import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Xe'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children
}
