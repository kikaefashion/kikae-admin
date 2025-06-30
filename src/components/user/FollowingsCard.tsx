import { ArrowBack } from "@/assets/ArrowBack";
import { useBoundStore } from "@/store/store";
import { useRouter } from "next/navigation";
import React from "react";

/* const followers = [
  {
    name: "Abigail couture",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
  {
    name: "Amaka Ike",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
    highlighted: true,
  },
  {
    name: "Osato Iyare",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
  {
    name: "Osato Iyare",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
  {
    name: "Osato Iyare",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
  {
    name: "Osato Iyare",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
  {
    name: "Osato Iyare",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
  {
    name: "Abigail couture",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
  {
    name: "Amaka Ike",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
    highlighted: true,
  },
  {
    name: "Osato Iyare",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
  {
    name: "Osato Iyare",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
  {
    name: "Osato Iyare",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
  {
    name: "Osato Iyare",
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  },
];
 */

const FollowingGrid = () => {
  const router = useRouter();
  const followings = useBoundStore((state) => state.userDetails?.followings);

  if (!followings) return;

  return (
    <div className="p-6 text-black">
      <div className="flex flex-row items-center gap-6  mb-4">
        <button onClick={() => router.back()}>
          <ArrowBack />
        </button>
        <h2 className="text-xl font-semibold">Following</h2>
      </div>

      {/* Following Grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
        {followings.map((follower, index) => (
          <div key={index} className={`flex flex-col items-center`}>
            <div className={`relative rounded-full p-1 `}>
              <img
                src={
                  "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg"
                }
                alt={"A store"}
                className="w-20 h-20 rounded-full "
              />
            </div>
            {/*   <p className={`mt-1 text-sm`}>{follower.store_id}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowingGrid;
