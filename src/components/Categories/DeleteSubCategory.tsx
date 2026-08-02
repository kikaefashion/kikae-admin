"use client";
import { deleteSubCategory } from "@/networking/endpoints/categories/deleteSubCategory";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const DeleteSubCategory = ({
  getCategories,
  closeModal,
}: {
  getCategories: () => void;
  closeModal: () => void;
}) => {
  const [deleting, setDeleting] = useState(false);
  const id = useSearchParams().get("id");

  const handleDeleteSubCategory = async () => {
    setDeleting(true);
    await deleteSubCategory(Number(id));
    getCategories();
    setDeleting(false);
    closeModal();
  };

  return (
    <>
      <div className="text-center mb-6">
        <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <svg
            className="w-6 h-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Delete Subcategory
        </h2>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this subcategory? This action cannot
          be undone.
        </p>
      </div>

      <div className="flex justify-center gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={closeModal}
          className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleDeleteSubCategory}
          disabled={deleting}
          className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </>
  );
};

export default DeleteSubCategory;
