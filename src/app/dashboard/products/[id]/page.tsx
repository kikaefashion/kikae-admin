"use client";
import { ArrowBack } from "@/assets/ArrowBack";
import MyModal from "@/components/Modal/Modal";
import Analytics from "@/components/Product/AnalyticsModal";
import CommentModal from "@/components/Product/CommentModal";
import ImageGallery from "@/components/Product/ProductImage";
import { getProductDetail } from "@/networking/endpoints/products/getProduct";
import { productData } from "@/types/ProductType";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

/* const product = {
  name: "Long sleeve T-shirts",
  description:
    "This shirt isn’t just comfortable, it's practically ethereal. The 'Cloudchaser' is crafted from 100% organic linen, a fabric so lightweight...",
  price: 60000,
  oldPrice: 60000,
  category: "Handmade",
  subCategory: "Handmade",
  units: 10000,
  colors: ["Purple", "Blue", "Green", "Grey"],
  sizes: ["S", "M", "XL"],
  images: [
    "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg", // Main image
    "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg", // Second image
    "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg", // Thumbnails
    "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
    "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  ],
};
 */
const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetails />
    </Suspense>
  );
};

const ProductDetails = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = React.useState(false);
  const page = useSearchParams().get("page");
  const type = useSearchParams().get("type");
  const [product, setProduct] = useState<productData | null>(null);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductDetail(params.id);
      setProduct(product?.data);
    };
    fetchProduct();
  }, [params.id]);

  console.log({ params });

  return (
    <div className="p-6 max-w-5xl mx-auto rounded-lg ">
      <MyModal close={() => setOpenModal(false)} isVisible={openModal}>
        <CommentModal />
      </MyModal>
      <MyModal isVisible={page == "analytics"} close={() => router.back()}>
        <Analytics />
      </MyModal>

      {/* Header Section */}
      <div className="flex  items-center justify-between pr-6">
        <div className="flex items-center gap-6">
          <button
            onClick={() => router.back()}
            className="w-12 h-12 p-3 bg-white rounded-3xl border border-black/25 justify-center items-center inline-flex"
          >
            <ArrowBack />
          </button>
          <h4 className="text-black text-2xl font-bold font-['Raleway'] leading-9">
            {product?.name}
          </h4>

          <button
            onClick={() => {
              router.push(`/dashboard/products/1?type=${type}&&page=analytics`);
            }}
            className="py-1 px-6 bg-white rounded-2xl border border-black/25 justify-center items-center inline-flex"
          >
            <div className="justify-start items-center gap-2 flex">
              <div className="text-kikaeBlue text-base font-normal font-['DM Sans']">
                View analytics
              </div>
            </div>
          </button>
        </div>

        <div className=" flex-col justify-center items-end gap-6 inline-flex">
          <div className="text-kikaeBlue text-base font-normal font-['DM Sans'] leading-[30px]">
            Actions
          </div>
          <div className="justify-start items-start gap-6 inline-flex">
            {/*  <button className="text-black text-base font-normal font-['DM Sans'] underline leading-[30px] z-10">
              Chat
            </button> */}

            <button
              // disabled={isLoading}

              className="text-[#979797] text-base font-normal font-['DM Sans'] underline leading-[30px]"
            >
              {"Delete"}
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <ImageGallery />

      <div className="flex flex-row">
        <div className="flex flex-col gap-2 mt-4 w-1/4">
          <div>
            <h4 className="font-bold text-base text-kikaeBlue">Name</h4>
            <p className=" text-base text-black">{product?.name}</p>
          </div>
          <div>
            <h4 className="font-bold text-base text-kikaeBlue">Description</h4>
            <p className="text-base text-kikaeGrey">{product?.description}</p>
          </div>
        </div>
        {/* Product Details */}
        <div className="mt-6 grid grid-cols-5 gap-6 bg-white shadow-md p-4 rounded-lg w-3/4">
          <div>
            <h3 className="text-kikaeBlue font-semibold">Price</h3>
            <p className="text-lg text-black">
              ₦{product?.price?.toLocaleString()}
            </p>
          </div>
          <div>
            <h3 className="text-kikaeBlue text-gray-500 font-semibold">
              Old Price
            </h3>
            <p className="line-through text-gray-400">
              ₦{product?.old_price?.toLocaleString()}
            </p>
          </div>
          <div>
            <h3 className="text-kikaeBlue text-gray-500 font-semibold">
              Category
            </h3>
            <p className="text-black">{product?.category?.name}</p>
          </div>
          <div>
            <h3 className="text-kikaeBlue text-gray-500 font-semibold">
              Sub-category
            </h3>
            <p className="text-black">{product?.product_category?.name}</p>
          </div>
          <div>
            <h3 className="text-kikaeBlue text-gray-500 font-semibold">
              Units
            </h3>
            <p className="text-black">{product?.units?.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-kikaeBlue text-gray-500 font-semibold">
              Colors
            </h3>
            <p className="text-black">
              {product?.colours?.map((colour) => colour.name).join(", ")}
            </p>
          </div>
          <div>
            <h3 className="text-kikaeBlue text-gray-500 font-semibold">Size</h3>
            <p className="text-black">
              {product?.sizes?.map((size) => size.size).join(", ")}
            </p>
          </div>
          <div>
            <h3 className="text-kikaeBlue text-gray-500 font-semibold">
              Reviews
            </h3>
            <p
              onClick={() => setOpenModal(true)}
              className="text-black underline cursor-pointer hover:text-kikaeBlue"
            >
              View all reviews
            </p>
          </div>
          <div>
            <h3 className="text-kikaeBlue text-gray-500 font-semibold">
              Comments
            </h3>
            <p
              onClick={() => setOpenModal(true)}
              className="text-black underline cursor-pointer hover:text-kikaeBlue"
            >
              View all comments
            </p>
          </div>
          <div>
            <h3 className="text-kikaeBlue text-gray-500 font-semibold">
              Reviews & comments
            </h3>
            <p
              onClick={() => setOpenModal(true)}
              className="text-black underline cursor-pointer hover:text-kikaeBlue"
            >
              View all reviews & comments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
