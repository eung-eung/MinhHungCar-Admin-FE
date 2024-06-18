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
    images: Array<string>;
    created_at: Date;
    updated_at: Date;
}