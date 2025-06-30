"use client";

import { getStores } from "@/networking/endpoints/vendors/getAllStores";
import { reactivateVendor } from "@/networking/endpoints/vendors/reactivateVendor";
import { singleStoreType } from "@/types/storeType";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const DeactivatedUsers = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
};

const Page = () => {
  const router = useRouter();
  const [vendors, setVendors] = useState<singleStoreType[]>([]);

  const goToVendorPage = (id: string) => {
    router.push(`/dashboard/users/vendors/${id}?page=products`);
  };

  // const type = useSearchParams().get("type");

  //const page = useSearchParams().get("page");

  useEffect(() => {
    const handleGetVendors = async () => {
      const vendorStores = await getStores();
      setVendors(vendorStores.data);
    };

    handleGetVendors();
  }, []);

  const deactivatedVendors = vendors.filter((item) => item.active !== "1");
  return (
    <div className="p-6 min-h-screen text-black">
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone number</th>
              <th className="px-6 py-3">Website</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deactivatedVendors?.length !== 0 &&
              deactivatedVendors.map((biz, index) => (
                <tr key={index}>
                  <td
                    onClick={() => goToVendorPage(biz.id)}
                    className="px-6 py-4 underline cursor-pointer"
                  >
                    {biz.name}
                  </td>
                  <td className="px-6 py-4 ">{biz.email}</td>
                  <td className="px-6 py-4 ">{biz.phone}</td>
                  <td className="px-6 py-4">{biz.website}</td>
                  <td className="px-6 py-4 ">{biz.address}</td>
                  <td
                    onClick={() => reactivateVendor(biz.id)}
                    className="px-6 py-4 text-kikaeGrey underline cursor-pointer"
                  >
                    Reactivate
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeactivatedUsers;
