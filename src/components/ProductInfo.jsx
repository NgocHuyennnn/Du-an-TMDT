import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductInfo({ product }) {
  const variants = product?.Variants || [];
const [selectedVariant, setSelectedVariant] = useState(variants[0] || null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const handleAddToCart = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
  setShowLoginPopup(true);
  return;
}

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    ...product,
    variant: selectedVariant,
    quantity,
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  setShowPopup(true);

  setTimeout(() => {
    setShowPopup(false);
  }, 2000);
};
  const handleBuyNow = () => {
  const user = JSON.parse(localStorage.getItem("user"));

   if (!user) {
  setShowLoginPopup(true);
  return;
}

  const cart = [
    {
      ...product,
      variant: selectedVariant,
      quantity,
    },
  ];

  localStorage.setItem("checkout", JSON.stringify(cart));

  navigate("/giohang");
};
// Định dạng giá tiền: 100000 -> 100.000 đ
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price).replace('₫', 'đ'); // Replace để đổi ký hiệu nếu cần
};
  return (
    <div className="flex-1">
      <h1 className="text-xl font-bold text-gray-900 mb-1">{product.ProductName}</h1>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex text-yellow-400 text-xs">{"★★★★★"}</div>
        <span className="text-xs text-gray-500">(Bình luận)</span>
        <span className="text-xs text-gray-400">|</span>
        <span className="text-xs text-gray-500">Đã bán {product.SoldQuantity}</span>
      </div>

      {/* Thay đoạn này */}
<div className="bg-gray-50 rounded-lg px-4 py-3 mb-4">
  <span className="text-2xl font-bold text-red-600">
    {formatPrice(product.Price)}
  </span>
</div>

      {/* Variants */}
      <div className="mb-3">
        <span className="text-xs text-gray-500 mr-3">PHÂN LOẠI</span>
        <div className="inline-flex gap-2 mt-1">
          {variants.map((v) => (
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
        <span className="text-xs text-gray-400">{product.StockQuantity} sản phẩm có sẵn</span>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
  <button
    onClick={handleAddToCart}
    className="flex-1 border-2 border-blue-600 text-blue-600 px-4 py-2.5 rounded text-sm font-semibold hover:bg-blue-50 transition-colors"
  >
    THÊM VÀO GIỎ HÀNG
  </button>

  <button
    onClick={handleBuyNow}
    className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded text-sm font-semibold hover:bg-blue-700 transition-colors"
  >
    MUA NGAY
  </button>
</div>
{showPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="bg-black/70 text-white px-8 py-6 rounded-lg flex flex-col items-center gap-3">
      <div className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center text-3xl">
        ✓
      </div>

      <p className="text-sm font-medium">
        Đã thêm vào giỏ hàng
      </p>
    </div>
  </div>
  
)}
{showLoginPopup && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-80 shadow-lg">
      <h3 className="text-lg font-semibold mb-2">
        Yêu cầu đăng nhập
      </h3>

      <p className="text-gray-600 mb-4">
        Vui lòng đăng nhập để tiếp tục mua sắm.
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowLoginPopup(false)}
          className="px-4 py-2 border rounded"
        >
          Hủy
        </button>

        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
