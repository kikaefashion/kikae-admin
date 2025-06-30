"use client";

import FinancialActivity from "@/components/Order/FinancialActivity";
import FeeTable from "@/components/Order/TransactionFees";
import PayoutTable from "@/components/Order/VendorPayouts";
import { getAllOrders } from "@/networking/endpoints/Orders/getAllOrders";
import { getAllTransactions } from "@/networking/endpoints/Orders/getAllTransactions";
import { getAvailablePayouts } from "@/networking/endpoints/Orders/getAvailablePayouts";
import { getPendingPayouts } from "@/networking/endpoints/Orders/getPendingPayouts";
import { getTotalRefunds } from "@/networking/endpoints/Orders/getTotalRefunds";
import { getTotalSales } from "@/networking/endpoints/Orders/getTotalSales";
import { getTransactionFees } from "@/networking/endpoints/Orders/getTransactionFees";

import { useBoundStore } from "@/store/store";
import type { OrderItem } from "@/types/UserOrdersTypes";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useCallback } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const filters = ["Order ID", "Keyword", "Status", "Items"];
const orderStatuses = [
  "Completed",
  "Delivered",
  "Out for delivery",
  "Confirmed",
  "Order placed",
];
const dropdownList = ["vendor payouts", "transaction fees breakdown"];

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FashionStore />
    </Suspense>
  );
};

function FashionStore({}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [filterInput, setFilterInput] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const setOrderTransactionFees = useBoundStore(
    (state) => state.setTransactionFees
  );

  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [financialStats, setFinancialStats] = useState([
    { label: "Total sales", amount: 0 },
    { label: "Pending payouts", amount: 0 },
    { label: "Available payouts", amount: 0 },
    { label: "Transaction fees", amount: 0 },
    { label: "Refunds issued", amount: 0 },
  ]);

  // Function to get current filter parameters from URL
  const getCurrentFilters = useCallback(() => {
    const filter = searchParams.get("filter");
    const value = searchParams.get("value");

    let keyword: string | undefined;
    let status: string | undefined;
    let start_date: string | undefined;
    let end_date: string | undefined;

    // Handle date filter
    if (date) {
      start_date = date;
      end_date = date;
    }

    // Handle other filters
    if (filter && value) {
      switch (filter) {
        case "order_id":
        case "keyword":
        case "items":
          keyword = value;
          break;
        case "status":
          status = value;
          break;
      }
    }

    return { keyword, status, start_date, end_date };
  }, [searchParams, date]);

  // Function to fetch orders with current filters
  const fetchFilteredOrders = useCallback(async () => {
    setLoading(true);
    try {
      const filters = getCurrentFilters();
      const orders = await getAllOrders(
        filters.keyword,
        filters.start_date,
        filters.end_date,
        filters.status
      );
      console.log({ orders, filters });
      setOrders(orders.data);
    } catch (error) {
      console.error("Error fetching filtered orders:", error);
    } finally {
      setLoading(false);
    }
  }, [getCurrentFilters]);

  // Function to fetch financial stats
  const fetchFinancialStats = useCallback(async () => {
    try {
      const [
        totalSales,
        pendingPayouts,
        availablePayouts,
        transactionFees,
        refundsIssued,
      ] = await Promise.all([
        getTotalSales(),
        getPendingPayouts(),
        getAvailablePayouts(),
        getTransactionFees(),
        getTotalRefunds(),
      ]);

      setFinancialStats([
        { label: "Total sales", amount: totalSales.total_sales },
        { label: "Pending payouts", amount: pendingPayouts.pending_payouts },
        {
          label: "Available payouts",
          amount: availablePayouts.available_payouts,
        },
        {
          label: "Transaction fees",
          amount: transactionFees.total_transaction_fees,
        },
        { label: "Refunds issued", amount: refundsIssued.total_refunds },
      ]);
    } catch (error) {
      console.error("Error fetching financial stats:", error);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const transactions = await getAllTransactions();
        setOrderTransactionFees(transactions.transactions);
        await fetchFinancialStats();
        // Fetch initial orders
        await fetchFilteredOrders();
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, [setOrderTransactionFees, fetchFinancialStats, fetchFilteredOrders]);

  // Toggle status selection
  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  // Get appropriate placeholder
  const getFilterPlaceholder = () => {
    if (!selectedFilter) return "";
    switch (selectedFilter.toLowerCase()) {
      case "order id":
        return "Input Order ID";
      case "keyword":
        return "Input Keyword";
      case "status":
        return "Select Order Status";
      case "items":
        return "Input Item Name";
      default:
        return "Enter value";
    }
  };

  // Apply filter and update query params
  const applyFilter = async () => {
    if (!selectedFilter) return;

    const queryParams = new URLSearchParams(searchParams.toString());

    if (selectedFilter.toLowerCase() === "status") {
      if (selectedStatuses.length === 0) return;
      queryParams.set("filter", "status");
      queryParams.set("value", selectedStatuses.join(","));
    } else if (filterInput) {
      const filterKey = selectedFilter.toLowerCase().replace(" ", "_");
      queryParams.set("filter", filterKey);
      queryParams.set("value", filterInput);
    }

    router.replace(`/dashboard/orders?${queryParams.toString()}`);
    setFilterDropdownOpen(false);

    // Immediately fetch orders with new filters
    await fetchFilteredOrders();
  };

  // Apply date filter
  const applyDateFilter = async () => {
    if (!date) return;

    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.set("date", date);
    router.replace(`/dashboard/orders?${queryParams.toString()}`);

    // Immediately fetch orders with date filter
    await fetchFilteredOrders();
  };

  // Reset all filters
  const resetFilters = async () => {
    setSelectedFilter(null);
    setFilterDropdownOpen(false);
    setFilterInput("");
    setSelectedStatuses([]);
    setDate("");

    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.delete("filter");
    queryParams.delete("value");
    queryParams.delete("date");
    router.replace(`/dashboard/orders?${queryParams.toString()}`);

    // Immediately fetch all orders without filters
    await fetchFilteredOrders();
  };

  const closeFinancialDropdown = () => {
    if (page !== null) {
      router.replace(`/dashboard/orders`);
      setDropdownOpen(false);
      return;
    }
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="text-black p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-wrap gap-2 items-center ">
          <h4>Filter by</h4>

          <div className="flex items-center gap-2">
            <input
              value={date}
              placeholder="date"
              type="date"
              className="border rounded-md p-2"
              onChange={(e) => setDate(e.target.value)}
            />
            {date && (
              <button
                onClick={applyDateFilter}
                className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
              >
                Apply
              </button>
            )}
          </div>

          {filters.map((filter) => (
            <div key={filter}>
              <button
                onClick={() => {
                  setSelectedFilter(filter);
                  setFilterDropdownOpen(true);
                }}
                className="px-3 py-1 border rounded-md bg-white text-sm flex items-center text-kikaeGrey"
              >
                {filter}
                <FaCaretDown />
              </button>
            </div>
          ))}

          <button
            className="px-3 py-1 text-sm text-red-500"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>
        <div>
          <button
            onClick={closeFinancialDropdown}
            className={`px-3 py-1 rounded-3xl text-sm flex items-center gap-1 ${
              page !== null
                ? "bg-kikaeBlue text-white"
                : " bg-white text-kikaeGrey"
            }`}
          >
            {page == null ? "All financial activity" : page}
            {page == null ? <FaCaretDown /> : <IoClose />}
          </button>

          {dropdownOpen && (
            <div className="absolute bg-white border rounded-md shadow-lg mt-2">
              <ul className="p-2">
                {dropdownList.map((item, index) => (
                  <li
                    onClick={() => {
                      router.replace(
                        `/dashboard/orders?page=${item.split(" ").join("_")}`
                      );
                      setDropdownOpen(false);
                    }}
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer capitalize"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Filter Dropdown */}
      {filterDropdownOpen && selectedFilter && (
        <div className="absolute bg-white border rounded-3xl shadow-lg mt-2 flex flex-col gap-2 p-4 pr-[7em] z-10">
          {selectedFilter.toLowerCase() === "status" ? (
            <>
              <h4 className="font-bold mb-6">Select Order Status</h4>
              <div className="flex flex-wrap gap-2">
                {orderStatuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => toggleStatus(status)}
                    className={`px-4 py-2 border rounded-3xl ${
                      selectedStatuses.includes(status)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    } text-sm`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                *You can choose multiple Order Status
              </p>
            </>
          ) : (
            <>
              <h4 className="font-bold mb-6">{getFilterPlaceholder()}</h4>
              <input
                type="text"
                placeholder={getFilterPlaceholder()}
                className="border rounded-3xl p-2 min-w-[24rem] mb-[4rem]"
                value={filterInput}
                onChange={(e) => setFilterInput(e.target.value)}
              />
            </>
          )}
          <button
            className="px-3.5 py-2.5 rounded-md bg-kikaeBlue text-white text-sm font-semibold shadow-sm hover:bg-kikaeBlue/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kikaeBlue border-none self-center"
            onClick={applyFilter}
          >
            Apply Now
          </button>
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center items-center py-4">
          <div className="text-gray-500">Loading orders...</div>
        </div>
      )}

      {/* Financial Stats */}
      {page == null && (
        <FinancialActivity financialStats={financialStats} orders={orders} />
      )}
      {page == "vendor_payouts" && <PayoutTable />}
      {page == "transaction_fees_breakdown" && <FeeTable />}
    </div>
  );
}

export default Page;
