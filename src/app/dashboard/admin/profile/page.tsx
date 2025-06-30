"use client";

import Link from "next/link";

import React from "react";

const admin = {
  firstName: "Henry",
  lastName: "Richard",
  email: "henrich@gmail.com",
  role: "Super admin",
};

const Admin_Profile = () => {
  return (
    <>
      <div className="h-[190px] p-12 bg-white rounded-3xl border border-black/25 justify-start items-start gap-16 inline-flex my-6">
        <div className="flex-col justify-start items-start gap-[38px] inline-flex">
          <div className="self-stretch text-kikaeBlue text-base font-normal font-['DM Sans'] leading-[30px]">
            First Name
          </div>
          <div className="self-stretch text-black text-base font-normal font-['DM Sans'] leading-[30px]">
            {admin?.firstName}
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-[38px] inline-flex">
          <div className="self-stretch text-kikaeBlue text-base font-normal font-['DM Sans'] leading-[30px]">
            Last Name
          </div>
          <div className="self-stretch text-black text-base font-normal font-['DM Sans'] leading-[30px]">
            {admin.lastName}
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-[38px] inline-flex">
          <div className="self-stretch text-kikaeBlue text-base font-normal font-['DM Sans'] leading-[30px]">
            Email
          </div>
          <div className="text-black text-base font-normal font-['DM Sans'] leading-[30px]">
            {admin.email}
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-[38px] inline-flex">
          <div className="self-stretch text-kikaeBlue text-base font-normal font-['DM Sans'] leading-[30px]">
            Role
          </div>
          <div className="text-black text-base font-normal font-['DM Sans'] leading-[30px]">
            {admin.role}
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-[38px] inline-flex">
          <div className="text-kikaeBlue text-base font-normal font-['DM Sans'] leading-[30px]">
            Actions
          </div>
          <div className="justify-start items-start gap-6 inline-flex">
            <Link
              href={"/dashboard/admin/edit"}
              className="text-black text-base font-bold font-['DM Sans'] underline leading-[30px]"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_Profile;
