/* export type ProductAnalytics = {
  totalSales: number;
    totalOrders: number;
    averageValuePerOrder: number;
    individualPurchases: {
        month: string;
        item: string;
        price: number;
    }[];
    totalBookings?: number; // Optional, for makeup type
    totalMakeupSales?: number; // Optional, for makeup type
    totalMakeupOrders?: number; // Optional, for makeup type
    averageMakeupValuePerOrder?: number; // Optional, for makeup type
    individualBookings?: {
        month: string;
        item: string;
        price: number;
    }[]; // Optional, for makeup type
}; */

export interface ProductAnalytics {
  product_id: number;
  product_name: string;
  total_views: number;
  total_orders: number;
  total_units_sold: string;
  total_revenue: string;
  average_order_value: number;
  total_returns: number;
  return_rate: number;
  total_refunded: number;
  unique_customers: number;
  latest_purchases: Purchase[];
}

interface Purchase {
  order_id: string;
  name: string;
  price: string;
  created_at: string;
  product_id: string;
  logistic_id: string | null;
  product: Product;
  //transaction: any[]; // Could be more specific if transaction structure is known
  //  color: any[]; // Could be more specific if color structure is known
  logistic: Logistic | null;
  address: {
    id: null;
  };
}

interface Product {
  id: number;
  old_price: string;
  price: string;
  name: string;
  status: string;
  description: string;
  units: string;
  category_id: string;
  store_id: string;
  product_category_id: string;
  state_id: null;
  bespoke: boolean;
  size: null;
  fabric: null;
  rating: null;
  isMakeup: string;
  offer: null;
  made_in_nigeria: boolean;
  thrift: null;
  created_at: string;
  updated_at: string;
  views: string;
  shop: Shop;
  media: Media[];
  product_category: Category;
  category: Category;
  colours: Colour[];
  //fabrics: any[]; // Could be more specific if fabric structure is known
  //drawings: any[]; // Could be more specific if drawing structure is known
  //ratings: ; // Could be more specific if rating structure is known
  //reviews: any[]; // Could be more specific if review structure is known
  likes: Like[];
  sizes: Size[];
  //  locations: any[]; // Could be more specific if location structure is known
  //coverages: any[]; // Could be more specific if coverage structure is known
}

interface Shop {
  id: string;
  hash: string;
  name: string;
  approved: string;
  active: string;
  email: string;
  address: string;
  phone: string;
  description: string;
  user_id: string;
  logo: null;
  primary_media: string;
  website: string;
  position: null;
  category_id: string;
  product_category_id: string;
  rating: null;
  background_image: null;
  sound: null;
  link: null;
  volume: string;
  views: number;
  animation: null;
  balance: string;
  isFreebie: boolean;
  freebieExpires: string;
  state_id: string;
  area: string;
  created_at: string;
  updated_at: string;
  user: User;
  category: Category;
  product_category: Category;
  subscriptions: Subscription[];
  videos: Video[];
  //  stories: any[]; // Could be more specific if story structure is known
  state: State;
  availability: Availability[];
}

interface User {
  id: number;
  fname: string;
  onames: null;
  lname: string;
  email: string;
  email_verification_code: null;
  is_email_verified: string;
  dob: null | string;
  phone: string;
  address: null;
  usertype_id: string;
  profilePic: null | string;
  isVendor: null;
  isAdmin: null;
  email_verified_at: null;
  password: string;
  code: null;
  isLogged: string;
  status: string;
  provider: null;
  provider_id: null;
  state_id: null;
  remember_token: null;
  created_at: string;
  updated_at: string;
  usertype: Usertype;
  //  followings: any[]; // Could be more specific if following structure is known
  addresses: Address[];
}

interface Usertype {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  store_id: string;
}

interface Address {
  id: number;
  fname: string;
  lname: string;
  phone: string;
  info: string;
  city: string;
  isDefault: string;
  user_id: string;
  state_id: string;
  address: string;
  created_at: string;
  updated_at: string;
  state: State;
}

interface State {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  possible_weight_in_kg?: string;
  created_at: string;
  updated_at: string;
}

interface Subscription {
  id: number;
  store_id: string;
  tx_ref: string;
  transaction_id: string;
  status: string;
  price: string;
  plan_id: string;
  created_at: string;
  updated_at: string;
  plan: Plan;
}

interface Plan {
  id: number;
  name: string;
  description: string;
  price: string;
  created_at: string;
  updated_at: string;
}

interface Video {
  id: number;
  store_id: string;
  url: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  products: VideoProduct[];
  comments: Comment[];
}

interface VideoProduct {
  id: number;
  runway_id: string;
  product_id: string;
  created_at: string;
  updated_at: string;
}

interface Comment {
  id: number;
  user_id: string;
  runway_id: string;
  parent_id: string;
  comment: string;
  created_at: string;
  updated_at: string;
  user: User;
}

interface Availability {
  id: number;
  store_id: string;
  product_id: string;
  dated: string;
  available: string;
  created_at: string;
  updated_at: string;
}

interface Media {
  id: number;
  url: string;
  title: null;
  description: null;
  product_id: string;
  created_at: string;
  updated_at: string;
}

interface Colour {
  id: number;
  product_id: string;
  name: string | null;
  value: string;
  url: null;
  created_at: string;
  updated_at: string;
}

interface Like {
  id: number;
  user_id: string;
  like: string;
  product_id: string;
  created_at: string;
  updated_at: string;
}

interface Size {
  id: number;
  product_id: string;
  size: string;
  created_at: string;
  updated_at: string;
}

interface Logistic {
  id: number;
  name: string;
  address: string;
  email: string;
  extra_weight_fee: string;
  extra_pickup_increment: string;
  phone: string;
  alt_phone: null;
  created_at: string | null;
  updated_at: string | null;
  destinations: Destination[];
}

interface Destination {
  id: number;
  logistic_id: string;
  state_id: string;
  area: string;
  cost: string;
  created_at: string;
  updated_at: string;
  extra_pickup_increment: string;
  state: State;
}
