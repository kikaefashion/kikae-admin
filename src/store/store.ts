import { create } from "zustand";

import { ChartActions, ChartState, createChartSlice } from "./slice/chartSlice";
import { createUsersSlice, UsersAction, UsersState } from "./slice/usersSlice";
import { createModalSlice, ModalAction, ModalState } from "./slice/modalSlice";
import {
  createOrdersSlice,
  OrdersAction,
  OrdersState,
} from "./slice/ordersSlice";
import { RunwayAction, RunwaySlice, RunwayState } from "./slice/runwaySlice";
import {
  CreateOverviewSlice,
  OverviewActions,
  OverviewState,
} from "./slice/overviewSlice";
import {
  CreateLogisticSlice,
  LogisticActions,
  LogisticState,
} from "./slice/logisticSlice";

type StoreState = ChartState &
  UsersState &
  ModalState &
  OrdersState &
  RunwayState &
  OverviewState &
  LogisticState;
type StoreActions = ChartActions &
  UsersAction &
  ModalAction &
  OrdersAction &
  RunwayAction &
  OverviewActions &
  LogisticActions;

export const useBoundStore = create<StoreState & StoreActions>((...a) => ({
  ...createChartSlice(...a),
  ...createUsersSlice(...a),
  ...createModalSlice(...a),
  ...createOrdersSlice(...a),
  ...RunwaySlice(...a),
  ...CreateOverviewSlice(...a),
  ...CreateLogisticSlice(...a),
}));
