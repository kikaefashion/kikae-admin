"use client";

import { getVendorPayouts } from "@/networking/endpoints/Orders/getVendorPayouts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PayoutTable() {
  const router = useRouter();
  const [payoutData, setPayoutData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPayoutData = async () => {
      try {
        const data = await getVendorPayouts();
        console.log("Payout Data:", data);
        // setPayoutData(data.data);
        console.log({ data });
      } catch (error) {
        console.error("Error fetching payout data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPayoutData();
  }, []);
  console.log({ setPayoutData });
  if (isLoading) {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="animate-pulse">
          <div className="space-y-3">
            <div className="grid grid-cols-9 gap-4">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-9 gap-4">
                {[...Array(9)].map((_, j) => (
                  <div key={j} className="h-3 bg-gray-100 rounded"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (payoutData.length == 0) {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg">
        <table className="w-full">
          <thead className="text-kikaeBlue">
            <tr className="">
              <th className="p-3">Vendor name</th>
              <th className="p-3">Pending payout (₦)</th>
              <th className="p-3">Available Payout (₦)</th>
              <th className="p-3">Total Sales (₦)</th>
              <th className="p-3">Payout method</th>
              <th className="p-3">Bank</th>
              <th className="p-3">Account Number</th>
              <th className="p-3">Account Name</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
        </table>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            No Vendor Payouts
          </h3>
          <p className="text-gray-500 max-w-md mb-4">
            There are no vendor payouts to process at the moment. Payouts will
            appear here once vendors have completed orders and earnings are
            ready for disbursement.
          </p>
          <div className="text-sm text-gray-400">
            Vendor payouts are processed automatically based on your payout
            schedule.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <table className="w-full">
        <thead className="text-kikaeBlue">
          <tr className="">
            <th className="p-3">Vendor name</th>
            <th className="p-3">Pending payout (₦)</th>
            <th className="p-3">Available Payout (₦)</th>
            <th className="p-3">Total (₦)</th>
            <th className="p-3">Payout method</th>
            <th className="p-3">Bank</th>
            <th className="p-3">Account Number</th>
            <th className="p-3">Account Name</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payoutData.map(
            (
              item: {
                vendorName: string;
                pendingPayout: string;
                availablePayout: string;
                total: number;
                payoutMethod: string;
                bank: string;
                accountNumber: string;
                accountName: string;
              },
              index: number
            ) => (
              <tr key={index} className="text-center">
                <td
                  onClick={() => {
                    router.push("/dashboard/users/vendors/1?page=products");
                  }}
                  className="p-3 underline cursor-pointer"
                >
                  {item.vendorName}
                </td>
                <td className="p-3">₦{item.pendingPayout.toLocaleString()}</td>
                <td className="p-3">
                  ₦{item.availablePayout.toLocaleString()}
                </td>
                <td className="p-3">₦{item.total.toLocaleString()}</td>
                <td className="p-3">{item.payoutMethod}</td>
                <td className="p-3">{item.bank}</td>
                <td className="p-3">{item.accountNumber}</td>
                <td className="p-3">{item.accountName}</td>
                <td className="p-3 flex items-center gap-2">
                  <button className="text-green-600 font-semibold mr-2">
                    Approve
                  </button>
                  <button className="text-red-600 font-semibold">Reject</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
