import { productData } from "@/types/ProductType";
import React from "react";
/* const products = [
  {
    reviews: "Product reviews",
    rating: 4.5,
    total: 5,
  },
  {
    reviews: "Product reviews",
    rating: 4.5,  
    total: 5,
  },
  {
    reviews: "Product reviews",
    rating: 4.5,
    total: 5,
  },
  {
    reviews: "Product reviews",
    rating: 4.5,
    total: 5,
  },
  {
    reviews: "Product reviews",
    rating: 4.5,
    total: 5,
  },
  {
    reviews: "Product reviews",
    rating: 4.5,
    total: 5,
  },
  {
    reviews: "Product reviews",
    rating: 4.5,
    total: 5,
  },
]; */

const CustomerEngagement = ({ products }: { products: productData[] }) => {
  const allRatings = products.flatMap(
    (item) => item?.ratings && item?.ratings.map((r) => r.rating)
  );
  const globalAverageRating = allRatings[0]
    ? allRatings.length > 0
      ? (
          allRatings?.reduce((sum, r) => sum + r, 0) / allRatings?.length
        ).toFixed(1)
      : "0"
    : 0;

  console.log({ globalAverageRating });
  return (
    <div>
      <p className="text-gray-700">
        <strong>Total wishlist adds:</strong> 45
      </p>
      {/*  <p className="text-gray-700 mb-4">
        <strong>Repeat customers: </strong> 120(400 Sales)
      </p> */}
      <p className="text-gray-700 mb-4">
        <strong>Average product rating: </strong> {globalAverageRating} stars
      </p>

      <table className="w-full text-black border-none">
        <thead>
          <tr className="flex space-x-4 text-left">
            <th className="p-2 bg-white border-md flex-1">Product</th>
            <th className="p-2 bg-white border-md flex-1">Ratings</th>
            <th className="p-2 bg-white border-md flex-1">Toal</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="text-center flex space-x-4">
              {<td className="p-2 flex-1">{product.name}</td>}
              <td className="p-2 flex-1">
                {" "}
                {product?.ratings?.length > 0
                  ? (
                      product?.ratings?.reduce((sum, r) => sum + r.rating, 0) /
                      product.ratings?.length
                    ).toFixed(1)
                  : "0"}
              </td>
              <td className="p-2 flex-1">{product?.ratings?.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerEngagement;
