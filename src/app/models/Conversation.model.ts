import { IAccount } from "./Account.model";

export interface IConversation {
    id: any,
    account_id: any,
    status: string,
    created_at: Date,
    updated_at: Date,
    account: IAccount
}