import React from 'react'
import ItemStatistic from './components/StatisticItem'
import StatisTicItemGrid from './components/StatisticItemGrid';
import StatisticItem from './components/StatisticItem';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import Person4RoundedIcon from '@mui/icons-material/Person4Rounded';
const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
    {
        title: "1.000.000đ",
        description: "Tổng doanh thu",
        header: <EqualizerRoundedIcon sx={{ color: '#FEB95A' }} />,
        //   icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "500",
        description: "Tổng hợp đồng thuê xe",
        header: <ReceiptLongRoundedIcon sx={{ color: '#A9DFD8' }} />,
        //   icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "100",
        description: "Tổng partner",
        header: <HandshakeRoundedIcon sx={{ color: '#F2C8ED' }} />,
        //   icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "100",
        description:
            "Số khách hàng đã sử dụng dịch vụ",
        header: <Person4RoundedIcon sx={{ color: '#20AEF3' }} />,
        //   icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },

];
export default function Dashboard() {
    return (
        <div>
            <StatisTicItemGrid className="">
                {items.map((item, i) => (
                    <StatisticItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        className={i === 4 || i === 6 ? "md:col-span-2" : ""}
                    />
                ))}
            </StatisTicItemGrid>
        </div>
    )
}
