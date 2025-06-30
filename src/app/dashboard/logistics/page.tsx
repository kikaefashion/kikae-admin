"use client";
import LogisticsTable from "@/components/Logistic/Logistic";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LogisticsTable />;
    </Suspense>
  );
};

export default page;
