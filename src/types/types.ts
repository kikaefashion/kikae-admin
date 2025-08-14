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

  created_at: string;
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
  role: "";
  //  defaultPassword: string;
  email: string;

  id: string;
  //  isBlocked: boolean;
  name: string;
};

export type userAuditTrail = {
  userId: string;
  date: string;
  email: string;
  photos: string[];
  school: string;
  schoolEmail: string;
};
