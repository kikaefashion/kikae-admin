export default function ImageGallery() {
  const images = [
    "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg", // Main image
    "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg", // Second image
    "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg", // Thumbnails
    "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
    "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
  ];

  return (
    <div className="flex gap-2">
      {/* Large Images */}
      <div className="flex gap-2">
        {images.slice(0, 2).map((src, index) => (
          <div key={index} className="relative rounded-xl overflow-hidden">
            <img
              style={{ width: "100%", height: "100%" }}
              src={src}
              alt={`Image ${index + 1}`}
              //    layout="fill"
              //    objectFit="cover"
            />
            <span className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
              {index + 1}/{images.length}
            </span>
          </div>
        ))}
      </div>

      {/* Small Image Grid */}
      <div className="grid grid-cols-2 gap-2 w-1/2 ">
        {images.slice(2, 6).map((src, index) => (
          <div key={index} className="relative  rounded-xl overflow-hidden">
            <img
              style={{ width: "100%", height: "100%" }}
              src={src}
              alt={`Image ${index + 3}`}
              // layout="fill"
              //objectFit="cover"
            />
            <span className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
              {index + 3}/{images.length}
            </span>
          </div>
        ))}

        {/* Remaining images counter */}
        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-black bg-opacity-50 flex items-center justify-center text-white text-sm">
          +{images.length - 5} more
        </div>
      </div>
    </div>
  );
}
