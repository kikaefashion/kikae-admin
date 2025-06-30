"use client";

import { useState } from "react";
import MyModal from "../Modal/Modal";
import Index from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const logisticsData = [
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
];

export default function LogisticsTable() {
  const [search, setSearch] = useState("");
  const action = useSearchParams().get("action");
  const router = useRouter();

  const filteredLogistics = logisticsData.filter((logistics) =>
    logistics.name.toLowerCase().includes(search.toLowerCase())
  );

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
        <Index />
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
              <th className="p-3">Company name</th>
              <th className="p-3">Delivering From</th>
              <th className="p-3">Delivering To</th>
              <th className="p-3">Cities covered</th>
              <th className="p-3">Base Fee (₦)</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogistics.map((logistics, index) => (
              <tr key={index}>
                <td
                  onClick={() => router.push(`/dashboard/logistics/1`)}
                  className="p-3 underline   cursor-pointer"
                >
                  {logistics.name}
                </td>
                <td className="p-3">{logistics.from}</td>
                <td className="p-3">{logistics.to}</td>
                <td className="p-3">{logistics.cities}</td>
                <td className="p-3">{logistics.fee}</td>
                <td className="p-3">
                  <Link
                    href="?action=edit_logistic"
                    className="text-black underline mr-2"
                  >
                    Edit
                  </Link>
                  <a href="#" className="text-kikaeGrey ">
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
