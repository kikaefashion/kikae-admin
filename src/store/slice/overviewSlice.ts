import { ChurnUserResponse } from "@/types/churnRateType";
import { StateCreator } from "zustand";

export type OverviewState = {
  churnRate: ChurnUserResponse | null;
  searchPageNumber: string;
};

export type OverviewActions = {
  setChurnRate: (churRate: ChurnUserResponse | null) => void;
  setSearchPageNumber: (pageNumber: string) => void;
};

const initialState: OverviewState = {
  churnRate: null,
  searchPageNumber: "",
};

export const CreateOverviewSlice: StateCreator<
  OverviewState & OverviewActions
> = (set) => ({
  ...initialState,

  setChurnRate: (churnRate) => set({ churnRate }),
  setSearchPageNumber: (searchPageNumber) => set({ searchPageNumber }),
});
