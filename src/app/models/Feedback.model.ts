import { ICar } from "./Car.model"

export interface IFeedback {
    id: number
    customer_id: number
    car_id: number
    car: ICar
    start_date: Date
    end_date: Date
    status: string
    reason: string
    rent_price: number
    insurance_amount: number
    collateral_type: string
    collateral_cash_amount: number
    is_return_collateral_asset: boolean
    url: string
    bank_name: string
    bank_number: string
    bank_owner: string
    insurance_percent: number
    prepay_percent: number
    revenue_sharing_percent: number
    feedback_content: string
    feedback_rating: number
    feedback_status: string
    created_at: Date
    updated_at: Date
}