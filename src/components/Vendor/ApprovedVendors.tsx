import { deactivateVendorStore } from "@/networking/endpoints/vendors/deactivateVendorStore";
import { getApprovedStores } from "@/networking/endpoints/vendors/getApprovedVendors";
import { useBoundStore } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
/* const businesses = Array(12).fill({
  name: "Abigail couture",
  email: "henrich@gmail.com",
  phone: "08038593829",
  website: "abigailcouture.com",
  address: "82 Ray Str, Lekki, Lagos",
}); */
const ApprovedVendors = () => {
  const router = useRouter();
  const goToVendorPage = (id: string) => {
    router.push(`/dashboard/users/vendors/${id}?page=products`);
  };

  const setApprovedVendors = useBoundStore((state) => state.setApprovedVendors);
  const approvedVendors = useBoundStore((state) => state.approvedVendors);
  useEffect(() => {
    const handleGetApprovedStores = async () => {
      const approvedStoresResult = await getApprovedStores();

      if (approvedStoresResult) {
        setApprovedVendors(approvedStoresResult);
      }
    };

    handleGetApprovedStores();
  }, [setApprovedVendors]);

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
            {approvedVendors?.length !== 0 &&
              approvedVendors.map((biz, index) => (
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
                    onClick={() => deactivateVendorStore(biz.id)}
                    className="px-6 py-4 text-kikaeGrey underline cursor-pointer"
                  >
                    Deactivate
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedVendors;
