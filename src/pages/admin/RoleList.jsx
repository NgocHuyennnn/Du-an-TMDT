import { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import api from "@/lib/axios";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Users,
  Shield,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Home,
  ClipboardList,
  Settings,
  HelpCircle,
  Bell,
  Store,
  Tag,
} from 'lucide-react';

import ConfirmModal from '@/components/admin/ConfirmModal';


export default function RoleList() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState({ open: false, role: null });
  const [toast, setToast] = useState(null);

  const filteredRoles = roles.filter(
  (r) =>
    r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.description?.toLowerCase().includes(searchTerm.toLowerCase())
);
  const activeCount = roles.filter((r) => r.status === 'active').length;
  const totalUsers = roles.reduce((sum, r) => sum + r.userCount, 0);
 

const fetchRoles = async () => {
  try {
    const res = await api.get("/api/roles");

    const data = res.data.data || res.data;


    const userRes = await api.get(
      "/api/users?page=1&limit=100"
    );

    const users = userRes.data.data || userRes.data || [];


    setRoles(
      data.map(item => {

        const roleId = item.RoleID ?? item.roleid;


        const countUser = users.filter(
          u =>
            String(
              u.RoleID ||
              u.roleid ||
              u.Role?.RoleID ||
              u.role?.RoleID
            )
            === String(roleId)
        ).length;


        return {
          id: roleId,
          name: item.RoleName || item.rolename,
          description: item.Description || item.description || "",
          userCount: countUser,
          status: "active"
        };

      })
    );


  } catch (error) {

    console.error(
      "❌ Lỗi lấy Role:",
      error.response?.data || error.message
    );

    alert("Không thể lấy danh sách vai trò!");

  } finally {
    setLoading(false);
  }
};


useEffect(() => {
  fetchRoles();
}, []);
  const handleDelete = async () => {
  if (!deleteModal.role) return;

  try {

    console.log("ID xóa:", deleteModal.role.id);

    const res = await api.delete(
      `/api/roles/${deleteModal.role.id}`
    );

    console.log("Xóa thành công:", res.data);


    setRoles(prev =>
      prev.filter(
        r => r.id !== deleteModal.role.id
      )
    );


    setDeleteModal({
      open:false,
      role:null
    });


    setToast(
      `Đã xóa vai trò "${deleteModal.role.name}"`
    );


    setTimeout(() => setToast(null),3000);


  } catch(error){

    console.log(
      "LỖI DELETE:",
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.message ||
      "Xóa thất bại"
    );
  }
};
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
            <Link to="/" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <Home size={16} /> <span>Trang chủ</span>
            </Link>
            <Link to="/roles" className="flex items-center gap-3 px-3 py-2 text-xs font-black bg-blue-600 text-white rounded-xl shadow-sm transition-all">
              <Shield size={16} /> <span>Quản lý vai trò</span>
            </Link>
            <Link to="/cuahang" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <Store size={16} /> <span>Quản lý cửa hàng</span>
            </Link>
            <Link to="/danhmuc" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <Tag size={16} /> <span>Danh mục</span>
            </Link>
            
            <Link to="/dstkhoan" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <Users size={16} /> <span>Tài khoản</span>
            </Link>
            <Link to="/phanquyen" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <ClipboardList size={16} /> <span>Phân quyền</span>
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

<div className="p-6 lg:p-8">
    <div>
    {/* Page header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Quản lý vai trò</h1>
          <p className="text-sm text-gray-500 mt-1">Quản lý và phân quyền cho các vai trò trong hệ thống</p>
        </div>
        <button
          onClick={() => navigate('/roles/add')}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20"
        >
          <Plus size={16} />
          Thêm vai trò
        </button>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Shield size={20} className="text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{roles.length}</p>
              <p className="text-xs text-gray-500">Tổng vai trò</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <CheckCircle2 size={20} className="text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
              <p className="text-xs text-gray-500">Đang hoạt động</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
              <Users size={20} className="text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
              <p className="text-xs text-gray-500">Người dùng</p>
            </div>
          </div>
        </div>
      </div>

      

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-5 shadow-sm">
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm vai trò ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-200 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="px-5 py-4 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider w-14">STT</th>
                <th className="px-5 py-4 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider">Vai trò</th>
                <th className="px-5 py-4 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider">Mô tả</th>
                <th className="px-5 py-4 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider">Người dùng</th>
                <th className="px-5 py-4 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider">Trạng thái</th>
                <th className="px-5 py-4 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider w-32">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (

<tr>
<td colSpan={6} className="text-center py-10">
Đang tải dữ liệu...
</td>
</tr>

) : (

filteredRoles.map((role,index)=>(
                <tr
                  key={role.id}
                  className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors group"
                >
                  <td className="px-5 py-4 text-gray-500 font-medium">{index + 1}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-linear-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-xs font-bold text-gray-600">
                        {role.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-900 font-semibold">{role.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600 max-w-xs">{role.description}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Users size={14} className="text-gray-400" />
                      <span className="text-gray-700 font-medium">{role.userCount}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {role.status === 'active' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-50 text-green-600 border border-green-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Hoạt động
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        Ngừng hoạt động
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => navigate(`/roles/detail/${role.id}`)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Xem chi tiết"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => navigate(`/roles/edit/${role.id}`)}
                        className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                        title="Chỉnh sửa"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteModal({ open: true, role })}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Xóa vai trò"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )))}
              {filteredRoles.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle size={32} className="text-gray-300" />
                      <p className="text-gray-500 font-medium">Không tìm thấy vai trò nào</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={deleteModal.open}
        title="Xác nhận xóa vai trò"
        message={`Bạn có chắc chắn muốn xóa vai trò "${deleteModal.role?.name}"? Vai trò này sẽ bị xóa vĩnh viễn và không thể khôi phục.`}
        confirmLabel="Xóa"
        cancelLabel="Hủy"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, role: null })}
      />

      {/* Toast */}
            {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-2 fade-in duration-300">
          <div className="flex items-center gap-3 px-5 py-3 bg-gray-900 text-white rounded-xl shadow-lg">
            <CheckCircle2 size={18} className="text-green-400" />
            <span className="text-sm font-medium">{toast}</span>
          </div>
        </div>
      )}
    </div>
  </div>
</div>
</div>
);
}
