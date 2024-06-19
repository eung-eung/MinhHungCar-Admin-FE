
import classes from './CarDialog.module.css'
import { Button, Tag } from 'antd'
import { ICar } from '@/app/models/Car.model'
import { useTranslation } from 'react-i18next';
import CarouselImages from './Carousel';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { useState } from 'react';


export default function CarDialog(
    {
        detail,
    }: {
        detail?: ICar,
    }) {
    const { t } = useTranslation()


    const showContract = async () => {
    }
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);



    return (
        <div className={classes.diaglog}>
            <div className={classes.diaglogBody}>
                <div className={classes.topBody}>
                    <div className='w-3/6'>
                        <CarouselImages images={detail?.images} />
                        {/* item */}
                        <div className={classes.inforItem}>
                            <p className={classes.label}>
                                Số ghế
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
                                {t(`common:${detail?.motion}`)}
                            </p>
                        </div>
                        {/* item */}
                        <div className={classes.inforItem}>
                            <p className={classes.label}>
                                Nhiên liệu
                            </p>
                            <p className={classes.infor}>
                                {t(`common:${detail?.fuel}`)}
                            </p>
                        </div>
                        {/* item */}
                        <div className={classes.inforItem}>
                            <p className={classes.label}>
                                Mô tả
                            </p>
                            <p className={classes.infor}>
                                {detail?.description}
                            </p>
                        </div>
                    </div>

                    <div className={classes.carInfo}>
                        <p className='font-semibold	text-xl mb-8'>
                            {detail?.car_model.brand
                                + ' '
                                + detail?.car_model.model
                                + ' '
                                + detail?.car_model.year
                            }
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
                                Nơi đậu xe
                            </p>
                            <p className={classes.infor}>
                                {t(`common:${detail?.parking_lot}`)}
                            </p>
                        </div>
                        {/* item */}
                        <div className={classes.inforItem}>
                            <p className={classes.label}>
                                Giá cho thuê
                            </p>
                            <p className={classes.infor}>
                                {formatCurrency(detail?.price)}
                            </p>
                        </div>
                        {/* item */}
                        <div className={classes.inforItem}>
                            <p className={classes.label}>
                                Thời hạn thuê
                            </p>
                            <p className={classes.infor}>
                                {detail?.period_code} tháng
                            </p>
                        </div>
                        {/* item */}
                        <div className={classes.inforItem}>
                            <p className={classes.label}>
                                Trạng thái xe
                            </p>
                            <p className={classes.infor}>
                                <Tag style={{ margin: 0, fontSize: 18, padding: 3 }} color='#eb8628'>
                                    {t(`common:${detail?.status}`)}
                                </Tag>

                            </p>

                        </div>
                        <Button onClick={showContract}>Click</Button>
                        {/* <div>
                            <Document
                                file={pdfUrl}
                                onLoadSuccess={onDocumentLoadSuccess}
                                externalLinkTarget="_parent"
                            >
                                <Page pageNumber={1} />
                            </Document>

                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
