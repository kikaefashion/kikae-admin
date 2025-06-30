import { useSearchParams } from "next/navigation";
import React from "react";
import ApprovedVendors from "./ApprovedVendors";
import PendingVendors from "./PendingVendors";

export default function AllVendors() {
  const status = useSearchParams().get("status");
  console.log({ status });
  if (status == "pending") {
    return <PendingVendors />;
  }
  return <ApprovedVendors />;
}
