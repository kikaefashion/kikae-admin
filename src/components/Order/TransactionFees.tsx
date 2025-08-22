"use client";

import { useBoundStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function FeeTable() {
  const orderTransactionFees = useBoundStore((state) => state.transactionFees);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate checking if data is loaded from store
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [orderTransactionFees]);

  if (isLoading) {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-4 gap-4">
                <div className="h-3 bg-gray-100 rounded"></div>
                <div className="h-3 bg-gray-100 rounded"></div>
                <div className="h-3 bg-gray-100 rounded"></div>
                <div className="h-3 bg-gray-100 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!orderTransactionFees || orderTransactionFees.length === 0) {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="text-kikaeBlue">
              <th className="p-3">Date</th>
              <th className="p-3">Order ID</th>
              <th className="p-3">Vendor</th>
              <th className="p-3">Fee type</th>
              <th className="p-3">Fee amount</th>
            </tr>
          </thead>
        </table>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Transaction Fees
          </h3>
          <p className="text-gray-500 max-w-sm">
            There are no transaction fees to display at the moment. Transaction
            fees will appear here once orders are processed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <table className="w-full text-left">
        <thead>
          <tr className=" text-kikaeBlue">
            <th className="p-3">Date</th>
            <th className="p-3">Order ID</th>
            <th className="p-3">Vendor</th>
            <th className="p-3">Fee type</th>
            <th className="p-3">Fee amount</th>
          </tr>
        </thead>
        <tbody>
          {orderTransactionFees.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="p-3">
                {new Date(item.created_at).toLocaleDateString()}
              </td>
              <td className="p-3">{item.order_id}</td>
              <td className="p-3">{item.vendor}</td>
              <td
                onClick={() => {
                  router.push("/dashboard/users/vendors/1?page=products");
                }}
                className="p-3 text-blue-600 underline cursor-pointer"
              >
                {item.type}
              </td>
              <td className="p-3">₦{item.amount?.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
