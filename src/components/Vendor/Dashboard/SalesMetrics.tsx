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
  return (
    <div>
      <p className="text-gray-700">
        <strong>Most viewed product:</strong> T-shirt and sleeves (3,000 Views)
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Revenue Generated:</strong> T-shirt and sleeves (400 Sales)
      </p>

      <table className="w-full text-black">
        <thead>
          <tr className="">
            <th className="border border-gray-300 p-2">Products</th>
            <th className="border border-gray-300 p-2">Views</th>
            <th className="border border-gray-300 p-2">Sales</th>
          </tr>
        </thead>
        <tbody>
          {salesData &&
            salesData.map((product, index: number) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 p-2">
                  {product.product_name}
                </td>
                <td className="border border-gray-300 p-2">
                  {product.units_sold}
                </td>
                <td className="border border-gray-300 p-2">
                  {product.total_revenue}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesMetrics;
