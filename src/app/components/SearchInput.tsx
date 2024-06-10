import React from 'react'

export default function SearchInput({ callback, placeholder }: { callback: any, placeholder: any }) {
    return (
        <input
            style={{
                background: '#21222D',
                padding: 10,
                width: "30%",
                color: '#fff',
                marginBottom: 30,
                borderRadius: 5,
            }}
            onChange={callback}
            placeholder={placeholder} />
    )
}
