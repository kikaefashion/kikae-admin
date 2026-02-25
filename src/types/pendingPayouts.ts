import { UserProfileType } from "./types";

export interface payoutRequestType {
  pending_balance: number;
  total_balance: number;
  total_sales: number;

  withdrawable_balance: number;
  withdraw_request: {
    account_name: string;
    account_number: number;
    bank: string;
    bank_code: number;
    amount_requested:number
    created_at: string;
    
    id: number;
    payout_method: "Paystack";
    status:1|0
    updated_at: string;
    user: UserProfileType;
    user_id: string;

  };
}
