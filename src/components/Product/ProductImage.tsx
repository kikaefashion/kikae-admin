"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { mediaUrlPrefix } from "@/networking/apiUrl";

interface ImageGalleryProps {
  images: { id: number; title: string; product_id: number; url: string }[];
  maxVisible?: number;
}

export default function ImageGallery({
  images,
  maxVisible = 6,
}: ImageGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const visibleImages = images.slice(0, maxVisible);
  const remainingCount = Math.max(0, images.length - maxVisible);

  const handleImageClick = (index: number) => {
    if (index === maxVisible - 1 && remainingCount > 0) {
      // Clicked on "+X more" overlay
      setCurrentImageIndex(maxVisible);
    } else {
      setCurrentImageIndex(index);
    }
    setIsModalOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Handle empty images array
  if (!images || images.length === 0) {
    return (
      <div className="w-full max-w-sm p-8 text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
        <p>No images available</p>
      </div>
    );
  }

  const renderGallery = () => {
    const imageCount = Math.min(images.length, maxVisible);

    // Handle empty images array
    if (imageCount === 0) return null;

    // Single image - large display
    if (imageCount === 1) {
      return (
        <div className="w-full max-w-sm">
          <div
            className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => handleImageClick(0)}
          >
            <img
              src={mediaUrlPrefix + visibleImages[0].url || "/placeholder.svg"}
              alt={visibleImages[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              1/{images.length}
            </span>
          </div>
        </div>
      );
    }

    // Two images - side by side
    if (imageCount === 2) {
      return (
        <div className="flex gap-2 max-w-md">
          {visibleImages.map((image, index) => (
            <div
              key={image.id}
              className="relative flex-1 aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={mediaUrlPrefix + image.url || "/placeholder.svg"}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {index + 1}/{images.length}
              </span>
            </div>
          ))}
        </div>
      );
    }

    // 3 or more images - 2x2 grid
    return (
      <div className="grid grid-cols-4 gap-2 ">
        {visibleImages.slice(0, 4).map((image, index) => (
          <div
            key={image.id}
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => handleImageClick(index)}
          >
            <img
              src={mediaUrlPrefix + image.url || "/placeholder.svg"}
              alt={image.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              {index + 1}/{images.length}
            </span>

            {/* Show "+X more" overlay on the 4th image if there are more than 4 images */}
            {index === 3 && images.length > 4 && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  +{images.length - 4} more
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="p-4">{renderGallery()}</div>

      {/* Modal for viewing all images */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <div className="relative">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 z-10 bg-black/70 text-white text-sm px-3 py-1 rounded">
              {currentImageIndex + 1} / {images.length}
            </div>

            {/* Main image */}
            <div className="relative aspect-video bg-black">
              <img
                src={
                  mediaUrlPrefix + images[currentImageIndex]?.url ||
                  "/placeholder.svg"
                }
                alt={images[currentImageIndex]?.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Thumbnail strip */}
            <div className="p-4 bg-gray-100">
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className={`relative w-16 h-16 flex-shrink-0 rounded cursor-pointer overflow-hidden border-2 ${
                      index === currentImageIndex
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
