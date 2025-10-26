import { UserProfileType } from "@/types/types";
import { OrderItem } from "@/types/UserOrdersTypes";

export interface TransactionDetails {
  transaction_id: string;
  tx_ref: string;
  amount_paid: number;
  product_total: number;
  logistic_fee: number;
  logistic_breakdown: LogisticBreakdown;
  orders: OrderItem[];
}

export interface LogisticBreakdown {
  base_fee: number;
  extra_pickup_fee: number;
  extra_weight_fee: number;
  extra_kg_charged: number;
  unique_vendor_locations: number;
  extra_pickup_increment_per_vendor: number;
  extra_weight_fee_per_kg: number;
}

export interface Subscription {
  id: number;
  store_id: string;
  tx_ref: string;
  transaction_id: string;
  status: string;
  price: number;
  plan_id: number;
  created_at: string;
  updated_at: string;
  plan: Plan;
}

export interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: number;
  tx_ref: string;
  transaction_id: string;
  status: string;
  amount: number;
  settled: number;
  delivery_address: string;
  pickup_address: string | null;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: UserProfileType;
  address: string | null;
}

export interface UserType {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  store_id: string;
}

export interface Address {
  id: number;
  fname: string;
  lname: string;
  phone: string;
  info: string;
  city: string;
  isDefault: number;
  user_id: number;
  state_id: number;
  address: string;
  created_at: string;
  updated_at: string;
  state: State;
}

export interface State {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Like {
  id: number;
  user_id: number;
  like: number;
  product_id: number;
  created_at: string;
  updated_at: string;
}

export interface ProductSize {
  id: number;
  product_id: number;
  size: string;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  product_id: number;
  created_at: string;
  updated_at: string;
}

export type Logistics_sale_response_type = {
  success: boolean;
  transactions: TransactionDetails[];
  total_logistic_fee: number;
};
