import React from "react";

const products = [
  {
    name: "T-shirt and sleeves",
    status: "pending",
    reason: 5,
    order_id: "12345",
  },
  { name: "Long sleeves", status: "pending", reason: 2, order_id: "12345" },
  { name: "Jean trouser", status: "pending", reason: 3, order_id: "12345" },
  { name: "Wrist watch", status: "pending", reason: 4, order_id: "12345" },
  { name: "Glam Makeup", status: "pending", reason: 10, order_id: "12345" },
  { name: "Glam Makeup", status: "pending", reason: 14, order_id: "12345" },
  { name: "Glam Makeup", status: "pending", reason: 25, order_id: "12345" },
  { name: "Glam Makeup", status: "pending", reason: 26, order_id: "12345" },
  { name: "Glam Makeup", status: "pending", reason: 35, order_id: "12345" },
  { name: "Glam Makeup", status: "pending", reason: 45, order_id: "12345" },
];

const LogisticsMetrics = () => {
  return (
    <div>
      <p className="text-gray-700">
        <strong>Most viewed product:</strong> T-shirt and sleeves (3,000 Views)
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Revenue Generated:</strong> T-shirt and sleeves (400 Sales)
      </p>

      <table className="w-full border-collapse border border-gray-200 text-black">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Order id</th>
            <th className="border border-gray-300 p-2">Products</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Reason</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 p-2">{product.order_id}</td>
              <td className="border border-gray-300 p-2">{product.name}</td>
              <td className="border border-gray-300 p-2">{product.reason}</td>
              <td className="border border-gray-300 p-2">{product.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogisticsMetrics;
