import React from 'react'
import { Button, Image } from 'antd'
import classes from './index.module.css'
import { Tag } from 'antd'
import { IAccount } from '@/app/models/Account.model'
import { useTranslation } from 'react-i18next'
export default function AccountDialog({ detail }: { detail?: IAccount }) {
    console.log(detail);
    const { t } = useTranslation()
    return (
        <div className={classes.diaglog}>
            <div className={classes.diaglogBody}>
                <div className={classes.topBody}>

                    <div className={classes.inforItem}>
                        <p className={classes.label}>
                            Tên
                        </p>
                        <p className={classes.infor}>
                            {detail?.first_name + ' ' + detail?.last_name}                            </p>
                    </div>
                    {/* item */}
                    <div className={classes.inforItem}>
                        <p className={classes.label}>
                            CCCD
                        </p>
                        <p className={classes.infor}>
                            {detail?.identification_card_number}
                        </p>
                    </div>
                    {/* item */}
                    <div className={classes.inforItem}>
                        <p className={classes.label}>
                            Vai trò
                        </p>
                        <p className={classes.infor}>
                            <Tag
                                color={detail?.role === 'customer' ? 'cyan' : 'blue'}>
                                {t(`common:${detail?.role}`)}
                            </Tag>


                        </p>
                    </div>
                    {/* item */}
                    <div className={classes.inforItem}>
                        <p className={classes.label}>
                            Email
                        </p>
                        <p className={classes.infor}>
                            {detail?.email}
                        </p>
                    </div>
                    {/* item */}
                    <div className={classes.inforItem}>
                        <p className={classes.label}>
                            Số điện thoại
                        </p>
                        <p className={classes.infor}>
                            {detail?.phone_number}
                        </p>
                    </div>
                </div>
                <div className='mt-3 w-full text-right'>
                    <Tag style={{ fontWeight: 600 }} color={detail?.status === 'active' ? "green" : "red"}>
                        {t(`accountStatus:${detail?.status}`)}
                    </Tag>
                </div>
                {/* bottom body */}
                {
                    detail?.driving_license_images != null &&
                    <div className={classes.bodyBottom}>
                        <p className={classes.label}>
                            Giấy phép lái xe
                        </p>
                        <div className={classes.licenseImages}>
                            {detail?.driving_license_images.map(img =>
                                <Image
                                    width={200}
                                    src={img} />
                            )}
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}
