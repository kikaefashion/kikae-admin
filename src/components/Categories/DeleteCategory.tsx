import { deleteCategory } from "@/networking/endpoints/categories/deleteCategory";
import { useSearchParams } from "next/navigation";
import React from "react";

const DeleteCategory = ({ getCategories }: { getCategories: () => void }) => {
  const id = useSearchParams().get("id");
  const handleDeleteCategory = async () => {
    await deleteCategory(Number(id));
    getCategories();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-bold mb-4 text-black">
          Are you sure you want to delete this category?
        </h2>

        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleDeleteCategory}
          >
            Yes
          </button>
          <button
            className="border px-4 py-2 rounded"
            //   onClick={() => setIsModalOpen(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategory;
