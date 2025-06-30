import { ArrowBack } from "@/assets/ArrowBack";
import { useRouter } from "next/navigation";
import React from "react";

const orders = [
  {
    id: "#882346",
    name: "Vintage shirt roll-up",
    price: "₦60,000",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
  {
    id: "#882346",
    name: "Vintage shirt roll-up",
    price: "₦60,000",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
  {
    id: "#882346",
    name: "Vintage shirt roll-up",
    price: "₦60,000",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
  {
    id: "#882346",
    name: "Vintage shirt roll-up",
    price: "₦60,000",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
];

const OngoingDelivery = () => {
  const router = useRouter();
  return (
    <div className="p-6 text-black">
      <div className="flex flex-row items-center gap-6 mb-6">
        <button onClick={() => router.back()}>
          <ArrowBack />
        </button>
        <h2 className="text-xl font-semibold ">Ongoing Delivery</h2>
      </div>

      {/* Order List */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {orders.map((order, index) => (
          <div key={index} className="">
            <div className="relative">
              <span className="absolute top-2 left-2 bg-black/35 text-white text-xs px-2 py-1 rounded-3xl">
                Order {order.id}
              </span>
              <img
                src={order.image}
                alt={order.name}
                className="w-[11.43rem] h-[12.81rem]  object-cover rounded-3xl"
              />
            </div>
            <div className="mt-2 ">
              <h3 className="font-semibold">{order.name}</h3>
              <p className="text-gray-600">{order.price}</p>
              <span className="text-xs text-gray-400">Thrift</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OngoingDelivery;
