import { ICustomerContract } from '@/app/models/CustomerContract'
import { Skeleton } from 'antd'
import React from 'react'

export default function DetailItem({
    detailTitle,
    loadingDetail,
    detail
}: {
    detailTitle: any,
    loadingDetail: boolean,
    detail: any
}) {
    return (
        <div className='mb-3 flex items-center'>
            <p className='mr-2' style={{ color: "#696969" }}>
                {detailTitle}
            </p>
            {
                loadingDetail
                    ?
                    <Skeleton.Button
                        active={true}
                        size='default'
                        shape='round'
                        block={false}
                    />
                    :
                    <span
                        style={{
                            color: '#600fd1',
                            fontWeight: 600,
                            fontSize: 14,
                            borderRadius: 7,
                            padding: 2,
                            background: "#e1e4ff"
                        }}
                    >
                        {
                            detail
                        }
                    </span>
            }
        </div>
    )
}
