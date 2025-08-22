import { productData } from "./ProductType";
import { UserProfileType } from "./types";

type Transaction = {
  id: number;
  transaction_id: string;
  tx_ref: string;
  status: string;
  amount: number;
  settled: number;
  address: string | null;
  pickup_address: string | null;
  delivery_address: string | null;
  created_at: string;
  updated_at: string;
  user: UserProfileType;
};

export type OrderItem = {
  id: number;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  area_id: number | null;
  approvedCustom: boolean;
  armors: string; // Replace `any` with a specific type if known
  available: string;
  available_id: number | null;
  biceps: string;
  bottom_length: string;
  chests: string;
  color: {
    //  created_at: "2025-08-07T13:43:54.000000Z";
    id: number;
    name: string;
    // product_id: "72";
    //  updated_at: "2025-08-07T13:43:54.000000Z";
    //  url: null;
    //   value: "#000000";
  };
  colour: string | null;
  created_at: string;
  delivery_address: string | null;
  drawing: string;
  fabric: string;
  isCustom: string;
  isStudio: string;
  latitude: number | null;
  longitude: number | null;
  length: number | null;
  location: string | null;
  logistic: string;
  logistic_id: number | null;
  neck: string;
  note: string | null;
  phone_number: string | null;
  price: number;
  product: productData;
  product_id: number;
  settled: number;
  shoulder: string;
  size: string;
  sizes: {
    size: string;
    id: number;
  };
  sleeve: string;
  status: orderStatus;
  thigh: string;
  transaction: Transaction;
  transaction_id: number;
  units: number;
  updated_at: string;
  waist_length: string;
};

export type orderStatus =
  | "order placed"
  | "ready for delivery"
  | "confirmed"
  | "dispatched"
  | "delivered";
