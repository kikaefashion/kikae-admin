import { Runway } from "@/types/runwayVideosType";

import { StateCreator } from "zustand";

export type RunwayState = {
  allRunwayVideos: Runway[];
};

export type RunwayAction = {
  setAllRunwaVideos: (allRunwayVideos: Runway[]) => void;
};

const initialState: RunwayState = {
  allRunwayVideos: [],
};

export const RunwaySlice: StateCreator<RunwayState & RunwayAction> = (set) => ({
  ...initialState,
  setAllRunwaVideos: (allRunwayVideos) => set({ allRunwayVideos }),
});
