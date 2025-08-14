"use client";

import type React from "react";

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
import { Suspense, useEffect, useState, useCallback, useRef } from "react";
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
  const [orderIdInput, setOrderIdInput] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  /*   const [loading, setLoading] = useState(false);
 
  const [allOrders, setAllOrders] = useState<OrderItem[]>([]); */
  const [initialLoading, setInitialLoading] = useState(true);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setFilterDropdownOpen(false);
      }
    };

    if (filterDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterDropdownOpen]);

  const getCurrentFilters = useCallback(() => {
    const filter = searchParams.get("filter");
    const value = searchParams.get("value");
    const startDateParam = searchParams.get("start_date");
    const endDateParam = searchParams.get("end_date");

    let keyword: string | undefined;
    let status: string[] | undefined;
    let start_date: string | undefined;
    let end_date: string | undefined;

    if (startDate || startDateParam) {
      start_date = startDate || startDateParam || undefined;
    }
    if (endDate || endDateParam) {
      end_date = endDate || endDateParam || undefined;
    }

    if (filter && value) {
      switch (filter) {
        case "keyword":
        case "items":
          keyword = value;
          break;
        case "status":
          status = value.split(",").filter((s) => s.trim());
          break;
      }
    }

    return { keyword, status, start_date, end_date };
  }, [searchParams, startDate, endDate]);

  const applyFrontendFilters = useCallback(
    (orders: OrderItem[]) => {
      let filteredOrders = [...orders];

      // Apply Order ID filter on frontend
      const orderIdFilter =
        searchParams.get("filter") === "order_id"
          ? searchParams.get("value")
          : orderIdInput;
      if (orderIdFilter && orderIdFilter.trim()) {
        filteredOrders = filteredOrders.filter((order) =>
          order.id?.toString().includes(orderIdFilter.trim())
        );
      }

      return filteredOrders;
    },
    [searchParams, orderIdInput]
  );

  const fetchFilteredOrders = useCallback(async () => {
    //setLoading(true);
    try {
      const filters = getCurrentFilters();

      const statusParam = filters.status ? filters.status.join(",") : undefined;

      const orders = await getAllOrders(
        filters.keyword,
        filters.start_date,
        filters.end_date,
        statusParam
      );

      // setAllOrders(orders.data);
      const filteredOrders = applyFrontendFilters(orders.data);
      setOrders(filteredOrders);

      console.log({ orders: filteredOrders, filters });
    } catch (error) {
      console.error("Error fetching filtered orders:", error);
    } finally {
      // setLoading(false);
    }
  }, [getCurrentFilters, applyFrontendFilters]);

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

  useEffect(() => {
    const fetchInitialData = async () => {
      setInitialLoading(true);
      try {
        const transactions = await getAllTransactions();
        setOrderTransactionFees(transactions.transactions);
        await fetchFinancialStats();
        await fetchFilteredOrders();
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchInitialData();
  }, [setOrderTransactionFees, fetchFinancialStats, fetchFilteredOrders]);

  const selectStatus = (status: string) => {
    setSelectedStatus(status);
  };

  const handleOrderIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setOrderIdInput(value);
    }
  };

  const getFilterPlaceholder = () => {
    if (!selectedFilter) return "";
    switch (selectedFilter.toLowerCase()) {
      case "order id":
        return "Input Order ID (numbers only)";
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

  const applyFilter = async () => {
    if (!selectedFilter) return;

    const queryParams = new URLSearchParams(searchParams.toString());

    if (selectedFilter.toLowerCase() === "status") {
      if (!selectedStatus) return;
      queryParams.set("filter", "status");
      queryParams.set("value", selectedStatus);
    } else if (selectedFilter.toLowerCase() === "order id") {
      if (!orderIdInput.trim()) return;
      queryParams.set("filter", "order_id");
      queryParams.set("value", orderIdInput.trim());
    } else {
      if (!filterInput.trim()) return;
      queryParams.set("filter", selectedFilter.toLowerCase());
      queryParams.set("value", filterInput.trim());
    }

    setFilterDropdownOpen(false);

    router.push(`?${queryParams.toString()}`);

    setTimeout(() => {
      fetchFilteredOrders();
    }, 100);
  };

  const applyDateFilter = async () => {
    if (!startDate && !endDate) return;

    const queryParams = new URLSearchParams(searchParams.toString());

    if (startDate) {
      queryParams.set("start_date", startDate);
    } else {
      queryParams.delete("start_date");
    }

    if (endDate) {
      queryParams.set("end_date", endDate);
    } else {
      queryParams.delete("end_date");
    }

    router.replace(`/dashboard/orders?${queryParams.toString()}`);

    await fetchFilteredOrders();
  };

  const resetFilters = async () => {
    setSelectedFilter(null);
    setFilterDropdownOpen(false);
    setFilterInput("");
    setOrderIdInput("");
    setSelectedStatus("");
    setStartDate("");
    setEndDate("");

    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.delete("filter");
    queryParams.delete("value");
    queryParams.delete("start_date");
    queryParams.delete("end_date");
    router.replace(`/dashboard/orders?${queryParams.toString()}`);

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
            <div className="flex items-center gap-1">
              <label className="text-sm text-gray-600">From:</label>
              <input
                value={startDate}
                placeholder="Start date"
                type="date"
                className="border rounded-md p-2 text-sm"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-1">
              <label className="text-sm text-gray-600">To:</label>
              <input
                value={endDate}
                placeholder="End date"
                type="date"
                className="border rounded-md p-2 text-sm"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            {(startDate || endDate) && (
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
                  setFilterInput("");
                  setOrderIdInput("");
                  setSelectedStatus("");
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

      {filterDropdownOpen && selectedFilter && (
        <div
          ref={filterDropdownRef}
          className="absolute bg-white border rounded-3xl shadow-lg mt-2 flex flex-col gap-2 p-4 pr-[7em] z-10"
        >
          {selectedFilter.toLowerCase() === "status" ? (
            <>
              <h4 className="font-bold mb-6">Select Order Status</h4>
              <div className="flex flex-wrap gap-2">
                {orderStatuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => selectStatus(status)}
                    className={`px-4 py-2 border rounded-3xl ${
                      selectedStatus === status
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    } text-sm`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                *You can choose only one Order Status
              </p>
            </>
          ) : selectedFilter.toLowerCase() === "order id" ? (
            <>
              <h4 className="font-bold mb-6">{getFilterPlaceholder()}</h4>
              <input
                type="text"
                placeholder={getFilterPlaceholder()}
                className="border rounded-3xl p-2 min-w-[24rem] mb-[4rem]"
                value={orderIdInput}
                onChange={handleOrderIdChange}
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <p className="text-xs text-gray-500 -mt-12 mb-8">
                *Only numbers are allowed for Order ID
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

      {page == null && (
        <FinancialActivity
          isLoading={initialLoading}
          financialStats={financialStats}
          orders={orders}
        />
      )}
      {page == "vendor_payouts" && <PayoutTable />}
      {page == "transaction_fees_breakdown" && <FeeTable />}
    </div>
  );
}

export default Page;
