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
          {products.map((product, index) => (
            <tr key={index} className="text-center flex space-x-4">
              <td className="p-2 flex-1">{product.order_id}</td>
              <td className="p-2 flex-1">{product.name}</td>
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
