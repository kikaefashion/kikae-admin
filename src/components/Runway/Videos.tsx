"use client";
import { useState, useRef } from "react";
import { motion, useDragControls } from "framer-motion";

const videos: string[] = [
  "https://kikae.com.ng/tailor-api/storage/app/videos/3LopL4pWnDjdNLuvmBpHN7opzq4VJ7j4pbprHlqf.mp4",
  "https://media.w3.org/2010/05/sintel/trailer.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4",
];

export default function Reels() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragControls = useDragControls();
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { y: number } }
  ) => {
    if (info.offset.y < -100) {
      setCurrentIndex((prevIndex) =>
        Math.min(prevIndex + 1, videos.length - 1)
      );
    } else if (info.offset.y > 100) {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      <motion.div
        ref={videoContainerRef}
        key={currentIndex}
        drag="y"
        dragControls={dragControls}
        dragConstraints={{ top: -1000, bottom: 1000 }}
        onDragEnd={handleDragEnd}
        animate={{ y: 0 }}
        className="absolute h-[80vh] w-auto"
      >
        <video
          src={videos[currentIndex]}
          autoPlay
          loop
          controls
          className="h-full w-auto rounded-lg shadow-lg"
        />
      </motion.div>
      <div className="absolute top-1/2 left-4 flex flex-col space-y-4">
        <button
          onClick={() =>
            setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
          }
          className="p-2 bg-white rounded-full shadow-md"
        >
          ▲
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              Math.min(prevIndex + 1, videos.length - 1)
            )
          }
          className="p-2 bg-white rounded-full shadow-md"
        >
          ▼
        </button>
      </div>
    </div>
  );
}
