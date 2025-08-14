import { ArrowBack } from "@/assets/ArrowBack";
import { mediaUrlPrefix } from "@/networking/apiUrl";
import { useBoundStore } from "@/store/store";
import { useRouter } from "next/navigation";
import React from "react";

const OngoingDelivery = () => {
  const userOngoingDelivery = useBoundStore((state) => state.ongoingDelivery);
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
        {userOngoingDelivery.map((order) => (
          <div key={order.id} className="p-3 rounded-3xl relative">
            <img
              src={
                mediaUrlPrefix + order.product.media[0].url ||
                "/placeholder.svg"
              }
              alt={order.name}
              className="rounded-3xl w-full"
            />
            <p className="text-xs bg-black/35 text-white px-2 py-1 rounded-full inline-block mt-2 absolute top-2.5 left-6">
              Order {order.id}
            </p>
            <h3 className="mt-1 text-black">{order.name}</h3>
            <p className="text-kikaeGrey">₦{order.price}</p>
            <p className="text-kikaeGrey text-sm">{order.product.thrift}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OngoingDelivery;
