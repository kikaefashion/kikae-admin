"use client";
import { ArrowBack } from "@/assets/ArrowBack";
import { mediaUrlPrefix } from "@/networking/apiUrl";
import { useBoundStore } from "@/store/store";
import { OrderItem } from "@/types/UserOrdersTypes";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState, useMemo } from "react";
//import type { OrderItem } from "./types"; // Assuming this is the correct import path

const OrdersGrid = () => {
  const router = useRouter();
  const userOrders = useBoundStore((state) => state.userOrders);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  const months = [
    { value: "all", label: "All Months" },
    { value: "0", label: "January" },
    { value: "1", label: "February" },
    { value: "2", label: "March" },
    { value: "3", label: "April" },
    { value: "4", label: "May" },
    { value: "5", label: "June" },
    { value: "6", label: "July" },
    { value: "7", label: "August" },
    { value: "8", label: "September" },
    { value: "9", label: "October" },
    { value: "10", label: "November" },
    { value: "11", label: "December" },
  ];

  // Filter orders based on selected month
  const filteredOrders = useMemo(() => {
    if (selectedMonth === "all") {
      return userOrders;
    }

    return userOrders.filter((order: OrderItem) => {
      const orderDate = new Date(order.created_at);
      const orderMonth = orderDate.getMonth(); // getMonth() returns 0-11
      return orderMonth === Number.parseInt(selectedMonth);
    });
  }, [userOrders, selectedMonth]);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  console.log({ userOrders, filteredOrders, selectedMonth });

  return (
    <div className="p-6 text-black">
      <div className="flex flex-row items-center justify-between mb-6">
        <div className="flex flex-row items-center gap-6">
          <button onClick={() => router.back()} className="cursor-pointer">
            <ArrowBack />
          </button>
          <h2 className="text-xl font-semibold">Orders</h2>
        </div>
        {/* Month Selector */}
        <div className="flex items-center">
          <label className="text-gray-600 mr-2">Select month:</label>
          <select
            className="border p-1 rounded-md"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredOrders.length !== 0 ? (
          filteredOrders.map((order: OrderItem) => (
            <div key={order.id} className="p-3 rounded-3xl relative">
              <img
                src={
                  mediaUrlPrefix + order.product.media[0].url ||
                  "/placeholder.svg"
                }
                alt={order.name}
                className="rounded-3xl w-full"
              />
              <p className="text-xs bg-black/35 text-white px-2 py-1 rounded-full inline-block mt-2 absolute top-2.5 left-6">
                Order {order.id}
              </p>
              <h3 className="mt-1 text-black">{order.name}</h3>
              <p className="text-kikaeGrey">{order.price}</p>
              <p className="text-kikaeGrey text-sm">{order.product.thrift}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">
              {selectedMonth === "all"
                ? "No orders found"
                : `No orders found for ${
                    months.find((m) => m.value === selectedMonth)?.label
                  }`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersGrid;
