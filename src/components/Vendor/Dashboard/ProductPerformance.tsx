import React from "react";
/* const products = [
  {
    prodcts: "fine T-shirt",
    No_sold: 5,
    revenue_generated: 5000,
  },
  {
    prodcts: "fine T-shirt",
    No_sold: 5,
    revenue_generated: 5000,
  },
  {
    prodcts: "fine T-shirt",
    No_sold: 5,
    revenue_generated: 5000,
  },
  {
    prodcts: "fine T-shirt",
    No_sold: 5,
    revenue_generated: 5000,
  },
  {
    prodcts: "fine T-shirt",
    No_sold: 5,
    revenue_generated: 5000,
  },
  {
    prodcts: "fine T-shirt",
    No_sold: 5,
    revenue_generated: 5000,
  },
]; */
let totalSales = 0;
const ProductPerformance = ({
  salesData,
}: {
  salesData: {
    product_name: string;
    total_revenue: number;
    units_sold: number;
    views: number;
  }[];
}) => {
  const mostViewedProduct = salesData.reduce(
    (max, item) => (item?.views > max?.views ? item : max),
    salesData[0]
  );
  salesData.map((item) => (totalSales += item?.units_sold));
  return (
    <div>
      <p className="text-gray-700">
        <strong>Most viewed product:</strong> {mostViewedProduct?.product_name}{" "}
        ({mostViewedProduct?.views} Views)
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Revenue Generated: </strong>All sales ({totalSales} Sales)
      </p>

      <table className="w-full text-black border-none">
        <thead>
          <tr className="flex space-x-4 text-left">
            <th className="p-2 bg-white border-md flex-1">Products</th>
            <th className="p-2 bg-white border-md flex-1">Views</th>
            <th className="p-2 bg-white border-md flex-1">Sales</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sales, index) => (
            <tr key={index} className="text-center flex space-x-4">
              <td className="p-2 flex-1">{sales.product_name}</td>
              <td className="p-2 flex-1">{sales?.views || 0}</td>
              <td className="p-2 flex-1">{sales.units_sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPerformance;
