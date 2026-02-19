import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeStatus(value:string) {
  return value.toLowerCase().replace(/[\s-]+/g, "_");
}

export const ORDER_STATUS = {
  ORDER_PLACED: "order_placed",
  READY_FOR_DELIVERY: "ready_for_delivery",
  DISPATCHED: "dispatched",
  DELIVERED: "delivered",
  SETTLED: "settled",
} as const;

export const SERVICE_STATUS = {
  SERVICE_BOOKED: "service_booked",
  SERVICE_PENDING: "service_pending",
  SETTLED: "settled",
} as const;
