"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllAdmin } from "@/networking/endpoints/getAllAdmin";
import MyModal from "@/components/Modal/Modal";
import DeleteAdminModal from "@/components/Admin/DeleteAdminModal";

/* const admins = [
  {
    firstName: "Henry",
    lastName: "Richard",
    email: "henrich@gmail.com",
    role: "Super admin",
  },
]; */

const Page = () => {
  const router = useRouter();
  const [admins, setAdmins] = useState<
    {
      id: string;
      name: string;
      email: string;
      admin_role: string;
    }[]
  >([]);
  const [isDeleteAdminModalVisible, setIsDeleteAdminModalVisible] =
    useState(false);

  const [adminId, setAdminId] = useState("");

  useEffect(() => {
    const handleGetAllAdmins = async () => {
      const adminResult = await getAllAdmin();

      setAdmins(adminResult.admins);
    };

    handleGetAllAdmins();
  }, []);

  const closeModal = () => {
    setAdminId("");
    setIsDeleteAdminModalVisible(false);
  };

  const openModal = (id: string) => {
    setAdminId(id);
    setIsDeleteAdminModalVisible(true);
  };

  return (
    <div className="h-[352px] p-12 bg-white rounded-3xl border border-black/25 justify-start items-start gap-16 inline-flex overflow-y-auto mt-6">
      <div className="flex-col justify-start items-start gap-[38px] inline-flex">
        <div className="self-stretch text-kikaeBlue text-base font-normal font-['DM Sans'] leading-[30px]">
          Name
        </div>

        {admins?.map((item, index) => {
          return (
            <div
              key={index}
              className="self-stretch text-black text-base font-normal font-['DM Sans'] leading-[30px]"
            >
              {item.name}
            </div>
          );
        })}
      </div>
      <div className="flex-col justify-start items-start gap-[38px] inline-flex">
        <div className="self-stretch text-kikaeBlue text-base font-normal font-['DM Sans'] leading-[30px]">
          Role
        </div>

        {admins?.map((item, index: number) => {
          return (
            <div
              key={index}
              className="self-stretch text-black text-base font-normal font-['DM Sans'] leading-[30px]"
            >
              {item.admin_role}
            </div>
          );
        })}
      </div>
      <div className="flex-col justify-start items-start gap-[38px] inline-flex">
        <div className="self-stretch text-kikaeBlue text-base font-normal font-['DM Sans'] leading-[30px]">
          Email
        </div>

        {admins?.map((item, index: number) => {
          return (
            <div
              key={index}
              className="self-stretch text-black text-base font-normal font-['DM Sans'] leading-[30px]"
            >
              {item.email}
            </div>
          );
        })}
      </div>
      {/*  <div className="flex-col justify-start items-start gap-[38px] inline-flex">
        <div className="self-stretch text-kikaeBlue text-base font-normal font-['DM Sans'] leading-[30px]">
          Password
        </div>

        {admins?.map((_item, index: number) => {
          return (
            <div
              key={index}
              className="text-black text-base font-normal font-['DM Sans'] leading-[30px]"
            >
              •••••••••••••••••
            </div>
          );
        })}
      </div> */}
      <div className="flex-col justify-start items-start gap-[38px] inline-flex">
        <div className="text-kikaeBlue text-base font-normal font-['DM Sans'] leading-[30px]">
          Actions
        </div>

        {admins?.map((_item, index: number) => {
          return (
            <div
              key={index}
              className="justify-start items-start gap-6 inline-flex"
            >
              <button
                onClick={() => router.push(`/dashboard/admin/edit/${_item.id}`)}
                className="text-black text-base font-bold font-['DM Sans'] underline leading-[30px]"
              >
                Edit
              </button>
              <button
                onClick={() => openModal(_item.id)}
                className="text-[#979797] text-base font-bold font-['DM Sans'] underline leading-[30px]"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>

      <MyModal close={closeModal} isVisible={isDeleteAdminModalVisible}>
        <DeleteAdminModal
          id={adminId}
          setIsVisible={setIsDeleteAdminModalVisible}
        />
      </MyModal>
    </div>
  );
};

export default Page;
