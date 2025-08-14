"use client";

import { useEffect, useState } from "react";
import MyModal from "../Modal/Modal";
import Index from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { LogisticsType } from "@/types/logisticsType";
import { getLogistics } from "@/networking/endpoints/getLogistics";
import { removeLogistic } from "@/networking/endpoints/logistics/deleteLogistic";
import TooltipText from "../TooltipText";

/* const logisticsData = [
    {
      name: "SpeedX Logistics",
      from: "Lagos",
      to: "Lagos",
      cities: "Ikorodu, Epe, Ikeja",
      fee: "2,500",
    },
    {
      name: "RapidCourier",
      from: "Abuja",
      to: "Kano",
      cities: "Garki, Wuse, Zuba",
      fee: "4,000",
    },
    {
      name: "ExpressRiders",
      from: "Rivers",
      to: "Imo",
      cities: "Owerri, Orlu, Mbano",
      fee: "3,500",
    },
  ]; */

function formatListWithEllipsis(items: string[], limit: number = 3): string {
  if (!items || items.length === 0) return "";
  const sliced = items.slice(0, limit).join(", ");
  return items.length > limit ? `${sliced}, ...` : sliced;
}

function getAreas(destinations: LogisticsType["destinations"]): string {
  return formatListWithEllipsis(destinations.map((item) => item.area));
}

function getStates(destinations: LogisticsType["destinations"]): string {
  return formatListWithEllipsis(destinations.map((item) => item.state.name));
}

export default function LogisticsTable() {
  const [search, setSearch] = useState("");
  const action = useSearchParams().get("action");
  const router = useRouter();
  const [logistics, setLogistics] = useState<LogisticsType[]>([]);
  const filteredLogistics =
    logistics &&
    logistics.filter((logistics) =>
      logistics.name.toLowerCase().includes(search.toLowerCase())
    );

  const handleGetLogistics = async () => {
    const data = await getLogistics();
    setLogistics(data.data);
  };

  useEffect(() => {
    handleGetLogistics();
  }, []);

  const handleRemoveLogistic = async (logistic_id: number) => {
    removeLogistic(logistic_id);
    handleGetLogistics();
  };

  return (
    <div className="p-6 ">
      <MyModal
        isVisible={
          action == "add_logistic" ||
          action == "edit_logistic" ||
          action == "delete"
        }
        close={() => router.back()}
      >
        <Index
          handleGetLogistic={handleGetLogistics}
          closeModal={() => router.back()}
        />
      </MyModal>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search logistics company"
          className="border p-2 rounded w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link href="?action=add_logistic" className="text-blue-500">
          Add new logistics provider
        </Link>
      </div>

      <div className="rounded-3xl bg-white overflow-hidden text-black">
        <table className="w-full text-left">
          <thead className="text-kikaeBlue">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">States Covered</th>
              <th className="p-3">Areas Covered</th>

              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogistics &&
              filteredLogistics.map((logistics, index) => (
                <tr key={index}>
                  <td
                    onClick={() =>
                      router.push(`/dashboard/logistics/${logistics.id}`)
                    }
                    className="p-3 underline   cursor-pointer"
                  >
                    {logistics.name}
                  </td>
                  <td className="p-3">
                    <TooltipText
                      fullText={logistics.destinations
                        .map((item) => item.state.name)
                        .join(", ")}
                    >
                      {getStates(logistics.destinations)}
                    </TooltipText>
                  </td>
                  <td className="p-3">
                    <TooltipText
                      fullText={logistics.destinations
                        .map((item) => item.area)
                        .join(", ")}
                    >
                      {getAreas(logistics.destinations)}
                    </TooltipText>
                  </td>

                  <td className="p-3">
                    <Link
                      href={`?action=edit_logistic&logistic=${logistics.id}`}
                      className="text-black underline mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleRemoveLogistic(logistics.id)}
                      className="text-kikaeGrey "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
