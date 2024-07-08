
import { Metadata } from "next";
import ChatLayout from "./components/Layout";

export const metadata: Metadata = {
    title: 'Chat'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <>

        <div style={{ height: '92vh' }}>
            <ChatLayout>
                {children}
            </ChatLayout>
        </div>

    </>
}
