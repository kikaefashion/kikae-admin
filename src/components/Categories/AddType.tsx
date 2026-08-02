"use client";
import { addType } from "@/networking/endpoints/categories/addType";
import React, { useState } from "react";

const AddType = ({
  getCategories,
  closeModal,
  subCategoryId,
}: {
  getCategories: () => void;
  closeModal: () => void;
  subCategoryId: number;
}) => {
  const [newType, setNewType] = useState({ name: "", description: "" });
  const [saving, setSaving] = useState(false);

  const handleAddType = async () => {
    if (!newType.name.trim()) return;
    setSaving(true);
    await addType(subCategoryId, newType.name, newType.description);
    getCategories();
    setSaving(false);
    closeModal();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Add New Type</h2>
        <button
          onClick={closeModal}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Type Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Shirts"
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
          onClick={closeModal}
          className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleAddType}
          disabled={saving || !newType.name.trim()}
          className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? "Saving..." : "Save Type"}
        </button>
      </div>
    </>
  );
};

export default AddType;
