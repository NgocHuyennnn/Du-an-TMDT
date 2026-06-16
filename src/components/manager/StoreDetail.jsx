import {
  ArrowLeft,
  Store,
  MapPin,
  Phone,
  Mail,
  Image,
  Edit3,
  CheckCircle2,
  TrendingUp,
  ShoppingBag,
  Star,
  Tag,
  User2,
  CalendarDays,
  ExternalLink,
  ShieldCheck,
  Sofa,
  Lamp,
  Home,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Allstores } from "@/data/mockDataCH";
// Xóa bỏ các import liên quan đến router: useNavigate, useParams

// --- DATA MẪU (giữ nguyên để map trong component) ---
const stats = [
  { label: "TRẠNG THÁI", value: "Đang hoạt động", icon: CheckCircle2, iconColor: "text-emerald-500", badge: true },
  { label: "DOANH THU (THÁNG)", value: "$242,500.00", icon: TrendingUp, iconColor: "text-blue-500", badge: false },
  { label: "ĐƠN HÀNG MỚI", value: "128", icon: ShoppingBag, iconColor: "text-orange-500", badge: false },
  { label: "ĐÁNH GIÁ TRUNG BÌNH", value: "4.9 / 5.0", icon: Star, iconColor: "text-yellow-500", badge: false },
];

const categories = [
  { icon: Sofa, label: "Nội thất" },
  { icon: Lamp, label: "Chiếu sáng" },
  { icon: Home, label: "Di trang trí" },
];

function SectionCard({ icon: Icon, title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100 bg-gray-50/60">
        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
          <Icon size={14} className="text-blue-500" />
        </div>
        <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// --- COMPONENT CHÍNH ---
// Nhận 'store' và 'onBack' trực tiếp từ props thay vì dùng Router
export default function StoreDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const store = Allstores.find(
    (s) => String(s.id) === String(id)
  );
 if (!store) {
  return (
    <div className="p-10 text-center">
      <p className="text-gray-500">
        Không tìm thấy cửa hàng.
      </p>

      <button
        onClick={() => navigate("/stores")}
        className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl"
      >
        Quay lại
      </button>
    </div>
  );
}
  return (
    <div className="flex-1 overflow-y-auto bg-[#f5f7fa]">
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Nút quay lại */}
        <div className="flex items-center gap-2 mb-5">
          <button 
            onClick={() => navigate("/stores")}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors group"
          >
            <ArrowLeft size={15} /> 
            Quay lại danh sách
          </button>
        </div>

        {/* Page header sử dụng dữ liệu từ prop 'store' */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
              {store.name}
            </h1>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-md border border-blue-100">
                <Tag size={11} />
                MÃ CH: {store.code}
              </span>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <MapPin size={13} />
                <span>{store.city}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
  onClick={() => navigate(`/stores/edit/${store.id}`)}
  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-all shadow-md shadow-blue-500/20"
>
  <Edit3 size={14} />
  Chỉnh sửa
</button>
            
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                    {stat.label}
                  </span>
                  <Icon size={15} className={stat.iconColor} />
                </div>
                {stat.badge ? (
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-base font-bold text-gray-800">{stat.value}</span>
                  </div>
                ) : (
                  <span className="text-xl font-black text-gray-900">{stat.value}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-3 gap-5">
          {/* Left column (2/3) */}
          <div className="col-span-2 flex flex-col gap-5">
            {/* Store info */}
            <SectionCard icon={Store} title="Thông tin cửa hàng">
              <div className="grid grid-cols-2 gap-6">
                {/* Address */}
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">
                    Địa chỉ
                  </p>
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-gray-800 text-sm">Lumina Flagship</p>
                      <p className="text-gray-500 text-sm mt-0.5">450 Market Street, Suite 12</p>
                      <p className="text-gray-500 text-sm">San Francisco, CA 94111, USA</p>
                    </div>
                  </div>
                </div>
                {/* Description */}
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">
                    Mô tả cửa hàng
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Lumina Concept Store là không gian trưng bày và bán lẻ cao cấp về nội thất,
                    chiếu sáng và đồ trang trí nhà ở tại khu vực San Francisco.
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* Active product categories */}
            <SectionCard icon={Tag} title="Danh mục sản phẩm hoạt động">
              <div className="grid grid-cols-3 gap-3">
                {categories.map(({ icon: CatIcon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center gap-2.5 border border-gray-200 rounded-xl py-5 bg-gray-50/50 hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-blue-300 group-hover:bg-blue-50 transition-all shadow-sm">
                      <CatIcon size={18} className="text-gray-500 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <span className="text-xs font-bold tracking-widest text-gray-500 uppercase group-hover:text-blue-600 transition-colors">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Contact & support */}
            <SectionCard icon={Phone} title="Thông tin liên hệ & hỗ trợ">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1.5">
                      Email hỗ trợ
                    </p>
                    <div className="flex items-center gap-2">
                      <Mail size={13} className="text-blue-500" />
                      <span className="text-sm text-gray-700 font-medium">support@lumina.io</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1.5">
                      Số điện thoại kinh doanh
                    </p>
                    <div className="flex items-center gap-2">
                      <Phone size={13} className="text-blue-500" />
                      <span className="text-sm text-gray-700 font-medium">+84 000 000 000</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1.5">
                      Website
                    </p>
                    <div className="flex items-center gap-2">
                      <ExternalLink size={13} className="text-blue-500" />
                      <span className="text-sm text-blue-500 font-medium hover:underline cursor-pointer">
                        www.lumina.io
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1.5">
                      Giờ hoạt động
                    </p>
                    <span className="text-sm text-gray-700 font-medium">T2 – T7 · 09:00–18:00</span>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Right column (1/3) */}
          <div className="col-span-1 flex flex-col gap-5">
            {/* Logo */}
            <SectionCard icon={Image} title="Logo cửa hàng">
              <div className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center py-8 gap-3 bg-gray-50/50 hover:bg-blue-50/30 hover:border-blue-300 transition-all cursor-pointer group">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <span className="text-white font-black text-xl">L</span>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600 group-hover:text-blue-600 transition-colors">
                    Lumina Concept Store
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">PNG hoặc SVG. Tối thiểu 512×512px.</p>
                </div>
              </div>
            </SectionCard>

            {/* Owner info */}
            <SectionCard icon={User2} title="Thông tin chủ sở hữu">
              <div className="space-y-4">
                {/* Avatar row */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                    <User2 size={20} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Elena Vance</p>
                    <p className="text-xs text-gray-500 mt-0.5">Giám đốc điều hành</p>
                  </div>
                </div>

                <div className="h-px bg-gray-100" />

                {/* Contact details */}
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">
                      Email trực tiếp
                    </p>
                    <p className="text-sm text-gray-700 font-medium">elena.v@lumina.io</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">
                      Điện thoại
                    </p>
                    <p className="text-sm text-gray-700 font-medium">+1 (555) 012-3456</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">
                      Ngày tham gia hệ thống
                    </p>
                    <div className="flex items-center gap-1.5">
                      <CalendarDays size={13} className="text-blue-500" />
                      <p className="text-sm text-gray-700 font-medium">12 tháng 03, 2021</p>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-100" />

                {/* Actions */}
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-lg transition-all shadow-md shadow-blue-500/20">
                    <Mail size={14} />
                    Liên hệ trực tiếp
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium py-2.5 rounded-lg transition-all">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    Tài khoản đã xác minh
                  </button>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}
