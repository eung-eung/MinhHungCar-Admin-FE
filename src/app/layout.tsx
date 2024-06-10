
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "./layouts/Layout";
import { Metadata } from "next";
import AuthProvider from "./components/AuthProvider";
import { AntdRegistry } from '@ant-design/nextjs-registry';

export const metadata: Metadata = {
  title: 'Home'
}

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <AuthProvider>
            <Layout>
              {children}
            </Layout>
          </AuthProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
