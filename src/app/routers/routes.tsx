import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCar';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
export interface RouteType {
    icon: JSX.Element;
    title: string;
    link: string;
    children?: RouteType[]
}

export const sidebarRoutes: RouteType[] = [
    {
        icon: <SpaceDashboardOutlinedIcon />,
        title: "Dashboard",
        link: "/",
    },
    {
        icon: <PersonOutlineOutlinedIcon />,
        title: "Tài khoản",
        link: "/accounts",
    },
    {
        icon: <DirectionsCarFilledOutlinedIcon />,
        title: "Hãng, mẫu xe",
        link: "/brands",
    },
    {
        icon: <HandshakeRoundedIcon />,
        title: "Xe của đối tác",
        link: "/cars",
    },
    {
        icon: < DragIndicatorIcon />,
        title: "Hợp đồng",
        link: "/contracts",
        children: [
            {
                icon: <ReceiptLongOutlinedIcon />,
                title: "Hợp đồng khách hàng",
                link: "/contracts",
            },
            {
                icon: <SettingsRoundedIcon />,
                title: "Chỉnh sửa hợp đồng",
                link: "/contracts/setting",
            },
        ]
    },
    {
        icon: <CurrencyExchangeOutlinedIcon />,
        title: "Thanh toán",
        link: "/payments",
    },
    {
        icon: <StarBorderRoundedIcon />,
        title: "Đánh giá",
        link: "/ratings",
    },
    {
        icon: <ChatBubbleOutlineOutlinedIcon />,
        title: "Chat",
        link: "/chat",
    },
    {
        icon: <LogoutOutlinedIcon />,
        title: "Đăng xuất",
        link: "/logout",
    },
]