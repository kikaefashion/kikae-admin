import { useRouter } from "next/navigation";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

const ArrowBack = () => {
  const router = useRouter();
  return (
    <div>
      <IoArrowBack
        onClick={() => router.back()}
        size={48}
        color="black"
        className="text-black cursor-pointer bg-white p-2 rounded-full"
      />
    </div>
  );
};

export default ArrowBack;
