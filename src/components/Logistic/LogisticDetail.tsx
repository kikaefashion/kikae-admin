"use client";

import { getLogistic } from "@/networking/endpoints/logistics/getLogistic";
import { LogisticsType } from "@/types/logisticsType";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LogisticsProviderDetails() {
  const params = useParams<{ id: string }>();
  const [logistic, setLogistic] = useState<LogisticsType>();

  useEffect(() => {
    const handleGetLogistic = async () => {
      if (!params.id) return;
      const logisticResult = await getLogistic(params.id);

      setLogistic(logisticResult.data);
    };

    handleGetLogistic();
  }, [params.id]);

  const areasCovered = logistic?.destinations.map((item) => item.area);
  const statesCovered = logistic?.destinations.map((item) => item.state.name);

  return (
    <div className="p-6">
      <div className=" p-6 bg-white rounded-lg shadow-lg text-black">
        <table className="w-full ">
          <thead className="text-kikaeBlue">
            <tr>
              <th className="p-2 text-left"> Name</th>

              <th className="p-2 text-left">States Covered</th>
              <th className="p-2 text-left">Areas covered</th>
              {/*   <th className="p-2 text-left">Base Fee (₦)</th> */}
              <th className="p-2 text-left">Company email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">{logistic?.name}</td>

              <td className="p-2">{statesCovered?.join(", ")}</td>
              <td className="p-2">{areasCovered?.join(", ")}</td>
              {/*    <td className="p-2">{logisticsProvider.baseFee}</td> */}
              <td className="p-2">{logistic?.email}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex items-center mt-4 gap-6">
          <div className="">
            <p className="font-medium text-blue-500">Number</p>
            <p>{logistic?.phone}</p>
          </div>
          {/*   <div className="">
            <p className="font-medium text-blue-500">Company Contact Number</p>
            <p>{logisticsProvider.contactNumber}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
