"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

import { useParams, useRouter } from "next/navigation";
import TableSkeleton from "../TableSkeleton";

import { getLogisticMetric } from "@/networking/endpoints/getLogisticMetric";
import { useBoundStore } from "@/store/store";
import { ChevronDown, X } from "lucide-react";
import ArrowBack from "../ArrowBack";

const LogisticMetricStats = () => {
  const { id } = useParams<{ id: string }>();
  const searchTransactionId = useBoundStore(
    (state) => state.searchTransactionId
  );
  const setSearchTransactionId = useBoundStore(
    (state) => state.setSearchTransactionId
  );

  const searchTransactionIdDropdown = useBoundStore(
    (state) => state.searchTransactionIdDropdown
  );
  const setSearchTransactionIdDropdown = useBoundStore(
    (state) => state.setSearchTransactionIdDropdown
  );
  const setSelectedTransaction = useBoundStore(
    (state) => state.setSelectedTransaction
  );
  const selectedTransaction = useBoundStore(
    (state) => state.selectedTransaction
  );

  const router = useRouter();

  // Date filter state
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Applied filter state — only updated when "Apply Now" is clicked
  const [appliedStartDate, setAppliedStartDate] = useState<string>("");
  const [appliedEndDate, setAppliedEndDate] = useState<string>("");

  const today = new Date().toISOString().split("T")[0];

  const { data: logisticMetric, isLoading } = useQuery({
    queryKey: ["logisticMetric", id, appliedStartDate, appliedEndDate],
    queryFn: () =>
      getLogisticMetric(id, appliedStartDate || undefined, appliedEndDate || undefined),
  });

  const resetFilters = () => {
    setStartDate("");
    setEndDate("");
    setAppliedStartDate("");
    setAppliedEndDate("");
    setSearchTransactionId("");
    router.push("?");
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStartDate(value);
    // Auto-set end date to today if not already set
    if (value && !endDate) {
      setEndDate(today);
    }
    // Clear end date if start date is cleared
    if (!value) {
      setEndDate("");
    }
  };

  const handleApply = () => {
    setAppliedStartDate(startDate);
    setAppliedEndDate(endDate);
    setSearchTransactionIdDropdown(false);
  };

  useEffect(() => {
    return () => {
      setSelectedTransaction(null);
    };
  }, []);

  if (selectedTransaction) {
    return (
      <div className="py-6 px-6">
        <div className="flex justify-end text-red-500 cursor-pointer">
          <X onClick={() => setSelectedTransaction(null)} />
        </div>

        <div className="h-[60vh] overflow-y-auto bg-white mt-6 ">
          <Table className=" rounded-3xl ]">
            <TableHeader>
              <TableRow className="border-none">
                <TableHead className=" text-[#4169e1] font-bold">
                  Order Id
                </TableHead>
                <TableHead className="s text-[#4169e1] font-bold">
                  Product name
                </TableHead>
                <TableHead className=" text-[#4169e1] font-bold">Fee</TableHead>
                <TableHead className=" text-[#4169e1] font-bold">
                  Logistics
                </TableHead>
                <TableHead className=" text-[#4169e1] font-bold">
                  Address
                </TableHead>
                <TableHead className=" text-[#4169e1] font-bold">
                  Date
                </TableHead>
                <TableHead className=" text-[#4169e1] font-bold">
                  Size
                </TableHead>
                <TableHead className=" text-[#4169e1] font-bold">Qty</TableHead>
                <TableHead className=" text-[#4169e1] font-bold">
                  Status
                </TableHead>

                <TableHead className="text-left text-[#4169e1] font-bold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedTransaction?.orders &&
                selectedTransaction?.orders.map((item, index: number) => {
                  return (
                    <TableRow className=" border-none " key={index}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell className="font-medium">
                        {item.product.name}
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.price}
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.logistic.name}
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.transaction.user.fname}
                      </TableCell>
                      <TableCell className="font-medium">
                        {new Date(item.created_at).toDateString()}
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.sizes.size}
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.units}
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.status}
                      </TableCell>

                      <TableCell className="underline cursor-pointer">
                        View
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 px-6 space-y-[2.1875rem]">
      <div className="flex gap-6 items-center relative">
        <ArrowBack />
        <div className="flex items-center gap-6 text-[#AAA5A4]">
          <h4>Filter by: </h4>

          <div
            onClick={() => setSearchTransactionIdDropdown(true)}
            className={`cursor-pointer ${"bg-white"} rounded-3xl py-2.5 px-3.5 transition-colors flex items-center `}
          >
            Date
            <ChevronDown />
          </div>

          <h4
            onClick={resetFilters}
            className="text-[#B3261E] underline cursor-pointer"
          >
            Reset
          </h4>
        </div>

        {searchTransactionIdDropdown && (
          <div className="absolute w-[32.56rem] bg-white top-[100%] z-50 shadow-md rounded-3xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold">Filters</h4>
              <X
                onClick={() => setSearchTransactionIdDropdown(false)}
                className="cursor-pointer"
              />
            </div>



            {/* Start Date input */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#AAA5A4]">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                max={today}
                className="bg-[#F9F9F9] rounded-full py-[1.25rem] px-6 cursor-pointer"
                onChange={handleStartDateChange}
              />
            </div>

            {/* End Date input */}
            <div className="flex flex-col gap-1">
              <label
                className={`text-sm font-medium ${startDate ? "text-[#AAA5A4]" : "text-[#D3D0CF]"
                  }`}
              >
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                min={startDate || undefined}
                max={today}
                disabled={!startDate}
                className={`bg-[#F9F9F9] rounded-full py-[1.25rem] px-6 transition-opacity ${startDate
                  ? "cursor-pointer opacity-100"
                  : "cursor-not-allowed opacity-40"
                  }`}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <button
              onClick={handleApply}
              className="bg-[#4880FF] rounded-[0.375rem] text-white text-sm self-center py-[0.5625rem] px-[2.0625rem] mt-2"
            >
              Apply Now
            </button>
          </div>
        )}
      </div>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="h-[60vh] overflow-y-auto bg-white">
          <Table className=" rounded-3xl ]">
            <TableHeader>
              <TableRow className="border-none">
                <TableHead className=" text-[#4169e1] font-bold">
                  Transaction Id
                </TableHead>
                <TableHead className=" text-[#4169e1] font-bold">
                  Logistic Fee
                </TableHead>
                <TableHead className=" text-[#4169e1] font-bold">
                  Amount Paid
                </TableHead>

                <TableHead className="text-left text-[#4169e1] font-bold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logisticMetric &&
                logisticMetric.transactions.map((item, index: number) => {
                  return (
                    <TableRow className=" border-none " key={index}>
                      <TableCell className="font-medium">
                        {item.transaction_id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.logistic_fee}
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.amount_paid}
                      </TableCell>

                      <TableCell
                        onClick={() => setSelectedTransaction(item)}
                        className="underline cursor-pointer"
                      >
                        View
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      )}

      <footer className="flex justify-between items-center">
        <div>
          Total earnings ={" "}
          <b> ₦{logisticMetric?.total_logistic_fee?.toLocaleString()}</b>{" "}
        </div>
      </footer>
    </div>
  );
};

export default LogisticMetricStats;