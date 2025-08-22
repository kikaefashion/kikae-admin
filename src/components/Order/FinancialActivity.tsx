"use client";

import { updateOrderStatus } from "@/networking/endpoints/Orders/updateOrderStatus";
import type { OrderItem, orderStatus } from "@/types/UserOrdersTypes";
import { useRouter } from "next/navigation";

const FinancialActivity = ({
  orders,
  financialStats,
  isLoading,
  setOrders,
}: {
  orders: OrderItem[];
  financialStats: {
    label: string;
    amount: number;
  }[];
  isLoading: boolean;
  setOrders: (value: OrderItem[]) => void;
}) => {
  const router = useRouter();
  const goToProductPage = (productId: string | number, type: string) => {
    router.push(`/dashboard/products/${productId}?type=${type}`);
  };

  const handleUpdateOrderStatus = async (
    id: number,
    selectedStatus: orderStatus
  ) => {
    updateOrderStatus(id, selectedStatus);
    const filteredOrders = orders.filter((item) => item.id != id);

    setOrders(filteredOrders);
  };

  const Action = ({ id, status }: { id: number; status: orderStatus }) => {
    if (status.toLocaleLowerCase() == "order placed") {
      return <button>Pending Vendor Confirmation</button>;
    }

    if (status.toLocaleLowerCase() == "ready for delivery") {
      return (
        <button onClick={() => handleUpdateOrderStatus(id, "dispatched")}>
          Dispatch
        </button>
      );
    }

    if (status.toLocaleLowerCase() == "dispatched") {
      return (
        <button onClick={() => handleUpdateOrderStatus(id, "delivered")}>
          Confirm Delivery
        </button>
      );
    }

    if (status.toLocaleLowerCase() == "confirmed") {
      return <button>Confirmed</button>;
    }

    if (status.toLocaleLowerCase() == "delivered") {
      return <button>Delivered</button>;
    }
    return null;
  };

  if (isLoading) {
    return (
      <div>
        {/* Loading state for financial stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="p-4 border rounded-md shadow-sm text-center animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>

        {/* Loading state for orders table */}
        <div className="overflow-x-auto mt-6">
          <div className="bg-white rounded-3xl p-4 animate-pulse">
            <div className="space-y-3">
              <div className="grid grid-cols-11 gap-4">
                {[...Array(11)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="grid grid-cols-11 gap-4">
                  {[...Array(11)].map((_, j) => (
                    <div key={j} className="h-3 bg-gray-100 rounded"></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div>
        {/* Financial stats still show even when no orders */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          {financialStats &&
            financialStats.map((stat) => (
              <div
                key={stat.label}
                className="p-4 border rounded-md shadow-sm text-center"
              >
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-lg font-bold">
                  ₦{stat.amount.toLocaleString()}
                </p>
              </div>
            ))}
        </div>

        {/* Enhanced empty state for orders */}
        <div className="overflow-x-auto mt-6">
          <div className="bg-white rounded-3xl p-8">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                No Orders Found
              </h3>
              <p className="text-gray-500 max-w-md mb-6">
                There are no orders to display at the moment. Orders will appear
                here once customers start making purchases.
              </p>
              <div className="text-sm text-gray-400">
                Try adjusting your filters or check back later for new orders.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
              <p className="text-lg font-bold">
                ₦{stat.amount.toLocaleString()}
              </p>
            </div>
          ))}
      </div>

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
            {orders.map((order) => (
              //  console.log({order:order.size})
              <tr key={order.id} className=" hover:bg-gray-100er">
                <td className=" p-2">{order.id}</td>
                <td
                  onClick={() => {
                    if (order.product.isMakeup == "1") {
                      goToProductPage(order.product.id, "makeup");
                    } else if (order.product.price == 0) {
                      goToProductPage(order.product.id, "freebies");
                    } else {
                      goToProductPage(order.product.id, "product");
                    }
                  }}
                  className=" p-2  underline cursor-pointer"
                >
                  {order.product.name}
                </td>
                <td className=" p-2">₦{order.price.toLocaleString()}</td>
                <td className=" p-2">{order.product.shop.name}</td>
                <td className=" p-2">{order.transaction.user.fname}</td>
                <td className=" p-2">{order.transaction.delivery_address}</td>
                <td className=" p-2">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className=" p-2">{order.sizes.size}</td>
                <td className=" p-2">{order.units}</td>
                <td
                  className={` p-2 font-bold ${
                    order.status?.toLocaleLowerCase() === "delivered"
                      ? "text-green-600"
                      : order.status?.toLocaleLowerCase() === "out for delivery"
                      ? "text-orange-500"
                      : order.status?.toLocaleLowerCase() === "returned"
                      ? "text-red-500"
                      : "text-blue-500"
                  }`}
                >
                  {order.status}
                </td>
                <td className=" p-2 text-kikaeGrey underline cursor-pointer">
                  <Action id={order.id} status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialActivity;
