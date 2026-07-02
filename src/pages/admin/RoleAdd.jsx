import { useState } from 'react';
import api from "@/lib/axios";
import { Link, useNavigate } from 'react-router-dom';

import {
  ArrowLeft,
  Save,
  X,
  ShoppingBag,
  Home,
  Users,
  ClipboardList,
  Settings,
  HelpCircle,
  Bell,
  Store,
  Tag,
  Shield,
} from 'lucide-react';

import PermissionPanel from '@/components/admin/PermissionPanel';

export default function RoleAdd() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [permissions, setPermissions] = useState([]);



 const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const res = await api.post(
      "/api/roles",
      {
        rolename: name,
        description: description,
        permission_ids: permissions
      }
    );

    console.log("CREATE ROLE:", res.data);

    alert(res.data.message || "Thêm vai trò thành công");

    navigate("/roles", { replace: true });

  } catch(error){

    console.log(
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.message ||
      "Thêm vai trò thất bại"
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
      <button
        onClick={() => navigate('/roles')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-5 transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        <span className="font-medium">Quay lại danh sách</span>
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Thêm vai trò</h1>
          <p className="text-sm text-gray-500 mt-1">Tạo vai trò mới và phân quyền</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-5">Thông tin vai trò</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên vai trò <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập tên vai trò, ví dụ: Admin, Staff..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Mô tả vai trò này..."
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1.5">Mô tả ngắn gọn về vai trò này</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                  <div className="flex gap-3">
                    <label className="flex-1 flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-all has-checked:border-blue-500 has-checked:bg-blue-50/50">
                      <input
                        type="radio"
                        name="status"
                        value="active"
                        checked={status === 'active'}
                        onChange={() => setStatus('active')}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Hoạt động</p>
                        <p className="text-xs text-gray-500">Vai trò sẽ được sử dụng ngay</p>
                      </div>
                    </label>
                    <label className="flex-1 flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 hover:bg-gray-50/30 transition-all has-checked:border-gray-500 has-checked:bg-gray-50/50">
                      <input
                        type="radio"
                        name="status"
                        value="inactive"
                        checked={status === 'inactive'}
                        onChange={() => setStatus('inactive')}
                        className="w-4 h-4 text-gray-600 focus:ring-gray-500"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Ngừng hoạt động</p>
                        <p className="text-xs text-gray-500">Vai trò tạm thời bị vô hiệu hóa</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <PermissionPanel

  onChange={
    (ids)=>{
      setPermissions(ids)
    }
  }

/>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate('/roles')}
            className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
          >
            <X size={16} />
            Hủy
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 rounded-xl text-sm font-semibold text-white hover:bg-blue-700 transition-all shadow-sm shadow-blue-500/20"
          >
            <Save size={16} />
            Lưu vai trò
          </button>
        </div>
            </form>
    </div> 

  </div> 

</div> 

  )
}
