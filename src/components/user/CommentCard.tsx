import React, { useState } from "react";

const reviews = [
  {
    id: 1,
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
    rating: "4.0 STARS",
    date: "16/02/24",
    comment:
      "This shirt is one of the best on this platform. It’s sleek and very comfortable on the body.",
  },
  {
    id: 2,
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
    rating: "4.0 STARS",
    date: "16/02/24",
    comment:
      "This shirt is one of the best on this platform. It’s sleek and very comfortable on the body.",
  },
  {
    id: 3,
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
    rating: "4.0 STARS",
    date: "16/02/24",
    comment:
      "This shirt is one of the best on this platform. It’s sleek and very comfortable on the body.",
  },
  {
    id: 4,
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
    rating: "4.0 STARS",
    date: "16/02/24",
    comment:
      "This shirt is one of the best on this platform. It’s sleek and very comfortable on the body.",
  },
];

const ReviewsComments = () => {
  const [activeTab, setActiveTab] = useState("reviews");

  return (
    <div className="p-6 text-black">
      <h2 className="text-xl font-semibold mb-4">Reviews & Comments</h2>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "reviews" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Reviews
        </button>
        <button
          onClick={() => setActiveTab("comments")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "comments" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Comments
        </button>
      </div>

      {/* Reviews Grid */}
      {activeTab === "reviews" && (
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex space-x-4">
                <img
                  src={review.image}
                  alt="Product"
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <h3 className="text-blue-500 text-sm font-semibold">
                    {review.rating}
                  </h3>
                  <p className="text-gray-500 text-xs">{review.date}</p>
                </div>
              </div>
              <p className="mt-2 text-gray-700 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      )}

      {/* Placeholder for Comments Tab */}
      {activeTab === "comments" && (
        <div className="text-center text-gray-500">No comments available.</div>
      )}
    </div>
  );
};

export default ReviewsComments;
