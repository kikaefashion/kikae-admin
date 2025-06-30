import { mediaUrlPrefix } from "@/networking/apiUrl";
import { Runway } from "@/types/runwayVideosType";
import { useRouter } from "next/navigation";

import React from "react";

const StoreRunwayVideos = ({
  storeRunwayVideos,
}: {
  storeRunwayVideos: Runway[];
}) => {
  const router = useRouter();

  if (!storeRunwayVideos || storeRunwayVideos?.length == 0) {
    return (
      <div>
        <p>No Runway videos</p>
      </div>
    );
  }
  return (
    <div className="py-6">
      {storeRunwayVideos.map((video) => (
        <div key={video.id} className="rounded-3xl relative">
          <video
            onClick={() => router.push(`/dashboard/runway/${video.id}`)}
            src={mediaUrlPrefix + video.url}
            // alt={product.name}
            width={183}
            height={204}
            className="rounded-3xl w-[183px] h-[204px] h-40 object-cover cursor-pointer"
          />
          <h2 className="text-base font-openSansRegular mt-2 text-black">
            {video.title}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default StoreRunwayVideos;
