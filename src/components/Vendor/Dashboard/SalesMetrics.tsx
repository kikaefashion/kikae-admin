import React from "react";

/* const products = [
  { name: "T-shirt and sleeves", views: 1, sales: 5 },
  { name: "Long sleeves", views: 2, sales: 10 },
  { name: "Jean trouser", views: 3, sales: 30 },
  { name: "Wrist watch", views: 4, sales: 33 },
  { name: "Glam Makeup", views: 10, sales: 36 },
  { name: "Glam Makeup", views: 14, sales: 49 },
  { name: "Glam Makeup", views: 25, sales: 59 },
  { name: "Glam Makeup", views: 26, sales: 69 },
  { name: "Glam Makeup", views: 35, sales: 198 },
  { name: "Glam Makeup", views: 45, sales: 395 },
  { name: "Glam Makeup", views: 55, sales: 467 },
  { name: "Glam Makeup", views: 56, sales: 486 },
  { name: "Glam Makeup", views: 60, sales: 586 },
  { name: "Glam Makeup", views: 61, sales: 684 },
  { name: "Glam Makeup", views: 65, sales: 893 },
  { name: "Glam Makeup", views: 70, sales: 899 },
  { name: "Glam Makeup", views: 80, sales: 902 },
]; */

const SalesMetrics = ({
  salesData,
}: {
  salesData: {
    product_name: string;
    total_revenue: number;
    units_sold: number;
  }[];
}) => {
  const totalSalesVolume = salesData.reduce(
    (total, item) => total + (Number(item.units_sold) || 0),
    0
  );

  const totalRevenueGenerated = salesData.reduce(
    (total, item) => total + (Number(item.total_revenue) || 0),
    0
  );
  return (
    <div>
      <p className="text-gray-700">
        <strong>Total Sales Volume:</strong> {totalSalesVolume} Items
      </p>

      <p className="text-gray-700 mb-4">
        <strong>Revenue Generated: </strong> ₦
        {totalRevenueGenerated?.toLocaleString()}
      </p>

      <table className="w-full text-black border-none  ">
        <thead>
          <tr className="flex space-x-4 text-left">
            <th className="p-2 bg-white border-md flex-1">Products</th>
            <th className="p-2 bg-white border-md flex-1">No. sold</th>
            <th className="p-2 bg-white border-md flex-1">Revenue Generated</th>
          </tr>
        </thead>
        <tbody>
          {salesData &&
            salesData.map((product, index: number) => (
              <tr key={index} className="text-center flex space-x-4">
                <td className="p-2 flex-1">{product.product_name}</td>
                <td className="p-2 flex-1">{product.units_sold}</td>
                <td className="p-2 flex-1">
                  {product.total_revenue?.toLocaleString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesMetrics;
