"use client";
import { editSubCategory } from "@/networking/endpoints/categories/editSubCategory";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import type { SubCategoryType } from "@/types/categoriesType";

const EditSubCategory = ({
  getCategories,
  existingData,
}: {
  getCategories: () => void;
  existingData: SubCategoryType | null;
}) => {
  const [newSubCategory, setNewSubCategory] = useState({
    name: existingData?.name || "",
    description: existingData?.description || "",
  });
  const [saving, setSaving] = useState(false);
  const id = useSearchParams().get("id");

  useEffect(() => {
    if (existingData) {
      setNewSubCategory({
        name: existingData.name || "",
        description: existingData.description || "",
      });
    }
  }, [existingData]);

  const handleEditSubCategory = async () => {
    if (!newSubCategory.name.trim()) return;
    setSaving(true);
    await editSubCategory(
      Number(id),
      newSubCategory.name,
      newSubCategory.description,
      existingData?.product_category_id || 0,
    );
    getCategories();
    setSaving(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Edit Subcategory
        </h2>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Subcategory Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Subcategory name"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
            value={newSubCategory.name}
            onChange={(e) =>
              setNewSubCategory({ ...newSubCategory, name: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Description
          </label>
          <textarea
            placeholder="Brief description..."
            rows={3}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none resize-none"
            value={newSubCategory.description}
            onChange={(e) =>
              setNewSubCategory({
                ...newSubCategory,
                description: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-200">
        <button
          onClick={handleEditSubCategory}
          disabled={saving || !newSubCategory.name.trim()}
          className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </>
  );
};

export default EditSubCategory;
