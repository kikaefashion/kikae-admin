"use client";
import { editType } from "@/networking/endpoints/categories/editType";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import type { ProductType } from "@/types/categoriesType";

const EditType = ({
  getCategories,
  existingData,
}: {
  getCategories: () => void;
  existingData: ProductType | null;
}) => {
  const [newType, setNewType] = useState({
    name: existingData?.name || "",
    description: existingData?.description || "",
  });
  const [saving, setSaving] = useState(false);
  const id = useSearchParams().get("id");

  useEffect(() => {
    if (existingData) {
      setNewType({
        name: existingData.name || "",
        description: existingData.description || "",
      });
    }
  }, [existingData]);

  const handleEditType = async () => {
    if (!newType.name.trim()) return;
    setSaving(true);
    await editType(Number(id), newType.name, newType.description);
    getCategories();
    setSaving(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Edit Type</h2>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Type Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Type name"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
            value={newType.name}
            onChange={(e) => setNewType({ ...newType, name: e.target.value })}
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
            value={newType.description}
            onChange={(e) =>
              setNewType({ ...newType, description: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-200">
        <button
          onClick={handleEditType}
          disabled={saving || !newType.name.trim()}
          className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </>
  );
};

export default EditType;
