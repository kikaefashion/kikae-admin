import { OrderItem } from "@/types/UserOrdersTypes";
import React from "react";
/* const products = [
  { date: "05/12/2024", rating: 1, amount: 6000, status: "approved" },
  { date: "05/12/2024", rating: 2, amount: 6000, status: "approved" },
  { date: "05/12/2024", rating: 3, amount: 6000, status: "approved" },
  { date: "05/12/2024", rating: 4, amount: 6000, status: "approved" },
  { date: "05/12/2024", rating: 5, amount: 6000, status: "approved" },
  { date: "05/12/2024", rating: 6, amount: 6000, status: "approved" },
  { date: "05/12/2024", rating: 7, amount: 6000, status: "approved" },
  { date: "05/12/2024", rating: 8, amount: 6000, status: "approved" },
  { date: "05/12/2024", rating: 9, amount: 6000, status: "approved" },
  { date: "05/12/2024", rating: 10, amount: 6000, status: "approved" },
]; */

const FinancialMetrics = ({ orders = [] }: { orders: OrderItem[] }) => {
  if (orders.length == 0) {
    return null;
  }
  return (
    <div>
      <p>Payment Details</p>
      <table className="w-full border-collapse border border-gray-200 text-black">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Amount</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 p-2">
                {new Date(order.created_at).toDateString()}
              </td>
              <td className="border border-gray-300 p-2">{order.name}</td>
              <td className="border border-gray-300 p-2">{order.price}</td>
              <td className="border border-gray-300 p-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialMetrics;
