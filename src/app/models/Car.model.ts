import { IAccount } from "./Account.model"
import { ICarModel } from "./CarModel.model"

export interface ICar {
    id: number;
    partner_id: number;
    account: IAccount;
    car_model_id: number;
    car_model: ICarModel;
    license_plate: string;
    parking_lot: string;
    description: string;
    fuel: string;
    motion: string;
    price: number;
    status: string;
    period: number;
    partner_contract_rule_id: any;
    partner_contract_rule: {
        id: any;
        revenue_sharing_percent: any;
        max_warning_count: any;
        created_at: Date;
        updated_at: Date;
    };
    images: Array<string>;
    caveats: Array<string>;
    warning_count: number;
    created_at: Date;
    updated_at: Date;
}