import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Hãng mẫu xe'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children
}
