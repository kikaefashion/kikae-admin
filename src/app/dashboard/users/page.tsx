"use client";
import React, { Suspense, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import Users from "@/components/user/Users";
import { getUsers } from "@/networking/endpoints/getUsers";
import { useBoundStore } from "@/store/store";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserTable />
    </Suspense>
  );
};

const UserTable = () => {
  const router = useRouter();
  // const users = useBoundStore((state) => state.allUsers);
  const setUsers = useBoundStore((state) => state.setAllUsers);

  const type = useSearchParams().get("type");


  useEffect(() => {
    const handleGetUsers = async () => {
      const result = await getUsers();
      if (!result) return;

      setUsers(result.users);
    };

    handleGetUsers();
  }, [setUsers]);

  return (
    <div className="pt-6 pr-6">
      <div className="flex flex-row items-center items-center justify-between mb-6">
        <div className="w-[36.68rem]   flex justify-between items-center bg-white rounded-3xl border border-black/25">
          <input
            placeholder="search for a user"
            type="text"
            className="w-11/12 py-1.5 rounded-3xl px-6 text-black text-base font-normal font-['DM Sans'] leading-[30px] border-none"
          />
          <button className="px-6">search</button>
        </div>

    
       
      </div>
      <Users />
    </div>
  );
};

export default Page;
