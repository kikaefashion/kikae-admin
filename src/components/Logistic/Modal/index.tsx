import { useSearchParams } from "next/navigation";
import React from "react";
import AddLogisticsProvider from "./AddLogistic";
import EditLogisticsProvider from "./EditLogistic";

const Index = () => {
  const action = useSearchParams().get("action");

  if (action == "add_logistic") {
    return <AddLogisticsProvider />;
  } else if (action == "edit_logistic") {
    return <EditLogisticsProvider />;
  }

  return <div>index</div>;
};

export default Index;
