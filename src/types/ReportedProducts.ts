import { productData } from "./ProductType";
import { UserProfileType } from "./types";

export interface FlaggedProduct {
  data: {
    id: number;
    product: productData;
    message: string;
    created_at: string;
    user: UserProfileType;
  }[];
}
