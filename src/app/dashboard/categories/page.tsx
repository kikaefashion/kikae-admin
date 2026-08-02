"use client";
import ModalDetails from "@/components/Categories/ModalDetails";
import MyModal from "@/components/Modal/Modal";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense, useEffect, useMemo } from "react";
import { getCategories } from "@/networking/endpoints/categories/getCategories";
import { IoArrowBack } from "react-icons/io5";
import type {
  AllCategoriesTypes,
  SubCategoryType,
  ProductType,
} from "@/types/categoriesType";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoriesTable />
    </Suspense>
  );
};

function CategoriesTable() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const viewCategoryId = searchParams.get("viewCategory");
  const viewSubCategoryId = searchParams.get("viewSubCategory");

  // Single source of truth - the full nested tree
  const [categories, setCategories] = useState<AllCategoriesTypes[]>([]);
  const [loading, setLoading] = useState(true);

  // Determine current level
  const currentLevel = viewSubCategoryId
    ? "types"
    : viewCategoryId
      ? "subcategories"
      : "categories";

  // Derive selected category and subcategory from the nested tree
  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === Number(viewCategoryId)) || null,
    [categories, viewCategoryId],
  );

  const selectedSubCategory = useMemo(() => {
    if (!selectedCategory?.subcategories) return null;
    return (
      selectedCategory.subcategories.find(
        (s) => s.id === Number(viewSubCategoryId),
      ) || null
    );
  }, [selectedCategory, viewSubCategoryId]);

  // Load the full nested tree once
  const fetchCategories = async () => {
    setLoading(true);
    const res = await getCategories();
    if (res?.data) setCategories(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Prepare display data based on current level - derived from the nested tree
  const displayData = useMemo(() => {
    if (currentLevel === "categories") {
      return categories.filter((cat) =>
        cat.name?.toLowerCase().includes(search.toLowerCase()),
      );
    } else if (currentLevel === "subcategories" && selectedCategory) {
      const subs = selectedCategory.subcategories || [];
      return subs.filter((sub) =>
        sub.name?.toLowerCase().includes(search.toLowerCase()),
      );
    } else if (currentLevel === "types" && selectedSubCategory) {
      const types = selectedSubCategory.product_types || [];
      return types.filter((t) =>
        t.name?.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return [];
  }, [currentLevel, categories, selectedCategory, selectedSubCategory, search]);

  // Build add URL based on current level
  const getAddUrl = () => {
    if (currentLevel === "categories") return "?action=add&level=category";
    if (currentLevel === "subcategories")
      return `?action=add&level=subcategory&viewCategory=${viewCategoryId}`;
    return `?action=add&level=type&viewCategory=${viewCategoryId}&viewSubCategory=${viewSubCategoryId}`;
  };

  // Get title for current level
  const getTitle = () => {
    if (currentLevel === "categories") return "Product Categories";
    if (currentLevel === "subcategories")
      return `Subcategories of ${selectedCategory?.name || "..."}`;
    return `Types of ${selectedSubCategory?.name || "..."}`;
  };

  // Handle going back
  const handleGoBack = () => {
    if (currentLevel === "types") {
      router.push(`/dashboard/categories?viewCategory=${viewCategoryId}`);
    } else if (currentLevel === "subcategories") {
      router.push("/dashboard/categories");
    }
  };

  // Get edit URL
  const getEditUrl = (id: number) => {
    if (currentLevel === "categories")
      return `?action=edit&level=category&id=${id}`;
    if (currentLevel === "subcategories")
      return `?action=edit&level=subcategory&id=${id}&viewCategory=${viewCategoryId}`;
    return `?action=edit&level=type&id=${id}&viewCategory=${viewCategoryId}&viewSubCategory=${viewSubCategoryId}`;
  };

  // Get delete URL
  const getDeleteUrl = (id: number) => {
    if (currentLevel === "categories")
      return `?action=delete&level=category&id=${id}`;
    if (currentLevel === "subcategories")
      return `?action=delete&level=subcategory&id=${id}&viewCategory=${viewCategoryId}`;
    return `?action=delete&level=type&id=${id}&viewCategory=${viewCategoryId}&viewSubCategory=${viewSubCategoryId}`;
  };

  // Handle view (drill down)
  const handleView = (id: number) => {
    if (currentLevel === "categories") {
      router.push(`/dashboard/categories?viewCategory=${id}`);
    } else if (currentLevel === "subcategories") {
      router.push(
        `/dashboard/categories?viewCategory=${viewCategoryId}&viewSubCategory=${id}`,
      );
    }
  };

  const labelForLevel =
    currentLevel === "categories"
      ? "Category"
      : currentLevel === "subcategories"
        ? "Subcategory"
        : "Type";

  return (
    <div className="p-6">
      <MyModal
        isVisible={action === "add" || action === "edit" || action === "delete"}
        close={() => router.back()}
      >
        <ModalDetails
          getCategories={fetchCategories}
          categories={categories}
          categoryId={Number(viewCategoryId)}
          subCategoryId={Number(viewSubCategoryId)}
        />
      </MyModal>

      {/* Breadcrumb navigation */}
      {currentLevel !== "categories" && (
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={handleGoBack}
            className="flex items-center text-kikaeBlue hover:underline"
          >
            <IoArrowBack size={20} /> <span className="ml-1">Back</span>
          </button>
          <span className="text-gray-400">/</span>
          {selectedCategory && (
            <span className="text-gray-600">{selectedCategory.name}</span>
          )}
          {selectedSubCategory && (
            <>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">{selectedSubCategory.name}</span>
            </>
          )}
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-black">{getTitle()}</h1>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder={`Search ${currentLevel}...`}
            className="border p-2 rounded w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link
            href={getAddUrl()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add New {labelForLevel}
          </Link>
        </div>
      </div>

      <table className="w-full text-black rounded-3xl shadow-sm">
        <thead className="text-kikaeBlue">
          <tr>
            <th className="p-2 text-left">{labelForLevel}</th>
            <th className="p-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={2} className="p-4 text-center">
                Loading...
              </td>
            </tr>
          ) : displayData.length > 0 ? (
            displayData.map((item, index) => (
              <tr key={item.id || index} className="border-t">
                <td className="p-2 text-black">
                  {currentLevel === "types" ? (
                    <span>{item.name}</span>
                  ) : (
                    <span
                      className="text-black underline cursor-pointer hover:text-kikaeBlue"
                      onClick={() => handleView(item.id)}
                    >
                      {item.name}
                    </span>
                  )}
                </td>
                <td className="p-2 text-right space-x-2">
                  <Link
                    href={getEditUrl(item.id)}
                    className="text-black underline"
                  >
                    Edit
                  </Link>
                  <Link
                    href={getDeleteUrl(item.id)}
                    className="text-kikaeGrey underline"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="p-4 text-center text-gray-500">
                No {currentLevel} found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Page;
