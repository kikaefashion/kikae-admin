import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import BankCardList from "./BankDetails";

import VendorProducts from "./VendorProducts";
import VendorOrders from "./VendorOrders";
import { OrderItem } from "@/types/UserOrdersTypes";
import { getStoreOrders } from "@/networking/endpoints/vendors/getStoreOrders";
import { productData } from "@/types/ProductType";
import { getStoreProducts } from "@/networking/endpoints/vendors/getStoreProduct";
import { Runway } from "@/types/runwayVideosType";
import { getStoreRunwayVideos } from "@/networking/endpoints/runway/getStoreRunwayVideos";
import StoreRunwayVideos from "./StoreRunwayVideos";

const StoreContent = () => {
  const page = useSearchParams().get("page");
  const params = useParams<{ id: string }>();
  const [storeOrders, setStoreOrders] = useState<OrderItem[]>([]);
  const [storeProducts, setStoreProducts] = useState<productData[]>([]);
  const [storeRunwayVideos, setStoreRunwayVideos] = useState<Runway[]>([]);

  console.log({ params });
  useEffect(() => {
    const handleGetStoreOrders = async () => {
      const result = await getStoreOrders(params.id);
      setStoreOrders(result.data);
    };
    handleGetStoreOrders();

    const handleGetStoreProducts = async () => {
      const result = await getStoreProducts(params.id);
      console.log({ result });
      if (result) setStoreProducts(result.data);
    };
    handleGetStoreProducts();

    const handleGetStoreRunwayVideos = async () => {
      const result = await getStoreRunwayVideos(params.id);
      if (result) {
        setStoreRunwayVideos(result.data);
      }
    };
    handleGetStoreRunwayVideos();
  }, [params.id, setStoreOrders, setStoreProducts]);

  return (
    <div>
      {/* Product Grid */}
      {page === "products" && <VendorProducts storeProducts={storeProducts} />}

      {page === "runway" && (
        <StoreRunwayVideos storeRunwayVideos={storeRunwayVideos} />
      )}
      {page === "dashboard" && (
        <Dashboard orders={storeOrders} storeProducts={storeProducts} />
      )}
      {page === "bank details" && <BankCardList storeId={params.id} />}

      {page === "orders" && <VendorOrders storeOrders={storeOrders} />}
    </div>
  );
};

export default StoreContent;
