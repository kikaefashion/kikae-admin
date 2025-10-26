import { TransactionDetails } from "@/types/logisticMetricType";
import { StateCreator } from "zustand";

export type LogisticState = {
  selectedTransaction: TransactionDetails | null;
  searchTransactionIdDropdown: boolean;
  searchTransactionId: string;
};

export type LogisticActions = {
  setSelectedTransaction: (
    selectedTransaction: TransactionDetails | null
  ) => void;
  setSearchTransactionIdDropdown: (
    searchTransactionIdDropdown: boolean
  ) => void;
  setSearchTransactionId: (searchTransactionId: string) => void;
};
const initialState: LogisticState = {
  selectedTransaction: null,
  searchTransactionIdDropdown: false,
  searchTransactionId: "",
};

export const CreateLogisticSlice: StateCreator<
  LogisticState & LogisticActions
> = (set) => ({
  ...initialState,

  setSelectedTransaction: (selectedTransaction) => set({ selectedTransaction }),
  setSearchTransactionIdDropdown: (searchTransactionIdDropdown) =>
    set({ searchTransactionIdDropdown }),
  setSearchTransactionId: (searchTransactionId) => set({ searchTransactionId }),
});
