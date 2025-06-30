import { AllCategoriesTypes } from "./categoriesType";
import { singleStoreType } from "./storeType";

export type productData = {
  ankle_width: string;
  arm_width: string;
  belly_length: string;
  bespoke: boolean;
  bottom_length: string;
  category_id: number;
  category: AllCategoriesTypes;
  colours: {
    id: number;
    name: string;
    product_id: number;
    url: string;
    value: string;
  }[];
  created_at: string;
  description: string;
  fabric: string;
  drawings: { id: number; title: string; product_id: number; url: string }[];
  id: number;
  isMakeup: "1" | "0";
  likes: [];
  locations: [];
  made_in_nigeria: boolean;
  media: { id: number; title: string; product_id: number; url: string }[];
  name: string;
  neck_length: string;
  note: string;
  old_price: number;
  price: number;
  product_category: AllCategoriesTypes;
  product_category_id: number;
  rating: number | null;
  ratings: {
    rating: number;
    user: {
      fname: string;
      lname: string;
      created_at: string;
    };
  }[];
  size: string;
  shop: singleStoreType;
  sizes: { id: number; size: string; product_id: number }[];
  store_id: string;
  thigh: string;
  thrift: boolean;
  top_height: string;
  units: number;
  updated_at: string;
  waist_length: string;
  offer: "home" | "studio" | "both";
  coverages: {
    area: string;
    fee: string;
  }[];
};
