import { cartType } from "@/types/cartType";
import { singleStoreType } from "@/types/storeType";
import { UserProfileType } from "@/types/types";
import { OrderItem } from "@/types/UserOrdersTypes";
import { StateCreator } from "zustand";

export type UsersState = {
  allUsers: UserProfileType[];
  deactivatedUsers: UserProfileType[];
  userDetails: UserProfileType | null;
  userOrders: OrderItem[] | [];
  userCart: cartType[];
  vendors: singleStoreType[];
  approvedVendors: singleStoreType[];
  pendingVendors: singleStoreType[];
  unapprovedVendors: singleStoreType[];
  vendorDetails: singleStoreType | null;
};

export type UsersAction = {
  setAllUsers: (users: UserProfileType[]) => void;
  setDeactivatedUsers: (users: UserProfileType[]) => void;
  setUserDetails: (userDetails: UserProfileType | null) => void;
  setUserOrders: (userOrders: OrderItem[] | []) => void;
  setUserCart: (userCart: cartType[] | []) => void;
  setVendors: (vendors: singleStoreType[] | []) => void;
  setApprovedVendors: (approvedVendors: singleStoreType[] | []) => void;
  setPendingVendors: (pendingVendors: singleStoreType[] | []) => void;
  setUnapprovedVendors: (unapprovedVendors: singleStoreType[] | []) => void;
  setVendorDetails: (vendorDetails: singleStoreType | null) => void;
};

const initialState: UsersState = {
  allUsers: [],
  deactivatedUsers: [],
  userDetails: null,
  userOrders: [],
  userCart: [],
  vendors: [],
  approvedVendors: [],
  unapprovedVendors: [],
  pendingVendors: [],
  vendorDetails: null,
};

export const createUsersSlice: StateCreator<UsersState & UsersAction> = (
  set
) => ({
  ...initialState,
  setAllUsers: (users) => set({ allUsers: users }),
  setDeactivatedUsers: (users) => set({ deactivatedUsers: users }),
  setUserDetails: (userDetails) => set({ userDetails }),
  setUserOrders: (userOrders) => set({ userOrders }),
  setUserCart: (userCart) => set({ userCart }),
  setVendors: (vendors) => set({ vendors }),
  setApprovedVendors: (approvedVendors) => set({ approvedVendors }),
  setPendingVendors: (pendingVendors) => set({ pendingVendors }),
  setUnapprovedVendors: (unapprovedVendors) => set({ unapprovedVendors }),
  setVendorDetails: (vendorDetails) => set({ vendorDetails }),
});
