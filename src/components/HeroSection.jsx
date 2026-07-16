import {  Percent, } from "lucide-react";
import mainBanner from "../assets/banner1.webp";
import Banner2 from "../assets/banner2.jpg";
import Banner3 from "../assets/banner3.webp";

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <div className="flex gap-4 h-auto md:h-96 flex-col md:flex-row">
        
        {/* Center Banner - Banner chính */}
        <div className="flex-1 min-h-65 md:min-h-0 relative rounded-2xl overflow-hidden bg-slate-100 shadow-lg group cursor-pointer">
          <img
            src={mainBanner}
            alt="Main Banner"
            // Tăng độ sáng, độ bão hòa để ảnh rực rỡ nhất mà không cần lớp phủ tối
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-110 saturate-110"
          />
          
          {/* Đã xóa lớp phủ tối (gradient overlay) để banner sáng hoàn toàn */}
          
          {/* <div className="relative h-full flex flex-col justify-center px-8 md:px-12 py-8">
            <span className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
              <Tag size={16} /> Ưu đãi giới hạn
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-4 tracking-tighter">
              Thời Trang <br />
              <span className="text-blue-600">Xu Hướng 2026</span>
            </h1>
            <p className="text-sm text-slate-600 mb-6 max-w-sm leading-relaxed">
              Cập nhật phong cách mới nhất với hàng ngàn sản phẩm giảm giá cực sốc. Đừng bỏ lỡ!
            </p>
            <button className="w-fit flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-lg transition-all active:scale-95 shadow-md">
              Mua sắm ngay <ChevronRight size={16} />
            </button>
          </div> */}

          {/* Tag giảm giá */}
          <div className="absolute top-6 right-6 bg-yellow-400 text-slate-900 text-xs font-black px-4 py-2 rounded-full shadow-lg flex items-center gap-1">
            <Percent size={14} /> GIẢM 50%
          </div>
        </div>

        {/* Right Banners */}
        <div className="hidden lg:flex w-80 shrink-0 flex-col gap-4 h-full">
          {/* Sub-banner 1 */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm bg-slate-200 flex-1 group cursor-pointer">
            <img
              src={Banner2}
              alt="Sale"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-105"
            />
            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-black/10">
              <h3 className="text-white font-bold text-lg drop-shadow-md">Voucher 200K</h3>
              <p className="text-white/90 text-xs drop-shadow-md">Cho đơn hàng từ 1 triệu</p>
            </div>
          </div>

          {/* Sub-banner 2 */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm bg-slate-200 flex-1 group cursor-pointer">
            <img
              src={Banner3}
              alt="New Arrivals"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-105"
            />
            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-black/10">
              <h3 className="text-white font-bold text-lg drop-shadow-md">Hàng mới về</h3>
              <p className="text-white/90 text-xs drop-shadow-md">Khám phá ngay bộ sưu tập</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}