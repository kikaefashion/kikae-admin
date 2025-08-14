"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

const ModalDetails = ({
  getCategories,
}: //  closeModal,
{
  getCategories: () => void;
  //  closeModal: () => void;
}) => {
  const action = useSearchParams().get("action");
  const router = useRouter();

  const handleCloseModal = () => {
    router.back();
  };

  if (action == "add") {
    return (
      <AddCategory
        closeModal={handleCloseModal}
        getCategories={getCategories}
      />
    );
  } else if (action == "edit") {
    return <EditCategory getCategories={getCategories} />;
  } else if (action == "delete") {
    return (
      <DeleteCategory
        closeModal={handleCloseModal}
        getCategories={getCategories}
      />
    );
  }
  return null;
};

export default ModalDetails;
