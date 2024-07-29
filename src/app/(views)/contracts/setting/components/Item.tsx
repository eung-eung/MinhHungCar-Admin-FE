import { Skeleton } from 'antd'
import React from 'react'

export default function Item({ title, data, loading }: { title: any, data: any, loading: boolean }) {
    return (
        <div className='flex mb-5'>
            <p style={{
                minWidth: '300px'
            }}>
                {title}
            </p>
            {
                loading ? <Skeleton.Input active size='default' /> :
                    <div>{data}</div>
            }
        </div>
    )
}
