
import classes from './CarDialog.module.css'
import { Button, Image, Tag } from 'antd'
import { ICar } from '@/app/models/Car.model'
import { useTranslation } from 'react-i18next';
import CarouselImages from './Carousel';
import CarInformation from './CarInformation';
import { SetStateAction } from 'react';


export default function CarDialog(
    {
        detail,
        setRefresh
    }: {
        detail?: ICar,
        setRefresh?: React.Dispatch<SetStateAction<boolean>>
    }) {
    return (
        <div className={classes.diaglog}>
            <div className={classes.diaglogBody}>
                <div className={classes.topBody}>
                    <div className='w-3/6'>
                        <CarouselImages images={detail?.images} />
                    </div>
                    <div className={classes.carInfo}>
                        <CarInformation
                            showAction={false}
                            detail={detail}
                            setRefresh={setRefresh} />
                    </div>
                </div>
                <div>
                    <p className={classes.caveats}>Giấy tờ xe</p>
                    <div className='flex mt-4 justify-around'>
                        {
                            detail?.caveats.map((c, index) =>
                                <Image
                                    key={index}
                                    src={c}
                                    width={300}
                                    height={150}
                                    style={{ objectFit: 'contain' }} />)
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}
