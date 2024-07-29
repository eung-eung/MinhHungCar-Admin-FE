export interface IContractRule {
    id: number;
    collateral_cash_amount: number;
    insurance_percent: number;
    max_warning_count: number;
    prepay_percent: number;
    revenue_sharing_percent: number;
    created_at: Date;
    updated_at: Date;
}