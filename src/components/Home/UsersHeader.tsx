import React from "react";

type UsersHeaderProps = {
  totalUsersData: {
    totalLast3Months: number;
  };
  activeUserData: {
    totalLast3Months: number;
  };
};

const UsersHeader = ({ totalUsersData, activeUserData }: UsersHeaderProps) => {
  return (
    <div className="flex flex-row">
      <div className="bg-white rounded-3xl  w-60 py-6 px-6 items-center mr-6">
        <h4 className="text-black"> Total users</h4>
        <p className="text-black opacity-50">
          {totalUsersData.totalLast3Months}
        </p>
      </div>

      <div className="bg-white rounded-3xl  w-60 py-6 px-6 items-center mr-6">
        <h4 className="text-black"> Monthly active users</h4>
        <p className="text-black opacity-50">
          {activeUserData.totalLast3Months}
        </p>
      </div>
      <div className="bg-white rounded-3xl  w-60 py-6 px-6 items-center mr-6">
        <h4 className="text-black"> Total users</h4>
        <p className="text-black opacity-50">100,000</p>
      </div>
      <div className="bg-white rounded-3xl  w-60 py-6 px-6 items-center mr-6">
        <h4 className="text-black"> Total users</h4>
        <p className="text-black opacity-50">100,000</p>
      </div>
    </div>
  );
};

export default UsersHeader;
