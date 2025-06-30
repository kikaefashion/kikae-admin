import { useSearchParams } from "next/navigation";
import React from "react";
import AllVendors from "../Vendor/AllVendors";
import Users from "./AllUsers";

const Index = () => {
  const type = useSearchParams().get("type");
  if (type == "buyers") {
    return <Users />;
  }
  return <AllVendors />;
};

export default Index;
