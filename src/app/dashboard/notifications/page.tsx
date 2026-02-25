"use client";

import Loader from "@/components/Loader";
import { sendGeneralNotiification } from "@/networking/endpoints/notification";
import { CheckCircleIcon, Circle } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  //const [header, setHeader] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("all")
  const destinations = ["all", "vendors", "customers"]
  const handleSendNotifications = async () => {
    setIsLoading(true);
    await sendGeneralNotiification(title, message, [selectedDestination]);
    setIsLoading(false);
  };

  return (
    <div className="p-6 space-y-6 text-black">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-xl shadow space-y-4">
          <h2 className="font-semibold text-lg">Send push notifications</h2>
          {/*   <input
            type="text"
            placeholder="Header"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            className="w-full border p-2 rounded"
          /> */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border p-2 rounded h-24"
          />

          <div className="flex justify-between">

            {
              destinations.map(item => {
                return <div onClick={() => { setSelectedDestination(item) }} className="flex cursor-pointer items-center gap-2.5" >
                  {selectedDestination == item ? <CheckCircleIcon /> : <Circle />}
                  {
                    item
                  }
                </div>
              })
            }

          </div>




          <button
            disabled={isLoading}
            type="button"
            onClick={handleSendNotifications}
            className="bg-blue-600 text-white px-4 py-2 rounded-full"
          >
            {isLoading ? <Loader /> : "Send notification"}
          </button>
        </div>
        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="font-semibold text-lg text-gray-600 mb-4">
            In-app notification sample
          </h2>
          <div className="p-4 border rounded-xl">
            {/*   <p className="text-blue-600 font-bold uppercase">
              {header || "HEADER"}
            </p> */}
            <p className="font-medium text-sm text-gray-700">
              {title || "Title"}
            </p>
            <p className="font-semibold text-black mt-1">
              {message || "Message"}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
