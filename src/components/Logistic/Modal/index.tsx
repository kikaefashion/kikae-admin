import { useSearchParams } from "next/navigation";
import React from "react";
import AddLogisticsProvider from "./AddLogistic";
import EditLogisticsProvider from "./EditLogistic";

const Index = ({ closeModal }: { closeModal: () => void }) => {
  const action = useSearchParams().get("action");

  if (action == "add_logistic") {
    return <AddLogisticsProvider closeModal={closeModal} />;
  } else if (action == "edit_logistic") {
    return <EditLogisticsProvider closeModal={closeModal} />;
  }

  return <div>index</div>;
};

export default Index;
