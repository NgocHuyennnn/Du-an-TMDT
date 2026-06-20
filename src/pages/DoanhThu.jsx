import { Bell, ClipboardList, HelpCircle, Home, Settings, ShoppingBag, Store, Users } from 'lucide-react';
import { Link } from 'react-router';

export default function DoanhThu() {
  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-gray-800 font-sans antialiased relative w-full">
      
      {/* 1. SIDEBAR */}
      <div className="w-60 bg-[#0f172a] text-white border-r border-slate-800  flex-col justify-between shrink-0 hidden md:flex">
        <div>
          <div className="p-5 border-b border-slate-800 flex items-center gap-1.5 font-black text-xl tracking-tight">
            <ShoppingBag size={22} className="fill-blue-500/10 text-blue-500" />
            <span className="text-base sm:text-xl font-black tracking-tight text-slate-100">TECH</span>
            <span className="text-base sm:text-xl font-black tracking-tight text-blue-500">TONIC</span>
          </div>
          <nav className="p-3 space-y-1">
            <Link to="/roles" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <Home size={16} /> <span>Quản lý vai trò</span>
            </Link>
            <Link to="/cuahang" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <Store size={16} /> <span>Quản lý cửa hàng</span>
            </Link>
            <Link to="/baocao" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <ShoppingBag size={16} /> <span>Báo cáo</span>
            </Link>
            <Link to="/dstkhoan" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <Users size={16} /> <span>Tài khoản</span>
            </Link>
            <Link to="/phanquyen" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <ClipboardList size={16} /> <span>Phân quyền</span>
            </Link>
            <Link to="/doanhthu" className="flex items-center gap-3 px-3 py-2 text-xs font-black bg-blue-600 text-white rounded-xl shadow-sm transition-all">
              <ClipboardList size={16} /> <span>Doanh thu</span>
            </Link>
          </nav>
        </div>

        <div className="p-3 border-t border-slate-800 space-y-1 mb-2">
          <Link to="/cai-dat" className="flex items-center gap-3 px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-white">
            <Settings size={14} /> <span>Cài đặt</span>
          </Link>
          <Link to="/ho-tro" className="flex items-center gap-3 px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-white">
            <HelpCircle size={14} /> <span>Hỗ trợ</span>
          </Link>
        </div>
      </div>

      {/* 2. RIGHT CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        
        {/* TOP BAR */}
        <header className="h-16 bg-white border-b border-slate-100 px-6 lg:px-8 flex items-center justify-between z-10 shrink-0">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:block">
            Hệ thống quản trị và Phân quyền
          </div>
          
          <div className="flex items-center gap-4 text-gray-600 ml-auto">
            <button className="p-1.5 hover:bg-gray-50 rounded-full relative cursor-pointer hover:text-blue-600 transition-colors">
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-1.5 hover:bg-gray-50 rounded-full cursor-pointer hover:text-blue-600 transition-colors">
              <HelpCircle size={16} />
            </button>
            <div className="w-px h-5 bg-gray-200 mx-1"></div>
            <div className="flex items-center gap-2 pl-2">
              <div className="w-7 h-7 rounded-full bg-[#0f172a] flex items-center justify-center font-black text-xs text-white shadow-sm select-none">
                AD
              </div>
              <span className="text-xs font-bold text-[#0f172a] hidden sm:inline">Quản trị viên</span>
            </div>
          </div>
        </header>
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-16 h-16 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center">
        <ClipboardList size={28} className="text-slate-400" />
      </div>
      <div className="text-center">
        <p className="text-slate-700 font-bold">Doanh thu</p>
        <p className="text-slate-400 text-sm mt-1">Đang được phát triển.</p>
      </div>
    </div>
    </div>
    </div>
  );
}
