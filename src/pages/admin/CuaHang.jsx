import { useEffect, useState } from "react";
import axios from "axios";
import {
  Store,
  TrendingUp,
  Star,
  Clock,
  Eye,
  Ban,
  CheckCircle2,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Mail,
  Phone,
  ShoppingBag,
  Home,
  Users,
  ClipboardList,
  Settings,
  HelpCircle,
  Bell,
  Tag,
  Shield,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import SuspendModal from "@/components/manager/SuspendModal";

const statusConfig = {
  active: {
    label: "Hoạt động",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    dot: "bg-emerald-500",
  },
  pending: {
    label: "Chờ duyệt",
    bg: "bg-amber-50",
    text: "text-amber-600",
    dot: "bg-amber-500",
  },
  closed: {
    label: "Đã khóa",
    bg: "bg-rose-50",
    text: "text-rose-600",
    dot: "bg-rose-500",
  },
};
const ITEMS_PER_PAGE = 5;

// --- CÁC COMPONENT PHỤ ---
function StatusBadge({ status }) {
  const cfg = statusConfig[status] || {
    bg: "bg-gray-100",
    text: "text-gray-600",
    dot: "bg-gray-400",
    label: "Khác",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function StatCard({ icon: Icon, iconBg, iconColor, label, value, sub }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </p>
        <div
          className={`w-9 h-9 ${iconBg} rounded-xl flex items-center justify-center`}
        >
          <Icon size={17} className={iconColor} />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-800 tracking-tight">
          {value}
        </p>
        <p className="text-xs mt-1 font-medium text-slate-400">{sub}</p>
      </div>
    </div>
  );
}

function ActionBtn({ icon: Icon, title, color, onClick }) {
  return (
    <button
      title={title}
      onClick={onClick} // Thêm dòng này để nhận sự kiện click
      className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${color}`}
    >
      <Icon size={15} />
    </button>
  );
}

function PageBtn({ children, onClick, active, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`min-w-[32px] h-8 px-2 rounded-lg text-xs font-semibold ${active ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"} ${disabled ? "opacity-30" : ""}`}
    >
      {children}
    </button>
  );
}

// --- COMPONENT CHÍNH ---
export default function StoreManagement() {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");

  const totalStores = stores.length;
  const activeStores = stores.filter((s) => s.status === "active").length;
  const pendingStores = stores.filter((s) => s.status === "pending").length;
  const avgRating =
    totalStores > 0
      ? (
          stores.reduce((acc, curr) => acc + (curr.rating || 0), 0) /
          totalStores
        ).toFixed(1)
      : 0;
  const filtered =
    filterStatus === "all"
      ? stores
      : stores.filter((s) => s.status === filterStatus);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );
  const [suspendTarget, setSuspendTarget] = useState(null);
  useEffect(() => {
    loadManagers();
  }, []);

  const loadManagers = async () => {
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

console.log(res.data);

      const managers = res.data.data
  .filter((u) => u.RoleName === "Manager")
  .map((u) => ({
    id: u.UserID,
    managerId: u.UserID,
    name: u.FullName,
    email: u.Email,
    phone: u.PhoneNumber,
    avatar: u.AvatarURL,
    code: `SHOP-${u.UserID.slice(0, 6)}`,
    city: "-",
    rating: 0,
    status: u.IsActive ? "active" : "closed",
  }));

setStores(managers);
    } catch (err) {
      console.log(err);
      setStores([]);
    }
  };
  const handleSuspend = async (store) => {
  try {
    const token = localStorage.getItem("access_token");

    console.log("User ID:", store.id);

    const res = await axios.patch(
      `https://tmdt-backend-ego0.onrender.com/api/users/${store.id}/status`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);

    await loadManagers();

    setSuspendTarget(null);
  } catch (err) {
    console.log(err.response?.data);
    console.log(err.response?.status);
  }
};
  function handleFilter(s) {
    setFilterStatus(s);
    setPage(1);
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-gray-800 font-sans antialiased w-full">
      <div className="w-60 bg-[#0f172a] text-white border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          <div className="p-5 border-b border-slate-800 flex items-center gap-1.5 font-black text-xl tracking-tight">
            <ShoppingBag size={22} className="fill-blue-500/10 text-blue-500" />
            <span className="text-base sm:text-xl font-black tracking-tight text-slate-100">
              TECH
            </span>
            <span className="text-base sm:text-xl font-black tracking-tight text-blue-500">
              TONIC
            </span>
          </div>
          <nav className="p-3 space-y-1">
            <Link
              to="/roles"
              className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all"
            >
              <Home size={16} /> <span>Trang chủ</span>
            </Link>
            <Link
              to="/roles"
              className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all"
            >
              <Shield size={16} /> <span>Quản lý vai trò</span>
            </Link>
            <Link
              to="/cuahang"
              className="flex items-center gap-3 px-3 py-2 text-xs font-black bg-blue-600 text-white rounded-xl shadow-sm transition-all"
            >
              <Store size={16} /> <span>Quản lý cửa hàng</span>
            </Link>
            <Link
              to="/danhmuc"
              className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all"
            >
              <Tag size={16} /> <span>Danh mục</span>
            </Link>
            
            <Link
              to="/dstkhoan"
              className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all"
            >
              <Users size={16} /> <span>Tài khoản</span>
            </Link>

            <Link
              to="/phanquyen"
              className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all"
            >
              <ClipboardList size={16} /> <span>Phân quyền</span>
            </Link>
            
          </nav>
        </div>

        <div className="p-3 border-t border-slate-800 space-y-1 mb-2">
          <Link
            to="/cai-dat"
            className="flex items-center gap-3 px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-white"
          >
            <Settings size={14} /> <span>Cài đặt</span>
          </Link>
          <Link
            to="/ho-tro"
            className="flex items-center gap-3 px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-white"
          >
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
              <span className="text-xs font-bold text-[#0f172a] hidden sm:inline">
                Quản trị viên
              </span>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                Quản lý Cửa hàng
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Theo dõi và cấu hình các điểm bán hàng.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* NÚT BỘ LỌC CỦA BẠN ĐÂY */}
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                <SlidersHorizontal size={15} /> Bộ lọc
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            icon={Store}
            iconBg="bg-blue-50"
            iconColor="text-blue-500"
            label="Tổng cửa hàng"
            value={totalStores}
            sub="Toàn hệ thống"
          />
          <StatCard
            icon={TrendingUp}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-500"
            label="Đang hoạt động"
            value={activeStores}
            sub="Đang vận hành"
          />
          <StatCard
            icon={Star}
            iconBg="bg-amber-50"
            iconColor="text-amber-500"
            label="Đánh giá trung bình"
            value={avgRating}
            sub="Điểm hệ thống"
          />
          <StatCard
            icon={Clock}
            iconBg="bg-rose-50"
            iconColor="text-rose-500"
            label="Chờ phê duyệt"
            value={pendingStores}
            sub="Cần xử lý"
          />
        </div>

        {/* Table card */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          {/* Filter pills */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2 flex-wrap">
            {["all", "active", "pending", "closed"].map((s) => (
              <button
                key={s}
                onClick={() => handleFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterStatus === s
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {s === "all" ? "Tất cả" : statusConfig[s].label}
              </button>
            ))}
            <span className="ml-auto text-xs text-slate-400 font-medium">
              {filtered.length} cửa hàng
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-100">
                  <th className="px-6 py-3.5 w-10">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300"
                    />
                  </th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Tên cửa hàng
                  </th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Đánh giá
                  </th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Thông tin liên hệ
                  </th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginated.map((store) => (
                  <tr
                    key={store.id}
                    className="group hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-slate-300"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center shrink-0">
                          <Store size={17} className="text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            Cửa hàng của {store.name}
                          </p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-xs text-slate-400 font-mono">
                              {store.code}
                            </span>
                            <span className="text-slate-300">·</span>
                            <span className="flex items-center gap-0.5 text-xs text-slate-400">
                              <MapPin size={10} />
                              {store.city}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={store.status} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <Star
                          size={13}
                          className="text-amber-400 fill-amber-400"
                        />
                        <span className="text-sm font-semibold text-slate-700">
                          {store.rating}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Mail size={12} className="text-slate-400" />
                          {store.email}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <Phone size={12} />
                          {store.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ActionBtn
                          icon={Eye}
                          title="Xem"
                          color="text-blue-500 hover:bg-blue-50"
                          onClick={() => navigate(`/cuahang/${store.id}`)}
                        />

                        {store.status === "closed" ? (
                          <ActionBtn
                            icon={CheckCircle2}
                            title="Kích hoạt"
                            color="text-emerald-500 hover:bg-emerald-50"
                            onClick={async () => {
                              const token =
                                localStorage.getItem("access_token");

                              await axios.patch(
                                `https://tmdt-backend-ego0.onrender.com/api/users/${store.id}/status`,
                                {},
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                },
                              );

                              loadManagers();
                            }}
                          />
                        ) : (
                          <ActionBtn
                            icon={Ban}
                            title="Vô hiệu"
                            onClick={() => setSuspendTarget(store)}
                            color="text-rose-400 hover:bg-rose-50"
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Hiển thị{" "}
              <span className="font-semibold text-slate-600">
                {(page - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(page * ITEMS_PER_PAGE, filtered.length)}
              </span>{" "}
              trên{" "}
              <span className="font-semibold text-slate-600">
                {filtered.length}
              </span>{" "}
              cửa hàng
            </p>
            <div className="flex items-center gap-1">
              <PageBtn
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft size={15} />
              </PageBtn>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <PageBtn key={n} onClick={() => setPage(n)} active={n === page}>
                  {n}
                </PageBtn>
              ))}
              <PageBtn
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                <ChevronRight size={15} />
              </PageBtn>
            </div>
          </div>
        </div>

        <SuspendModal
          store={suspendTarget}
          onClose={() => setSuspendTarget(null)}
          onConfirm={handleSuspend}
        />
      </div>
    </div>
  );
}
