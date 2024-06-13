import React from 'react'

export default function SearchInput({ callback, placeholder }: { callback: any, placeholder: any }) {
    return (
        <input
            style={{
                background: '#fff',
                padding: 10,
                width: "50%",
                color: 'black',
                marginBottom: 30,
                borderRadius: 5,
                border: '1px solid #efefef',
                outline: 'none'
            }}
            onChange={callback}
            placeholder={placeholder} />
    )
}
