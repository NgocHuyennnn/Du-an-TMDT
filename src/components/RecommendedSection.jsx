import { useState } from "react";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Products } from "@/data/productData";


const PAGE_SIZE = 12;

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

function discountPercent(original, current) {
  if (!original) return 0;
  return Math.round(((original - current) / original) * 100);
}

export default function RecommendedSection() {
  const [page, setPage] = useState(1);
  const [liked, setLiked] = useState(new Set());

  const displayed = Products.slice(0, PAGE_SIZE * page);
  const hasMore = displayed.length < Products.length;

  const toggleLike = (id, e) => {
    e.preventDefault();
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-10">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">
            Gợi ý dành cho bạn
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displayed.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-blue-200 hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <span className="absolute top-2 left-2 z-10 text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full">
                -{discountPercent(product.originalPrice, product.price)}%
              </span>

              <button
                onClick={(e) => toggleLike(product.id, e)}
                className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-all duration-150"
              >
                <Heart
                  size={13}
                  className={liked.has(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"}
                />
              </button>

              <div className="aspect-square bg-gray-50 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Thêm padding-bottom pb-12 để chừa sẵn chỗ trống cố định cho nút Mua trượt lên, không lo bị đè chữ */}
              <div className="p-3 pb-12">
                <p className="text-xs text-gray-700 font-medium line-clamp-2 leading-snug mb-1.5 h-8">
                  {product.name}
                </p>

                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={9}
                        className={
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-200 fill-gray-200"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400">
                    ({product.reviews})
                  </span>
                </div>

                <div>
                  <p className="text-sm font-black text-blue-700">
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-[10px] text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </p>
                </div>
              </div>

              <div className="p-3 pt-0">
                <button 
                  onClick={(e) => { e.preventDefault(); console.log("Giỏ hàng:", product.id); }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <ShoppingCart size={12} /> Thêm giỏ hàng 
                </button>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-10 py-2.5 border-2 border-blue-600 text-blue-600 text-sm font-bold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200 active:scale-95"
            >
              Tải thêm
            </button>
          </div>
        )}
      </div>
    </section>
  );
}