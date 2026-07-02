import { ShieldCheck, ShoppingBag, Home, Users, ClipboardList, UserPlus, Settings, HelpCircle, LogOut, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function ChangePasswordVerify() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isManager = currentUser?.rolename === "Manager";

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

const handleConfirmLogout = () => {
  setIsLogoutModalOpen(false);


  localStorage.removeItem("user");
  localStorage.removeItem("access_token");


  window.dispatchEvent(new Event("auth-change"));


  navigate('/');
};
  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-gray-800 font-sans antialiased relative w-full overflow-hidden">
     
      {/* ==================== 1. SIDEBAR ==================== */}
      <div className="w-60 bg-white border-r border-gray-100 flex flex-col justify-between shrink-0 z-20">
        <div>
          <div className="p-5 border-b border-gray-50 flex items-center gap-1.5 text-blue-600 font-black text-xl tracking-tight">
            <ShoppingBag size={22} className="fill-blue-600/10" />
            <span className="text-base sm:text-xl font-black tracking-tight text-gray-900">TECH</span>
            <span className="text-base sm:text-xl font-black tracking-tight text-blue-600">TONIC</span>
          </div>
          <nav className="p-3 space-y-1">
            <Link to="/" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-all">
              <Home size={16} /> <span>Trang chủ</span>
            </Link>
            <Link to="/tkcnhan" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-all">
              <Users size={16} /> <span>Tài khoản</span>
            </Link>
           
            <Link to="/donhang" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-all">
              <ClipboardList size={16} /> <span>Đơn hàng</span>
            </Link>
            
            <Link to="/verify" className="flex items-center gap-3 px-3 py-2 text-xs font-black bg-blue-50 text-blue-600 rounded-xl shadow-sm transition-all">
              <ShieldCheck size={16} /> <span>Đổi mật khẩu</span>
            </Link>
            
            {!isManager && (
  <Link
    to="/dktkhoan"
    className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-all"
  >
    <UserPlus size={16} />
    <span>Đăng kí bán hàng</span>
  </Link>
)}
          </nav>
        </div>


        <div className="p-3 border-t border-gray-100 space-y-1">
          <Link to="/cai-dat" className="flex items-center gap-3 px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-blue-600">
            <Settings size={14} /> <span>Cài đặt</span>
          </Link>
          <Link to="/ho-tro" className="flex items-center gap-3 px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-blue-600">
            <HelpCircle size={14} /> <span>Hỗ trợ</span>
          </Link>
         
          <button
            type="button"
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-1.5 text-xs font-bold text-red-400 hover:text-red-600 hover:bg-red-50/50 rounded-lg transition-all border-none bg-transparent text-left cursor-pointer"
          >
            <LogOut size={14} /> <span>Đăng xuất</span>
          </button>
        </div>
      </div>

    <div className="flex-1 bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Card xác minh */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 py-12 px-8">

          <div className="flex flex-col items-center">

            {/* Icon */}
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
              <ShieldCheck
                size={42}
                className="text-red-500"
                strokeWidth={1.8}
              />
            </div>

            {/* Tiêu đề */}
            <h2 className="mt-8 text-xl font-black text-slate-800 text-center">
              Xác minh tài khoản
            </h2>

            {/* Mô tả */}
            <p className="mt-4 max-w-xl text-center text-slate-500 text-sm leading-6">
              Để tăng cường bảo mật cho tài khoản của bạn, vui lòng xác minh
              danh tính bằng mật khẩu hiện tại trước khi đổi mật khẩu.
            </p>

            {/* Button */}
            <Link
              to="/doi-mat-khau"
              className="mt-10 w-full max-w-md"
            >
              <button className="w-full h-12 rounded-xl border border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition flex items-center justify-center gap-2 text-sm font-semibold text-slate-700">
                Xác minh bằng mật khẩu
              </button>
            </Link>

          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white mt-8 rounded-2xl shadow-md border border-slate-200 p-8">

          <div className="space-y-8">

            <div>
              <h3 className="font-bold text-slate-800 text-base">
                Vì sao tôi phải xác minh tài khoản?
              </h3>

              <p className="mt-2 text-sm text-slate-500 leading-6">
                Việc xác minh giúp đảm bảo chỉ chính chủ tài khoản mới có thể
                thực hiện thay đổi mật khẩu, tăng cường bảo mật và hạn chế
                truy cập trái phép.
              </p>
            </div>

            <div className="border-t pt-8">
              <h3 className="font-bold text-slate-800 text-base">
                Nếu không xác minh được thì sao?
              </h3>

              <p className="mt-2 text-sm text-slate-500 leading-6">
                Nếu quên mật khẩu hoặc không thể xác minh, bạn có thể sử dụng
                chức năng <strong>Quên mật khẩu</strong> hoặc liên hệ bộ phận
                hỗ trợ để được trợ giúp.
              </p>
            </div>

          </div>
        </div>
        {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setIsLogoutModalOpen(false)}
          ></div>
         
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full relative z-10 shadow-xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>


            <div className="text-center space-y-3 mt-2">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 mx-auto font-bold text-xl">
                ⚠️
              </div>
              <h3 className="text-sm font-black text-slate-900 tracking-tight">Xác nhận đăng xuất</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Bạn có chắc chắn muốn đăng xuất khỏi tài khoản quản trị hệ thống hiện tại không?
              </p>
            </div>


            <div className="flex items-center gap-2 mt-6">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 h-9 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="flex-1 h-9 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
    </div>
  );
}