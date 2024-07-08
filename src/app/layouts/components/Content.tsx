import React from 'react'

export default function Content({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="sm:ml-64">
            {children}
        </div>
    )
}
