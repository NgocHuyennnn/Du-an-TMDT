import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, UserCheck, Clock, Search, Filter, Plus, 
  Edit2, Trash2, MoreVertical, ChevronLeft, ChevronRight,
  Settings, Bell, HelpCircle, ShoppingBag, Home, ClipboardList,
  AlertTriangle, X, User, Mail, Phone
} from 'lucide-react';

export default function QuanLyTaiKhoan() {
  // 1. Danh sách dữ liệu gốc (Đã bổ sung trường phone, lastLogin, createdAt để đồng bộ giao diện)
  const [users, setUsers] = useState([
    { id: '#USR-8821', name: 'Nguyễn Văn Lâm', short: 'NL', email: 'lam.nv@company.vn', phone: '0987 111 222', role: 'ADMIN', status: 'Hoạt động', lastLogin: '15/06/2026', createdAt: '01/01/2025' },
    { id: '#USR-7732', name: 'Trần Thị Hoa', short: 'TH', email: 'hoa.tt@company.vn', phone: '0912 333 444', role: 'MANAGER', status: 'Đang khóa', lastLogin: '12/05/2026', createdAt: '10/02/2025' },
    { id: '#USR-6654', name: 'Lê Minh Đức', short: 'LD', email: 'duc.lm@company.vn', phone: '0965 555 666', role: 'CUSTOMER', status: 'Hoạt động', lastLogin: '14/06/2026', createdAt: '15/03/2025' },
    { id: '#USR-5521', name: 'Phạm Thanh Vân', short: 'PV', email: 'van.pt@company.vn', phone: '0978 777 888', role: 'STAFF', status: 'Hoạt động', lastLogin: '16/06/2026', createdAt: '20/03/2025' },
    { id: '#USR-4412', name: 'Hoàng Quốc Bảo', short: 'HB', email: 'bao.hq@company.vn', phone: '0934 999 000', role: 'STAFF', status: 'Hoạt động', lastLogin: '10/06/2026', createdAt: '01/04/2025' },
    { id: '#USR-3398', name: 'Đặng Mai Phương', short: 'DP', email: 'phuong.dm@company.vn', phone: '0901 222 333', role: 'MANAGER', status: 'Hoạt động', lastLogin: '11/06/2026', createdAt: '12/04/2025' },
    { id: '#USR-2275', name: 'Bùi Tiến Dũng', short: 'BD', email: 'dung.bt@company.vn', phone: '0945 444 555', role: 'CUSTOMER', status: 'Đang khóa', lastLogin: '30/04/2026', createdAt: '18/04/2025' },
    { id: '#USR-1150', name: 'Vũ Thu Hà', short: 'VH', email: 'ha.vt@company.vn', phone: '0981 666 777', role: 'STAFF', status: 'Hoạt động', lastLogin: '16/06/2026', createdAt: '25/04/2025' },
    { id: '#USR-0987', name: 'Đỗ Hùng Dũng', short: 'DD', email: 'dung.dh@company.vn', phone: '0923 888 999', role: 'CUSTOMER', status: 'Hoạt động', lastLogin: '05/06/2026', createdAt: '02/05/2025' },
    { id: '#USR-0843', name: 'Trịnh Linh Chi', short: 'TC', email: 'chi.tl@company.vn', phone: '0956 000 111', role: 'CUSTOMER', status: 'Hoạt động', lastLogin: '13/06/2026', createdAt: '10/05/2025' },
  ]);

  // Các state lưu giá trị bộ lọc
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('Tất cả vai trò');
  const [selectedStatus, setSelectedStatus] = useState('Tất cả trạng thái');

  // STATE QUẢN LÝ POPUP XÁC NHẬN KHÓA
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToSuspend, setUserToSuspend] = useState(null);

  // 🌟 STATE QUẢN LÝ POPUP THÊM MỚI TÀI KHOẢN (Đã thêm phone)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'CUSTOMER'
  });

  // 🌟 STATE QUẢN LÝ POPUP CHỈNH SỬA TÀI KHOẢN
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Logic bộ lọc tự động
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole === 'Tất cả vai trò' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'Tất cả trạng thái' || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // HÀM KHI CLICK VÀO THÙNG RÁC
  const handleTrashClick = (user) => {
    setUserToSuspend(user);
    setIsModalOpen(true);   
  };

  // HÀM XÁC NHẬN ĐÌNH CHỈ TÀI KHOẢN
  const handleConfirmSuspend = () => {
    if (userToSuspend) {
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userToSuspend.id ? { ...user, status: 'Đang khóa' } : user
        )
      );
    }
    setIsModalOpen(false); 
    setUserToSuspend(null);
  };

  // 🌟 HÀM KHI CLICK VÀO ICON CÂY BÚT (MỞ POPUP CHỈNH SỬA)
  const handleEditClick = (user) => {
    setEditingUser({ ...user }); // Sao chép dữ liệu user được chọn vào bản ghi tạm
    setIsEditModalOpen(true);
  };

  // 🌟 HÀM XỬ LÝ LƯU THÔNG TIN CHỈNH SỬA
  const handleUpdateUserSubmit = (e) => {
    e.preventDefault();
    if (!editingUser.name || !editingUser.email) return;

    setUsers(prevUsers => 
      prevUsers.map(u => 
        u.id === editingUser.id 
          ? { 
              ...editingUser, 
              short: getShortName(editingUser.name) // Cập nhật lại ký tự Avatar nếu đổi họ tên
            } 
          : u
      )
    );
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  // HÀM TỰ ĐỘNG LẤY CHỮ CÁI VIẾT TẮT ĐỂ LÀM AVATAR
  const getShortName = (fullName) => {
    if (!fullName) return 'UN';
    const words = fullName.trim().split(/\s+/);
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    
    const firstLetter = words[0].charAt(0);
    const lastLetter = words[words.length - 1].charAt(0);
    return (firstLetter + lastLetter).toUpperCase();
  };

  // HÀM XỬ LÝ LƯU TÀI KHOẢN MỚI TRÊN FORM (Đã thêm phone)
  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    if (!newUserData.name || !newUserData.email) return;

    const randomId = `#USR-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newUser = {
      id: randomId,
      name: newUserData.name,
      short: getShortName(newUserData.name),
      email: newUserData.email,
      phone: newUserData.phone || 'Chưa cập nhật',
      role: newUserData.role,
      status: 'Hoạt động',
      lastLogin: new Date().toLocaleDateString('vi-VN'),
      createdAt: new Date().toLocaleDateString('vi-VN')
    };

    setUsers([newUser, ...users]);
    setNewUserData({ name: '', email: '', phone: '', role: 'CUSTOMER' });
    setIsAddModalOpen(false);
  };

  const getRoleStyle = (role) => {
    switch (role) {
      case 'ADMIN': return 'bg-[#0f172a] text-white border-[#0f172a]'; 
      case 'MANAGER': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'STAFF': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200'; 
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-gray-800 font-sans antialiased relative w-full">
      
      {/* 1. SIDEBAR */}
      <div className="w-60 bg-[#0f172a] text-white border-r border-slate-800 flex flex-col justify-between shrink-0 hidden md:flex">
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
            <Link to="/baocao" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <ShoppingBag size={16} /> <span>Báo cáo</span>
            </Link>
            <Link to="/dstkhoan" className="flex items-center gap-3 px-3 py-2 text-xs font-black bg-blue-600 text-white rounded-xl shadow-sm transition-all">
              <Users size={16} /> <span>Tài khoản</span>
            </Link>
            <Link to="/dsdhang" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <ClipboardList size={16} /> <span>Đơn hàng</span>
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

        {/* MAIN BODY CONTAINER */}
        <main className="flex-1 p-4 lg:p-8 space-y-6 overflow-y-auto w-full max-w-[1400px] mx-auto">
          
          {/* PAGE TITLE & BUTTON */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-xl font-black text-[#0f172a] tracking-tight">Danh sách tài khoản</h1>
              <p className="text-xs font-medium text-slate-400">Quản lý và phân quyền người dùng trong hệ thống.</p>
            </div>
            
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 h-10 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0 w-fit"
            >
              <Plus size={15} />
              <span>Thêm tài khoản mới</span>
            </button>
          </div>

          {/* BỘ LỌC */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5 text-xs font-bold text-slate-500">
                <label>TÌM KIẾM</label>
                <div className="relative">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm theo tên, email hoặc ID..." 
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-4 h-10 outline-none focus:border-blue-600 focus:bg-white text-slate-700 font-medium transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-bold text-slate-500">
                <label>VAI TRÒ</label>
                <select 
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 h-10 outline-none focus:border-blue-600 focus:bg-white text-slate-600 font-medium transition-all appearance-none cursor-pointer"
                >
                  <option value="Tất cả vai trò">Tất cả vai trò</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="MANAGER">MANAGER</option>
                  <option value="STAFF">STAFF</option>
                  <option value="CUSTOMER">CUSTOMER</option>
                </select>
              </div>

              <div className="space-y-1.5 text-xs font-bold text-slate-500">
                <label>TRẠNG THÁI</label>
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 h-10 outline-none focus:border-blue-600 focus:bg-white text-slate-600 font-medium transition-all appearance-none cursor-pointer"
                >
                  <option value="Tất cả trạng thái">Tất cả trạng thái</option>
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Đang khóa">Đang khóa</option>
                </select>
              </div>
            </div>
          </div>

          {/* DATATABLE TABLE */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider h-11">
                    <th className="pl-6 w-24">ID</th>
                    <th className="px-4">Họ và tên</th>
                    <th className="px-4">Email</th>
                    <th className="px-4 w-32">Vai trò</th>
                    <th className="px-4 w-36">Trạng thái</th>
                    <th className="pr-6 w-24 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-600">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/50 transition-colors h-14">
                        <td className="pl-6 font-mono text-slate-400 font-semibold">{user.id}</td>
                        <td className="px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100/50 flex items-center justify-center font-bold text-[11px]">
                              {user.short}
                            </div>
                            <span className="font-bold text-slate-800">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-4 text-slate-500">{user.email}</td>
                        <td className="px-4">
                          <span className={`inline-block px-2 py-0.5 border font-mono text-[9px] font-bold rounded-md tracking-wider ${getRoleStyle(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Hoạt động' ? 'bg-emerald-500' : 'bg-rose-400'}`}></span>
                            <span className={user.status === 'Hoạt động' ? 'text-slate-700 font-medium' : 'text-rose-500 font-bold'}>{user.status}</span>
                          </div>
                        </td>
                        <td className="pr-6 text-right">
                          <div className="flex items-center justify-end gap-1.5 text-slate-400">
                            {/* 🌟 THAY ĐỔI: GỌI HÀM SỬA KHI CLICK VÀO ICON CÂY BÚT */}
                            <button 
                              onClick={() => handleEditClick(user)}
                              className="p-1 hover:text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer transition-colors"
                            >
                              <Edit2 size={13} />
                            </button>
                            
                            <button 
                              onClick={() => handleTrashClick(user)}
                              className="p-1 hover:text-red-500 hover:bg-red-50 rounded-md cursor-pointer transition-colors"
                            >
                              <Trash2 size={13} />
                            </button>
                            
                            <button className="p-1 hover:text-slate-600 hover:bg-slate-100 rounded-md cursor-pointer transition-colors"><MoreVertical size={13} /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-slate-400 font-medium">
                        Không tìm thấy tài khoản nào khớp với điều kiện lọc!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION FOOTER */}
            <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/20">
              <span className="text-[11px] text-slate-400 font-semibold">
                Hiển thị {filteredUsers.length} trong tổng số {users.length} tài khoản mẫu
              </span>
              <div className="flex items-center gap-1.5">
                <button className="w-8 h-8 border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 bg-white hover:bg-slate-50 transition-all cursor-pointer"><ChevronLeft size={14} /></button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold bg-[#0f172a] text-white shadow-sm">1</button>
                <button className="w-8 h-8 border border-slate-200 rounded-lg flex items-center justify-center text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-all cursor-pointer"><ChevronRight size={14} /></button>
              </div>
            </div>
          </div>

          {/* LOWER KPI STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs flex items-start justify-between">
              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Tổng tài khoản</p>
                <h3 className="text-2xl font-black text-[#0f172a] tracking-tight">{users.length}</h3>
                <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1"><span>↗ +12%</span> <span className="text-slate-400 font-medium">tháng này</span></p>
              </div>
              <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0"><Users size={18} /></div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs flex items-start justify-between">
              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Đang hoạt động</p>
                <h3 className="text-2xl font-black text-[#0f172a] tracking-tight">{users.filter(u => u.status === 'Hoạt động').length}</h3>
                <p className="text-[10px] font-semibold text-slate-400">🟢 Tỉ lệ thực tế trong danh sách</p>
              </div>
              <div className="w-10 h-10 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shrink-0"><UserCheck size={18} /></div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs flex items-start justify-between sm:col-span-2 lg:col-span-1">
              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Đang bị khóa</p>
                <h3 className="text-2xl font-black text-red-600 tracking-tight">{users.filter(u => u.status === 'Đang khóa').length}</h3>
                <p className="text-[10px] font-getrabold text-red-500 uppercase tracking-wide">⚠️ Tài khoản bị vô hiệu hóa</p>
              </div>
              <div className="w-10 h-10 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center text-red-500 shrink-0"><Clock size={18} /></div>
            </div>
          </div>
        </main>
      </div>

      {/* GIAO DIỆN POPUP (MODAL) XÁC NHẬN ĐÌNH CHỈ TÀI KHOẢN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl max-w-md w-full relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
              <X size={16} />
            </button>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center border border-red-100/50 shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#0f172a] tracking-tight">Xác nhận đình chỉ tài khoản</h3>
                  <p className="text-[11px] font-medium text-slate-400">Hành động này sẽ thay đổi trạng thái hoạt động.</p>
                </div>
              </div>
              {userToSuspend && (
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-slate-400 font-semibold">Tài khoản:</span><span className="font-bold text-slate-800">{userToSuspend.name}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400 font-semibold">Email:</span><span className="font-medium text-slate-600">{userToSuspend.email}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400 font-semibold">Mã định danh:</span><span className="font-mono text-slate-500 font-bold">{userToSuspend.id}</span></div>
                </div>
              )}
              <p className="text-xs font-medium text-slate-500 leading-relaxed">
                Bạn có chắc chắn muốn <span className="text-red-500 font-bold">Đình chỉ (Khóa)</span> tài khoản này? Người dùng này sẽ tạm thời không thể đăng nhập hoặc thực hiện các thao tác quản trị trên hệ thống.
              </p>
            </div>
            <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button onClick={() => setIsModalOpen(false)} className="px-4 h-9 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl bg-white hover:bg-slate-50 transition-all cursor-pointer">Hủy bỏ</button>
              <button onClick={handleConfirmSuspend} className="px-4 h-9 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer">Xác nhận đình chỉ</button>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 5. GIAO DIỆN POPUP FORM THÊM TÀI KHOẢN MỚI (Đã bổ sung trường Số điện thoại) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={() => setIsAddModalOpen(false)}></div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl max-w-md w-full relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center border border-blue-100/30">
                  <Plus size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#0f172a] tracking-tight">Thêm tài khoản hệ thống</h3>
                  <p className="text-[10px] font-medium text-slate-400">Khởi tạo và cấu hình tài khoản nhân sự mới.</p>
                </div>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"><X size={15} /></button>
            </div>

            <form onSubmit={handleAddUserSubmit}>
              <div className="p-6 space-y-4">
                
                <div className="space-y-1.5 text-xs font-bold text-slate-500">
                  <label htmlFor="modal-name">HỌ VÀ TÊN <span className="text-red-500">*</span></label>
                  <input 
                    id="modal-name" type="text" required
                    value={newUserData.name}
                    onChange={(e) => setNewUserData({...newUserData, name: e.target.value})}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className="w-full bg-slate-50/30 border border-slate-200 rounded-xl px-3.5 h-10 outline-none focus:border-blue-600 focus:bg-white text-slate-700 font-medium transition-all"
                  />
                </div>

                <div className="space-y-1.5 text-xs font-bold text-slate-500">
                  <label htmlFor="modal-email">ĐỊA CHỈ EMAIL <span className="text-red-500">*</span></label>
                  <input 
                    id="modal-email" type="email" required
                    value={newUserData.email}
                    onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
                    placeholder="username@company.vn"
                    className="w-full bg-slate-50/30 border border-slate-200 rounded-xl px-3.5 h-10 outline-none focus:border-blue-600 focus:bg-white text-slate-700 font-medium transition-all"
                  />
                </div>

                {/* 🌟 THÊM MỚI: TRƯỜNG NHẬP SỐ ĐIỆN THOẠI TRÊN POPUP TẠO MỚI */}
                <div className="space-y-1.5 text-xs font-bold text-slate-500">
                  <label htmlFor="modal-phone">SỐ ĐIỆN THOẠI</label>
                  <input 
                    id="modal-phone" type="text"
                    value={newUserData.phone}
                    onChange={(e) => setNewUserData({...newUserData, phone: e.target.value})}
                    placeholder="Ví dụ: 0987 123 456"
                    className="w-full bg-slate-50/30 border border-slate-200 rounded-xl px-3.5 h-10 outline-none focus:border-blue-600 focus:bg-white text-slate-700 font-medium transition-all"
                  />
                </div>

                <div className="space-y-1.5 text-xs font-bold text-slate-500">
                  <label htmlFor="modal-role">VAI TRÒ / PHÂN CẤP</label>
                  <select 
                    id="modal-role"
                    value={newUserData.role}
                    onChange={(e) => setNewUserData({...newUserData, role: e.target.value})}
                    className="w-full bg-slate-50/30 border border-slate-200 rounded-xl px-3.5 h-10 outline-none focus:border-blue-600 focus:bg-white text-slate-600 font-medium transition-all cursor-pointer"
                  >
                    <option value="CUSTOMER">CUSTOMER (Khách hàng)</option>
                    <option value="STAFF">STAFF (Nhân viên)</option>
                    <option value="MANAGER">MANAGER (Quản lý trưởng)</option>
                    <option value="ADMIN">ADMIN (Quản trị viên cấp cao)</option>
                  </select>
                </div>

                <p className="text-[10px] text-slate-400 font-medium italic pt-1">
                  * Ghi chú: Tài khoản sau khi khởi tạo thành công sẽ tự động nhận trạng thái <span className="text-emerald-500 font-bold">Hoạt động</span>.
                </p>
              </div>

              <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 h-9 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl bg-white hover:bg-slate-50 transition-all cursor-pointer">Đóng lại</button>
                <button type="submit" className="px-4 h-9 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer">Tạo tài khoản</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🌟 THÊM MỚI: POPUP CHỈNH SỬA TÀI KHOẢN (KHI CLICK ICON CÂY BÚT) */}
      {isEditModalOpen && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={() => setIsEditModalOpen(false)}></div>
          
          <div className="bg-[#f8fafc] md:bg-white rounded-2xl shadow-2xl max-w-4xl w-full relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-150 p-4 md:p-8">
            <button onClick={() => setIsEditModalOpen(false)} className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
              <X size={18} />
            </button>

            <form onSubmit={handleUpdateUserSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* CỘT TRÁI: THÔNG TIN PROFILE VÀ HOẠT ĐỘNG */}
              <div className="space-y-4 lg:col-span-1">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col items-center justify-center text-center shadow-2xs">
                  <div className="w-16 h-16 rounded-full border-2 border-slate-800 flex items-center justify-center bg-slate-50 text-slate-700 shadow-inner mb-3 font-bold text-lg">
                    {editingUser.short}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{editingUser.name || 'Họ và tên'}</h3>
                  <p className="text-[10px] font-mono font-bold text-slate-400 mt-0.5">ID: {editingUser.id}</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1.5">Thông tin hoạt động</h4>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Đăng nhập cuối</span>
                    <span className="font-bold text-slate-700">{editingUser.lastLogin}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Ngày tạo</span>
                    <span className="font-bold text-slate-700">{editingUser.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* CỘT PHẢI: FORM CHỈNH SỬA CHI TIẾT */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 lg:col-span-2 shadow-2xs space-y-4">
                
                <div className="space-y-1.5 text-xs font-bold text-slate-700">
                  <label htmlFor="edit-name">Họ và tên</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      id="edit-name" type="text" required
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 h-10 outline-none text-slate-700 font-medium focus:border-slate-800 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs font-bold text-slate-700">
                  <label htmlFor="edit-email">Email</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      id="edit-email" type="email" required
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 h-10 outline-none text-slate-700 font-medium focus:border-slate-800 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs font-bold text-slate-700">
                  <label htmlFor="edit-phone">Số điện thoại</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      id="edit-phone" type="text"
                      value={editingUser.phone}
                      onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 h-10 outline-none text-slate-700 font-medium focus:border-slate-800 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1.5 text-xs font-bold text-slate-700">
                    <label htmlFor="edit-role">Vai trò</label>
                    <select 
                      id="edit-role"
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 h-10 outline-none text-slate-600 font-medium focus:border-slate-800 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_auto] bg-[right_14px_center] bg-no-repeat"
                    >
                      <option value="CUSTOMER">CUSTOMER</option>
                      <option value="STAFF">STAFF</option>
                      <option value="MANAGER">MANAGER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 text-xs font-bold text-slate-700">
                    <label>Trạng thái</label>
                    <div className="flex items-center h-10 gap-3">
                      <button
                        type="button"
                        onClick={() => setEditingUser({ ...editingUser, status: editingUser.status === 'Hoạt động' ? 'Đang khóa' : 'Hoạt động' })}
                        className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 outline-none cursor-pointer ${editingUser.status === 'Hoạt động' ? 'bg-[#0f172a]' : 'bg-slate-200'}`}
                      >
                        <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${editingUser.status === 'Hoạt động' ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                      <span className="font-semibold text-slate-800 text-xs">{editingUser.status}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-100 my-2"></div>

                <div className="flex items-center justify-end gap-3 pt-1">
                  <button 
                    type="button" onClick={() => setIsEditModalOpen(false)}
                    className="border border-slate-300 text-slate-700 text-xs font-bold px-5 h-9 rounded-lg hover:bg-slate-50 transition-all cursor-pointer uppercase tracking-wider"
                  >
                    Hủy
                  </button>
                  <button 
                    type="submit"
                    className="bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold px-5 h-9 rounded-lg transition-all cursor-pointer uppercase tracking-wider"
                  >
                    Cập nhật
                  </button>
                </div>

              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}