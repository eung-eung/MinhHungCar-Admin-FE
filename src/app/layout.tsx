
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "./layouts/Layout";
import { Metadata } from "next";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import SessionProvider from "./components/SessionProvider";
import AuthProvider from "./components/AuthProvider";
import I18nProvider from "./components/I18Provider";





export const metadata: Metadata = {
  title: 'Home'
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout(
  {
    children, }: Readonly<
      {
        children: React.ReactNode,
      }
    >) {


  return (
    <html>
      <body className={inter.className}>
        <AntdRegistry>
          <AuthProvider>
            <SessionProvider>
              <Layout>
                <I18nProvider>
                  {children}
                </I18nProvider>
              </Layout>
            </SessionProvider>
          </AuthProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
