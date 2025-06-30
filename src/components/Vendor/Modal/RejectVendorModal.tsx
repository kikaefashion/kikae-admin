"use client";
import { rejectVendorStore } from "@/networking/endpoints/vendors/rejectVendor";
import React, { useState } from "react";

const RejectVendor = ({
  storeId,
  setIsVisible,
}: {
  storeId: string;
  setIsVisible: (value: boolean) => void;
}) => {
  const [reason, setReason] = useState("");

  const handleRejectVendor = async () => {
    await rejectVendorStore(storeId);

    setIsVisible(false);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black">
      <div className="bg-white p-6 rounded-3xl shadow-md w-96 ">
        <h2 className="text-lg font-bold mb-4 text-center">
          Are you sure you want to reject this request?
        </h2>
        <p className="text-kikaeGrey text-center mt-6">
          Give a reason for rejecting this vendor applicatioin
        </p>
        <input
          type="text"
          placeholder="Eg. The registration email is fake"
          className="border p-2 rounded-3xl w-full mt-6 "
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <p className="text-kikaeGrey text-sm">Give reason here</p>

        <div className="flex justify-between mt-6">
          <button
            className="border px-4 py-2 rounded-3xl"
            onClick={() => setIsVisible(false)}
          >
            Cancel
          </button>{" "}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-3xl"
            onClick={handleRejectVendor}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectVendor;
