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

import { getCategories } from "@/networking/endpoints/categories/getCategories";

import { getDashboardStats } from "@/networking/endpoints/overview/dashboardStats";
import type { userAddress, UserProfileType } from "@/types/types";
import { useRouter } from "next/navigation";
import { getCategoriesSales } from "@/networking/endpoints/overview/getCategoriesSales";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { FaPrint } from "react-icons/fa";

import { getChurnOverview } from "@/networking/endpoints/overview/churnOverview";
import type { ChurnOverviewType } from "@/types/ChurnOverviewType";

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

  //const [products, setProducts] = useState<productData[]>([]);

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

  const [activeUsersMonthlyData, setActiveUsersMonthlyData] = useState<
    ChartData<"bar">
  >({
    labels: [],
    datasets: [],
  });

  const [newUsersMonthlyData, setNewUsersMonthlyData] = useState<
    ChartData<"bar">
  >({
    labels: [],
    datasets: [],
  });

  const [wishlistMonthlyData, setWishlistMonthlyData] = useState<
    ChartData<"bar">
  >({
    labels: [],
    datasets: [],
  });

  // const [users, setUsers] = useState([]);

  const [churnRateSummary, setChurnRateSummary] = useState<ChurnOverviewType>();

  useEffect(() => {
    const fetchProducts = async () => {

      const categories = await getCategories();
      setCategories(categories.data);

      const result = await getDashboardStats();
      setDashboardStats(result);
      const categoriesSalesResult = await getCategoriesSales();
      setCategoriesSales(categoriesSalesResult.data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
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
    //  const currentMonth = new Date().toISOString().slice(0, 7); // Format: "2025-07"

    // Get new users for current month

    const monthlyActiveUsersData = new Array(12).fill(0);
    dashboardStats.monthly_new_users.forEach((item) => {
      const monthYear = item.month;
      const monthIndex = Number.parseInt(monthYear.split("-")[1]) - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        // Accumulate users as a proxy for active users
        monthlyActiveUsersData[monthIndex] = Number.parseInt(item.total_users);
      }
    });

    setActiveUsersMonthlyData({
      labels: monthNames,
      datasets: [
        {
          label: "Active Users",
          data: monthlyActiveUsersData,
          backgroundColor: "#3B82F6",
        },
      ],
    });

    const monthlyNewUsersData = new Array(12).fill(0);
    dashboardStats.monthly_new_users.forEach((item) => {
      const monthYear = item.month;
      const monthIndex = Number.parseInt(monthYear.split("-")[1]) - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        monthlyNewUsersData[monthIndex] = Number.parseInt(item.total_users);
      }
    });

    setNewUsersMonthlyData({
      labels: monthNames,
      datasets: [
        {
          label: "New Users",
          data: monthlyNewUsersData,
          backgroundColor: "#6EE7B7",
        },
      ],
    });

    const monthlyWishlistData = new Array(12).fill(0);
    dashboardStats.monthly_wishlist.forEach((item) => {
      const monthYear = item.month;
      const monthIndex = Number.parseInt(monthYear.split("-")[1]) - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        monthlyWishlistData[monthIndex] = Number.parseInt(item.total_likes);
      }
    });

    setWishlistMonthlyData({
      labels: monthNames,
      datasets: [
        {
          label: "Wishlist Adds",
          data: monthlyWishlistData,
          backgroundColor: "#F472B6",
        },
      ],
    });
  }, [
    dashboardStats.monthly_revenue,
    dashboardStats.monthly_new_users,
    dashboardStats.monthly_wishlist,
    dashboardStats.total_users,
  ]);
  useEffect(() => {
    const handleFetchChurnRates = async () => {
      const result = await getChurnOverview(30);

      if (result) {
        setChurnRateSummary(result);
      }
    };

    handleFetchChurnRates();
  }, []);

  const router = useRouter();

  const handlePrint = async () => {
    const element = document.getElementById("dashboard-content");
    if (!element) return;

    try {
      // Create canvas from the dashboard content
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      // Create PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if content is longer than one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Download the PDF
      const currentDate = new Date().toISOString().split("T")[0];
      pdf.save(`dashboard-overview-${currentDate}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  return (
    <div id="dashboard-content" className="p-6 space-y-6 text-black">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-2xl font-bold">Hello, Dooyum! 👋</h4>
          <h4 className="text-gray-600">
            Here&apos;s your platform&apos;s performance at a glance.
          </h4>
        </div>

        <div>
          <div
            className="flex flex-row items-center text-right justify-end cursor-pointer mb-2 g"
            onClick={handlePrint}
          >
            <span className="text-kikaeBlue font-bold mr-2">Print</span>
            <FaPrint />
          </div>

          <button
            onClick={() => router.push("/dashboard/overview/churn-rate")}
            className="border rounded-3xl py-[0.625rem] px-[0.875rem] text-[#AAA5A4;] bg-white"
          >
            View Churn rate
          </button>

          <button
            onClick={() => router.push("/dashboard/pending-actions")}
            className="border rounded-3xl py-[0.625rem] px-[0.875rem] text-[#AAA5A4;] bg-white"
          >
            View Pending Actions
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total products"
          value={dashboardStats?.total_products?.toLocaleString() || "0"}
        />
        <StatCard
          title="Total categories"
          value={dashboardStats?.total_categories?.toLocaleString() || "0"}
        />
        <StatCard
          title="Total users"
          value={dashboardStats?.total_users?.toLocaleString() || "0"}
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
          <h2 className="text-lg font-semibold mb-2">Active Users per Month</h2>
          <Bar
            data={activeUsersMonthlyData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-xl shadow bg-white">
          <h2 className="text-lg font-semibold mb-2">New Users per Month</h2>
          New users this month:{" "}
          {dashboardStats.monthly_new_users.find(
            (item) => item.month === new Date().toISOString().slice(0, 7)
          )?.total_users || "0"}
          <Bar
            data={newUsersMonthlyData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        </div>

        <div className="p-4 border rounded-xl shadow bg-white">
          <h2 className="text-lg font-semibold mb-2">
            Wishlist Adds per Month
          </h2>
          Wishlist adds:{" "}
          {dashboardStats.monthly_wishlist.find(
            (item) => item.month === new Date().toISOString().slice(0, 7)
          )?.total_likes || "0"}
          <Bar
            data={wishlistMonthlyData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard title="30-day Churn rate" value={"% of inactive users"} />

        <StatCard
          title="Active users"
          value={churnRateSummary?.active_users.toString() || "0"}
        />
        <StatCard
          title="Churned users"
          value={churnRateSummary?.churned_users.toString() || "0"}
        />
        <StatCard
          title="Churn Rate"
          value={churnRateSummary?.churn_rate.toString() || "0"}
        />
        <StatCard
          title="Period"
          value={`${churnRateSummary?.period.start.toLocaleString()} - ${churnRateSummary?.period.end
            }  `}
        />
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="p-4 bg-white shadow rounded-xl border">
      <div className=" mb-1 font-semibold text-lg">{title}</div>
      <div className="text-gray-500 text-sm ">{value}</div>
    </div>
  );
}
