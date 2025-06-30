import { mediaUrlPrefix } from "@/networking/apiUrl";
//import { getStoreOrders } from "@/networking/endpoints/vendors/getStoreOrders";
import { OrderItem } from "@/types/UserOrdersTypes";
import Image from "next/image";
//import { useParams } from "next/navigation";
//import React, { useEffect, useState } from "react";

const VendorOrders = ({ storeOrders }: { storeOrders: OrderItem[] }) => {
  //const [storeOrders, setStoreOrders] = useState<OrderItem[]>();
  //  const params = useParams<{ id: string }>();

  /*   useEffect(() => {
    const handleGetStoreOrders = async () => {
      const result = await getStoreOrders(params.id);
      if (result) {
        //setStoreOrders(result.data);
      }
    };

    handleGetStoreOrders();
  }, [params.id]); */

  if (!storeOrders || storeOrders.length == 0) {
    return <h4>No Product has been uploaded to this store</h4>;
  }
  return (
    <div className="flex gap-6 mt-6">
      {storeOrders?.length !== 0 &&
        storeOrders?.map((item) => (
          <div
            key={item.id}
            className="w-80 bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <div className="relative w-[4.375rem] h-[3.4375rem] mb-3">
              <Image
                src={mediaUrlPrefix + item.product.media[0].url}
                alt="Long Sleeve T-Shirts"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <h2 className="text-blue-600 text-sm font-semibold mb-1">
              Long Sleeve T-Shirts
            </h2>
            <p className="text-gray-500 text-xs">Ajah, Lagos - ₦60,000</p>
            <div className="text-sm mt-2">
              <p>
                <span className="font-semibold">Colour:</span> Blue
              </p>
              <p>
                <span className="font-semibold">Size:</span> XXL
              </p>
              <p>
                <span className="font-semibold">Quantity:</span> 1
              </p>
            </div>
            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-3xl text-sm font-semibold hover:bg-blue-700 transition">
              Ready for delivery
            </button>
          </div>
        ))}
    </div>
  );
};

export default VendorOrders;
