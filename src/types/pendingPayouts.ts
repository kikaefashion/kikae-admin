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
    created_at: string;
    user: UserProfileType;
    id: number;
    payout_method: "Paystack";
    updated_at: string;
    user_id: string;
  };
}
