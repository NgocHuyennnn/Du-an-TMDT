import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  Shield,
  Users,
  BarChart3,
  Settings,
  ChevronDown,
  Bell,
  X,
  Home,
  LogOut,
} from 'lucide-react';

const navItems = [
  {
    label: 'Trang chủ',
    icon: <Home size={18} />,
    path: '/',
  },
  {
    label: 'Quản lý vai trò',
    icon: <Shield size={18} />,
    path: '/roles',
    children: [
      { label: 'Danh sách vai trò', path: '/roles' },
    ],
  },
  {
    label: 'Tài khoản',
    icon: <Users size={18} />,
    path: '/accounts',
  },
  {
    label: 'Báo cáo',
    icon: <BarChart3 size={18} />,
    path: '/reports',
  },
  {
    label: 'Phân quyền',
    icon: <Settings size={18} />,
    path: '/permissions',
  },
];

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState('Quản lý vai trò');

  const toggleExpand = (label) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  const isActive = (item) => {
    return (
      location.pathname === item.path ||
      item.children?.some((c) => location.pathname === c.path) ||
      (item.path !== '/' && location.pathname.startsWith(item.path))
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1a1f37] text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-white/10">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
            <Shield size={18} className="text-white" />
          </div>
          <span className="font-semibold text-white tracking-wide">Admin Pro</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden ml-auto text-white/60 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* User */}
        <div className="px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin</p>
              <p className="text-xs text-white/50 truncate">Quản trị viên</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3">
          {navItems.map((item) => (
            <div key={item.label}>
              <button
                onClick={() => {
                  if (item.children) {
                    toggleExpand(item.label);
                  } else {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }
                }}
                className={`w-full flex items-center justify-between px-5 py-2.5 text-sm transition-all duration-200 ${
                  isActive(item)
                    ? 'bg-blue-500/15 text-blue-400 border-r-2 border-blue-400'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.children && (
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      expandedItem === item.label ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>
              {item.children && expandedItem === item.label && (
                <div className="bg-black/20">
                  {item.children.map((child) => (
                    <button
                      key={child.path}
                      onClick={() => {
                        navigate(child.path);
                        setSidebarOpen(false);
                      }}
                      className={`w-full text-left pl-14 pr-5 py-2 text-sm transition-colors ${
                        location.pathname === child.path
                          ? 'text-blue-400 font-medium'
                          : 'text-white/40 hover:text-white/70'
                      }`}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/50 hover:text-white/80 hover:bg-white/5 rounded-lg transition-all">
            <LogOut size={18} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
            <Breadcrumb />
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>
            <div className="flex items-center gap-2.5 ml-2 pl-3 border-l border-gray-200">
              <div className="w-9 h-9 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                A
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-900">Admin</p>
                <p className="text-xs text-gray-500">Quản trị viên</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function Breadcrumb() {
  const location = useLocation();
  const path = location.pathname;

  const crumbs = [];

  if (path === '/' || path === '/roles') {
    crumbs.push({ path: '/', label: 'Trang chủ' });
    crumbs.push({ path: '/roles', label: 'Quản lý vai trò' });
  } else if (path.includes('/roles/add')) {
    crumbs.push({ path: '/', label: 'Trang chủ' });
    crumbs.push({ path: '/roles', label: 'Quản lý vai trò' });
    crumbs.push({ path: '/roles/add', label: 'Thêm vai trò' });
  } else if (path.includes('/roles/edit/')) {
    crumbs.push({ path: '/', label: 'Trang chủ' });
    crumbs.push({ path: '/roles', label: 'Quản lý vai trò' });
    crumbs.push({ path: path, label: 'Chỉnh sửa vai trò' });
  } else if (path.includes('/roles/detail/')) {
    crumbs.push({ path: '/', label: 'Trang chủ' });
    crumbs.push({ path: '/roles', label: 'Quản lý vai trò' });
    crumbs.push({ path: path, label: 'Chi tiết vai trò' });
  }

  return (
    <nav className="flex items-center text-sm">
      {crumbs.map((crumb, index) => (
        <span key={crumb.path} className="flex items-center">
          {index > 0 && (
            <span className="mx-2 text-gray-300">
              <ChevronDown size={12} className="-rotate-90" />
            </span>
          )}
          <span
            className={
              index === crumbs.length - 1
                ? 'text-gray-900 font-semibold'
                : 'text-gray-500 hover:text-gray-700'
            }
          >
            {crumb.label}
          </span>
        </span>
      ))}
    </nav>
  );
}
