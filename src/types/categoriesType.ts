export type AllCategoriesTypes = {
  id: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  subcategories?: SubCategoryType[];
};

export type SubCategoryType = {
  id: number;
  name: string;
  description: string | null;
  product_category_id: number;
  created_at?: string;
  updated_at?: string;
  product_types?: ProductType[];
};

export type ProductType = {
  id: number;
  name: string;
  description: string | null;
  product_subcategory_id: number;
  created_at?: string;
  updated_at?: string;
};
