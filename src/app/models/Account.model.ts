import { Role } from "./Role"

export interface IAccount {
    id: number;
    roleid: number;
    role: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    identification_card_number: string;
    password: string;
    avatar_url: string;
    driving_license_images: Array<string>;
    status: string;
    date_of_birth: string;
    created_at: Date;
    updated_at: Date;
}