"use client";
import { addCategory } from "@/networking/endpoints/categories/addCategory";
import React, { useState } from "react";

const AddCategory = ({ getCategories }: { getCategories: () => void }) => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    subcategories: "",
  });
  const handleAddCategory = async () => {
    await addCategory(newCategory.name, newCategory.subcategories);
    getCategories();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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
            onClick={handleAddCategory}
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

export default AddCategory;
