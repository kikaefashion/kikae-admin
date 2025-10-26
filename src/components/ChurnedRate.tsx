"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { getChurnRate } from "@/networking/endpoints/getChurnRate";
import { useRouter, useSearchParams } from "next/navigation";
import TableSkeleton from "./TableSkeleton";
import { mediaUrlPrefix } from "@/networking/apiUrl";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useBoundStore } from "@/store/store";
import { deactivateUser } from "@/networking/endpoints/users/deactivateUser";

const ChurnedRate = () => {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter");
  const typeParam = searchParams.get("type");
  const perPageParam = searchParams.get("per_page");
  const pageNumberParam = searchParams.get("page");
  const router = useRouter();
  const searchPageNumber = useBoundStore((state) => state.searchPageNumber);
  const setSearchPageNumber = useBoundStore(
    (state) => state.setSearchPageNumber
  );

  // Safely narrow types
  const filter = (
    filterParam === "last_30_days" ||
    filterParam === "last_90_days" ||
    filterParam === "this_year" ||
    filterParam === "close_churn"
      ? filterParam
      : null
  ) as "last_30_days" | "last_90_days" | "this_year" | "close_churn" | null;

  const type = (
    typeParam === "users" || typeParam === "vendors" || typeParam === "buyers"
      ? typeParam
      : "users"
  ) as "users" | "vendors" | "buyers"; // default to "users" to avoid null error
  const per_page = perPageParam ? Number(perPageParam) : 25;
  const pageNumber = pageNumberParam ? Number(pageNumberParam) : 1;

  const { data: churnRate, isLoading } = useQuery({
    queryKey: ["churnRate", filter, type, per_page, pageNumber],
    queryFn: () => getChurnRate({ filter, type, per_page, pageNumber }),
    // enabled: !!type, // ensures it doesn't fetch before params are ready
  });

  // const [churnRate] = results;

  // ✅ helper to update URL params
  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  const nextPage = (direction: "prev" | "next") => {
    if (
      direction === "next" &&
      churnRate &&
      pageNumber < churnRate?.data.last_page
    ) {
      updateParam("page", (pageNumber + 1).toString());
    }
    if (direction == "prev" && churnRate && pageNumber > 1) {
      updateParam("page", (pageNumber - 1).toString());
    }
  };

  const loadPage = () => {
    if (
      searchPageNumber &&
      churnRate?.data.last_page &&
      searchPageNumber <= churnRate.data.last_page.toString()
    ) {
      updateParam("page", searchPageNumber);
    }
  };
  const resetFilters = () => router.push("?");
  const handleDeactivateUser = async (id: string) => {
    await deactivateUser(id, 0);
  };
  return (
    <div className="py-6 px-6 space-y-[2.1875rem]">
      <div className="flex justify-between items-center">
        <h4>Filter by: </h4>

        <div className="flex gap-[0.875rem] items-center">
          {[
            { label: "Last 30 days", value: "last_30_days" },
            { label: "Last 90 days", value: "last_90_days" },
            { label: "This Year", value: "this_year" },
          ].map((btn) => (
            <div
              key={btn.value}
              onClick={() => updateParam("filter", btn.value)}
              className={`cursor-pointer ${
                filter === btn.value
                  ? "bg-[#4169e1] text-white"
                  : "bg-white text-grey"
              } rounded-3xl py-2.5 px-3.5 transition-colors`}
            >
              {btn.label}
            </div>
          ))}

          <h4
            onClick={resetFilters}
            className="text-[#B3261E] underline cursor-pointer"
          >
            Reset
          </h4>
        </div>

        <div
          onClick={() => router.replace("/dashboard/overview")}
          className="bg-[#4169e1] rounded-3xl py-2.5 px-3.5 text-white flex items-center cursor-pointer"
        >
          Close Churn <X />
        </div>

        <div className="flex bg-white rounded-3xl">
          <h4
            onClick={() => updateParam("type", "buyers")}
            className={`cursor-pointer ${
              type === "buyers" ? "bg-[#4169e1] text-white" : "text-grey"
            } py-2.5 px-3.5 rounded-3xl`}
          >
            Buyers
          </h4>
          <h4
            onClick={() => updateParam("type", "vendors")}
            className={`cursor-pointer ${
              type === "vendors" ? "bg-[#4169e1] text-white" : "text-grey"
            } py-2.5 px-3.5 rounded-3xl`}
          >
            Vendors
          </h4>
        </div>
      </div>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="h-[60vh] overflow-y-auto bg-white">
          <Table className=" rounded-3xl ]">
            <TableHeader>
              <TableRow className="border-none">
                <TableHead className="w-[100px] text-[#4169e1] font-bold">
                  First name
                </TableHead>
                <TableHead className="w-[100px] text-[#4169e1] font-bold">
                  Last name
                </TableHead>
                <TableHead className="w-[100px] text-[#4169e1] font-bold">
                  Email
                </TableHead>
                <TableHead className="text-left text-[#4169e1] font-bold">
                  Phone number
                </TableHead>
                <TableHead className="text-left text-[#4169e1] font-bold">
                  Profile Picture
                </TableHead>
                <TableHead className="text-left text-[#4169e1] font-bold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {churnRate &&
                churnRate.data?.data.map((item, index: number) => {
                  return (
                    <TableRow className=" border-none " key={index}>
                      <TableCell className="font-medium">
                        {item.fname}
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.lname}
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.email}
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.phone}
                      </TableCell>
                      <img
                        src={
                          mediaUrlPrefix && item.profilePic
                            ? mediaUrlPrefix + item.profilePic
                            : ""
                        }
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                      />
                      <TableCell
                        onClick={() => handleDeactivateUser(item.id)}
                        className="underline cursor-pointer"
                      >
                        Deactivate
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
          page {churnRate?.data.current_page} of {churnRate?.data.last_page}
        </div>

        <div>
          <h4 className="text-center">
            showing {churnRate?.data.data?.length} of {churnRate?.data.total}
          </h4>
          <div className="flex gap-[1rem]">
            <p className="text-grey">Go to Page</p>
            <input
              type="number"
              className="rounded-3xl  w-[6.625rem] min-h-[2.125rem] border border-grey text-center"
              value={searchPageNumber}
              onChange={(e) => setSearchPageNumber(e.target.value)}
            />
            <button onClick={loadPage} className="text-[#4169e1] underline">
              Load page
            </button>
          </div>
        </div>

        <div className="flex ">
          <ChevronLeft
            className="cursor-pointer"
            onClick={() => nextPage("prev")}
          />

          <ChevronRight
            className="cursor-pointer"
            onClick={() => nextPage("next")}
          />
        </div>
      </footer>
    </div>
  );
};

export default ChurnedRate;
