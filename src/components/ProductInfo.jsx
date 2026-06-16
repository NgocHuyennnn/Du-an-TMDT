import { useState } from "react";

export default function ProductInfo({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
// Định dạng giá tiền: 100000 -> 100.000 đ
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price).replace('₫', 'đ'); // Replace để đổi ký hiệu nếu cần
};
  return (
    <div className="flex-1">
      <h1 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h1>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex text-yellow-400 text-xs">{"★★★★★"}</div>
        <span className="text-xs text-gray-500">(Bình luận)</span>
        <span className="text-xs text-gray-400">|</span>
        <span className="text-xs text-gray-500">Đã bán {product.sold}</span>
      </div>

      {/* Thay đoạn này */}
<div className="bg-gray-50 rounded-lg px-4 py-3 mb-4">
  <span className="text-2xl font-bold text-red-600">
    {formatPrice(product.price)}
  </span>
</div>

      {/* Variants */}
      <div className="mb-3">
        <span className="text-xs text-gray-500 mr-3">PHÂN LOẠI</span>
        <div className="inline-flex gap-2 mt-1">
          {product.variants.map((v) => (
            <button
              key={v}
              onClick={() => setSelectedVariant(v)}
              className={`px-3 py-1.5 text-xs rounded border font-medium transition-colors ${
                selectedVariant === v
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-300 text-gray-600 hover:border-blue-400"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-xs text-gray-500">SỐ LƯỢNG</span>
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-base font-medium"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-base font-medium"
          >
            +
          </button>
        </div>
        <span className="text-xs text-gray-400">{product.stock} sản phẩm có sẵn</span>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex-1 border-2 border-blue-600 text-blue-600 px-4 py-2.5 rounded text-sm font-semibold hover:bg-blue-50 transition-colors">
          THÊM VÀO GIỎ HÀNG
        </button>
        <button className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded text-sm font-semibold hover:bg-blue-700 transition-colors">
          MUA NGAY
        </button>
      </div>
    </div>
  );
}
