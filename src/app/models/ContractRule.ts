export interface ICustomerContractRule {
    id: number;
    insurance_percent: any,
    prepay_percent: any,
    collateral_cash_amount: any,
    created_at: Date,
    updated_at: Date
}
export interface IPartnerContractRule {
    id: number;
    revenue_sharing_percent: any,
    max_warning_count: any,
    created_at: Date,
    updated_at: Date
}