import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import {
  ArrowLeft,
  Pencil,
  Calendar,
  Users,
  Shield,
  CheckCircle2,
  Clock,
  
  ShoppingBag,
  Home,
  ClipboardList,
  Settings,
  HelpCircle,
  Bell,
  Store,
  Tag
} from 'lucide-react';

import api from "@/lib/axios";


export default function RoleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('info');
const [role, setRole] = useState(null);
const [loading, setLoading] = useState(true);
const [permissions, setPermissions] = useState([]);
const [users, setUsers] = useState([]);

useEffect(() => {
  const getRole = async () => {
    try {
      const res = await api.get(`/api/roles`);

const list = res.data.data || res.data;
console.log(res.data);
const item = list.find(
  r => String(r.RoleID || r.roleid) === String(id)
);

if (!item) {
  setRole(null);
  return;
}

      setRole({
        id: item.RoleID || item.roleid,
        name: item.RoleName || item.rolename,
        description: item.Description || item.description || "",
        userCount: Number(item.UserCount || item.usercount || 0),
        status: "active",
        createdAt: item.CreatedAt || "",
        updatedAt: item.UpdatedAt || ""
      });


      const permRes = await api.get(
        `/api/roles/${id}/permissions`
      );

      setPermissions(
        permRes.data.data || permRes.data || []
      );
      const userRes = await api.get(
  `/api/users?page=1&limit=100`
);


const allUsers = userRes.data.data || userRes.data || [];

const roleUsers = allUsers.filter(
  u =>
    String(
      u.RoleID ||
      u.roleid ||
      u.Role?.RoleID ||
      u.role?.RoleID
    )
    ===
    String(item.RoleID || item.roleid)
);

setUsers(roleUsers);

    } catch(error){
      console.log("Lỗi lấy role detail:", error);
    } finally {
      setLoading(false);
    }
  };

  getRole();

},[id]);
  if (loading) {
 return (
  <div className="text-center py-20">
    Đang tải...
  </div>
 )
}


if (!role) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield size={24} className="text-gray-400" />
        </div>
        <p className="text-gray-500 font-medium">Không tìm thấy vai trò</p>
        <button
          onClick={() => navigate('/roles')}
          className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  

  const totalPerms = permissions.length;
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
            <Link to="/baocao" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <ShoppingBag size={16} /> <span>Báo cáo</span>
            </Link>
            <Link to="/dstkhoan" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <Users size={16} /> <span>Tài khoản</span>
            </Link>
            <Link to="/phanquyen" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <ClipboardList size={16} /> <span>Phân quyền</span>
            </Link>
            <Link to="/doanhthu" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
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

<div className="p-6 lg:p-8">
    <div>
      <button
        onClick={() => navigate('/roles')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-5 transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        <span className="font-medium">Quay lại danh sách</span>
      </button>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/20">
              {role.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{role.name}</h1>
                {role.status === 'active' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600 border border-green-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Hoạt động
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    Ngừng hoạt động
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">{role.description}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  Tạo: {role.createdAt}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  Cập nhật: {role.updatedAt}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate(`/roles/edit/${role.id}`)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            <Pencil size={16} />
            Chỉnh sửa
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Users size={20} className="text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              <p className="text-xs text-gray-500">Người dùng</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <CheckCircle2 size={20} className="text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalPerms}</p>
              <p className="text-xs text-gray-500">Tổng quyền</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <Shield size={20} className="text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{permissions.filter(perm => perm[role.name.toLowerCase()]).length}</p>
              <p className="text-xs text-gray-500">Nhóm quyền</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-5 bg-gray-100/50 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('info')}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'info'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Thông tin
        </button>
        <button
          onClick={() => setActiveTab('permissions')}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'permissions'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Phân quyền
        </button>
      </div>

      {activeTab === 'info' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-5">Thông tin chi tiết</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <span className="text-sm text-gray-500">Tên vai trò</span>
                <span className="text-sm font-semibold text-gray-900">{role.name}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <span className="text-sm text-gray-500">Mô tả</span>
                <span className="text-sm text-gray-900 text-right max-w-xs">{role.description}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <span className="text-sm text-gray-500">Trạng thái</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                  role.status === 'active'
                    ? 'bg-green-50 text-green-600'
                    : 'bg-red-50 text-red-600'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    role.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  {role.status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <span className="text-sm text-gray-500">Ngày tạo</span>
                <span className="text-sm text-gray-900">{role.createdAt}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-500">Cập nhật lần cuối</span>
                <span className="text-sm text-gray-900">{role.updatedAt}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-gray-900"> Người dùng ({users.length})</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Xem tất cả
              </button>
            </div>
            <div className="space-y-3">
              {users.map((user) => (
<div 
 key={user.UserID || user.userid}
 className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50"
>
  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
    {(user.FullName || user.fullname || "U")
      .charAt(0)
      .toUpperCase()}
  </div>

  <div>
    <p className="text-sm font-semibold">
      {user.FullName || user.fullname}
    </p>

    <p className="text-xs text-gray-500">
      {user.Email || user.email}
    </p>
  </div>

</div>
))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm lg:col-span-2">
            <h3 className="text-base font-bold text-gray-900 mb-5">Lịch sử thay đổi</h3>
            <div className="space-y-0">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm lg:col-span-2">
  <h3 className="text-base font-bold text-gray-900 mb-5">
    Lịch sử thay đổi
  </h3>

  <div className="text-sm text-gray-500">
    Chưa có dữ liệu lịch sử thay đổi
  </div>
</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'permissions' && (
<div className="bg-white rounded-2xl border border-gray-100 p-6">

<h3 className="text-base font-bold mb-6">
Phân quyền
</h3>


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

{permissions.map((perm)=>(

<div 
key={perm.PermissionID || perm.permissionid}
className="border rounded-xl p-4"
>

<div className="flex items-center gap-2">

<CheckCircle2 
size={16}
className="text-green-500"
/>


<h4 className="font-semibold">
{perm.PermissionName || perm.permissionname}
</h4>


</div>


</div>

))}

</div>

</div>
)}
    </div>
    </div>
    </div>
    </div>
  );
}
