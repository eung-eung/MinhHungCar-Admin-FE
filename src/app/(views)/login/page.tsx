'use client'

import React, { useRef, useState } from "react";
import { AuroraBackground } from "@/app/(views)/login/components/AuroraBackground"
import { Input } from "@/app/(views)/login/components/Input"
import { Label } from "@/app/(views)/login/components/Label"
import { LabelInputContainer } from "./components/LabelInputContainer";
import { BottomGradient } from "./components/BottomGradient";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { errorNotify } from "@/app/utils/toast";

export default function Login() {
    const emailInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        const res = await signIn('credentials', {
            redirect: false,
            username: emailInput.current?.value,
            password: passwordInput.current?.value,
        });
        if (res?.status === 401) {
            errorNotify('Tài khoản không đúng')
        } else if (res?.status === 200 && res.ok) {
            router.replace('/')
        }
        setLoading(false)
    };
    return (

        <AuroraBackground>
            <div className="z-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Xin chào quản trị viên MinhHungCar
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Vui lòng đăng nhập
                </p>
                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                <form className="my-8" onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="username">Tên tài khoản</Label>
                        <Input id="username"
                            type="text"
                            ref={emailInput} />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Mật khẩu</Label>
                        <Input
                            id="password"
                            type="password"
                            ref={passwordInput} />
                    </LabelInputContainer>
                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                        disabled={loading}       >
                        {!loading ?
                            <>
                                Đăng nhập &rarr;
                                <BottomGradient />
                            </>
                            : <Spin />
                        }
                    </button>
                </form>
            </div>
        </AuroraBackground>
    )
}

