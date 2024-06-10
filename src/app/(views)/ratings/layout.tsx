import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Đánh giá'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children
}
