import React, { useEffect, useState } from "react";
import MyModal from "../Modal/Modal";
import { LogisticsType } from "@/types/logisticsType";
import { getLogistics } from "@/networking/endpoints/getLogistics";
import { approveReturn } from "@/networking/endpoints/approveReturn";
import { ReturnRequest } from "@/types/returnType";

const ApproveReturn = ({
  decision,
  id,
  isVisible,
  close,
  setReturns,
  returns,
}: {
  id: string;
  isVisible: boolean;
  close: () => void;
  decision: "approved" | "rejected";
  setReturns: (value: ReturnRequest) => void;
  returns: ReturnRequest;
}) => {
  const [logistics, setLogistics] = useState<LogisticsType[]>([]);
  //const [decision, setDecision] = useState("");
  const [shippingPayer, setShippingPayer] = useState("");
  const [note, setNote] = useState("");

  const [selectedLogisticId, setSelectedLogisticId] = useState<number>();
  const handleGetLogistics = async () => {
    const data = await getLogistics();
    setLogistics(data.data);
  };

  useEffect(() => {
    handleGetLogistics();
  }, []);

  const handleApproveReturn = async () => {
    if (!selectedLogisticId) return;
    try {
      const result = await approveReturn(
        id,
        selectedLogisticId?.toString(),
        decision,
        shippingPayer,
        note
        //   "images"
      );

      if (result) {
        const filteredReturns = returns.data.map((item) => {
          if (item.id.toString() == id)
            return { ...item, status: result.data.status };

          return item;
        });

        setReturns({ data: filteredReturns });
        //alert("Return approved")
        close();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectReturn = async () => {
    if (!selectedLogisticId) return;
    try {
      const result = await approveReturn(
        id,
        selectedLogisticId?.toString(),
        decision,
        shippingPayer,
        note
        //   "images"
      );

      if (result) {
        const filteredReturns = returns.data.map((item) => {
          if (item.id.toString() == id)
            return { ...item, status: result.data.status };

          return item;
        });

        setReturns({ data: filteredReturns });
        //alert("Return approved")
        close();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MyModal isVisible={isVisible} close={close}>
      <div className=" flex flex-col gap-6">
        <h4 className="font-bold text-lg">Approve Return</h4>
        {/*    <input
          className="rounded-md py-2.5 px-3.5"
          placeholder="Decision"
          value={decision}
          onChange={(e) => setDecision(e.target.value)}
        /> */}
        <input
          className="rounded-md py-2.5 px-3.5"
          placeholder="Notes"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {decision == "approved" && (
          <select
            onChange={(e) => setShippingPayer(e.target.value)}
            className="rounded-md outline-none py-2.5 px-3.5"
            id="select"
            value={shippingPayer}
          >
            <option>
              {" "}
              Please select the shipping payer (who will handle the shipping
              payment)
            </option>

            <option value={"vendor"}>Vendor</option>
            <option value={"customer"}>Customer</option>
            <option value={"shared"}>Shared</option>
          </select>
        )}

        {logistics && decision == "approved" && (
          <select
            onChange={(e) => setSelectedLogisticId(Number(e.target.value))}
            className="rounded-md outline-none py-2.5 px-3.5"
            id="select"
            value={selectedLogisticId}
          >
            <option>Select a Logistic compant to handle the return</option>
            {logistics.map((item) => (
              <option title={item.name} value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        )}

        {decision == "rejected" ? (
          <button
            onClick={handleRejectReturn}
            className="rounded-3xl bg-kikaeBlue py-2.5 px-3.5"
          >
            Reject Return
          </button>
        ) : (
          <button
            onClick={handleApproveReturn}
            className="rounded-3xl bg-kikaeBlue py-2.5 px-3.5"
          >
            Approve Return
          </button>
        )}
      </div>
    </MyModal>
  );
};

export default ApproveReturn;
