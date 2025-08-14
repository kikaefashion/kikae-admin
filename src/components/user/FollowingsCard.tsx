import { ArrowBack } from "@/assets/ArrowBack";
//import { getStore } from "@/networking/endpoints/vendors/getStore";
import { useBoundStore } from "@/store/store";
import { useRouter } from "next/navigation";
import React from "react";
import Followings from "./Followings";

const FollowingGrid = () => {
  const router = useRouter();
  const followings = useBoundStore((state) => state.userDetails?.followings);

  if (!followings) return;
  console.log({ followings });

  return (
    <div className="p-6 text-black">
      <div className="flex flex-row items-center gap-6  mb-4">
        <button onClick={() => router.back()}>
          <ArrowBack />
        </button>
        <h2 className="text-xl font-semibold">Following</h2>
      </div>

      {/* Following Grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
        {followings.map((follower) => (
          <Followings key={follower.store_id} store_id={follower.store_id} />
        ))}
      </div>
    </div>
  );
};

export default FollowingGrid;
