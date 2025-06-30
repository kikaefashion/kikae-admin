import { getProductComments } from "@/networking/endpoints/products/getProductComments";
import { getProductReviews } from "@/networking/endpoints/products/getProductReviews";
import { UserProfileType } from "@/types/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

/* const reviews = [
  {
    name: "Chima",
    rating: 4,
    comment:
      "This shirt is one of the best on this platform. It’s sleek and very comfortable on the body.",
    date: "16/02/24",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
  {
    name: "Sandra Asake",
    rating: 5,
    comment:
      "Wow, I really don’t know what to say, this is absolutely mind-blowing and amazing. The cloth is very good.",
    date: "16/02/24",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
  {
    name: "Sandra Asake",
    rating: 5,
    comment:
      "Wow, I really don’t know what to say, this is absolutely mind-blowing and amazing. The cloth is very good.",
    date: "16/02/24",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
  {
    name: "Sandra Asake",
    rating: 5,
    comment:
      "Wow, I really don’t know what to say, this is absolutely mind-blowing and amazing. The cloth is very good.",
    date: "16/02/24",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
];

const comments = [
  {
    question: "How durable are the shirts?",
    replies: [
      "Vendor reply: They’re very durable",
      "User reply: They’re very durable",
    ],
  },
  {
    question: "What are they made of?",
    replies: ["User reply: They’re made up of pure wool."],
  },
  {
    question: "How durable are the shirts?",
    replies: [
      "Vendor reply: They’re very durable",
      "User reply: They’re very durable",
    ],
  },
  {
    question: "What are they made of?",
    replies: [
      "User reply: They’re made up of pure wool.",
      "User reply: They’re made up of pure wool.",
      "User reply: They’re made up of pure wool.",
      "User reply: They’re made up of pure wool.",
    ],
  },
]; */

const CommentModal = () => {
  const [tab, setTab] = useState("reviews");
  const [reviews, setReviews] = useState<
    {
      rating: number;
      user: {
        fname: string;
        lname: string;
        created_at: string;
      };
    }[]
  >([]);
  const [comments, setComments] = useState<
    {
      id: number;
      product_id: string;
      user_id: string;
      comment: string;
      parent_id: number | null;
      created_at: string;
      user: UserProfileType;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const { id }: { id: string } = useParams();

  useEffect(() => {
    setLoading(true);
    getProductReviews(id).then((data) => {
      setReviews(data.data);
    });
    getProductComments(id).then((data) => {
      setComments(data.data);
    });

    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className=" text-black ">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-xl font-semibold">Reviews & Comments</h2>
        <button
          //  onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
      </div>
      <div className="flex space-x-4 mt-3 border-b pb-2">
        <button
          className={`px-4 py-2 ${
            tab === "reviews"
              ? "border-b-2 border-blue-500 font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setTab("reviews")}
        >
          Reviews
        </button>
        <button
          className={`px-4 py-2 ${
            tab === "comments"
              ? "border-b-2 border-blue-500 font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setTab("comments")}
        >
          Comments
        </button>
      </div>
      <div className="mt-4 max-h-80 overflow-y-auto">
        {tab === "reviews" &&
          reviews.length > 0 &&
          reviews.map((review, index) => (
            <div key={index} className="mb-4 flex space-x-3 border-b pb-3">
              <img
                src={review?.user?.fname}
                alt={review?.user?.fname}
                style={{
                  width: 40,
                  height: 40,
                }}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">
                  {review?.user?.fname} {review?.user?.lname}
                </p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={16}
                      className={
                        i < review.rating ? "text-yellow-500" : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="ml-2 font-bold">({review.rating}.0)</span>
                </div>
                {/*     <p className="text-gray-600 text-sm">{review.comment}</p> */}
                {/*     <p className="text-xs text-gray-400">
                  {review.created_at}
                </p> */}
              </div>
            </div>
          ))}
        {tab === "comments" &&
          comments.length > 0 &&
          comments.map((comment, index) => (
            <div key={index} className="mb-4 border-b pb-3">
              <p className="font-semibold">{comment?.user?.fname}</p>
              <p className="text-gray-600 text-sm">{comment?.comment}</p>
              <p className="text-xs text-gray-400">
                {new Date(comment?.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentModal;
