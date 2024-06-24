import React from 'react'

export default function SearchInput({ value, callback, placeholder }: { value: any, callback: any, placeholder: any }) {
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
            value={value}
            onChange={callback}
            placeholder={placeholder} />
    )
}
