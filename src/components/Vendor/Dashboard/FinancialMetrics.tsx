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
      <table className="w-full text-black border-none">
        <thead>
          <tr className="flex space-x-4 text-left">
            <th className="p-2 bg-white border-md flex-1">Date</th>
            <th className="p-2 bg-white border-md flex-1">Name</th>
            <th className="p-2 bg-white border-md flex-1">Amount</th>
            <th className="p-2 bg-white border-md flex-1">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="text-center flex space-x-4">
              <td className="p-2 flex-1">
                {new Date(order.created_at).toDateString()}
              </td>
              <td className="p-2 flex-1">{order.name}</td>
              <td className="p-2 flex-1">{order.price}</td>
              <td className="p-2 flex-1">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialMetrics;
