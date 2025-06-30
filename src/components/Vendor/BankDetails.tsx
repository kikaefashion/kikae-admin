"use client";

import { getMyBanks } from "@/networking/endpoints/vendors/getStoreBanks";
import { bankType } from "@/types/bankType";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const BankCard = ({
  name,
  accountNumber,
  bank,
  isDefault,
}: {
  name: string;
  accountNumber: string;
  bank: string;
  isDefault: boolean;
}) => {
  return (
    <div className="w-80 bg-white shadow-md rounded-lg p-4 border border-gray-200">
      <h2 className="text-blue-600 text-sm font-semibold">{name}</h2>
      <p className="text-gray-500 text-sm">{accountNumber}</p>
      <p className="text-gray-700 text-base font-medium">{bank}</p>

      <div className="flex items-center gap-2 mt-3">
        <button
          className={`py-2 px-4 rounded-md text-sm font-semibold ${
            isDefault
              ? "border border-blue-600 text-blue-600"
              : "bg-blue-600 text-white hover:bg-blue-700 transition"
          }`}
        >
          {isDefault ? "Default" : "Set as default"}
        </button>
        <button className="p-2 text-gray-600 hover:text-blue-600">
          <FaEdit />
        </button>
        <button className="p-2 text-gray-600 hover:text-red-600">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

const BankCardList = ({ storeId }: { storeId: string }) => {
  const [bankAccounts, setBankAccounts] = useState<bankType[]>([]);

  useEffect(() => {
    const handleGetStoreBanks = async () => {
      const getStoreBankResults = await getMyBanks(storeId);

      console.log({ getStoreBankResults, storeId });

      if (!getStoreBankResults.data) return;

      if (getStoreBankResults) setBankAccounts(getStoreBankResults.data);
    };

    handleGetStoreBanks();
  }, [storeId]);
  return (
    <div className="flex flex-wrap gap-6 mt-6">
      {bankAccounts?.length !== 0 &&
        bankAccounts?.map((account, index) => (
          <BankCard
            key={index}
            name={account.account_name}
            accountNumber={account.number}
            bank={account.bank}
            isDefault={account.isDefault}
          />
        ))}
    </div>
  );
};

export default BankCardList;
