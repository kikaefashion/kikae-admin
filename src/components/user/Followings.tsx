"use client";

import { mediaUrlPrefix } from "@/networking/apiUrl";
import { getStore } from "@/networking/endpoints/vendors/getStore";
import type { singleStoreType } from "@/types/storeType";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Followings = ({ store_id }: { store_id: string }) => {
  const [storeDetails, setStoreDetails] = useState<singleStoreType>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleGetStore = async () => {
    try {
      setIsLoading(true);
      const result = await getStore(store_id);
      setStoreDetails(result.data);
    } catch (error) {
      console.error("Error fetching store:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetStore();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        <div className="relative rounded-full h-[7.28rem] w-[7.28rem] bg-gray-200 animate-pulse">
          {/* Skeleton for image */}
        </div>
        <div className="mt-2 h-4 w-20 bg-gray-200 rounded animate-pulse">
          {/* Skeleton for text */}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => router.push(`/`)}
      className="flex flex-col items-center cursor-pointer"
    >
      <div className="relative rounded-full h-[7.28rem] w-[7.28rem]">
        <img
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
          }}
          src={
            mediaUrlPrefix + storeDetails?.primary_media || "/placeholder.svg"
          }
          alt={"A store"}
        />
      </div>
      <p className="mt-2">{storeDetails?.name}</p>
    </div>
  );
};

export default Followings;
