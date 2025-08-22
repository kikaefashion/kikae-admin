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
import type { productData } from "@/types/ProductType";
import { getCategories } from "@/networking/endpoints/categories/getCategories";
import { getAllUsers } from "@/networking/endpoints/users/getAllUsers";
import { getDashboardStats } from "@/networking/endpoints/overview/dashboardStats";
import type { userAddress, UserProfileType } from "@/types/types";
import { useRouter } from "next/navigation";
import { getCategoriesSales } from "@/networking/endpoints/overview/getCategoriesSales";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface StatCardProps {
  title: string;
  value: string;
}

export default function Overview() {
  const [categoriesSales, setCategoriesSales] = useState<
    {
      id: number;
      name: "All";
      total_sales: number;
      items_sold: number;
    }[]
  >([]);
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
    monthly_new_users: Array<{
      month: string;
      total_users: string;
      usertype: UserProfileType;
      followings: [];
      addresses: [];
    }>;
    monthly_wishlist: Array<{
      month: string;
      total_likes: string;
    }>;
  }>({
    total_products: 0,
    total_categories: categories.length,
    total_users: 0,
    active_orders: 0,
    completed_orders: 0,
    monthly_revenue: [],
    monthly_completed_orders: [],
    monthly_new_users: [],
    monthly_wishlist: [],
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
      const categoriesSalesResult = await getCategoriesSales();
      setCategoriesSales(categoriesSalesResult.data);
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
      const monthIndex = Number.parseInt(monthYear.split("-")[1]) - 1; // Convert to 0-based index
      if (monthIndex >= 0 && monthIndex < 12) {
        monthlyRevenueData[monthIndex] = Number.parseFloat(item.total_revenue);
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

    // Process user engagement data
    const currentMonth = new Date().toISOString().slice(0, 7); // Format: "2025-07"

    // Get new users for current month
    const currentMonthNewUsers = dashboardStats.monthly_new_users.find(
      (item) => item.month === currentMonth
    );
    const newUsersThisMonth = currentMonthNewUsers
      ? Number.parseInt(currentMonthNewUsers.total_users)
      : 0;

    // Get wishlist adds for current month
    const currentMonthWishlist = dashboardStats.monthly_wishlist.find(
      (item) => item.month === currentMonth
    );
    const wishlistAddsThisMonth = currentMonthWishlist
      ? Number.parseInt(currentMonthWishlist.total_likes)
      : 0;

    // Calculate active users (you can modify this logic based on your needs)
    // For now, using total users as a placeholder for active users
    const activeUsersToday = dashboardStats.total_users;

    setUserEngagementData({
      labels: ["Active users today", "New users this month", "Wishlist adds"],
      datasets: [
        {
          label: "Engagement",
          data: [activeUsersToday, newUsersThisMonth, wishlistAddsThisMonth],
          backgroundColor: ["#3B82F6", "#6EE7B7", "#F472B6"],
        },
      ],
    });
  }, [
    dashboardStats.monthly_revenue,
    dashboardStats.monthly_new_users,
    dashboardStats.monthly_wishlist,
    dashboardStats.total_users,
  ]);
  const router = useRouter();

  return (
    <div className="p-6 space-y-6 text-black">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-2xl font-bold">Hello, Dooyum! 👋</h4>
          <h4 className="text-gray-600">
            Here&apos;s your platform&apos;s performance at a glance.
          </h4>
        </div>
        <button
          onClick={() => router.push("/dashboard/pending-actions")}
          className="border rounded-3xl py-[0.625rem] px-[0.875rem] text-[#AAA5A4;] bg-white"
        >
          View Pending Actions
        </button>
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
                (total, item) => total + Number.parseFloat(item.total_revenue),
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
            New users this month:{" "}
            {dashboardStats.monthly_new_users.find(
              (item) => item.month === new Date().toISOString().slice(0, 7)
            )?.total_users || "0"}
            <br />
            Wishlist adds:{" "}
            {dashboardStats.monthly_wishlist.find(
              (item) => item.month === new Date().toISOString().slice(0, 7)
            )?.total_likes || "0"}
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
              <th className="py-2">S/N</th>
              <th className="py-2">Category name</th>
              <th className="py-2">Sales (₦)</th>
              <th className="py-2">Items sold</th>
            </tr>
          </thead>
          <tbody>
            {categoriesSales?.length > 0 &&
              categoriesSales.map((item, index) => {
                return (
                  <tr key={item.id} className="border-b">
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2 text-blue-600 underline cursor-pointer">
                      {item.name}
                    </td>
                    <td className="py-2">
                      ₦ {item?.total_sales.toLocaleString()}
                    </td>
                    <td className="py-2">{item.items_sold}</td>
                  </tr>
                );
              })}
            {/*  <tr className="border-b">
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
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="p-4 bg-white shadow rounded-xl border">
      <div className="text-gray-500 text-sm mb-1">{title}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}
