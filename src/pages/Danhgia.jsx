import  { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Star,
  Camera,
  MessageSquare,
  ArrowLeft,
  ShoppingBag,
  CheckCircle,
} from "lucide-react";

import hinhNenTechTonic from "../assets/nen.png";

export default function DanhGiaSanPham() {
  const navigate = useNavigate();
  const location = useLocation();

  // Nhận tên sản phẩm từ trang đơn mua truyền sang
const { product, orderId } = location.state || {};
const token = localStorage.getItem("access_token");
console.log(token);

const ProductName = product?.ProductName || "Không có tên sản phẩm";
const productId = product?.ProductID;
const imageUrl = product?.ImageURL;

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleSubmitReview = async (e) => {
  e.preventDefault();

  if (comment.trim().length < 10) {
    alert("Vui lòng nhập tối thiểu 10 ký tự.");
    return;
  }

  try {
    await axios.post(
  `https://tmdt-backend-ego0.onrender.com/api/products/${productId}/ratings`,
  {
    rating,
    reviewtext: comment,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
const reviewedOrders =
    JSON.parse(localStorage.getItem("reviewedOrders")) || [];

if (!reviewedOrders.includes(orderId)) {
    reviewedOrders.push(orderId);
}

localStorage.setItem(
    "reviewedOrders",
    JSON.stringify(reviewedOrders)
);

setReviewSuccess(true);

setTimeout(() => {
    navigate("/donhang");
}, 2000);

  } catch (err) {
    alert(
      err.response?.data?.message ||
      "Gửi đánh giá thất bại."
    );
  }
};

  if (reviewSuccess) {
    return (
      <div className="min-h-screen w-full bg-[#f8fafc] flex items-center justify-center p-4 font-sans antialiased relative">
        {/* Lớp nền chìm đồng bộ kể cả khi thành công */}
        <div className="absolute inset-0 select-none pointer-events-none z-0">
          <img src={hinhNenTechTonic} alt="Background" className="w-full h-full object-cover opacity-[0.15]" />
        </div>
        
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl text-center max-w-md w-full space-y-4 relative z-10">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle size={36} className="fill-emerald-50" />
          </div>
          <h2 className="text-lg font-black text-gray-900 tracking-tight">Cảm ơn bạn đã đánh giá!</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Ý kiến đóng góp của bạn giúp cộng đồng TechTonic lựa chọn sản phẩm tốt hơn...
          </p>
        </div>
      </div>
    );
  }

  return (
    // Đã đổi bg sang relative để làm lớp chứa cho ảnh nền tràn toàn màn hình
    <div className="min-h-screen w-full bg-[#f1f5f9] text-gray-800 py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased relative flex flex-col justify-center items-center">
      
      {/* 🌟 ẢNH NỀN CHÌM KHỔ LỚN TRÀN TOÀN MÀN HÌNH (GIỐNG PAGE ĐĂNG NHẬP) 🌟 */}
      <div className="absolute inset-0 select-none pointer-events-none z-0">
        <img 
          src={hinhNenTechTonic} 
          alt="TechTonic Full Background" 
          className="w-full h-full object-cover opacity-[0.25]" 
          // Độ mờ nâng lên tầm 20% - 25% (opacity-[0.25]) giúp các chi tiết tai nghe, giỏ hàng xung quanh hiển thị rõ như ảnh mẫu
        />
        {/* Lớp phủ mờ nhẹ bằng màu trắng giúp dung hòa ảnh nền, không bị chói mắt */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px]"></div>
      </div>

      {/* KHỐI NỘI DUNG CHÍNH (NỔI LÊN TRÊN NỀN - Z-10) */}
      <div className="max-w-xl w-full space-y-4 relative z-10">
        
        {/* NÚT QUAY LẠI TRANG ĐƠN MUA */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#1d63f6] bg-white/80 hover:bg-white px-3 py-1.5 rounded-lg shadow-2xs transition-all cursor-pointer backdrop-blur-xs w-fit"
        >
          <ArrowLeft size={14} />
          <span>Quay lại Đơn mua</span>
        </button>

        {/* KHUNG FORM TRẮNG NỔI BẬT GIỮA MÀN HÌNH */}
        <div className="bg-white/95 rounded-2xl border border-gray-100 shadow-xl p-6 sm:p-8 space-y-6 backdrop-blur-md">
          
          {/* TIÊU ĐỀ KHỐI */}
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
            <MessageSquare size={20} className="text-[#1d63f6]" />
            <h2 className="text-base font-black text-gray-900 tracking-tight">Đánh giá sản phẩm</h2>
          </div>

          {/* THÔNG TIN SẢN PHẨM ĐƯỢC CHỌN TỪ TRANG ĐƠN MUA */}
          <div className="flex items-center gap-3.5 bg-slate-50/90 border border-slate-100 p-3.5 rounded-xl">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-[#1d63f6] shrink-0 border border-blue-100/30">
              <ShoppingBag size={20} className="fill-blue-50" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[9px] font-bold text-[#1d63f6] uppercase tracking-wider px-1.5 py-0.5 bg-blue-50 rounded-md">Đã hoàn thành</span>
              <h3 className="text-xs font-extrabold text-gray-800 leading-snug line-clamp-2 mt-1">
                {ProductName}
              </h3>
            </div>
          </div>

          {/* BIỂU MẪU ĐÁNH GIÁ CHI TIẾT */}
          <form onSubmit={handleSubmitReview} className="space-y-5">
            
            {/* KHU VỰC CHẤM SAO RATING */}
            <div className="text-center space-y-2 py-4 bg-slate-50/50 border border-dashed border-slate-200 rounded-xl">
              <p className="text-[11px] font-bold text-gray-400">Bạn hài lòng với sản phẩm này chứ?</p>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="cursor-pointer transition-transform active:scale-90 p-0.5"
                  >
                    <Star
                      size={32}
                      className={`transition-colors duration-150 ${
                        star <= (hoverRating || rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-200"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs font-black text-amber-500 min-h-[16px] tracking-tight">
                {({
                  1: "😡 Rất tệ - Không hài lòng",
                  2: "😞 Tệ - Cần cải thiện nhiều",
                  3: "😐 Bình thường - Tạm ổn",
                  4: "🙂 Tốt - Hài lòng về sản phẩm",
                  5: "🥰 Tuyệt vời - Rất đáng mua"
                })[hoverRating || rating]}
              </p>
            </div>

            {/* KHU VỰC NHẬP TEXTAREA */}
            <div className="space-y-1.5 text-xs">
              <label className="block text-[11px] font-bold text-gray-500">Nội dung đánh giá chi tiết</label>
              <textarea
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Hãy chia sẻ cảm nhận về chất lượng sản phẩm, dịch vụ đóng gói giao hàng để giúp người mua sau nhé..."
                className="w-full bg-slate-50/40 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#1d63f6] focus:bg-white text-gray-800 transition-all text-xs resize-none leading-relaxed shadow-2xs"
                required
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-medium px-1">
                <span>Tối thiểu 10 ký tự</span>
                <span>{comment.length} ký tự</span>
              </div>
            </div>

            {/* KHU VỰC TẢI ẢNH ĐÍNH KÈM */}
            <div className="space-y-1.5 text-xs">
              <label className="block text-[11px] font-bold text-gray-500">Thêm hình ảnh thực tế</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="w-16 h-16 bg-slate-50 hover:bg-slate-100 border border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 gap-1 transition-colors cursor-pointer"
                  onClick={() => alert("Chức năng đang được kết nối dữ liệu!")}
                >
                  <Camera size={18} />
                  <span className="text-[9px] font-bold">Thêm ảnh</span>
                </button>
                <p className="text-[10px] text-gray-400 leading-normal font-medium max-w-[260px]">
                  Hình ảnh thực tế giúp nhận xét của bạn có độ tin cậy cao hơn.
                </p>
              </div>
            </div>

            {/* NÚT GỬI ĐÁNH GIÁ (ĐỒNG BỘ MÀU BANNER ĐĂNG NHẬP) */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#1d63f6] text-white h-11 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#1554d1] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Hoàn tất và Gửi đánh giá</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}