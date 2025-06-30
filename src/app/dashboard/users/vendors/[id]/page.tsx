"use client";

import Image from "next/image";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import { Arrow } from "@/assets/Arrow";
import { Suspense, useEffect, useState } from "react";

import { getStore } from "@/networking/endpoints/vendors/getStore";
import { mediaUrlPrefix } from "@/networking/apiUrl";
import StoreContent from "@/components/Vendor/StoreContent";
import { useBoundStore } from "@/store/store";
import MyModal from "@/components/Modal/Modal";
import DeleteVendorModal from "@/components/Vendor/Modal/DeleteVendorModal";

const tabs = ["products", "runway", "dashboard", "bank details", "orders"];

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VendorStore />
    </Suspense>
  );
};

function VendorStore() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const page = useSearchParams().get("page");

  const store = useBoundStore((state) => state.vendorDetails);
  const setStore = useBoundStore((state) => state.setVendorDetails);
  const [isDeleteVendorModalVisible, setIsDeleteVendorModalVisible] =
    useState(false);

  useEffect(() => {
    const handleGetStore = async () => {
      const result = await getStore(params.id);

      if (result) {
        setStore(result.data);
      }
    };

    handleGetStore();
  }, [params.id, setStore]);

  if (!store) {
    return (
      <div>
        <h4>Failed to get Store details</h4>
      </div>
    );
  }

  return (
    <div className="text-black p-4">
      {/* Profile Header */}

      <div className="flex  items-center justify-between pr-6">
        <div className="flex items-center gap-6">
          <button
            onClick={() => router.back()}
            className=" p-3 bg-white rounded-3xl border border-black/25 justify-center items-center flex"
          >
            <Arrow />
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
              onClick={() => setIsDeleteVendorModalVisible(true)}
              className="text-[#979797] text-base font-normal font-['DM Sans'] underline leading-[30px]"
            >
              {"Delete"}
            </button>
          </div>
        </div>
      </div>
      {/* Profile Image and Details */}
      <div className="flex flex-col gap-10">
        <div className="relative">
          <Image
            src={mediaUrlPrefix + store.primary_media}
            alt="Profile"
            width={764} // Required
            height={225} // Required
            //   width={764}
            // height={226}
            // style={{ borderRadius: "50%" }}
            style={{
              width: 764,
              height: 225,
            }}
            className="rounded-3xl"
          />
          <Image
            src={mediaUrlPrefix + store.primary_media}
            alt="Profile"
            width={135}
            height={135}
            style={{ borderRadius: "50%", width: 135, height: 135 }}
            className="rounded-full absolute top-32 left-4 border-4 border-white"
          />
        </div>

        <div className="">
          <h1 className="text-xl font-bold">{store.name}</h1>
          <p className="text-sm text-gray-600">⭐ 4.9 (300)</p>
          <p className="text-gray-500">{store.description}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mt-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm rounded-3xl capitalize ${
              page === tab
                ? "bg-kikaeBlue text-white"
                : "bg-white text-kikaeGrey"
            }`}
            onClick={() =>
              router.replace(
                `/dashboard/users/vendors/${params.id}?page=${tab}`
              )
            }
          >
            {tab}
          </button>
        ))}
      </div>

      <StoreContent />
      <MyModal
        close={() => setIsDeleteVendorModalVisible(false)}
        isVisible={isDeleteVendorModalVisible}
      >
        <DeleteVendorModal
          setIsVisible={() => setIsDeleteVendorModalVisible(false)}
          storeId={params.id}
        />
      </MyModal>
    </div>
  );
}
export default Page;
