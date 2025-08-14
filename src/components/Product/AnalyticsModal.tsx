import { ArrowBack } from "@/assets/ArrowBack";
import { getProductAnalytics } from "@/networking/endpoints/products/getProductAnalytics";
import { ProductAnalytics } from "@/types/productAnalytics";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Analytics = ({ productId }: { productId: string }) => {
  const [selectedMonth, setSelectedMonth] = useState(
    months[new Date().getMonth()]
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [productAnalytics, setProductAnalytics] = useState<ProductAnalytics>();
  const [showAllPurchases, setShowAllPurchases] = useState(false);

  // Filter purchases by selected month
  const filteredPurchases = productAnalytics?.latest_purchases.filter((p) => {
    const purchaseDate = new Date(p.created_at);
    const purchaseMonth = months[purchaseDate.getMonth()];
    return purchaseMonth.toLowerCase() === selectedMonth.toLowerCase();
  });

  // Determine which purchases to display
  const displayedPurchases = showAllPurchases
    ? filteredPurchases
    : filteredPurchases?.slice(0, 3);

  const type = useSearchParams().get("type");
  const router = useRouter();

  useEffect(() => {
    const handleGetAnalytics = async () => {
      const result = await getProductAnalytics(productId);
      setProductAnalytics(result.data);
    };
    if (productId) {
      handleGetAnalytics();
    }
  }, [productId]);

  // Reset showAllPurchases when month changes
  useEffect(() => {
    setShowAllPurchases(false);
  }, [selectedMonth]);

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
              {months.map((month) => (
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
          <p className="text-lg font-semibold">
            {productAnalytics?.total_revenue}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-kikaeBlue">TOTAL ORDERS RECEIVED</p>
          <p className="text-lg font-semibold">
            {productAnalytics?.total_orders}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-kikaeBlue">AVERAGE VALUE PER ORDER</p>
          <p className="text-lg font-semibold">
            ₦{productAnalytics?.average_order_value}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">
          Individual {type == "makeup" ? "Bookings" : "Purchases"}
        </h3>
        <div className="space-y-4">
          {displayedPurchases?.length ? (
            displayedPurchases.map((purchase, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow space-y-1"
              >
                <p className="text-sm text-kikaeBlue">
                  {months[new Date(purchase.created_at).getMonth()]}
                </p>
                <p className="text-sm">{purchase.name}</p>
                <p className="text-lg font-semibold">
                  ₦{Number(purchase.price).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center py-4 text-gray-500">
              No purchases found for {selectedMonth}
            </p>
          )}
        </div>
        {filteredPurchases &&
          filteredPurchases.length > 3 &&
          !showAllPurchases && (
            <button
              onClick={() => setShowAllPurchases(true)}
              className="mt-4 text-blue-600 hover:underline"
            >
              Load more ({filteredPurchases.length - 3} more)
            </button>
          )}
      </div>
    </div>
  );
};

export default Analytics;
