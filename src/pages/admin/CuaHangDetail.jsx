import {
  ArrowLeft,
  Store,
  MapPin,
  Phone,
  Mail,
  Image,
  
 
  Star,
  Tag,
  User2,
  CalendarDays,
  
  ShieldCheck,
 
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
//import { Allstores } from "@/data/mockDataCH";
// Xóa bỏ các import liên quan đến router: useNavigate, useParams
import axios from "axios";
import { useEffect, useState } from "react";
// --- DATA MẪU (giữ nguyên để map trong component) ---






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


  const [store, setStore] = useState(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
  async function getStore() {
    try {
      const token = localStorage.getItem("access_token");

      const res = await axios.get(
        "https://tmdt-backend-ego0.onrender.com/api/users?page=1&limit=100",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const manager = res.data.data.find(
        (u) => u.UserID === id && u.RoleName.toUpperCase() === "MANAGER"
      );

      if (!manager) {
        setStore(null);
        return;
      }

      setStore({
        ShopID: manager.UserID,
        ShopName: `Cửa hàng của ${manager.FullName}`,
        Address: "Chưa cập nhật",
        Description: "",
        Hotline: manager.PhoneNumber,
        Email: manager.Email,
        ShopImageURL: manager.AvatarURL,
        CreatedAt: new Date().toISOString(),
        Rating: 0,
        IsActive: manager.IsActive,
      });
    } catch (err) {
      console.log(err);
      setStore(null);
    } finally {
      setLoading(false);
    }
  }

  getStore();
}, [id]);
if (loading) {
 return (
  <div className="p-10 text-center">
    Đang tải cửa hàng...
  </div>
 )
}
 if (!store) {
  return (
    <div className="p-10 text-center">
      <p className="text-gray-500">
        Không tìm thấy cửa hàng.
      </p>


      <button
        onClick={() => navigate("/cuahang")}
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
            onClick={() => navigate("/cuahang")}
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
              {store.ShopName}
            </h1>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-md border border-blue-100">
                <Tag size={11} />
                MÃ CH: {store.ShopID}
              </span>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <MapPin size={13} />
                <span>{store.Address}</span>
              </div>
            </div>
          </div>
          
        </div>


        {/* Stats row */}
        {/* Shop info row */}
<div className="grid grid-cols-4 gap-4 mb-6">


  <div className="bg-white border border-gray-200 rounded-xl p-4">
    <span className="text-[10px] font-bold text-gray-400 uppercase">
      Trạng thái
    </span>


    <div className="flex items-center gap-2 mt-3">
      <span className={`w-2 h-2 rounded-full ${
        store.IsActive
        ? "bg-emerald-500"
        : "bg-red-500"
      }`} />


      <span className="font-bold text-gray-800">
        {store.IsActive ? "Đang hoạt động" : "Tạm khóa"}
      </span>
    </div>
  </div>




  <div className="bg-white border border-gray-200 rounded-xl p-4">


    <span className="text-[10px] font-bold text-gray-400 uppercase">
      Đánh giá
    </span>


    <div className="flex items-center gap-2 mt-3">
      <Star size={16} className="text-yellow-500"/>
      <span className="font-bold">
        {store.Rating ?? "Chưa có"}
      </span>
    </div>


  </div>




  <div className="bg-white border border-gray-200 rounded-xl p-4">


    <span className="text-[10px] font-bold text-gray-400 uppercase">
      Ngày tạo
    </span>


    <p className="mt-3 font-bold text-gray-800 text-sm">
      {new Date(store.CreatedAt).toLocaleDateString("vi-VN")}
    </p>


  </div>




  <div className="bg-white border border-gray-200 rounded-xl p-4">


    <span className="text-[10px] font-bold text-gray-400 uppercase">
      Hotline
    </span>


    <p className="mt-3 font-bold text-gray-800 text-sm">
      {store.Hotline || "Chưa cập nhật"}
    </p>


  </div>


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
 <p className="font-bold text-gray-800 text-sm">
   {store.ShopName}
 </p>


 <p className="text-gray-500 text-sm mt-0.5">
   {store.Address}
 </p>
</div>
                  </div>
                </div>
                {/* Description */}
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">
                    Mô tả cửa hàng
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {store.Description || "Không có mô tả nào cho cửa hàng này."}
                  </p>
                </div>
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
                     <span className="text-sm text-gray-700 font-medium">
                  {store.Email || "Chưa cập nhật"}
                    </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1.5">
                      Số điện thoại kinh doanh
                    </p>
                    <div className="flex items-center gap-2">
                      <Phone size={13} className="text-blue-500" />
                      <span className="text-sm text-gray-700 font-medium">
                        {store.Hotline || "Chưa cập nhật"}
                        </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  
                </div>
              </div>
            </SectionCard>
          </div>


          {/* Right column (1/3) */}
          <div className="col-span-1 flex flex-col gap-5">
            {/* Logo */}
            <SectionCard icon={Image} title="Logo cửa hàng">
              <div className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center py-8 gap-3 bg-gray-50/50 hover:bg-blue-50/30 hover:border-blue-300 transition-all cursor-pointer group">
                <div>
{
store.ShopImageURL ? (
<img
 src={store.ShopImageURL}
 className="w-14 h-14 rounded-xl object-cover"
/>
)
:
(
<div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center">
 L
</div>
)
}
</div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600 group-hover:text-blue-600 transition-colors">
                    {store.ShopName}
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
                    <p className="font-bold text-gray-900 text-sm">Chủ cửa hàng</p>
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
                    <p className="text-sm text-gray-700 font-medium">{store.Email || "Chưa cập nhật"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">
                      Điện thoại
                    </p>
                    <p className="text-sm text-gray-700 font-medium">{store.Hotline || "Chưa cập nhật"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">
                      Ngày tham gia hệ thống
                    </p>
                    <div className="flex items-center gap-1.5">
                      <CalendarDays size={13} className="text-blue-500" />
                      <p className="text-sm text-gray-700 font-medium">
                      {new Date(store.CreatedAt).toLocaleDateString("vi-VN")}
                      </p>
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
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}



