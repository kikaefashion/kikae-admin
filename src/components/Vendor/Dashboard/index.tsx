"use client";

import { useState } from "react";
import SalesMetrics from "./SalesMetrics";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import LogisticsMetrics from "./LogisticsMetrics";
import FinancialMetrics from "./FinancialMetrics";
import CustomerEngagement from "./CustomerEngagement";
import ProductPerformance from "./ProductPerformance";
import { useBoundStore } from "@/store/store";
import { OrderItem } from "@/types/UserOrdersTypes";
import { productData } from "@/types/ProductType";

const Dashboard = ({
  orders,
  storeProducts,
}: {
  orders: OrderItem[];
  storeProducts: productData[];
}) => {
  const router = useRouter();
  const store = useBoundStore((state) => state.vendorDetails);

  const params = useParams();
  const metricParam = useSearchParams().get("metric");

  const [dateRange, setDateRange] = useState({
    from: "2025-01-01",
    to: "2025-12-31",
  });
  const metrics = [
    "sales metrics",
    "product performance",
    "customer engagement",
    "financial metrics",
    "logistics metrics",
  ];

  // const singleStore = useBoundStore((state) => state.singleStore);
  // const { store }: { store: string } = useLocalSearchParams();
  const [startDate, setStartDate] = useState(new Date(store?.created_at || ""));
  const [endDate, setEndDate] = useState(new Date());

  const checkIfOrderIsWithinRange = (createdDate: string) => {
    return new Date(createdDate) > startDate && new Date(createdDate) < endDate;
  };

  // Filter orders only once
  const filteredOrders = orders.filter((order) =>
    checkIfOrderIsWithinRange(order.created_at)
  );

  //const storeProducts = useBoundStore((state) => state.vendorDetails?.products);
  function getProductSalesData(
    orders: OrderItem[],
    storeProducts: productData[]
  ) {
    const productMap = new Map();

    // Initialize product data from storeProducts
    storeProducts.forEach((product) => {
      productMap.set(product.id, {
        product_id: product.id,
        product_name: product.name,
        units_sold: 0,
        total_revenue: 0,
        ratings: product.ratings,
      });
    });

    // Process filtered orders
    orders.forEach((order) => {
      const productId = order.product_id;
      const units = order.units || 1;
      const price = order.price || 0;

      if (productMap.has(productId)) {
        const productData = productMap.get(productId);
        productData.units_sold += Number(units) * 1;
        productData.total_revenue += units * price;
      } else {
        productMap.set(productId, {
          product_id: productId,
          product_name: order.name || `Product ${productId}`,
          units_sold: Number(units) * 1,
          total_revenue: units * price,
        });
      }
    });

    return Array.from(productMap.values());
  }

  // Usage:
  const salesData = getProductSalesData(filteredOrders, storeProducts);
  console.log({ salesData });

  let totalSales = 0;

  orders.map((item) => {
    totalSales += Number(item.transaction.amount) * 1;
  });
  console.log({ totalSales, ord: orders.length });
  const averageValuePerOrder =
    orders.length == 0
      ? 0
      : ((Number(totalSales) * 1) / Number(orders.length)) * 1;

  const overallDetails = [
    { title: "total sales", price: totalSales },
    { title: "total orders received", price: orders.length },
    ,
    { title: "average value per order", price: averageValuePerOrder },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex gap-6">
      {/* Left Side - Balance Overview */}
      <div className="w-80 bg-white shadow-md rounded-lg p-4 border h-[15.37rem] border-gray-200">
        <h2 className="text-gray-700 font-semibold">Balance Overview</h2>
        <p className="text-kikaeBlue text-sm">Available Balance</p>
        <h3 className="text-lg font-bold text-gray-800">
          ₦ {store?.balance.toLocaleString()}
        </h3>
        <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-3xl text-sm font-semibold hover:bg-blue-700 transition">
          Cashout now
        </button>
        <p className="text-gray-500 text-sm mt-2">
          Pending Balance: ₦{store?.balance.toLocaleString()}
        </p>
        <p className="text-gray-400 text-xs">
          Funds available in 5 Days, 12 Hours
        </p>
      </div>

      {/* Right Side - Main Content */}
      <div className="flex-1">
        {/* Top Overview Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white shadow-md rounded-3xl">
            <p className="text-gray-500 text-sm">TOTAL SALES</p>
            <h2 className="text-xl font-bold">
              {overallDetails && overallDetails[0]?.price.toLocaleString()}
            </h2>
          </div>
          <div className="p-4 bg-white shadow-md rounded-3xl">
            <p className="text-gray-500 text-sm">TOTAL ORDERS RECEIVED</p>
            <h2 className="text-xl font-bold">
              {overallDetails && overallDetails[1]?.price.toLocaleString()}
            </h2>
          </div>
          <div className="p-4 bg-white shadow-md rounded-3xl">
            <p className="text-gray-500 text-sm">AVERAGE VALUE PER ORDER</p>
            <h2 className="text-xl font-bold">
              {overallDetails && overallDetails[2]?.price.toLocaleString()}
            </h2>
          </div>
        </div>

        {/* Sales Metrics Tabs */}
        <div className="flex gap-4 mb-4  pb-2 ">
          {metrics.map((metric) => (
            <button
              key={metric}
              className={`text-base font-bold capitalize  ${
                metricParam === metric.split(" ").join("_")
                  ? "text-kikaeBlue pb-1"
                  : "text-kikaeGrey"
              }`}
              onClick={() => {
                router.replace(
                  `/dashboard/users/vendors/${
                    params.id
                  }?page=dashboard&&metric=${metric.split(" ").join("_")}`
                );
              }}
            >
              {metric}
            </button>
          ))}
        </div>

        {/* Product Performance Section */}

        <div className="pt-2.5 p-6">
          <h4>Date filter range:</h4>
          <div className="flex gap-4 items-center my-4 text-black">
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => {
                setDateRange({ ...dateRange, from: e.target.value });
                setStartDate(new Date(e.target.value));
              }}
              className="rounded-3xl p-2"
            />
            <span>to</span>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => {
                setDateRange({ ...dateRange, to: e.target.value });
                setEndDate(new Date(e.target.value));
              }}
              className="rounded-3xl  p-2"
            />
            <button className="bg-kikaeBlue text-white py-2 px-4 rounded-3xl">
              Apply
            </button>
          </div>
          {metricParam == "sales_metrics" && (
            <SalesMetrics salesData={salesData} />
          )}
          {metricParam == "financial_metrics" && (
            <FinancialMetrics orders={orders} />
          )}
          {metricParam == "logistics_metrics" && <LogisticsMetrics />}
          {metricParam == "product_performance" && (
            <ProductPerformance salesData={salesData} />
          )}

          {metricParam == "customer_engagement" && (
            <CustomerEngagement products={storeProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
