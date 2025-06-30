import { PayoutType } from "@/types/payoutType";

import { TransactionFeeType } from "@/types/trasactionFeeType";

import { OrderItem } from "@/types/UserOrdersTypes";
import { StateCreator } from "zustand";

export type OrdersState = {
  pendingPayouts: PayoutType[];
  availablePayouts: PayoutType[];
  transactionFees: TransactionFeeType[];
  refundsIssued: number;
  totalSales: OrderItem[];
};

export type OrdersAction = {
  setPendingPayouts: (pendingPayouts: PayoutType[]) => void;
  setAvailablePayouts: (availablePayouts: PayoutType[]) => void;
  setTransactionFees: (transactionFees: TransactionFeeType[]) => void;
  setRefundsIssued: (refundsIssued: number) => void;
  setTotalSales: (totalSales: OrderItem[]) => void;
};

const initialState: OrdersState = {
  pendingPayouts: [],
  availablePayouts: [],
  transactionFees: [],
  refundsIssued: 0,
  totalSales: [],
};

export const createOrdersSlice: StateCreator<OrdersState & OrdersAction> = (
  set
) => ({
  ...initialState,
  setPendingPayouts: (pendingPayouts) => set({ pendingPayouts }),
  setAvailablePayouts: (availablePayouts) => set({ availablePayouts }),
  setTransactionFees: (transactionFees) => set({ transactionFees }),
  setRefundsIssued: (refundsIssued) => set({ refundsIssued }),
  setTotalSales: (totalSales) => set({ totalSales }),
});
