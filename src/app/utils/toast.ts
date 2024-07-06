import toast from "react-hot-toast";

export const sucessNotify = (title: any) => toast.success(title, {
    style: {
        padding: '5px',
        color: '#67C23A',
        background: '#F0F9EB'
    },
    iconTheme: {
        primary: 'green',
        secondary: 'white',
    },
})

export const errorNotify = (title: any) => toast.error(title, {
    style: {
        padding: '5px',
        color: '#F56C6C',
        background: '#FFEFF0',
        fontSize: 14,
    },
    iconTheme: {
        primary: 'red',
        secondary: 'white',
    },
});