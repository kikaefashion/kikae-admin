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
const ProductPerformance = ({
  salesData,
}: {
  salesData: {
    product_name: string;
    total_revenue: number;
    units_sold: number;
  }[];
}) => {
  return (
    <div>
      <p className="text-gray-700">
        <strong>Total Sales Volume:</strong> 700 Items
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Repeat customers: </strong> 120(400 Sales)
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Revenue Generated: </strong> ₦1,000,000
      </p>

      <table className="w-full border-collapse border border-gray-200 text-black">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Products</th>
            <th className="border border-gray-300 p-2">No. sold</th>
            <th className="border border-gray-300 p-2">Revenue generated</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sales, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 p-2">
                {sales.product_name}
              </td>
              <td className="border border-gray-300 p-2">{0}</td>
              <td className="border border-gray-300 p-2">{sales.units_sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPerformance;
