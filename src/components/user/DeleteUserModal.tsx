"use client";
import { deleteUser } from "@/networking/endpoints/users/deleteUser";
import React, { useState } from "react";

const DeleteUserModal = ({
  storeId,
  setIsVisible,
}: {
  storeId: string;
  setIsVisible: (value: boolean) => void;
}) => {
  const [reason, setReason] = useState("");

  const handleDeleteUser = async () => {
    await deleteUser(storeId);

    setIsVisible(false);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black">
      <div className="bg-white p-6 rounded-3xl shadow-md w-96 ">
        <h2 className="text-lg font-bold mb-4 text-center">
          Are you sure you want to delete this user?
        </h2>
        <p className="text-kikaeGrey text-center mt-6">
          Give a reason for deleting this user
        </p>
        <input
          type="text"
          placeholder="Eg. The user is spamming"
          className="border p-2 rounded-3xl w-full mt-6 "
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="flex justify-between mt-6">
          <button
            className="border px-4 py-2 rounded-3xl"
            onClick={() => setIsVisible(false)}
          >
            Cancel
          </button>{" "}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-3xl"
            onClick={handleDeleteUser}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
