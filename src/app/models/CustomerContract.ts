import { IAccount } from "./Account.model"
import { ICar } from "./Car.model"

export interface ICustomerContract {
    id: number
    customer_id: number
    customer: IAccount
    car_id: number
    car: ICar
    rent_price: number
    start_date: Date
    end_date: Date
    status: string
    reason: string
    insurance_amount: number
    collateral_type: string
    is_return_collateral_asset: boolean
    url: string
    created_at: Date
    updated_at: Date
    prepay_percent: any
    revenue_sharing_percent: any
    insurance_percent: any
    receiving_car_images: any[]
    collateral_asset_images: any[],
    collateral_cash_amount: any
}