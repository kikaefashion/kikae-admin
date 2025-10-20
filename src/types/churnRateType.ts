import { UserProfileType } from "./types";

export interface ChurnUserResponse {
  filter: string; // e.g. "last_30_days"
  type: string; // e.g. "users"
  per_page: number;
  churnRate: number;
  total: number;
  data: PaginatedUsers;
}

export interface PaginatedUsers {
  current_page: number;
  data: UserProfileType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url?: string | null;
  path: string;
  per_page: number;
  prev_page_url?: string | null;
  to: number;
  total: number;
}

/* export interface Following {
  id: number;
  store_id: string;
  user_id: number;
  created_at: string;
  updated_at: string;
} */

/* export interface Address {
  id: number;
  fname: string;
  lname: string;
  phone: string;
  info: string;
  city: string;
  isDefault: number;
  user_id: number;
  state_id: number;
  address: string;
  created_at: string;
  updated_at: string;
  state: State;
} */

/* export interface State {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
 */
