import React from 'react'

export default function Content({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="pb-4 sm:ml-64">
            {children}
        </div>
    )
}
