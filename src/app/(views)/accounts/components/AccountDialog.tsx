import React from 'react'
import { Image } from 'antd'
import classes from './index.module.css'
import { Tag } from 'antd'
export default function AccountDialog() {
    return (
        <div className={classes.diaglog}>
            <div className={classes.diaglogBody}>
                <div className={classes.topBody}>
                    <Image src='/avatarSample.jpg'
                        width={100}
                        height={100}
                        style={{ objectFit: "contain" }}
                        alt='Ảnh tài khoản'
                    />
                    <div className={classes.accountInfor}>
                        <p>Nguyễn Văn Long</p>
                        {/* item */}
                        <div className={classes.inforItem}>
                            <p className={classes.label}>
                                CCCD
                            </p>
                            <p className={classes.infor}>
                                00000000
                            </p>
                        </div>
                        {/* item */}
                        <div className={classes.inforItem}>
                            <p className={classes.label}>
                                Vai trò
                            </p>
                            <p className={classes.infor}>
                                <Tag color='#4baf21'>
                                    Khách Hàng
                                </Tag>
                            </p>
                        </div>
                        {/* item */}
                        <div className={classes.inforItem}>
                            <p className={classes.label}>
                                Email
                            </p>
                            <p className={classes.infor}>
                                boyvip5231@gmail.com
                            </p>
                        </div>
                        {/* item */}
                        <div className={classes.inforItem}>
                            <p className={classes.label}>
                                Số điện thoại
                            </p>
                            <p className={classes.infor}>
                                00000000
                            </p>
                        </div>
                    </div>
                </div>
                {/* bottom body */}
                <div className={classes.bodyBottom}>
                    <p className={classes.label}>
                        Giấy phép lái xe
                    </p>
                    <div className={classes.licenseImages}>
                        <Image
                            width={200}
                            src="https://cdn.thuvienphapluat.vn/tintuc/uploads/image/2021/01/27/can-cuoc-cong-dan-gan-chip-2(1).jpg"
                        />
                        <Image
                            width={200}
                            src="https://cdn.thuvienphapluat.vn/tintuc/uploads/image/2021/01/27/can-cuoc-cong-dan-gan-chip-2(1).jpg"
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}
