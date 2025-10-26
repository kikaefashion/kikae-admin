import Overview from "@/components/Overview/Overview";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <Overview />
    </Suspense>
  );
};

export default page;
