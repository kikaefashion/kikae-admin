"use client";

import MyModal from "@/components/Modal/Modal";
import { getCurrentAdmin } from "@/networking/endpoints/getCurrentAdmin";
import { AdminProfileType } from "@/types/types";
import Link from "next/link";
import DeleteAdminModal from "@/components/Admin/DeleteAdminModal";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/logout";

/* const admin = {
  firstName: "Henry",
  lastName: "Richard",
  email: "henrich@gmail.com",
  role: "Super admin",
};
 */
const Admin_Profile = () => {
  const router = useRouter();
  const [admin, SetAdmin] = useState<AdminProfileType>();
  const [isDeleteAdminModalVisible, setIsDeleteAdminModalVisible] =
    useState(false);

  const [adminId, setAdminId] = useState<string | undefined>("");
  const handleGetCurrentAdmin = async () => {
    const result = await getCurrentAdmin();

    SetAdmin(result.data);
  };

  useEffect(() => {
    handleGetCurrentAdmin();
  }, []);

  const openModal = (id: string | undefined) => {
    setAdminId(id);
    setIsDeleteAdminModalVisible(true);
  };
  const closeModal = () => {
    setAdminId("");
    setIsDeleteAdminModalVisible(false);
  };
  const handleLogout = () => {
    logout();
    router.replace("/");
  };
  return (
    <>
      <div className="h-[190px] p-12 bg-white rounded-3xl border border-black/25 justify-start items-start gap-16 inline-flex my-6">
        <div className="flex-col justify-start items-start gap-[38px] inline-flex">
          <div className="self-stretch text-kikaeBlue text-base font-normal font-['DM Sans'] leading-[30px]">
            Name
          </div>
          <div className="self-stretch text-black text-base font-normal font-['DM Sans'] leading-[30px]">
            {admin?.name}
          </div>
        </div>
        {/*    <div className="flex-col justify-start items-start gap-[38px] inline-flex">
          <div className="self-stretch text-kikaeBlue text-base font-normal font-['DM Sans'] leading-[30px]">
            Last Name
          </div>
          <div className="self-stretch text-black text-base font-normal font-['DM Sans'] leading-[30px]">
            {admin?.name}
          </div>
        </div> */}
        <div className="flex-col justify-start items-start gap-[38px] inline-flex">
          <div className="self-stretch text-kikaeBlue text-base font-normal font-['DM Sans'] leading-[30px]">
            Email
          </div>
          <div className="text-black text-base font-normal font-['DM Sans'] leading-[30px]">
            {admin?.email}
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-[38px] inline-flex">
          <div className="self-stretch text-kikaeBlue text-base font-normal font-['DM Sans'] leading-[30px]">
            Role
          </div>
          <div className="text-black text-base font-normal font-['DM Sans'] leading-[30px]">
            {admin?.admin_role}
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-[38px] inline-flex">
          <div className="text-kikaeBlue text-base font-normal font-['DM Sans'] leading-[30px]">
            Actions
          </div>
          <div className="justify-start items-start gap-6 inline-flex">
            <Link
              href={`/dashboard/admin/edit/${admin?.id}`}
              className="text-black text-base font-bold font-['DM Sans'] underline leading-[30px]"
            >
              Edit
            </Link>
            <button
              onClick={() => openModal(admin?.id)}
              className="text-[#979797] text-base font-bold font-['DM Sans'] underline leading-[30px]"
            >
              Delete
            </button>
          </div>
        </div>
        {adminId && (
          <MyModal close={closeModal} isVisible={isDeleteAdminModalVisible}>
            <DeleteAdminModal
              id={adminId}
              setIsVisible={setIsDeleteAdminModalVisible}
              handleGetAllAdmins={() => {
                handleLogout();
              }}
            />
          </MyModal>
        )}
      </div>
    </>
  );
};

export default Admin_Profile;
