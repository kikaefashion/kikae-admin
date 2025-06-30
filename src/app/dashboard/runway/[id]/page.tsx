"use client";

import VideoPlayer from "@/components/Runway/VideoPlayer";
import { mediaUrlPrefix } from "@/networking/apiUrl";
import { getRunwayVideo } from "@/networking/endpoints/runway/getRunwayVideo";
import { Runway } from "@/types/runwayVideosType";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const params = useParams<{ id: string }>();
  const [runwayVideo, setRunwaVideo] = useState<Runway[]>();
  useEffect(() => {
    const handleGetRunwayVideo = async () => {
      const result = await getRunwayVideo(params.id);

      setRunwaVideo(result.data);
    };

    handleGetRunwayVideo();
  }, [params.id]);

  console.log({ runwayVideo });

  if (runwayVideo?.length == 0 || !runwayVideo) {
    return null;
  }

  return (
    <VideoPlayer
      title={runwayVideo[0].title}
      src={mediaUrlPrefix + runwayVideo[0]?.url}
      description={runwayVideo[0].description}
      products={runwayVideo[0].products}
    />
  );
};

export default Page;
