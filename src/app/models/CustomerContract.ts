import { IAccount } from "./Account.model"
import { ICar } from "./Car.model"
import { ICustomerContractRule } from "./ContractRule"

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
    collateral_type: string,
    technician_appraising_note: any,
    is_return_collateral_asset: boolean
    url: string
    customer_contract_rule: ICustomerContractRule
    created_at: Date
    updated_at: Date
    receiving_car_images: any[]
    collateral_asset_images: any[],
}