import { useState } from "react";

const productImages = [
  "https://placehold.co/500x400/e8e8e8/999?text=Ảnh+chính",
  "https://placehold.co/80x70/e8e8e8/999?text=1",
  "https://placehold.co/80x70/e8e8e8/999?text=2",
  "https://placehold.co/80x70/e8e8e8/999?text=3",
];

const similarProducts = [
  { name: "Ống kính Prime 35mm", price: "4.200.000đ" },
  { name: "Túi máy ảnh da cừu", price: "850.000đ" },
  { name: "Tripod Carbon siêu nhẹ", price: "2.150.000đ" },
  { name: "Máy ảnh Film 36mm", price: "1.250.000đ" },
  { name: "Đèn flash Retro V2", price: "3.400.000đ" },
  { name: "Thẻ nhớ 128GB High Speed", price: "650.000đ" },
];

const reviews = [
  {
    name: "N***H",
    stars: 5,
    date: "2024-03-11 14:23",
    variant: "Bản tiêu chuẩn",
    content: "Sản phẩm tuyệt vời, đóng gói kỹ càng. Giao hàng nhanh hơn dự kiến. Rất đáng tiền.",
  },
];

export default function ProductDetail() {
  const [selectedVariant, setSelectedVariant] = useState("Bản tiêu chuẩn");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(productImages[0]);
  const [activeTab, setActiveTab] = useState("all");

  const variants = ["Bản tiêu chuẩn", "Kèm ống kính", "Combo Deluxe"];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-sm text-gray-800">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center gap-2">
              <span className="text-blue-600 font-bold text-base tracking-widest">TECHTONIC</span>
            </div>
            <div className="flex-1 mx-6">
              <div className="flex items-center bg-gray-100 rounded px-3 py-1.5 max-w-sm mx-auto">
                <svg className="w-4 h-4 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input className="bg-transparent text-xs w-full outline-none placeholder-gray-400" placeholder="Tìm kiếm sản phẩm..." />
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <button className="flex items-center gap-1 hover:text-blue-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Giỏ hàng
              </button>
              <button className="hover:text-blue-600">Đăng nhập</button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-700">Đăng ký</button>
            </div>
          </div>
          {/* Nav */}
          <nav className="flex gap-6 text-xs font-medium border-t border-gray-100 py-2">
            {["TRANG CHỦ", "THỜI TRANG NAM", "THIẾT BỊ ĐIỆN TỬ", "NHÀ CỬA & NỘI THẤT", "SÁCH", "SẮC ĐẸP"].map((item) => (
              <a key={item} href="#" className={`hover:text-blue-600 ${item === "THIẾT BỊ ĐIỆN TỬ" ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-600"}`}>
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
          <a href="#" className="hover:text-blue-600">Trang chủ</a>
          <span>/</span>
          <a href="#" className="hover:text-blue-600">Thiết bị điện tử</a>
          <span>/</span>
          <span className="text-gray-800 font-medium">Máy ảnh Mirrorless Retro</span>
        </div>

        {/* Product Main */}
        <div className="bg-white rounded-lg p-5 mb-4 flex gap-6 shadow-sm">
          {/* Images */}
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              {productImages.slice(1).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-14 rounded border-2 overflow-hidden ${mainImage === img ? "border-blue-500" : "border-gray-200"} flex items-center justify-center bg-gray-100`}
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              ))}
            </div>
            <div className="w-56 h-52 rounded-lg border border-gray-200 flex items-center justify-center bg-gray-100">
              <svg className="w-14 h-14 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 mb-1">MÁY ẢNH MIRRORLESS RETRO</h1>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-yellow-400 text-xs">{"★★★★★"}</div>
              <span className="text-xs text-gray-500">(Bình luận)</span>
              <span className="text-xs text-gray-400">|</span>
              <span className="text-xs text-gray-500">Đã bán 260</span>
            </div>

            <div className="bg-gray-50 rounded-lg px-4 py-3 mb-4">
              <span className="text-2xl font-bold text-red-600">15.900.000đ</span>
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
              <span className="text-xs text-gray-400">10 sản phẩm có sẵn</span>
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
        </div>

        {/* Shop Info */}
        <div className="bg-white rounded-lg p-4 mb-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm">RETRO CAMERA STORE</p>
              <p className="text-xs text-gray-500">Online 2 giờ trước</p>
              <div className="flex gap-2 mt-1">
                <button className="text-xs border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">CHAT NGAY</button>
                <button className="text-xs border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">XEM SHOP</button>
              </div>
            </div>
          </div>
          <div className="flex gap-8 text-center">
            {[["4.8K", "ĐÁNH GIÁ"], ["190", "SẢN PHẨM"], ["96%", "TRẢ PHẢN HỒI"]].map(([val, label]) => (
              <div key={label}>
                <p className="font-bold text-blue-600">{val}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-lg p-5 mb-4 shadow-sm">
          <h2 className="font-bold text-base mb-4 uppercase tracking-wide border-b pb-2">Chi tiết sản phẩm</h2>
          <table className="w-full text-sm">
            <tbody>
              {[
                ["DANH MỤC", "Merchant Console > Thiết bị điện tử > Máy ảnh"],
                ["THƯƠNG HIỆU", "RetroCam"],
                ["LOẠI BẢO HÀNH", "Bảo hành chính hãng"],
                ["HẠN BẢO HÀNH", "12 tháng"],
              ].map(([key, val]) => (
                <tr key={key} className="border-b border-gray-100">
                  <td className="py-2.5 pr-6 text-gray-500 font-medium w-40">{key}</td>
                  <td className="py-2.5 text-gray-800">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg p-5 mb-4 shadow-sm">
          <h2 className="font-bold text-base mb-3 uppercase tracking-wide border-b pb-2">Mô tả sản phẩm</h2>
          <div className="text-sm text-gray-700 leading-relaxed space-y-3">
            <p>
              Máy ảnh Mirrorless Retro là sự kết hợp hoàn hảo giữa vẻ đẹp cổ điển và công nghệ hiện đại. Với cảm biến Full-frame thế hệ mới, sản phẩm mang đến chất lượng hình ảnh sắc nét, dải nhạy sáng cao và khả năng lấy nét chủ nhanh.
            </p>
            <p>
              Thiết kế vỏ kim loại nguyên khối chắc chắn, các nút vận vật lý được thiết kế mạnh lại cảm giác hoài cổ đây cảm hứng cho người sử dụng. Phù hợp cho cả chụp ảnh đường phố lẫn chuyên nghiệp.
            </p>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-lg p-5 mb-4 shadow-sm">
          <h2 className="font-bold text-base mb-4 uppercase tracking-wide border-b pb-2">Đánh giá sản phẩm (85)</h2>
          <div className="flex items-center gap-8 mb-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-yellow-500">4.9</p>
              <p className="text-xs text-gray-500">/ 5</p>
              <div className="text-yellow-400 text-sm mt-1">★★★★★</div>
            </div>
            <div className="flex gap-2">
              {["TẤT CẢ", "5 SAO (80)", "4 SAO (5)"].map((tab) => (
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
            <div key={i} className="border-t pt-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">N</div>
                <span className="text-xs font-medium">{r.name}</span>
                <span className="text-yellow-400 text-xs">{"★".repeat(r.stars)}</span>
              </div>
              <p className="text-xs text-gray-400 mb-1">{r.date} | Phân loại: {r.variant}</p>
              <p className="text-sm text-gray-700">{r.content}</p>
              <button className="text-xs text-blue-500 mt-2 hover:underline">Xem thêm các đánh giá khác...</button>
            </div>
          ))}
        </div>

        {/* Similar Products */}
        <div className="bg-white rounded-lg p-5 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b pb-2">
            <h2 className="font-bold text-base uppercase tracking-wide">Sản phẩm tương tự</h2>
            <a href="#" className="text-xs text-blue-600 hover:underline">XEM TẤT CẢ</a>
          </div>
          <div className="grid grid-cols-6 gap-3">
            {similarProducts.map((p, i) => (
              <div key={i} className="cursor-pointer group">
                <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-700 font-medium leading-tight group-hover:text-blue-600 line-clamp-2">{p.name}</p>
                <p className="text-xs text-red-500 font-bold mt-1">{p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 text-xs py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-4 gap-6">
          <div>
            <p className="text-white font-bold text-base mb-2">TECHTONIC</p>
            <p className="leading-relaxed text-gray-400">Nền tảng thương mại trực tuyến hiện đại. Ứng dụng mua trải nghiệm mua sắm đỉnh cao có độ bảo chính xác.</p>
          </div>
          <div>
            <p className="text-white font-semibold mb-2">HỖ TRỢ KHÁCH HÀNG</p>
            <ul className="space-y-1 text-gray-400">
              <li><a href="#" className="hover:text-white">Trung tâm trợ giúp</a></li>
              <li><a href="#" className="hover:text-white">Hướng dẫn mua hàng</a></li>
              <li><a href="#" className="hover:text-white">Dịch vụ trả hàng</a></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-2">VỀ CHÚNG TÔI</p>
            <ul className="space-y-1 text-gray-400">
              <li><a href="#" className="hover:text-white">Giới thiệu</a></li>
              <li><a href="#" className="hover:text-white">Tuyển dụng</a></li>
              <li><a href="#" className="hover:text-white">Điều khoản sử dụng</a></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-2">THEO DÕI CHÚNG TÔI</p>
            <div className="flex gap-2">
              {["f", "t", "in"].map((s) => (
                <a key={s} href="#" className="w-7 h-7 border border-gray-600 rounded flex items-center justify-center text-gray-400 hover:text-white hover:border-white text-xs font-bold">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
