import { ICustomerContract } from "./CustomerContract"

export interface IPayment {
    id: number
    customer_contract_id: number
    customer_contract: ICustomerContract
    payment_type: string
    amount: number
    note: string
    status: string
    payment_url: string
    created_at: Date
    updated_at: Date
    payer: string
}