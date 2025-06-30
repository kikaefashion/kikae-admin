import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MyModal from "../Modal/Modal";
import RejectVendor from "./Modal/RejectVendorModal";
import { useBoundStore } from "@/store/store";
import { getPendingStores } from "@/networking/endpoints/vendors/getPendingVendors";
import { approveVendorStore } from "@/networking/endpoints/vendors/approveVendor";

const PendingVendors = () => {
  const router = useRouter();
  const goToVendorPage = (id: string) => {
    router.push(`/dashboard/users/vendors/${id}?page=products`);
  };
  const [isVisible, setIsVisible] = useState(false);
  const pendingVendors = useBoundStore((state) => state.pendingVendors);
  const setPendingVendors = useBoundStore((state) => state.setPendingVendors);
  const [storeId, setStoreId] = useState("");

  useEffect(() => {
    const handleGetPendingVendors = async () => {
      const result = await getPendingStores();

      setPendingVendors(result);
    };

    handleGetPendingVendors();
  }, [setPendingVendors]);
  if (!pendingVendors || pendingVendors.length == 0) return null;
  return (
    <div className="p-6 min-h-screen text-black">
      <MyModal isVisible={isVisible} close={() => setIsVisible(false)}>
        <RejectVendor storeId={storeId} setIsVisible={setIsVisible} />
      </MyModal>
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
            {pendingVendors?.length !== 0 &&
              pendingVendors.map((biz, index) => (
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
                  <td className="px-6 py-4 flex flex-row gap-2.5">
                    <button
                      onClick={() => approveVendorStore(biz.id)}
                      className="text-kikaeBlue underline"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => {
                        setIsVisible(true);
                        setStoreId(biz.id);
                      }}
                      className="text-red-500 underline"
                    >
                      Reject
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

export default PendingVendors;
