"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/app/utils/cn";
import Link from "next/link";
import { Button, Tag } from "antd";
import useAxiosAuth from "../utils/hooks/useAxiosAuth";
import { useRouter } from "next/navigation";

export const FloatingNav = ({
    navItems,
    className,
    selectedKey,
    setSelectedRowKeys,
    setSelectedRowsState
}: {
    navItems: {
        name: string,
        icon?: JSX.Element,
    }[],
    className?: string,
    selectedKey?: React.Key[],
    setSelectedRowKeys: React.Dispatch<SetStateAction<any>>,
    setSelectedRowsState: React.Dispatch<SetStateAction<any>>
}) => {
    const [visible, setVisible] = useState(false);
    const axiosAuth = useAxiosAuth()
    const router = useRouter()
    const handleMultiplePayments = async () => {
        if (!selectedKey || !selectedKey.length) {
            return
        } else {
            try {
                const response = await axiosAuth.post('/admin/customer_payment/multiple/generate_qr', {
                    customer_payment_ids: selectedKey,
                    return_url: process.env.WEB_HOST_PUBLIC
                })
                router.push(response.data.data.payment_url)
            } catch (error) {

            }


        }
    }

    useEffect(() => {
        if (!selectedKey || !selectedKey.length) {
            setVisible(false)
        } else {
            setVisible(true)
        }
    }, [selectedKey])
    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    "flex max-w-fit  fixed top-1 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2  items-center justify-center space-x-4",
                    className
                )}
            >
                {navItems.map((navItem: any, idx: number) => (
                    <div
                        key={idx}
                        className={cn(
                            "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
                        )}
                    >
                        <button
                            onClick={() => {
                                setSelectedRowKeys([]), setSelectedRowsState([])
                            }}
                            className="px-8 py-2 rounded-full relative bg-slate-500 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-800">
                            <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                            <span className="relative z-20">
                                <span>{navItem.name}</span>
                            </span>
                        </button>

                    </div>
                ))}
                <button
                    onClick={handleMultiplePayments}
                    className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
                    <span>Thanh toán các khoản đã chọn</span>
                    <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
                </button>
            </motion.div>
        </AnimatePresence>
    );
};
