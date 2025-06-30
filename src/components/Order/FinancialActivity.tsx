"use client";

import { OrderItem } from "@/types/UserOrdersTypes";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
/* const financialStats = [
  { label: "Total sales", amount: "₦5,200,000" },
  { label: "Pending payouts", amount: "₦1,250,000" },
  { label: "Available payouts", amount: "₦3,950,000" },
  { label: "Transaction fees", amount: "₦150,000" },
  { label: "Refunds issued", amount: "₦300,000" },
]; */

/* const orders = [
  {
    id: 8829346,
    product: "Long sleeve T-shirts",
    price: "₦60,000",
    vendor: "Anita Rose",
    customer: "John Doe",
    address: "82 Ray Str, Lekki, Lagos",
    date: "10-12-24",
    size: "S, M, XL",
    qty: 100,
    status: "Order placed",
    type: "product",
  },
  {
    id: 8829346,
    product: "Long sleeve T-shirts",
    price: "₦60,000",
    vendor: "Anita Rose",
    customer: "John Doe",
    address: "82 Ray Str, Lekki, Lagos",
    date: "10-12-24",
    size: "S, M, XL",
    qty: 100,
    status: "Confirmed",
    type: "product",
  },
  {
    id: 8829346,
    product: "Long sleeve T-shirts",
    price: "₦60,000",
    vendor: "Anita Rose",
    customer: "John Doe",
    address: "82 Ray Str, Lekki, Lagos",
    date: "10-12-24",
    size: "S, M, XL",
    qty: 100,
    status: "Out for delivery",
    type: "product",
  },
  {
    id: 8829346,
    product: "Long sleeve T-shirts",
    price: "₦60,000",
    vendor: "Anita Rose",
    customer: "John Doe",
    address: "82 Ray Str, Lekki, Lagos",
    date: "10-12-24",
    size: "S, M, XL",
    qty: 100,
    status: "Delivered",
    type: "product",
  },
  {
    id: 8829346,
    product: "Long sleeve T-shirts",
    price: "₦60,000",
    vendor: "Anita Rose",
    customer: "John Doe",
    address: "82 Ray Str, Lekki, Lagos",
    date: "10-12-24",
    size: "S, M, XL",
    qty: 100,
    status: "Completed",
    type: "product",
  },
  {
    id: 8829346,
    product: "Long sleeve T-shirts",
    price: "₦60,000",
    vendor: "Anita Rose",
    customer: "John Doe",
    address: "82 Ray Str, Lekki, Lagos",
    date: "10-12-24",
    size: "S, M, XL",
    qty: 100,
    status: "Returned",
    type: "product",
  },
];
 */
const FinancialActivity = ({
  orders,
  financialStats,
}: {
  orders: OrderItem[];
  financialStats: {
    label: string;
    amount: number;
  }[];
}) => {
  const router = useRouter();
  const goToProductPage = (productId: string | number, type: string) => {
    router.push(`/dashboard/products/${productId}?type=${type}`);
  };

  useEffect(() => {}, []);

  if (orders?.length === 0) {
    return <div>No orders found</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
        {financialStats &&
          financialStats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 border rounded-md shadow-sm text-center"
            >
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-lg font-bold">{stat.amount}</p>
            </div>
          ))}
      </div>

      {
        <div className="overflow-x-auto mt-6">
          <table className="w-full  text-left bg-white rounded-3xl">
            <thead className="text-kikaeBlue">
              <tr className="">
                <th className=" p-2">Order ID</th>
                <th className=" p-2">Product name</th>
                <th className=" p-2">Price</th>
                <th className=" p-2">Vendor</th>
                <th className=" p-2">Customer</th>
                <th className=" p-2">Address</th>
                <th className=" p-2">Date</th>
                <th className=" p-2">Size</th>
                <th className=" p-2">Qty</th>
                <th className=" p-2">Status</th>
                <th className=" p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr
                    onClick={() => {
                      if (order.product.isMakeup == "1") {
                        goToProductPage(order.product.id, "makeup");
                      } else if (order.product.price == 0) {
                        goToProductPage(order.product.id, "freebies");
                      } else {
                        goToProductPage(order.product.id, "product");
                      }
                    }}
                    key={order.id}
                    className=" hover:bg-gray-100 cursor-pointer"
                  >
                    <td className=" p-2">{order.id}</td>
                    <td className=" p-2  underline cursor-pointer">
                      {order.product.name}
                    </td>
                    <td className=" p-2">{order.price}</td>
                    <td className=" p-2">{order.product.shop.name}</td>
                    <td className=" p-2">{order.transaction.user.fname}</td>
                    <td className=" p-2">{order.delivery_address}</td>
                    <td className=" p-2">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className=" p-2">{order.size}</td>
                    <td className=" p-2">{order.units}</td>
                    <td
                      className={` p-2 font-bold ${
                        order.status === "Delivered"
                          ? "text-green-600"
                          : order.status === "Out for delivery"
                          ? "text-orange-500"
                          : order.status === "Returned"
                          ? "text-red-500"
                          : "text-blue-500"
                      }`}
                    >
                      {order.status}
                    </td>
                    <td className=" p-2 text-kikaeGrey underline cursor-pointer">
                      View
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
};

export default FinancialActivity;
