
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "./layouts/Layout";
import { Metadata } from "next";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import SessionProvider from "./components/SessionProvider";
import AuthProvider from "./components/AuthProvider";
import I18nProvider from "./components/I18Provider";
import { Toaster } from 'react-hot-toast'
import { ConfigProvider } from "antd";





export const metadata: Metadata = {
  title: 'Home'
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout(
  {
    children
  }: Readonly<{
    children: React.ReactNode,
  }
  >) {


  return (
    <html>
      <body className={inter.className}>

        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#6C69FF',
                colorPrimaryBgHover: '#fff',

              },
              components: {
                Select: {
                  fontSize: 14,
                  optionSelectedColor: '#6C69FF'
                },
                Button: {
                  defaultHoverBorderColor: '#6C69FF',
                  defaultHoverBg: '#6C69FF',
                  defaultHoverColor: '#fff',
                  defaultBorderColor: '#6C69FF',
                  defaultColor: '#6C69FF',
                  // primary

                },
                Table: {
                  headerColor: '#87888C',
                  rowExpandedBg: "#fff"
                },
                Menu: {
                  itemSelectedBg: "#d4d3ff",
                  darkItemSelectedColor: '#b7b6fd2b',
                  itemColor: '#000000',
                  itemHoverColor: '#re',
                  itemActiveBg: '#d4d3ff',
                  itemHoverBg: '#b7b6fd2b'
                },
                Carousel: {
                  colorBgContainer: "#6C69FF"
                },
                Spin: {
                  colorBgMask: '#fff',
                  colorWhite: '#6C69FF'
                }
              },

            }}
          >
            <AuthProvider>
              <SessionProvider>
                <Layout>
                  <I18nProvider>
                    {children}
                  </I18nProvider>
                </Layout>
              </SessionProvider>
            </AuthProvider>
          </ConfigProvider>
        </AntdRegistry>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}
