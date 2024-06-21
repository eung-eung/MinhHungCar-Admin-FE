export const formatCurrency = (money: any) =>
    money.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })