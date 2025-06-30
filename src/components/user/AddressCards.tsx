import { ArrowBack } from "@/assets/ArrowBack";
import { useBoundStore } from "@/store/store";
import { useRouter } from "next/navigation";
import React from "react";

const AddressCards = () => {
  const router = useRouter();
  const addresses = useBoundStore((state) => state.userDetails?.addresses);

  if (!addresses) return null;
  return (
    <div className="p-6">
      <div className="flex items-center text-black mb-6 gap-6">
        <button
          onClick={() => router.back()}
          className="flex flex-row items-center gap-6"
        >
          <ArrowBack />
        </button>
        <h4 className="font-bold">Address Book</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl ">
            <p className="text-blue-600 font-semibold">{item.fname}</p>
            <p className="text-gray-500 text-sm">{item.phone}</p>
            <p className="text-gray-700 mt-2">{item.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressCards;
