import { useState, useEffect } from "react";
import { addToCart } from "@/api/cartApi";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

function formatPrice(price) { return price.toLocaleString("vi-VN") + "đ"; }
function discount(original, current) { return Math.round(((original - current) / original) * 100); }

export default function FeaturedProducts() {
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

const [showPopup, setShowPopup] = useState(false);
const [showLoginPopup, setShowLoginPopup] = useState(false);
  const VISIBLE = 6;
const handleAddToCart = async (e, product) => {
  e.preventDefault();
  e.stopPropagation();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    setShowLoginPopup(true);
    return;
  }

  try {
    await addToCart(product.id, 1);

    window.dispatchEvent(new Event("cartUpdated"));

    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 2000);

  } catch (err) {
    console.error(err);

    alert("Không thể thêm sản phẩm vào giỏ hàng.");
  }
};
  // Cấu trúc để cắm API thật vào sau này
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://tmdt-backend-ego0.onrender.com/api/products?page=1&limit=100");
        const result = await response.json();
       
        // Map dữ liệu từ API về giao diện
        const formattedData = result.data
  .sort((a, b) => {
    if (b.SoldQuantity !== a.SoldQuantity) {
      return b.SoldQuantity - a.SoldQuantity;
    }

    if ((b.AverageRating || 0) !== (a.AverageRating || 0)) {
      return (b.AverageRating || 0) - (a.AverageRating || 0);
    }

    return (b.ReviewCount || 0) - (a.ReviewCount || 0);
  })
  .map(item => ({
    id: item.ProductID,
    name: item.ProductName,
    price: Number(item.Price),
    originalPrice: Number(item.Price) * 1.2,
    rating: item.AverageRating || 5,
    reviews: item.ReviewCount || item.SoldQuantity || 0,
    sold: item.SoldQuantity || 0,

    image:
      item.Images?.[0]?.ImageURL ||
      item.PrimaryImage ||
      item.image ||
      "https://via.placeholder.com/300",
  }));

setProducts(formattedData);
        setProducts(formattedData);
      } catch (error) { console.error("Lỗi API:", error); }
    };
    fetchProducts();
  }, []);

  const canPrev = offset > 0;
  const canNext = offset + VISIBLE < products.length;
  const visible = products.slice(offset, offset + VISIBLE);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase">Sản phẩm nổi bật</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => setOffset(Math.max(0, offset - 1))} disabled={!canPrev} className="p-2 rounded-lg border hover:border-blue-400 disabled:opacity-30 transition"><ChevronLeft size={18} /></button>
            <button onClick={() => setOffset(canNext ? offset + 1 : offset)} disabled={!canNext} className="p-2 rounded-lg border hover:border-blue-400 disabled:opacity-30 transition"><ChevronRight size={18} /></button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {visible.map((product) => (
            <Link
              key={product.id}
              to={`/chitietsanpham/${product.id}`}
              className="group relative flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-blue-200 hover:shadow-xl transition-all duration-300"
            >
              {/* Ảnh sản phẩm */}
              <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-2 right-2 text-[10px] font-bold text-red-500 bg-white/90 px-1.5 py-0.5 rounded-full shadow-sm">
                  -{discount(product.originalPrice, product.price)}%
                </span>
              </div>

              {/* Thông tin sản phẩm */}
              <div className="p-3 flex flex-col flex-1 pb-14">
                <p className="text-xs text-gray-700 font-medium line-clamp-2 h-8 mb-2 leading-tight">{product.name}</p>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex text-yellow-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={10} className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-200"} />)}</div>
                  <span className="text-[10px] text-gray-400">
    ⭐ {product.rating} • Đã bán {product.sold}
</span>
                </div>
                <div className="mt-auto">
                  <p className="text-sm font-black text-blue-700">{formatPrice(product.price)}</p>
                  <p className="text-[10px] text-gray-400 line-through">{formatPrice(product.originalPrice)}</p>
                </div>
              </div>

              {/* Nút Thêm giỏ hàng (Chỉ hiện khi hover) */}
             <div className="p-3 pt-0">
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <ShoppingCart size={12} /> Thêm giỏ hàng 
                </button>
              </div>
            </Link>
          ))}
        </div>
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
    </section>
  );
}