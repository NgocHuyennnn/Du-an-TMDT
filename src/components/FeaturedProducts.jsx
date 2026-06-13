import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Giày thể thao hiệu suất cao",
    price: 1250000,
    originalPrice: 1800000,
    rating: 4.5,
    reviews: 447,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300",
    badge: "Bán chạy",
    badgeColor: "bg-orange-500",
  },
  {
    id: 2,
    name: "Máy ảnh Mirrorless Beta",
    price: 15900000,
    originalPrice: 18000000,
    rating: 4.8,
    reviews: 132,
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=300",
    badge: null,
    badgeColor: "",
  },
  {
    id: 3,
    name: 'Màn hình đa năng 27"',
    price: 8400000,
    originalPrice: 10000000,
    rating: 4.6,
    reviews: 89,
    image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=300",
    badge: null,
    badgeColor: "",
  },
  {
    id: 4,
    name: "Vệ sinh công nghệ cao cấp",
    price: 650000,
    originalPrice: 850000,
    rating: 4.3,
    reviews: 215,
    image: "https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg?auto=compress&cs=tinysrgb&w=300",
    badge: "Sale",
    badgeColor: "bg-red-500",
  },
  {
    id: 5,
    name: "Kính bảo hộ thời trang UV",
    price: 320000,
    originalPrice: 450000,
    rating: 4.4,
    reviews: 178,
    image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=300",
    badge: null,
    badgeColor: "",
  },
  {
    id: 6,
    name: "Giày Sneaker tối giản",
    price: 950000,
    originalPrice: 1200000,
    rating: 4.7,
    reviews: 356,
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=300",
    badge: "Mới",
    badgeColor: "bg-green-500",
  },
  {
    id: 7,
    name: "Tai nghe không dây Pro",
    price: 2200000,
    originalPrice: 2800000,
    rating: 4.9,
    reviews: 521,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300",
    badge: "Hot",
    badgeColor: "bg-red-500",
  },
  {
    id: 8,
    name: "Smartwatch Fitness Series",
    price: 3500000,
    originalPrice: 4200000,
    rating: 4.6,
    reviews: 267,
    image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=300",
    badge: null,
    badgeColor: "",
  },
];

const VISIBLE = 6;

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

function discount(original, current) {
  return Math.round(((original - current) / original) * 100);
}

export default function FeaturedProducts() {
  const [offset, setOffset] = useState(0);

  const canPrev = offset > 0;
  const canNext = offset + VISIBLE < products.length;

  const visible = products.slice(offset, offset + VISIBLE);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">
            Sản phẩm nổi bật
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOffset(Math.max(0, offset - 1))}
              disabled={!canPrev}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setOffset(canNext ? offset + 1 : offset)}
              disabled={!canNext}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Tối ưu responsive: 2 cột trên điện thoại, 3 cột trên tablet, 6 cột trên máy tính */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {visible.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between pb-12" // Thêm pb-12 để giữ khoảng trống cho nút giỏ hàng
            >
              <div className="relative">
                {product.badge && (
                  <span className={`absolute top-2 left-2 z-10 text-[10px] font-bold text-white px-2 py-0.5 rounded-full ${product.badgeColor}`}>
                    {product.badge}
                  </span>
                )}

                <span className="absolute top-2 right-2 z-10 text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full">
                  -{discount(product.originalPrice, product.price)}%
                </span>

                <div className="aspect-square bg-gray-50 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-3">
                  <p className="text-xs text-gray-700 font-medium line-clamp-2 leading-snug mb-2 min-h-[32px]">
                    {product.name}
                  </p>

                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-200"}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400">({product.reviews})</span>
                  </div>

                  <div>
                    <p className="text-sm font-black text-blue-700">{formatPrice(product.price)}</p>
                    <p className="text-[10px] text-gray-400 line-through">{formatPrice(product.originalPrice)}</p>
                  </div>
                </div>
              </div>

              {/* Nút bấm giỏ hàng xuất hiện bằng cách fade in mượt mà, không đè chữ */}
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  <ShoppingCart size={12} />
                  Thêm vào giỏ
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}