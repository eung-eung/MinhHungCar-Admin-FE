
import classes from './CarDialog.module.css'
import { Carousel, Image, Tag } from 'antd'
import { ICar } from '@/app/models/Car.model'
import { useTranslation } from 'react-i18next';



export default function CarDialog({ detail }: { detail?: ICar }) {
    const { t } = useTranslation()
    return (
        <div className={classes.diaglog}>
            <div className={classes.diaglogBody}>
                <div className={classes.topBody}>
                    <div className='w-3/6'>
                        <Carousel style={{ textAlign: 'center' }}>
                            {detail?.images.map(image =>
                                <div className='flex items-center'>
                                    <Image src={image}
                                        width={'100%'}
                                        height={300}
                                        style={{ objectFit: "contain" }}
                                        alt='Ảnh xe'
                                    />
                                </div>
                            )}
                        </Carousel>
                        {/* item */}
                        <div className={classes.inforItem}>
                            <p className={classes.label}>

                            </p>
                            <p className={classes.infor}>
                                {detail?.car_model.number_of_seats}
                            </p>
                        </div>
                        {/* item */}
                        <div className={classes.inforItem}>
                            <p className={classes.label}>
                                Truyền động
                            </p>
                            <p className={classes.infor}>
                                {detail?.motion}
                            </p>
                        </div>
                    </div>

                    <div className={classes.carInfo}>
                        <p className='font-semibold	text-xl mb-8'>
                            {detail?.car_model.brand + ' ' + detail?.car_model.model}
                        </p>
                        {/* item */}
                        <div className={classes.inforItem}>
                            <p className={classes.label}>
                                Biển số xe
                            </p>
                            <p className={classes.infor}>
                                {detail?.license_plate}
                            </p>
                        </div>
                        {/* item */}
                        <div className={classes.inforItem}>
                            <p className={classes.label}>
                                Trạng thái xe
                            </p>
                            <p className={classes.infor}>
                                <Tag color='#4baf21'>
                                    {detail?.status}
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
                    </div>
                </div>
                {/* bottom body */}
                <div className={classes.bodyBottom}>
                    <p className={classes.label}>
                        Giấy phép lái xe
                    </p>
                    <div className={classes.licenseImages}>
                        {/* <Image
                            width={200}
                            src="https://cdn.thuvienphapluat.vn/tintuc/uploads/image/2021/01/27/can-cuoc-cong-dan-gan-chip-2(1).jpg"
                        />
                        <Image
                            width={200}
                            src="https://cdn.thuvienphapluat.vn/tintuc/uploads/image/2021/01/27/can-cuoc-cong-dan-gan-chip-2(1).jpg"
                        /> */}
                    </div>

                </div>
            </div>
        </div>
    )
}
