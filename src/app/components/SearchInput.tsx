import React from 'react'

export default function SearchInput({ callback, placeholder }: { callback: any, placeholder: any }) {
    return (
        <input
            style={{
                background: '#fff',
                width: "90%",
                color: 'black',
                borderRadius: 5,
                border: '1px solid #efefef',
                outline: 'none',
                padding: 10
            }}
            onChange={callback}
            placeholder={placeholder} />
    )
}
