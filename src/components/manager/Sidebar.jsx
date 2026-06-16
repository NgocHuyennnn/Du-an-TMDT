import {
  LayoutDashboard,
  Store,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  Plus,
  Zap,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { icon: LayoutDashboard, label: "Trang chủ", path: "/dashboard" },
  { icon: Store, label: "Cửa hàng", path: "/stores" },
  { icon: Package, label: "Sản phẩm", path: "/products" },
  { icon: ShoppingCart, label: "Đơn hàng", path: "/orders" },
  { icon: Users, label: "Khách hàng", path: "/customers" },
  { icon: BarChart3, label: "Báo cáo", path: "/reports" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-64 h-screen bg-slate-900 flex flex-col fixed left-0 top-0 z-20">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Zap size={18} className="text-white" />
          </div>

          <div>
            <p className="text-white font-bold text-sm tracking-wide">
              MANAGER
            </p>
            <p className="text-slate-400 text-xs">
              Quản lý Thương mại
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-widest px-3 mb-3">
          Menu chính
        </p>

        <ul className="space-y-0.5">
          {navItems.map(({ icon: Icon, label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                    isActive
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={18}
                      className={
                        isActive
                          ? "text-white"
                          : "text-slate-500 group-hover:text-slate-300"
                      }
                    />
                    {label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Add Product */}
      <div className="px-4 pb-4">
        <button
          onClick={() => navigate("/products/create")}
          className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors shadow-lg shadow-blue-500/25"
        >
          <Plus size={16} />
          Thêm sản phẩm
        </button>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800 px-3 py-3 space-y-0.5">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-medium transition-all">
          <Settings size={18} className="text-slate-500" />
          Cài đặt
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-medium transition-all">
          <HelpCircle size={18} className="text-slate-500" />
          Hỗ trợ
        </button>
      </div>
    </aside>
  );
}