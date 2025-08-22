"use client";

import { getReturns } from "@/networking/endpoints/getReturns";
import type { ReturnRequest } from "@/types/returnType";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { useRouter } from "next/navigation";
import ApproveReturn from "./ApproveReturn";
import ReportedProducts from "./ReportedProducts";

const PendingActions = () => {
  const router = useRouter();

  const [returns, setReturns] = useState<ReturnRequest>();
  const [isLoading, setIsLoading] = useState(true);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [returnId, setReturnId] = useState<number>();
  const [decision, setDecision] = useState<"approved" | "rejected">();
  const [activeView, setActiveView] = useState<"refunds" | "flagged">(
    "refunds"
  );

  const goToProductPage = (productId: string | number, type: string) => {
    router.push(`/dashboard/products/${productId}?type=${type}`);
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleGetReturns = async () => {
    try {
      const result = await getReturns();
      setReturns(result.data);
      console.log({ result });
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetReturns();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  if (returns?.data.length == 0 && activeView === "refunds") {
    return null;
  }

  const openModal = (id: number, decision: "approved" | "rejected") => {
    setReturnId(id);
    setIsApproveModalVisible(true);
    setDecision(decision);
  };
  const handleCloseModal = () => {
    setIsApproveModalVisible(false);
  };

  return (
    <div className="overflow-x-auto mt-6 gap-6 flex flex-col">
      {returnId && decision && returns && (
        <ApproveReturn
          id={returnId?.toString()}
          isVisible={isApproveModalVisible}
          close={handleCloseModal}
          decision={decision}
          returns={returns}
          setReturns={setReturns}
        />
      )}
      <div className="rounded-3xl flex-row flex justify-between">
        <div className="bg-white rounded-3xl">
          <button
            className={`px-3.5 py-2.5 rounded-3xl ${
              activeView === "refunds"
                ? "bg-kikaeBlue text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setActiveView("refunds")}
          >
            Refund Requests
          </button>
          <button
            className={`px-3.5 py-2.5 rounded-3xl ${
              activeView === "flagged"
                ? "bg-kikaeBlue text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setActiveView("flagged")}
          >
            Flagged Products
          </button>
        </div>
        <div>
          <button className="px-3.5 py-2.5 flex items-center gap-2 bg-white text-[#aaa5a4] rounded-3xl">
            Pending Actions
            <button
              onClick={handleGoBack}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </button>
        </div>
      </div>

      {activeView === "refunds" ? (
        <table className="w-full text-left bg-white rounded-3xl">
          <thead className="text-kikaeBlue">
            <tr>
              <th className="p-2">Order ID</th>
              <th className="p-2">Product name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Address</th>
              <th className="p-2">Date</th>
              <th className="p-2">Size</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {returns?.data.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="p-2">{order.id}</td>
                <td
                  onClick={() => {
                    if (order.order.product.isMakeup == "1") {
                      goToProductPage(order.order.product.id, "makeup");
                    } else if (order.order.product.price == 0) {
                      goToProductPage(order.order.product.id, "freebies");
                    } else {
                      goToProductPage(order.order.product.id, "product");
                    }
                  }}
                  className="p-2 underline cursor-pointer"
                >
                  {order.order.product.name}
                </td>
                <td className="p-2">₦{order.order.price.toLocaleString()}</td>
                <td className="p-2">{order.order.transaction.user.fname}</td>
                <td className="p-2">
                  {order.order.transaction.delivery_address}
                </td>
                <td className="p-2">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="p-2">{order.order.sizes.size}</td>
                <td className="p-2">{order.order.units}</td>
                <td
                  className={`p-2 font-bold ${
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
                <td className="p-2 text-kikaeGrey underline cursor-pointer">
                  <button
                    onClick={() => openModal(order.id, "approved")}
                    className="font-bold underline text-black mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => openModal(order.id, "rejected")}
                    className="underline"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ReportedProducts />
      )}
    </div>
  );
};

export default PendingActions;
