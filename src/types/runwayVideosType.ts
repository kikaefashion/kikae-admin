import { UserProfileType } from "./types";

export type Runway = {
  id: number;
  title: string;
  description: string;
  products:
    | {
        created_at: string;
        id: string;
        product_id: string;
        runway_id: string;
      }[]
    | null[];
  comments: RunwayComment[];

  store_id: string;
  url: string;
  created_at: string;
  updated_at: string;
};

export type RunwayComment = {
  parent_id: string | number;
  comment: string;
  id: number;
  user: UserProfileType;
  runway_id: string;
  user_id: string;
  updated_at: string;
};
