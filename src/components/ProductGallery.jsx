import { useState } from "react";

const PlaceholderImg = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export default function ProductGallery({ thumbnails = [1, 2, 3] }) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex gap-3">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2">
        {thumbnails.map((_, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-16 h-14 rounded border-2 flex items-center justify-center bg-gray-100 transition-colors ${
              selected === i ? "border-blue-500" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <PlaceholderImg className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="w-56 h-52 rounded-lg border border-gray-200 flex items-center justify-center bg-gray-100">
        <PlaceholderImg className="w-14 h-14 text-gray-300" />
      </div>
    </div>
  );
}
