import { ChurnUserResponse } from "@/types/churnRateType";
import { StateCreator } from "zustand";

export type OverviewState = {
  churnRate: ChurnUserResponse | null;
};

export type OverviewActions = {
  setChurnRate: (churRate: ChurnUserResponse | null) => void;
};

const initialState: OverviewState = {
  churnRate: null,
};

export const CreateOverviewSlice: StateCreator<
  OverviewState & OverviewActions
> = (set) => ({
  ...initialState,

  setChurnRate: (churnRate) => set({ churnRate }),
});
