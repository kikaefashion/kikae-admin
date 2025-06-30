import { productData } from "./ProductType";

export type cartType = {
  id: number;
  product_id: number;
  units: number;
  user_id: number;
  color_id: string;
  size_id: number;
  created_at: string;
  updated_at: string;
  product: productData;
  isCustom: "1" | "0";
  armors: string;
  biceps: string;
  length: string;
  sleeve: string;
  shoulder: string;
  neck: string;
  chests: string;
};
