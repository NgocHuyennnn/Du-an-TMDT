import { useState } from "react";

function ReviewCard({ review }) {
  return (
    <div className="border-t pt-4">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
          {review.name[0]}
        </div>
        <span className="text-xs font-medium">{review.name}</span>
        <span className="text-yellow-400 text-xs">{"★".repeat(review.stars)}</span>
      </div>
      <p className="text-xs text-gray-400 mb-1">
        {review.date} | Phân loại: {review.variant}
      </p>
      <p className="text-sm text-gray-700">{review.content}</p>
    </div>
  );
}

export default function ProductReviews({ rating, totalReviews, reviews }) {
  const [activeTab, setActiveTab] = useState("TẤT CẢ");
  const tabs = ["TẤT CẢ", "5 SAO (80)", "4 SAO (5)"];

  return (
    <div className="bg-white rounded-lg p-5 mb-4 shadow-sm">
      <h2 className="font-bold text-base mb-4 uppercase tracking-wide border-b pb-2">
        Đánh giá sản phẩm ({totalReviews})
      </h2>

      <div className="flex items-center gap-8 mb-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-yellow-500">{rating}</p>
          <p className="text-xs text-gray-500">/ 5</p>
          <div className="text-yellow-400 text-sm mt-1">★★★★★</div>
        </div>
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-xs rounded border font-medium transition-colors ${
                activeTab === tab
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-600 hover:border-blue-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {reviews.map((r, i) => (
        <ReviewCard key={i} review={r} />
      ))}

      <button className="text-xs text-blue-500 mt-3 hover:underline block">
        Xem thêm các đánh giá khác...
      </button>
    </div>
  );
}
