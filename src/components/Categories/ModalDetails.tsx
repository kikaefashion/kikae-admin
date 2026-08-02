"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
import AddSubCategory from "./AddSubCategory";
import EditSubCategory from "./EditSubCategory";
import DeleteSubCategory from "./DeleteSubCategory";
import AddType from "./AddType";
import EditType from "./EditType";
import DeleteType from "./DeleteType";
import type {
  AllCategoriesTypes,
  SubCategoryType,
  ProductType,
} from "@/types/categoriesType";

const ModalDetails = ({
  getCategories,
  categories,
  categoryId,
  subCategoryId,
}: {
  getCategories: () => void;
  categories: AllCategoriesTypes[];
  categoryId?: number;
  subCategoryId?: number;
}) => {
  const action = useSearchParams().get("action");
  const level = useSearchParams().get("level") || "category";
  const editId = useSearchParams().get("id");
  const router = useRouter();

  const handleCloseModal = () => {
    router.back();
  };

  // Look up existing data for edit pre-fill
  const existingCategory = useMemo(() => {
    if (level === "category" && action === "edit" && editId) {
      return categories.find((c) => c.id === Number(editId)) || null;
    }
    return null;
  }, [level, action, editId, categories]);

  const existingSubCategory = useMemo(() => {
    if (level === "subcategory" && action === "edit" && editId) {
      for (const cat of categories) {
        if (cat.subcategories) {
          const found = cat.subcategories.find((s) => s.id === Number(editId));
          if (found) return found;
        }
      }
    }
    return null;
  }, [level, action, editId, categories]);

  const existingType = useMemo(() => {
    if (level === "type" && action === "edit" && editId) {
      for (const cat of categories) {
        if (cat.subcategories) {
          for (const sub of cat.subcategories) {
            if (sub.product_types) {
              const found = sub.product_types.find(
                (t) => t.id === Number(editId),
              );
              if (found) return found;
            }
          }
        }
      }
    }
    return null;
  }, [level, action, editId, categories]);

  // Category level actions
  if (level === "category") {
    if (action === "add") {
      return (
        <AddCategory
          closeModal={handleCloseModal}
          getCategories={getCategories}
        />
      );
    } else if (action === "edit") {
      return (
        <EditCategory
          getCategories={getCategories}
          existingData={existingCategory}
        />
      );
    } else if (action === "delete") {
      return (
        <DeleteCategory
          closeModal={handleCloseModal}
          getCategories={getCategories}
        />
      );
    }
  }

  // SubCategory level actions
  if (level === "subcategory") {
    if (action === "add") {
      return (
        <AddSubCategory
          closeModal={handleCloseModal}
          getCategories={getCategories}
          categoryId={categoryId || 0}
        />
      );
    } else if (action === "edit") {
      return (
        <EditSubCategory
          getCategories={getCategories}
          existingData={existingSubCategory}
        />
      );
    } else if (action === "delete") {
      return (
        <DeleteSubCategory
          closeModal={handleCloseModal}
          getCategories={getCategories}
        />
      );
    }
  }

  // Type level actions
  if (level === "type") {
    if (action === "add") {
      return (
        <AddType
          closeModal={handleCloseModal}
          getCategories={getCategories}
          subCategoryId={subCategoryId || 0}
        />
      );
    } else if (action === "edit") {
      return (
        <EditType getCategories={getCategories} existingData={existingType} />
      );
    } else if (action === "delete") {
      return (
        <DeleteType
          closeModal={handleCloseModal}
          getCategories={getCategories}
        />
      );
    }
  }

  return null;
};

export default ModalDetails;
