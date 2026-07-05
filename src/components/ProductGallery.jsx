import { useState } from "react";

const BASE_URL = "https://tmdt-backend-ego0.onrender.com";

const PlaceholderImg = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

export default function ProductGallery({ thumbnails = [] }) {
  const [selected, setSelected] = useState(0);

  if (!thumbnails.length) {
    return (
      <div className="w-56 h-52 rounded-lg border border-gray-200 flex items-center justify-center bg-gray-100">
        <PlaceholderImg className="w-14 h-14 text-gray-300" />
      </div>
    );
  }

  const getImageUrl = (image) => {
  if (!image) return "https://via.placeholder.com/300";

  // Nếu truyền object
  if (typeof image === "object") {
    image = image.ImageURL;
  }

  if (!image) return "https://via.placeholder.com/300";

  if (image.startsWith("http")) return image;

  return `${BASE_URL}${image}`;
};

  return (
    <div className="flex gap-3">
      <div className="flex flex-col gap-2">
        {thumbnails.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-16 h-14 rounded border-2 overflow-hidden ${
              selected === i
                ? "border-blue-500"
                : "border-gray-200"
            }`}
          >
            <img
              src={getImageUrl(img)}
              alt=""
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="w-56 h-52 border rounded-lg overflow-hidden">
        <img
          src={getImageUrl(thumbnails[selected])}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}