import { OrderItem } from "./UserOrdersTypes";

interface ReturnLog {
  id: number;
  return_request_id: number; // The ID of the return request this log belongs to
  status: string; // e.g. "admin_review", "approved", etc.
  message: string; // The log note or reason for status change
  created_at: string; // ISO datetime, e.g. "2025-08-19T00:45:24.000000Z"
  updated_at: string; // ISO datetime
  user_id?: number | null; // Optional: if logs track which admin/user made the update
  actor?: string | null; // Optional: e.g. "customer", "vendor", "admin"
}

export interface ReturnRequest {
  data: {
    id: number;
    approved_at: string | null;
    completed_at: string | null;
    created_at: string;
    images: string[];
    initiated_at: string;
    logistic_id: string | number | null;
    logs: ReturnLog[]; // ⬅️ Uses the defined ReturnLog type
    order: OrderItem;
    order_id: string;
    ran: string;
    reason: string;
    refund_amount: string | null;
    refund_method: "wallet" | "bank" | string;
    return_shipping_cost: string;
    shipping_payer: "customer" | "vendor" | string;
    status:
      | "admin_review"
      | "pending"
      | "approved"
      | "rejected"
      | "completed"
      | string;
    tracking_number: string | null;
    updated_at: string;
    vendor_inspected_at: string | null;
  }[];
}
