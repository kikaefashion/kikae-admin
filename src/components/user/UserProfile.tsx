import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import MyModal from "../Modal/Modal";
import Details from "./Details";
import { ArrowBack } from "@/assets/ArrowBack";
import Link from "next/link";
import { UserProfileType } from "@/types/types";
import DeleteUserModal from "./DeleteUserModal";

const UserProfile = ({
  //  user,
  userDetails,
}: {
  // user: any;
  userDetails: UserProfileType;
}) => {
  const router = useRouter();
  const [isDeleteUserModalVisible, setIsDeleteUserModalVisible] =
    useState(false);
  const search = useSearchParams().get("details");

  const user = {
    firstName: "Henry",
    lastName: "Richard",
    email: "henrich@gmail.com",
    phoneNumber: "Gend",
    creationDate: "20-Oct-24",
    gender: "Male",
    details: [
      {
        label: "Address book",
        count: userDetails.addresses.length,
        link: "View all addresses",
        hrefLink: "addresses",
      },
      {
        label: "Orders",
        count: 12,
        link: "View all orders",
        hrefLink: "orders",
      },
      {
        label: "Following",
        count: userDetails.followings.length,
        link: "View all following",
        hrefLink: "following",
      },
      {
        label: "Ongoing delivery",
        count: 4,
        link: "View all ongoing delivery",
        hrefLink: "delivery",
      },
      {
        label: "Reviews & comments",
        count: 4,
        link: "View all reviews & comments",
        hrefLink: "comments",
      },
      { label: "Cart", count: 10, link: "View all", hrefLink: "cart" },
    ],
  };

  return (
    <div className="pr-6">
      <MyModal
        isVisible={
          search == "following" ||
          search == "addresses" ||
          search == "orders" ||
          search == "delivery" ||
          search == "comments" ||
          search == "cart"
        }
        close={() => router.back()}
      >
        <Details />
      </MyModal>
      <div className="flex  items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => router.back()}
            className="w-12 h-12 p-3 bg-white rounded-3xl border border-black/25 justify-center items-center inline-flex"
          >
            <ArrowBack />
          </button>
          <h4 className="text-black text-2xl font-bold font-['Raleway'] leading-9">
            User details
          </h4>

          <button
            onClick={() => {
              // router.push(`/dashboard/users/audit_trail/${params.id}`);
            }}
            className="py-1 px-6 bg-white rounded-2xl border border-black/25 justify-center items-center inline-flex"
          >
            <div className="justify-start items-center gap-2 flex">
              <div className="text-kikaeBlue text-base font-normal font-['DM Sans']">
                View audit trail
              </div>
            </div>
          </button>
        </div>

        <div className=" flex-col justify-center items-end gap-6 inline-flex">
          <div className="text-kikaeBlue text-base font-normal font-['DM Sans'] leading-[30px]">
            Actions
          </div>
          <div className="justify-start items-start gap-6 inline-flex">
            {/*  <button className="text-black text-base font-normal font-['DM Sans'] underline leading-[30px] z-10">
              Chat
            </button> */}

            <button
              // disabled={isLoading}

              className="text-[#979797] text-base font-normal font-['DM Sans'] underline leading-[30px]"
              onClick={() => setIsDeleteUserModalVisible(true)}
            >
              {"Delete"}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-3xl shadow-lg bg-white">
        <div className="grid grid-cols-6 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-semibold text-blue-600">First Name</p>
            <p>{userDetails.fname}</p>
          </div>
          <div>
            <p className="font-semibold text-blue-600">Last Name</p>
            <p>{userDetails.lname}</p>
          </div>
          <div>
            <p className="font-semibold text-blue-600">Email</p>
            <p className="font-medium">{userDetails.email}</p>
          </div>
          <div>
            <p className="font-semibold text-blue-600">Phone number</p>
            <p>{userDetails.phone}</p>
          </div>
          <div>
            <p className="font-semibold text-blue-600">Creation date</p>
            <p>{"oct-20-22"}</p>
          </div>
          <div>
            <p className="font-semibold text-blue-600">Gender</p>
            <p>{user.gender}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-6 gap-4 text-sm">
          {user.details.map((item, index: number) => (
            <div key={index} className="text-left">
              <p className="font-semibold text-blue-600">
                {item.label}{" "}
                <span className="text-gray-500">({item.count})</span>
              </p>
              <Link
                href={`?details=${item.hrefLink}`}
                className="text-black hover:text-kikaeBlue underline cursor-pointer"
              >
                {item.hrefLink}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <MyModal
        isVisible={isDeleteUserModalVisible}
        close={() => setIsDeleteUserModalVisible(false)}
      >
        <DeleteUserModal
          storeId={userDetails.id}
          setIsVisible={setIsDeleteUserModalVisible}
        />
      </MyModal>
    </div>
  );
};

export default UserProfile;
