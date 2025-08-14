import { useSearchParams } from "next/navigation";
import React from "react";
import AddLogisticsProvider from "./AddLogistic";
import EditLogisticsProvider from "./EditLogistic";

const Index = ({
  closeModal,
  handleGetLogistic,
}: {
  closeModal: () => void;
  handleGetLogistic: () => void;
}) => {
  const action = useSearchParams().get("action");

  if (action == "add_logistic") {
    return (
      <AddLogisticsProvider
        handleGetLogistic={handleGetLogistic}
        closeModal={closeModal}
      />
    );
  } else if (action == "edit_logistic") {
    return (
      <EditLogisticsProvider
        closeModal={closeModal}
        handleGetLogistic={handleGetLogistic}
      />
    );
  }

  return <div>index</div>;
};

export default Index;
