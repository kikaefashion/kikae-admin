import { getLogisticsMetrics } from "@/networking/endpoints/vendors/getLogisticMetrics";
import { useBoundStore } from "@/store/store";
import { vendorLogisticsMetrics } from "@/types/storeType";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const LogisticsMetrics = ({
  start_date,
  end_date,
}: {
  start_date: Date;
  end_date: Date;
}) => {
  const [logisticsMetrics, setLogisticsMetrics] =
    React.useState<vendorLogisticsMetrics>();
  const store_id = useBoundStore((state) => state.vendorDetails?.id);
  const params = useParams<{ id: string }>();
  /* 
  const startDate = ` ${start_date.getDate()}-${start_date.getMonth()}-${start_date.getFullYear()}`;
  const endDate = ` ${end_date.getDate()}-${end_date.getMonth()}-${end_date.getFullYear()}`; */

  /** ✅ Format date into DD-MM-YYYY */
  const formatDate = (date: Date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-GB").split("/").join("-");
  };

  const startDate = formatDate(start_date);
  const endDate = formatDate(end_date);

  const handleGetLogisticsMetrics = async () => {
    const result = await getLogisticsMetrics(params.id, startDate, endDate);
    if (result) {
      setLogisticsMetrics(result || [null]);
    }
  };
  //console.log({ start_date, end_date });

  useEffect(() => {
    handleGetLogisticsMetrics();
  }, [store_id, startDate, endDate]);

  console.log({ startDate, endDate });
  return (
    <div>
      <p className="text-gray-700">
        <strong>Fulfillment rate</strong> :{" "}
        {logisticsMetrics?.fulfillment_rate || 0}
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Total return requests:</strong>{" "}
        {logisticsMetrics?.total_return_requests || 0}
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Avearage Delivery time:</strong>{" "}
        {logisticsMetrics?.average_delivery_time || "N/A"}
      </p>

      <table className="w-full text-black border-none">
        <thead>
          <tr className="flex space-x-4 text-left">
            <th className="p-2 bg-white border-md flex-1">Order id</th>
            <th className="p-2 bg-white border-md flex-1">Products</th>
            <th className="p-2 bg-white border-md flex-1">Status</th>
            <th className="p-2 bg-white border-md flex-1">Reason</th>
          </tr>
        </thead>
        <tbody>
          {logisticsMetrics &&
            logisticsMetrics.return_requests?.data.map((product, index) => (
              <tr key={index} className="text-center flex space-x-4">
                <td className="p-2 flex-1">{product.order_id}</td>
                <td className="p-2 flex-1">{product.product_name}</td>
                <td className="p-2 flex-1">{product.reason}</td>
                <td className="p-2 flex-1">{product.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogisticsMetrics;
