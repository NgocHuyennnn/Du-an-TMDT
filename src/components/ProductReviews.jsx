import { useState, useEffect } from "react";
import api from "@/lib/axios";

function ReviewCard({ review }) {
  return (
    <div className="border-t pt-4">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
          {review.ReviewerName?.charAt(0)}
        </div>

        <span className="text-xs font-medium">
          {review.ReviewerName}
        </span>

        <span className="text-yellow-400 text-xs">
          {"★".repeat(review.Rating)}
        </span>
      </div>

      <p className="text-xs text-gray-400 mb-1">
  {new Date(review.CreatedAt + "Z").toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}
</p>


      <p className="text-sm text-gray-700">
        {review.ReviewText}
      </p>
    </div>
  );
}

export default function ProductReviews({ productId }) {
  console.log("productId:", productId);
  const tabs = ["TẤT CẢ"];
  const [activeTab, setActiveTab] = useState("TẤT CẢ");

const [rating, setRating] = useState(0);
const [totalReviews, setTotalReviews] = useState(0);
const [reviews, setReviews] = useState([]);
useEffect(() => {
  if (!productId) return;

  const fetchReviews = async () => {
    try {
      const res = await api.get(
        `/api/products/${productId}/ratings/stats`
      );

      console.log("API:", res.data);

      const result = res.data;

      setRating(result.AverageRating || 0);
      setTotalReviews(result.TotalReviews || 0);
      setReviews(result.Reviews || []);

    } catch (err) {
      console.error(err);
    }
  };

  fetchReviews();
}, [productId]);
console.log("reviews:", reviews);
  return (
    <div className="bg-white rounded-lg p-5 mb-4 shadow-sm">
      <h2 className="font-bold text-base mb-4 uppercase tracking-wide border-b pb-2">
        Đánh giá sản phẩm ({totalReviews})
      </h2>

      <div className="flex items-center gap-8 mb-4">
        <div className="text-center">
  <div className="flex justify-center items-baseline">
    <span className="text-4xl font-bold text-yellow-500">{rating}</span>
    <span className="text-xl text-gray-500 ml-1">/5</span>
  </div>

  <div className="text-yellow-400 text-sm mt-1">
    {"★".repeat(Math.round(rating))}
  </div>
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

      {reviews.length === 0 ? (
  <p className="text-gray-500 text-sm">
    Chưa có đánh giá nào.
  </p>
) : (
  reviews.map((review) => (
    <ReviewCard
      key={review.ReviewID}
      review={review}
    />
  ))
)}

      <button className="text-xs text-blue-500 mt-3 hover:underline block">
        Xem thêm các đánh giá khác...
      </button>
    </div>
  );
}
