import { editCategory } from "@/networking/endpoints/categories/editCategory";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const EditCategory = ({ getCategories }: { getCategories: () => void }) => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    subcategories: "",
  });
  const id = useSearchParams().get("id");
  console.log({ id });
  const handleEditCategory = async () => {
    await editCategory(Number(id), newCategory.name, newCategory.subcategories);
    getCategories();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-bold mb-4 text-black">
          Add a new category
        </h2>
        <input
          type="text"
          placeholder="Category name"
          className="border p-2 rounded w-full mb-3 text-black"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
        />
        <textarea
          placeholder="Add subcategories"
          className="border p-2 rounded w-full mb-3"
          value={newCategory.subcategories}
          onChange={(e) =>
            setNewCategory({
              ...newCategory,
              subcategories: e.target.value,
            })
          }
        />
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleEditCategory}
          >
            Save
          </button>
          <button
            className="border px-4 py-2 rounded"
            //   onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
