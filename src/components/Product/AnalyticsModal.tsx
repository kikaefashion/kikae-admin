import { ArrowBack } from "@/assets/ArrowBack";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const purchases = [
  { month: "JANUARY", item: "Long-sleeve crop top shirts", price: 20255 },
  { month: "JANUARY", item: "Long-sleeve crop top shirts", price: 20255 },
  { month: "FEBRUARY", item: "Long-sleeve crop top shirts", price: 20255 },
];

const Analytics = () => {
  const [selectedMonth, setSelectedMonth] = useState("February");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredPurchases = purchases.filter(
    (p) => p.month.toLowerCase() === selectedMonth.toLowerCase()
  );
  const type = useSearchParams().get("type");
  const router = useRouter();
  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto text-black">
      <div className="flex items-center justify-between">
        <div className="flex gap-6">
          <button onClick={() => router.back()}>
            <ArrowBack />
          </button>

          <h2 className="text-2xl font-semibold">
            {type == "makeup" ? "Bookings" : "Analytics"}
          </h2>
        </div>

        <div className="relative flex flex-row gap-2.5 items-center">
          <h4>Select Month: </h4>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center px-4 py-2 rounded-3xl bg-white shadow-sm hover:bg-gray-100"
          >
            <span className="mr-2 text-kikaeBlue">{selectedMonth}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute z-10 mt-2 w-32 bg-white border rounded-md shadow-lg">
              {["January", "February", "March"].map((month) => (
                <div
                  key={month}
                  onClick={() => {
                    setSelectedMonth(month);
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {month}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-kikaeBlue">TOTAL SALES</p>
          <p className="text-lg font-semibold">₦1,500,000</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-kikaeBlue">TOTAL ORDERS RECEIVED</p>
          <p className="text-lg font-semibold">804</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-kikaeBlue">AVERAGE VALUE PER ORDER</p>
          <p className="text-lg font-semibold">₦23,000</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">
          Individual {type == "makeup" ? "Bookings" : "Purchases"}
        </h3>
        <div className="space-y-4">
          {filteredPurchases.map((purchase, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow space-y-1"
            >
              <p className="text-sm text-kikaeBlue">{purchase.month}</p>
              <p className="text-sm">{purchase.item}</p>
              <p className="text-lg font-semibold">
                ₦{purchase.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <button className="mt-4 text-blue-600 hover:underline">
          Load more
        </button>
      </div>
    </div>
  );
};

export default Analytics;
