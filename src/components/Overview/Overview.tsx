"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import type { ChartData } from "chart.js";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { getProducts } from "@/networking/endpoints/products/getProducts";
import { productData } from "@/types/ProductType";
import { getCategories } from "@/networking/endpoints/categories/getCategories";
import { getAllUsers } from "@/networking/endpoints/users/getAllUsers";
import { getDashboardStats } from "@/networking/endpoints/overview/dashboardStats";
import { userAddress, UserProfileType } from "@/types/types";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface StatCardProps {
  title: string;
  value: string;
}

export default function Overview(): JSX.Element {
  const [products, setProducts] = useState<productData[]>([]);
  const [categories, setCategories] = useState([]);
  const [dashboardStats, setDashboardStats] = useState<{
    total_products: number;
    total_categories: number;
    total_users: number;
    active_orders: number;
    completed_orders: number;
    monthly_revenue: Array<{
      month: string;
      total_revenue: string;
      user: UserProfileType;
      address: userAddress;
    }>;
    monthly_completed_orders: [];
  }>({
    total_products: 0,
    total_categories: categories.length,
    total_users: 0,
    active_orders: 0,
    completed_orders: 0,
    monthly_revenue: [],
    monthly_completed_orders: [],
  });
  const [salesData, setSalesData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [],
  });
  const [userEngagementData, setUserEngagementData] = useState<
    ChartData<"bar">
  >({
    labels: [],
    datasets: [],
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products.data);

      const categories = await getCategories();
      setCategories(categories.data);

      const users = await getAllUsers();
      setUsers(users.users);

      const result = await getDashboardStats();

      setDashboardStats(result);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Process monthly revenue data
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthlyRevenueData = new Array(12).fill(0);

    // Map the revenue data to the correct months
    dashboardStats.monthly_revenue.forEach((item) => {
      const monthYear = item.month; // Format: "2025-06"
      const monthIndex = parseInt(monthYear.split("-")[1]) - 1; // Convert to 0-based index
      if (monthIndex >= 0 && monthIndex < 12) {
        monthlyRevenueData[monthIndex] = parseFloat(item.total_revenue);
      }
    });

    setSalesData({
      labels: monthNames,
      datasets: [
        {
          label: "Monthly Revenue",
          data: monthlyRevenueData,
          backgroundColor: "#60A5FA",
        },
      ],
    });

    setUserEngagementData({
      labels: ["Active users today", "New users this month", "Wishlist adds"],
      datasets: [
        {
          label: "Engagement",
          data: [70000, 90000, 65000],
          backgroundColor: ["#3B82F6", "#6EE7B7", "#F472B6"],
        },
      ],
    });
  }, [dashboardStats.monthly_revenue]);

  return (
    <div className="p-6 space-y-6 text-black">
      <div className="text-2xl font-bold">Hello, Dooyum! 👋</div>
      <div className="text-gray-600">
        Here’s your platform’s performance at a glance.
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total products"
          value={products?.length?.toLocaleString() || "0"}
        />
        <StatCard
          title="Total categories"
          value={categories?.length?.toLocaleString() || "0"}
        />
        <StatCard
          title="Total users"
          value={users?.length?.toLocaleString() || "0"}
        />
        <StatCard
          title="Active orders"
          value={dashboardStats?.active_orders?.toLocaleString() || "0"}
        />
        <StatCard
          title="Completed orders"
          value={dashboardStats?.completed_orders?.toLocaleString() || "0"}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-xl shadow bg-white">
          <h2 className="text-lg font-semibold mb-2">Sales metrics</h2>
          <div className="text-sm text-gray-500 mb-2">
            Revenue this month: ₦
            {dashboardStats.monthly_revenue
              .reduce(
                (total, item) => total + parseFloat(item.total_revenue),
                0
              )
              .toLocaleString()}{" "}
            <br />
            Orders Completed: {dashboardStats.completed_orders.toLocaleString()}
          </div>
          <Bar
            data={salesData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        </div>

        <div className="p-4 border rounded-xl shadow bg-white">
          <h2 className="text-lg font-semibold mb-2">User engagement</h2>
          <div className="text-sm text-gray-500 mb-2">
            Orders Completed: 5,670
          </div>
          <Bar
            data={userEngagementData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        </div>
      </div>

      <div className="p-4 border rounded-xl shadow bg-white">
        <h2 className="text-lg font-semibold mb-4">Top Categories</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-500 border-b">
              <th className="py-2">Rank</th>
              <th className="py-2">Category name</th>
              <th className="py-2">Sales (₦)</th>
              <th className="py-2">Items sold</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">1</td>
              <td className="py-2 text-blue-600 underline cursor-pointer">
                Men&apos;s Clothing
              </td>
              <td className="py-2">₦1,200,000</td>
              <td className="py-2">320</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">2</td>
              <td className="py-2 text-blue-600 underline cursor-pointer">
                Women&apos;s Clothing
              </td>
              <td className="py-2">₦950,000</td>
              <td className="py-2">280</td>
            </tr>
            <tr>
              <td className="py-2">3</td>
              <td className="py-2 text-blue-600 underline cursor-pointer">
                Footwear
              </td>
              <td className="py-2">₦600,000</td>
              <td className="py-2">150</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value }: StatCardProps): JSX.Element {
  return (
    <div className="p-4 bg-white shadow rounded-xl border">
      <div className="text-gray-500 text-sm mb-1">{title}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}
