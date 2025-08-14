"use client";

import { deleteRunwayVideo } from "@/networking/endpoints/runway/deleteRunwayVideo";
import { getRunwayVideos } from "@/networking/endpoints/runway/getRunwayVideos";
import { useBoundStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AllVideos() {
  const [search, setSearch] = useState("");
  /*   const [page, setPage] = useState(1);
  const totalPages = 800; */

  const allRunwayVideos = useBoundStore((state) => state.allRunwayVideos);
  const setAllRunwayVideos = useBoundStore((state) => state.setAllRunwaVideos);

  const router = useRouter();
  useEffect(() => {
    const handleGetAllRunwayVideos = async () => {
      const result = await getRunwayVideos();

      setAllRunwayVideos(result.data);
    };
    handleGetAllRunwayVideos();
  }, [setAllRunwayVideos]);

  const handleDeletRunwayVideo = async (id: number) => {
    const result = await deleteRunwayVideo(id);
    if (result) {
      // Optionally, you can refetch the videos or update the state
      const updatedVideos = allRunwayVideos.filter((video) => video.id !== id);
      setAllRunwayVideos(updatedVideos);
    }
  };
  return (
    <div className="p-6 w-full text-black">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for runway video"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-lg p-2 border rounded"
        />
      </div>
      <div className="border rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="text-kikaeBlue">
            <tr>
              <th className="p-2">Video</th>
              <th className="p-2">Name</th>
              <th className="p-2">Description</th>
              <th className="p-2">Item 1</th>
              <th className="p-2">Item 2</th>
              <th className="p-2">Item 3</th>
              <th className="p-2">Item 4</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allRunwayVideos.map((row) => {
              const paddedProducts = [...row.products];

              // Pad the products array with nulls if less than 4
              while (paddedProducts.length < 4) {
                paddedProducts.push(null);
              }

              return (
                <tr key={row.id}>
                  <td
                    onClick={() => router.push(`/dashboard/runway/${row.id}`)}
                    className="p-2"
                  >
                    <img src="/img/logo.png" alt="Video" className="w-8 h-8" />
                  </td>
                  <td
                    onClick={() => router.push(`/dashboard/runway/${row.id}`)}
                    className="p-2 underline cursor-pointer"
                  >
                    {row.title}
                  </td>
                  <td className="p-2">{row.description}</td>

                  {paddedProducts.map((item, index) => (
                    <td key={index} className="p-2">
                      {item ? (
                        <img
                          src="/img/logo.png"
                          alt={`Item ${index + 1}`}
                          className="w-8 h-8"
                        />
                      ) : (
                        <span className="text-gray-400 italic">No product</span>
                      )}
                    </td>
                  ))}

                  <td className="p-2">
                    <button
                      onClick={() => handleDeletRunwayVideo(row.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/*   <div className="flex justify-between items-center mt-4">
        <span>Showing 12 of 100,000 results</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="p-2 border rounded"
          >
            ◀
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="p-2 border rounded"
          >
            ▶
          </button>
        </div>
      </div> */}
    </div>
  );
}
