"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

const ModalDetails = ({ getCategories }: { getCategories: () => void }) => {
  const action = useSearchParams().get("action");

  if (action == "add") {
    return <AddCategory getCategories={getCategories} />;
  } else if (action == "edit") {
    return <EditCategory getCategories={getCategories} />;
  } else if (action == "delete") {
    return <DeleteCategory getCategories={getCategories} />;
  }
  return null;
};

export default ModalDetails;
