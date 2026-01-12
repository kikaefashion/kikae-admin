export type CouponType = {
  id: number;
  name: string;
  info: string | null;
  code: string;
  type: "amount" | "percentage";
  value: number;
  min_price_rule: number | null;
  max_price_rule: number | null;
  applied_to: string;
  usage_days: number | null;
  users_count: number | null;
  max_users: number | null;
  expiry_date: string | null;
  created_at: string;
  updated_at: string;
  allow_multiple: number; // 0 or 1
};

export type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

export type CouponsPagination = {
  current_page: number;
  data: CouponType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type CouponsResponse = {
  success: boolean;
  coupons: CouponsPagination;
};
