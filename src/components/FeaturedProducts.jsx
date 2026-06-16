import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function formatPrice(price) { return price.toLocaleString("vi-VN") + "đ"; }
function discount(original, current) { return Math.round(((original - current) / original) * 100); }

export default function FeaturedProducts() {
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);
  const VISIBLE = 6;

  // Cấu trúc để cắm API thật vào sau này
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://81ddadcb-aef7-4c78-a255-e50a3da2f3c9.mock.pstmn.io/api/products");
        const result = await response.json();
        
        // Map dữ liệu từ API về giao diện
        const formattedData = result.data.map(item => ({
          id: item.ProductID,
          name: item.ProductName,
          price: item.Price,
          originalPrice: item.Price * 1.2, 
          rating: 4.5,
          reviews: 120,
          image: item.Images ? item.Images[0] : "https://via.placeholder.com/300",
          badge: null,
          badgeColor: ""
        }));
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
              to={`/product/${product.id}`}
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
                  <span className="text-[10px] text-gray-400">({product.reviews})</span>
                </div>
                <div className="mt-auto">
                  <p className="text-sm font-black text-blue-700">{formatPrice(product.price)}</p>
                  <p className="text-[10px] text-gray-400 line-through">{formatPrice(product.originalPrice)}</p>
                </div>
              </div>

              {/* Nút Thêm giỏ hàng (Chỉ hiện khi hover) */}
             <div className="p-3 pt-0">
                <button 
                  onClick={(e) => { e.preventDefault(); console.log("Giỏ hàng:", product.id); }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <ShoppingCart size={12} /> Thêm giỏ hàng 
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}