"use client";

import { normalizeStatus, ORDER_STATUS, SERVICE_STATUS } from "@/lib/utils";
import { updateOrderStatus } from "@/networking/endpoints/Orders/updateOrderStatus";
import { OrdersResponseType } from "@/types/apiResponseType/OrdersResponseType";
import type { orderStatus } from "@/types/UserOrdersTypes";
import { useRouter } from "next/navigation";
import { ConfirmationDialog } from "./ConfrimationDialog";
import { useState } from "react";

const FinancialActivity = ({
  ordersResponse,
  financialStats,
  isLoading,
  setOrders,
}: {
  ordersResponse: OrdersResponseType | null;
  financialStats: {
    label: string;
    amount: number;
  }[];
  isLoading: boolean;
  setOrders: (value: OrdersResponseType) => void;
}) => {
  const router = useRouter();
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    orderId?: number;
    selectedStatus?: orderStatus;
  }>({
    isOpen: false,
    title: "",
  });
  const goToProductPage = (productId: string | number, type: string) => {
    router.push(`/dashboard/products/${productId}?type=${type}`);
  };

  const handleUpdateOrderStatus = async (
    id: number,
    selectedStatus: orderStatus
  ) => {
    const result = await updateOrderStatus(id, selectedStatus);

    console.log({ result })

    if (!result) return false
    const updatedOrders =
      ordersResponse?.data.map((item) =>
        item.id === id ? { ...item, status: selectedStatus } : item
      ) ?? [];

    setOrders({
      ...(ordersResponse ?? {}),
      data: updatedOrders,
      current_page: ordersResponse?.current_page ?? 1,
      first_page_url: ordersResponse?.first_page_url ?? "",
      from: ordersResponse?.from ?? 0,
      last_page: ordersResponse?.last_page ?? 0,
      last_page_url: ordersResponse?.last_page_url ?? "",
      links: ordersResponse?.links ?? [],
      next_page_url: ordersResponse?.next_page_url ?? null,
      path: ordersResponse?.path ?? "",
      per_page: ordersResponse?.per_page ?? 0,
      prev_page_url: ordersResponse?.prev_page_url ?? null,
      to: ordersResponse?.to ?? 0,
      total: ordersResponse?.total ?? 0,
    });
  };



  const handleStatusChangeWithConfirmation = (
    id: number,
    selectedStatus: orderStatus,
    title: string
  ) => {
    setConfirmDialog({
      isOpen: true,
      title,
      orderId: id,
      selectedStatus,
    });
  };

  const handleConfirmStatusChange = () => {
    if (
      confirmDialog.orderId !== undefined &&
      confirmDialog.selectedStatus !== undefined
    ) {
      handleUpdateOrderStatus(confirmDialog.orderId, confirmDialog.selectedStatus);
      setConfirmDialog({ isOpen: false, title: "" });
    }
  };

  const handleCancelStatusChange = () => {
    setConfirmDialog({ isOpen: false, title: "" });
  };

  const Action = ({ id, status }: { id: number; status: orderStatus }) => {
    if (normalizeStatus(status.toLocaleLowerCase()) == ORDER_STATUS.ORDER_PLACED) {
      return <button>Pending Vendor Confirmation</button>;
    }

    if (normalizeStatus(status.toLocaleLowerCase()) == ORDER_STATUS.READY_FOR_DELIVERY) {
      return (
        <button onClick={() => handleStatusChangeWithConfirmation(id, "dispatched", "Are you sure you want to dispatch this order?")}>
          Dispatch
        </button>
      );
    }

    if (normalizeStatus(status.toLocaleLowerCase()) == ORDER_STATUS.DISPATCHED) {
      return (
        <button onClick={() => handleStatusChangeWithConfirmation(id, "delivered", "Are you sure you want to confirm delivery for this order?")}>
          Confirm Delivery
        </button>
      );
    } if (status.toLocaleLowerCase() == ORDER_STATUS.DELIVERED) {
      return <button>Delivered</button>;
    }

    if (status.toLocaleLowerCase() == SERVICE_STATUS.SERVICE_PENDING) {
      return <button>Confirmed</button>;
    }
    if (status.toLocaleLowerCase() == SERVICE_STATUS.SERVICE_BOOKED) {
      return <button>
        Pending Customer Confirmation
      </button>;
    }

    if (status.toLocaleLowerCase() == SERVICE_STATUS.SETTLED) {
      return <button>
        Pending Customer Confirmation
      </button>;
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

  if (!ordersResponse || ordersResponse.data.length === 0) {
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
      <ConfirmationDialog isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        onConfirm={handleConfirmStatusChange}
        onCancel={handleCancelStatusChange}
        confirmText="Yes"
        cancelText="No" />
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
            {ordersResponse.data.map((order) => (
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
                  className={`capitalize p-2 font-bold ${order.status?.toLocaleLowerCase() === "delivered"
                    ? "text-green-600"
                    : order.status?.toLocaleLowerCase() === "out for delivery"
                      ? "text-orange-500"
                      : order.status?.toLocaleLowerCase() === "returned"
                        ? "text-red-500"
                        : "text-blue-500"
                    }`}
                >
                  {order.status?.replace(/_/g, " ")}
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
