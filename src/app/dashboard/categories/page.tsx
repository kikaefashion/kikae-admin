"use client";

import ModalDetails from "@/components/Categories/ModalDetails";
import MyModal from "@/components/Modal/Modal";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense, useEffect } from "react";
import { getCategories } from "@/networking/endpoints/categories/getCategories";
import { getSubCategories } from "@/networking/endpoints/categories/getSubCategories";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoriesTable />
    </Suspense>
  );
};

function CategoriesTable() {
  const [search, setSearch] = useState("");
  const [activeView, setActiveView] = useState<"categories" | "subcategories">(
    "categories"
  );
  const [categories, setCategories] = useState<
    {
      id: number;
      name: string;
      description: string;
    }[]
  >([]);
  const [subcategories, setSubcategories] = useState<
    {
      id: number;
      name: string;
      description: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const action = useSearchParams().get("action");
  const router = useRouter();

  // Prepare data based on active view
  const getDisplayData = () => {
    if (activeView === "categories") {
      return (
        categories &&
        categories.length > 0 &&
        categories.filter((category) =>
          category.name?.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      return (
        subcategories &&
        subcategories.length > 0 &&
        subcategories.filter((subcategory) =>
          subcategory.name?.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };

  const displayData = getDisplayData();
  const handleGetCategories = async () => {
    const categories = await getCategories();
    setCategories(categories.data);
  };
  const handleGetSubCategories = async () => {
    const subcategories = await getSubCategories();
    setSubcategories(subcategories);
  };

  useEffect(() => {
    setLoading(true);
    handleGetCategories();
    handleGetSubCategories();
    setLoading(false);
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <MyModal
        isVisible={action == "add" || action == "edit" || action == "delete"}
        close={() => router.back()}
      >
        <ModalDetails getCategories={handleGetCategories} />
      </MyModal>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder={`Search for ${activeView}`}
          className="border p-2 rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link href={`?action=add`} className="text-blue-500">
          Add new {activeView.slice(0, -1)}
        </Link>
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveView("categories")}
          className={`px-4 py-2 rounded ${
            activeView === "categories"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveView("subcategories")}
          className={`px-4 py-2 rounded ${
            activeView === "subcategories"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Subcategories
        </button>
      </div>

      <table className="w-full text-black rounded-3xl shadow-sm">
        <thead className="text-kikaeBlue">
          <tr>
            <th className="p-2 text-left">
              {activeView === "categories" ? "Category" : "Subcategory"}
            </th>
            {activeView === "subcategories" && (
              <th className="p-2 text-left">Parent Category</th>
            )}
            <th className="p-2 text-right">No. of items</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={activeView === "categories" ? 3 : 4}
                className="p-4 text-center"
              >
                Loading...
              </td>
            </tr>
          ) : activeView === "categories" ? (
            displayData &&
            displayData.length > 0 &&
            displayData.map((cat, index) => (
              <tr key={cat.id || index}>
                <td className="p-2 text-black underline cursor-pointer">
                  {cat.name}
                </td>
                <td className="p-2 text-right"></td>
                <td className="p-2 text-center space-x-2">
                  <Link
                    href={`?action=edit&&id=${cat.id}`}
                    className="text-black underline"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`?action=delete&&id=${cat.id} `}
                    className="text-kikaeGrey underline"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            displayData &&
            displayData.length > 0 &&
            displayData.map((subcat, index) => (
              <tr key={subcat.id || index}>
                <td className="p-2 text-black underline cursor-pointer">
                  {subcat.name}
                </td>
                <td className="p-2 text-gray-600"></td>
                <td className="p-2 text-right"></td>
                <td className="p-2 text-center space-x-2">
                  <Link
                    href={`?action=edit&&id=${subcat.id}`}
                    className="text-black underline"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`?action=delete&&id=${subcat.id}`}
                    className="text-kikaeGrey underline"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Page;
