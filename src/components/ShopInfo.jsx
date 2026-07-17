import { useNavigate } from "react-router-dom";
export default function ShopInfo({ shop, product }) {
  const navigate = useNavigate();
  if (!shop) return null;

  return (
    <div className="bg-white rounded-lg p-4 mb-4 shadow-sm flex items-center justify-between">

      {/* Shop */}
      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>


        <div>
          <p className="font-semibold text-sm">
            {shop.ShopName || "Không có tên shop"}
          </p>

          <p className="text-xs text-gray-500">
            Shop chính hãng
          </p>

          <div className="flex gap-2 mt-2">
            <button
  onClick={() =>
    navigate("/chatkhach", {
      state: {
        shopId: shop.ShopID,
      },
    })
  }
  className="text-xs border px-3 py-1 rounded hover:bg-gray-50"
>
  CHAT NGAY
</button>

            <button
  onClick={() => {
    console.log(shop);
    console.log(shop.ShopID);
    navigate(`/shop/${shop.ShopID}`);
  }}
  className="text-xs border px-3 py-1 rounded hover:bg-gray-50"

>
  XEM SHOP
</button>

          </div>
        </div>

      </div>


      {/* Thống kê */}
      <div className="flex gap-8 text-center">

        <div>
          <p className="font-bold text-blue-600">
            {product?.TotalReviews || 0}
          </p>
          <p className="text-xs text-gray-500">
            Đánh giá
          </p>
        </div>


        

      </div>

    </div>
  );
}