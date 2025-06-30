"use client";

import MyModal from "@/components/Modal/Modal";
import RejectProduct from "@/components/Product/Modal/RejectProductModal";
import { mediaUrlPrefix } from "@/networking/apiUrl";
import { deleteProduct } from "@/networking/endpoints/products/deleteProduct";
import { filterProductsByStatus } from "@/networking/endpoints/products/filterProductsByStatus";
import { updateProductStatus } from "@/networking/endpoints/products/updateProductStatus";

import type { productData } from "@/types/ProductType";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

/* const products = [
  {
    id: 1,
    photo:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
    name: "Long sleeve T-shirts",
    price: 60000,
    oldPrice: 60000,
    category: "Handmade",
    subCategory: "Handmade",
    units: 10000,
    size: "S, M, XL",
    type: "makeup",
  },
  {
    id: 2,
    photo:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
    name: "Long sleeve T-shirts",
    price: 60000,
    oldPrice: 60000,
    category: "Shirt",
    subCategory: "henrich@gmail.com",
    units: 10000,
    size: "S, M, XL",
    type: "makeup",
  },
  {
    id: 3,
    photo:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
    name: "Long sleeve T-shirts",
    price: 60000,
    oldPrice: 60000,
    category: "Trousers",
    subCategory: "henrich@gmail.com",
    units: 10000,
    size: "S, M, XL",
    type: "freebies",
  },
  ...Array(7).fill({
    id: Math.random(),
    photo:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
    name: "Long sleeve T-shirts",
    price: 60000,
    oldPrice: 60000,
    category: "henrich@gmail.com",
    subCategory: "henrich@gmail.com",
    units: 10000,
    size: "S, M, XL",
    type: "product",
  }),
]; */

const productTypes = ["items", "makeup", "freebies"];

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Table />
    </Suspense>
  );
};

const Table = () => {
  const router = useRouter();
  const goToProductPage = (id: string, type: string) => {
    router.push(`/dashboard/products/${id}?type=${type}`);
  };
  const type = useSearchParams().get("type");
  const status = useSearchParams().get("status");
  const [products, setProducts] = useState<productData[]>([]);
  const [productId, setProductId] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<productData[]>([]);

  const filterProducts = (
    products: productData[],
    currentType: string | null
  ) => {
    if (!currentType || currentType === "items") {
      return products;
    }

    if (currentType === "freebies") {
      return products.filter((product) => product.price === 0);
    }

    if (currentType === "makeup") {
      return products.filter((product) => product.isMakeup === "1");
    }

    return products;
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    filterProductsByStatus(
      status as "pending" | "approved" | "unapproved"
    ).then((res) => {
      setProducts(res.products);
      setFilteredProducts(filterProducts(res.products, type));
      setLoading(false);
    });
  }, [status, type]);

  useEffect(() => {
    setFilteredProducts(filterProducts(products, type));
  }, [type, products]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-kikaeBlue"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-4 text-black">
      <MyModal isVisible={isVisible} close={() => setIsVisible(false)}>
        <RejectProduct productId={productId} setIsVisible={setIsVisible} />
      </MyModal>
      <div className="flex flex-row items-center items-center justify-between mb-6">
        <div className="w-[26.68rem]   flex justify-between items-center bg-white rounded-3xl border border-black/25 ">
          <input
            placeholder="search for a user"
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}

            type="text"
            className="w-11/12 py-1.5 rounded-3xl px-6 text-black text-base font-normal font-['DM Sans'] leading-[30px] border-none"
          />
          <button className="px-6">search</button>
        </div>

        {
          <div className=" bg-white rounded-3xl font-openSansRegular flex">
            <button
              onClick={() =>
                router.replace(
                  `/dashboard/products?type=${type}&&status=approved&&page=1`
                )
              }
              className={`${
                status == "approved"
                  ? "bg-kikaeBlue text-white"
                  : "#fff text-kikaeGray"
              } py-1.5 px-3.5 rounded-3xl`}
            >
              Approved
            </button>
            <button
              //href={"?status=pending"}
              onClick={() =>
                router.replace(
                  `/dashboard/products?type=${type}&&status=pending&&page=1`
                )
              }
              className={`${
                status == "pending"
                  ? "bg-kikaeBlue text-white"
                  : "#fff text-kikaeGray"
              } py-1.5 px-3.5 rounded-3xl`}
            >
              Pending
            </button>
          </div>
        }
        <div className=" bg-white rounded-3xl flex  font-openSansRegular">
          {productTypes.map((productType) => (
            <button
              key={productType}
              onClick={() =>
                router.replace(
                  `/dashboard/products?type=${productType}&&status=${status}&&page=1`
                )
              }
              className={`${
                type == productType
                  ? "bg-kikaeBlue text-white"
                  : "#fff text-kikaeGray"
              } py-1.5 px-3.5 rounded-3xl`}
            >
              {productType}
            </button>
          ))}
        </div>
      </div>
      <table className="min-w-full rounded-3xl shadow-md">
        <thead>
          <tr className="text-left text-kikaeBlue">
            <th className="p-3">Photo</th>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Old price</th>
            <th className="p-3">Category</th>
            <th className="p-3">Sub-category</th>
            <th className="p-3">Units</th>
            <th className="p-3">Size</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts?.length > 0 ? (
            filteredProducts.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-3">
                  <img
                    src={
                      mediaUrlPrefix + item.media[0].url || "/placeholder.svg"
                    }
                    alt={item.name}
                    className="w-10 h-10 rounded"
                  />
                </td>
                <td
                  onClick={() => {
                    goToProductPage(item.id.toString(), type as string);
                  }}
                  className="p-3  underline cursor-pointer"
                >
                  {item.name}
                </td>
                <td className="p-3">₦{item.price.toLocaleString()}</td>
                <td className="p-3">₦{item.old_price.toLocaleString()}</td>
                <td className="p-3">{item.category.name}</td>
                <td className="p-3">{item.product_category.name}</td>
                <td className="p-3">{item.units.toLocaleString()}</td>
                <td className="p-3">{item.size}</td>
                {status == "pending" ? (
                  <td className="px-6 py-4 flex flex-row gap-2.5">
                    <button
                      onClick={() => updateProductStatus(item.id, "approved")}
                      className="text-kikaeBlue underline"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => {
                        setIsVisible(true);
                        setProductId(item.id.toString());
                      }}
                      className="text-red-500 underline"
                    >
                      Reject
                    </button>
                  </td>
                ) : (
                  <td
                    onClick={() => deleteProduct(item.id)}
                    className="p-3 text-kikaeGrey underline  cursor-pointer"
                  >
                    Delete
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
