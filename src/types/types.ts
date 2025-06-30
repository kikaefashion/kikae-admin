export type userAddress = {
  user_id: string;
  state_id: string;
  address: string;
  id: string;
  isDefault: boolean | 1 | 0;
  fname: string;
  lname: string;
  phone: string;
};

export type UserProfileType = {
  address: string | null;
  dob: string | null;
  email: string;
  fname: string;
  followings: { store_id: string }[];
  id: string;
  isVendor: boolean | null;
  lname: string;
  oname: string | null;
  phone: string;
  profilePic: string | null;
  addresses: userAddress[];
  usertype: {
    name: "Vendor" | "Customer";
    description: string;
  };
};

export type reportedUsers = {
  reportId: string;
  reportedUserId: string;
  reportedUserName: string;
  reportingUserId: string;
  reportingUserName: string;
  reportDate: string;
  reason: string;
};

export type AdminProfileType = {
  access: "ADMIN" | "SUPER_ADMIN";
  defaultPassword: null | string;
  email: string;
  firstname: string;
  id: string;
  isBlocked: boolean;
  lastname: string;
};

export type userAuditTrail = {
  userId: string;
  date: string;
  email: string;
  photos: string[];
  school: string;
  schoolEmail: string;
};
