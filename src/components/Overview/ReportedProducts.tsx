import { deleteProduct } from "@/networking/endpoints/products/deleteProduct";
import { getReportedProducts } from "@/networking/endpoints/products/getReportedProducts";
import { FlaggedProduct } from "@/types/ReportedProducts";
import React, { useEffect, useState } from "react";

const ReportedProducts = () => {
  const [flaggedProducts, setFlaggedProducts] = useState<FlaggedProduct>({
    data: [],
  });

  const handleGetReportedProducts = async () => {
    const result = await getReportedProducts();
    if (!result) return;

    setFlaggedProducts(result.data);
  };
  useEffect(() => {
    handleGetReportedProducts();
  }, []);

  const handleDeleteProduct = async (productId: number) => {
    const result = await deleteProduct(productId);

    if (result) {
      handleGetReportedProducts();
    }
    // Add delete logic here
  };

  return (
    <table className="w-full text-left bg-white rounded-3xl">
      <thead className="text-kikaeBlue">
        <tr>
          <th className="p-2">Reported Product</th>
          <th className="p-2">Reason for report</th>
          <th className="p-2">Date of report</th>
          <th className="p-2">Reportee</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {flaggedProducts.data?.map((product) => (
          <tr key={product.id} className="hover:bg-gray-100">
            <td
              className={`p-2 underline cursor-pointer  ${
                product.product?.id ? "text-kikaeBlue" : "text-[#ff0a54]"
              }`}
            >
              {product?.product?.id
                ? product?.product?.name
                : "Deleted Product"}
            </td>
            <td className="p-2">{product.message}</td>
            <td className="p-2">
              {new Date(product?.created_at).toLocaleDateString()}
            </td>
            <td className="p-2">{product.user?.fname}</td>
            <td className="p-2">
              <button
                onClick={() => handleDeleteProduct(product.product?.id)}
                className="text-gray-400 hover:text-red-500 underline"
              >
                Delete product
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReportedProducts;
