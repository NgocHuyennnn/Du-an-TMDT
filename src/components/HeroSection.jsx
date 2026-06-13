import { Footprints, Monitor, Watch, Camera, Headphones, Gamepad2, ChevronRight } from "lucide-react";

const sidebarCategories = [
  { label: "Giày thể thao", icon: Footprints, href: "#" },
  { label: "Máy tính", icon: Monitor, href: "#" },
  { label: "Đồng hồ", icon: Watch, href: "#" },
  { label: "Máy ảnh", icon: Camera, href: "#" },
  { label: "Phụ kiện", icon: Headphones, href: "#" },
  { label: "Trò chơi", icon: Gamepad2, href: "#" },
];

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* Đã sửa md:h-[360px] thành md:h-96 để tương thích hoàn toàn với Tailwind v4 */}
      <div className="flex gap-4 h-auto md:h-96 flex-col md:flex-row">
        
        {/* Left Sidebar */}
        <div className="hidden md:flex w-48 shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex-col justify-between py-2">
          <div>
            <div className="px-4 py-2 border-b border-gray-100">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Danh mục phổ biến
              </h3>
            </div>
            <ul className="py-1">
              {sidebarCategories.map(({ label, icon: Icon, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
                  >
                    <Icon size={15} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                    <span className="font-medium text-xs">{label}</span>
                    <ChevronRight size={12} className="ml-auto text-gray-300 group-hover:text-blue-400 transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center Banner */}
        <div className="flex-1 min-h-65 md:min-h-0 relative rounded-xl overflow-hidden bg-linear-to-br from-slate-800 via-slate-700 to-slate-600 shadow-sm group cursor-pointer">
          <img
            src="https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=900"
            alt="Banner mùa thu"
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-900/80 via-slate-800/50 to-transparent" />
          <div className="relative h-full flex flex-col justify-center px-6 md:px-10 py-8 md:py-0">
            <span className="inline-block text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-3 px-2.5 py-0.5 bg-blue-500/20 rounded-full w-fit border border-blue-400/30">
              Bộ sưu tập mới
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-2 tracking-tight">
              Bộ sưu tập
              <br />
              <span className="text-blue-400">Mùa Thu</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mb-5 max-w-xs leading-relaxed">
              Khám phá những thiết kế mới nhất với ưu đãi lên đến{" "}
              <span className="text-yellow-400 font-bold">50%</span> chỉ trong tuần này.
            </p>
            <button className="w-fit flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-full transition-all duration-200 shadow-md hover:shadow-blue-500/20 active:scale-95 group/btn">
              Mua ngay
              <ChevronRight size={14} />
            </button>
          </div>
          <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md rotate-3">
            GIẢM 50%
          </div>
        </div>

        {/* Right Images */}
        <div className="hidden lg:flex w-44 shrink-0 flex-col gap-3 h-full">
          {/* Đổi flex-1 h-[174px] sang h-[47%] cố định để tương thích v4 */}
          <div className="rounded-xl overflow-hidden shadow-sm bg-gray-100 group cursor-pointer relative h-[47%]">
            <img
              src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Product 1"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-sm bg-gray-100 group cursor-pointer relative h-[47%]">
            <img
              src="https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Product 2"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

      </div>
    </section>
  );
}