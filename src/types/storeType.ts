export type singleStoreType = {
  active: "1" | "0";
  address: string;
  animation: string | null;
  background_image: string | null;
  balance: number;
  category: {
    created_at: string;
    description: string;
    id: number;
    name: string;
    updated_at: string;
  };
  category_id: number;
  created_at: string;
  description: string;
  email: string;
  hash: string;
  id: string;
  link: string | null;
  logo: string | null;
  name: string;
  phone: string;
  position: string | null;
  primary_media: string;
  product_category: {
    created_at: string;
    description: string;
    id: number;
    name: string;
    updated_at: string;
  };
  product_category_id: number;
  rating: number | null;
  sound: string | null;
  state: {
    created_at: string;
    id: number;
    name: string;
    updated_at: string;
  };
  state_id: number;

  subscriptions: { updated_at: string; plan: { id: number } }[]; // Adjust the type here based on the structure of subscriptions
  updated_at: string;
  user: {
    address: string;
    code: string | null;
    created_at: string;
    dob: string | null;
    email: string;
    email_verified_at: string | null;
    fname: string;
    //followings: any[]; // Adjust the type here based on the structure of followings
    id: number;
    isAdmin: boolean | null;
    isLogged: number;
    isVendor: boolean | null;
    lname: string;
    onames: string | null;
    password: string;
    phone: string;
    profilePic: string | null;
    provider: string | null;
    provider_id: string | null;
    remember_token: string | null;
    state_id: number | null;
    status: number;
    updated_at: string;
    usertype: object; // Adjust the type here based on the structure of usertype
    usertype_id: number;
  };
  user_id: number;
  // videos: any[];
  views: number;
  volume: number;
  website: string;
  isFreebie: boolean;
  freebieExpires?: number;
};
