"use client";
import React from "react";
//import { users } from "@/app/data"; // Importing dummy data
import { useRouter, useSearchParams } from "next/navigation";
import { useBoundStore } from "@/store/store";
import { mediaUrlPrefix } from "@/networking/apiUrl";

const Users = () => {
  const router = useRouter();

  const type = useSearchParams().get("type");

  const users = useBoundStore((state) => state.allUsers);

  //const page = useSearchParams().get("page");

  const goToUserPage = (id: string) => {
    router.push(`/dashboard/users/${id}`);
  };
  console.log({ type });
  return (
    <div className="pt-6 pr-6">
      <div className="p-4 shadow-lg rounded-3xl text-black ">
        <table className="w-full">
          <thead className="text-kikaeBlue">
            <tr className=" text-left">
              <th className="p-3">First Name</th>
              <th className="p-3">Last Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone Number</th>
              <th className="p-3">Profile Picture</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td
                    onClick={() => goToUserPage(user.id)}
                    className="p-3 underline cursor-pointer"
                  >
                    {user.fname}
                  </td>
                  <td className="p-3">{user.lname}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3">
                    <img
                      src={mediaUrlPrefix + user?.profilePic}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  </td>
                  <td className="p-3">
                    <button className="text-red-600 hover:underline">
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
