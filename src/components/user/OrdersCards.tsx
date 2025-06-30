"use client";
import { ArrowBack } from "@/assets/ArrowBack";
import { mediaUrlPrefix } from "@/networking/apiUrl";
import { useBoundStore } from "@/store/store";
import { useRouter } from "next/navigation";
import React from "react";

/* const orders = [
  {
    id: "#882946",
    name: "Vintage shirt roll-up",
    price: "₦60,000",
    category: "Thrift",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg", // Replace with actual image
  },
  {
    id: "#882946",
    name: "Vintage shirt roll-up",
    price: "₦60,000",
    category: "Thrift",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
  {
    id: "#882946",
    name: "Vintage shirt roll-up",
    price: "₦60,000",
    category: "Thrift",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
  {
    id: "#882946",
    name: "Grey suit and hat",
    price: "₦80,000",
    category: "Thrift",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
  {
    id: "#882946",
    name: "Grey suit and hat",
    price: "₦80,000",
    category: "Thrift",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
];
 */
const OrdersGrid = () => {
  const router = useRouter();

  const userOrders = useBoundStore((state) => state.userOrders);

  return (
    <div className="p-6 text-black">
      <div className="flex flex-row items-center justify-between mb-6">
        <div className="flex flex-row items-center gap-6">
          <button onClick={() => router.back()} className="cursor-pointer">
            <ArrowBack />
          </button>

          <h2 className="text-xl font-semibold ">Orders</h2>
        </div>

        {/* Month Selector */}
        <div className="flex ">
          <label className="text-gray-600 mr-2">Select month:</label>
          <select className="border p-1 rounded-md">
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
          </select>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
        {userOrders.length !== 0 &&
          userOrders.map((order, index) => (
            <div key={index} className="p-3 rounded-3xl relative">
              <img
                src={mediaUrlPrefix + order.product.media[0].url}
                alt={order.name}
                className="rounded-3xl w-full"
              />
              <p className="text-xs bg-black/35 text-white px-2 py-1 rounded-full inline-block mt-2 absolute top-2.5 left-6">
                Order {order.id}
              </p>
              <h3 className="mt-1 text-black">{order.name}</h3>
              <p className="text-kikaeGrey">{order.price}</p>
              <p className="text-kikaeGrey text-sm">{order.product.thrift}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrdersGrid;
