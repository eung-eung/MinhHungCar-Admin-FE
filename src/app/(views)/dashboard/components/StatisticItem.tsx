'use client'

import React, { CSSProperties } from 'react'
import { cn } from "@/app/utils/cn";

export default function StatisticItem({
    className,
    title,
    description,
    header,
    icon,
    style
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    style?: CSSProperties
}) {
    return (
        <div
            style={style}
            className={"row-span-1 rounded-xl h-max  group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 pb-5 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent flex flex-col space-y-4 " + className}
        >
            {header}
            <div className="group-hover/bento:translate-x-2 transition duration-200">
                {icon}
                <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                    {title}
                </div>
                <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                    {description}
                </div>
            </div>
        </div>
    )
}
