import ChurnedRate from "@/components/ChurnedRate";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense>
      <ChurnedRate />;
    </Suspense>
  );
};

export default Page;
