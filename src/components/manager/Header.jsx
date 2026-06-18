import { Search, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center px-6 gap-4 sticky top-0 z-10">
      {/* Logo */}
      <button
        onClick={() => navigate("/stores")}
        className="shrink-0 flex items-center gap-1"
      >
        <span className="text-base sm:text-xl font-black tracking-tight text-gray-900">
          TECH
        </span>
        <span className="text-base sm:text-xl font-black tracking-tight text-blue-600">
          TONIC
        </span>
      </button>

      {/* Search */}
      <div className="flex-1 max-w-sm mx-4">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Tìm kiếm cửa hàng..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
          />
        </div>
      </div>

      {/* Menu */}
      <nav className="flex items-center gap-1 mr-auto">
        <button
          onClick={() => navigate("/tongquat")}
          className="px-3 py-1.5 text-sm font-medium rounded-lg"
        >
          Tổng quát
        </button>

        <button
          onClick={() => navigate("/reports")}
          className="px-3 py-1.5 text-sm font-medium rounded-lg"
        >
          Báo cáo
        </button>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100">
          <Bell size={18} />
        </button>

        <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100">
          <User size={18} />
        </button>
      </div>
    </header>
  );
}