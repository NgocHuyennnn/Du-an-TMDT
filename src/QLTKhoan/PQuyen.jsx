import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, ShoppingBag, Home, ClipboardList, Settings, 
  HelpCircle, Bell, ShieldCheck, Save, RefreshCw, CheckCircle2, 
  Store,
  Tag,
  Shield
} from 'lucide-react';

export default function PhanQuyen() {
  // 1. Định nghĩa danh sách các vai trò hệ thống
  const roles = [
    { key: 'ADMIN', name: 'Quản trị viên', style: 'bg-[#0f172a] text-white' },
    { key: 'MANAGER', name: 'Quản lý trưởng', style: 'bg-purple-50 text-purple-700 border-purple-200' },
    { key: 'STAFF', name: 'Nhân viên', style: 'bg-amber-50 text-amber-700 border-amber-200' },
    { key: 'CUSTOMER', name: 'Khách hàng', style: 'bg-slate-50 text-slate-600 border-slate-200' }
  ];

  // 2. Dữ liệu gốc ma trận phân quyền dựa trên danh sách chức năng của bạn
  const [permissionMatrix, setPermissionMatrix] = useState([
    {
      module: 'Hệ thống & Xác thực',
      permissions: [
        { id: 'auth_login', name: 'Đăng nhập', desc: 'Truy cập vào hệ thống', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: true },
        { id: 'auth_logout', name: 'Đăng xuất', desc: 'Thoát khỏi phiên làm việc', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: true },
        { id: 'auth_change_pwd', name: 'Đổi mật khẩu', desc: 'Thay đổi mật khẩu tài khoản hiện tại', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: true },
        { id: 'auth_forgot_pwd', name: 'Quên mật khẩu', desc: 'Yêu cầu khôi phục mật khẩu qua email', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: true },
        { id: 'auth_register', name: 'Đăng ký tài khoản', desc: 'Tạo tài khoản khách hàng mới bên ngoài hệ thống', ADMIN: true, MANAGER: false, STAFF: false, CUSTOMER: true },
      ]
    },
    {
      module: 'Quản lý vai trò',
      permissions: [
        { id: 'role_view_list', name: 'Xem danh sách vai trò', desc: 'Xem toàn bộ các cấp bậc trong hệ thống', ADMIN: true, MANAGER: true, STAFF: false, CUSTOMER: false },
        { id: 'role_view_detail', name: 'Xem chi tiết vai trò', desc: 'Xem mô tả chi tiết của một vai trò', ADMIN: true, MANAGER: true, STAFF: false, CUSTOMER: false },
        { id: 'role_create', name: 'Thêm vai trò', desc: 'Khởi tạo cấu hình vai trò mới', ADMIN: true, MANAGER: false, STAFF: false, CUSTOMER: false },
        { id: 'role_edit', name: 'Chỉnh sửa vai trò', desc: 'Cập nhật thông tin vai trò hiện có', ADMIN: true, MANAGER: false, STAFF: false, CUSTOMER: false },
        { id: 'role_suspend', name: 'Đình chỉ vai trò', desc: 'Vô hiệu hóa tạm thời một vai trò', ADMIN: true, MANAGER: false, STAFF: false, CUSTOMER: false },
        { id: 'role_assign_perm', name: 'Phân quyền người dùng', desc: 'Cấu hình ma trận chức năng cho các nhóm vai trò', ADMIN: true, MANAGER: false, STAFF: false, CUSTOMER: false },
      ]
    },
    {
      module: 'Quản lý tài khoản',
      permissions: [
        { id: 'user_view_list', name: 'Xem danh sách tài khoản', desc: 'Xem danh sách nhân sự và khách hàng', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: false },
        { id: 'user_view_detail', name: 'Xem chi tiết tài khoản', desc: 'Xem thông tin chi tiết cá nhân người dùng', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: false },
        { id: 'user_create', name: 'Thêm tài khoản', desc: 'Tạo tài khoản nội bộ theo chỉ định', ADMIN: true, MANAGER: true, STAFF: false, CUSTOMER: false },
        { id: 'user_edit', name: 'Chỉnh sửa tài khoản', desc: 'Cập nhật họ tên, email, SĐT của người dùng', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: false },
        { id: 'user_suspend', name: 'Đình chỉ tài khoản', desc: 'Khóa tài khoản vi phạm hoặc ngừng hoạt động', ADMIN: true, MANAGER: true, STAFF: false, CUSTOMER: false },
      ]
    },
    {
      module: 'Quản lý cửa hàng',
      permissions: [
        { id: 'store_view_list', name: 'Xem danh sách cửa hàng', desc: 'Xem tất cả các chi nhánh/cửa hàng thuộc hệ thống', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: true },
        { id: 'store_view_detail', name: 'Xem chi tiết cửa hàng', desc: 'Xem địa chỉ, hotline, thông tin của từng chi nhánh', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: true },
        { id: 'store_create', name: 'Tạo mới cửa hàng', desc: 'Mở rộng chi nhánh, thêm điểm kinh doanh mới', ADMIN: true, MANAGER: false, STAFF: false, CUSTOMER: false },
        { id: 'store_edit', name: 'Chỉnh sửa cửa hàng', desc: 'Cập nhật thông tin vận hành của cửa hàng', ADMIN: true, MANAGER: true, STAFF: false, CUSTOMER: false },
        { id: 'store_suspend', name: 'Đình chỉ cửa hàng', desc: 'Tạm dừng hoạt động kinh doanh của cửa hàng', ADMIN: true, MANAGER: false, STAFF: false, CUSTOMER: false },
      ]
    },
    {
      module: 'Quản lý sản phẩm',
      permissions: [
        { id: 'prod_view_list', name: 'Xem danh sách sản phẩm', desc: 'Xem danh mục tất cả hàng hóa', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: true },
        { id: 'prod_view_detail', name: 'Xem chi tiết sản phẩm', desc: 'Xem mô tả, thông số kĩ thuật, hình ảnh sản phẩm', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: true },
        { id: 'prod_create', name: 'Tạo mới sản phẩm', desc: 'Đăng bán sản phẩm mới lên hệ thống', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: false },
        { id: 'prod_edit', name: 'Chỉnh sửa sản phẩm', desc: 'Thay đổi giá bán, số lượng, mô tả sản phẩm', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: false },
        { id: 'prod_suspend', name: 'Đình chỉ sản phẩm', desc: 'Ẩn hoặc ngừng kinh doanh sản phẩm', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: false },
      ]
    },
    {
      module: 'Đơn hàng & Mua sắm',
      permissions: [
        { id: 'order_view_list', name: 'Xem danh sách đơn hàng', desc: 'Theo dõi tiến trình các đơn hàng đang có', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: false },
        { id: 'order_view_detail', name: 'Xem chi tiết đơn hàng', desc: 'Xem giỏ hàng, thông tin giao nhận và hóa đơn', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: true },
        { id: 'order_confirm', name: 'Xác nhận xử lý đơn hàng', desc: 'Duyệt đơn, chuẩn bị hàng và chuyển giao vận chuyển', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: false },
        { id: 'order_cancel', name: 'Hủy đơn hàng', desc: 'Hủy bỏ đơn hàng theo yêu cầu hoặc do sự cố', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: true },
        { id: 'order_place', name: 'Đặt hàng', desc: 'Thao tác tạo đơn mua sản phẩm', ADMIN: false, MANAGER: false, STAFF: false, CUSTOMER: true },
        { id: 'order_review', name: 'Đánh giá sản phẩm', desc: 'Gửi bình luận, chấm điểm sao cho sản phẩm đã mua', ADMIN: false, MANAGER: false, STAFF: false, CUSTOMER: true },
        { id: 'order_history', name: 'Quản lý lịch sử đặt hàng', desc: 'Xem lại toàn bộ các đơn hàng cũ đã giao dịch', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: true },
        { id: 'order_chat', name: 'Nhắn tin trao đổi với cửa hàng', desc: 'Kênh chat hỗ trợ trực tuyến giữa khách và hệ thống', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: true },
      ]
    },
    {
      module: 'Báo cáo & Thống kê',
      permissions: [
        { id: 'stat_sales_view', name: 'Xem thống kê doanh thu', desc: 'Tổng hợp dòng tiền thu chi theo dạng bảng số liệu', ADMIN: true, MANAGER: true, STAFF: false, CUSTOMER: false },
        { id: 'stat_sales_report', name: 'Xem báo cáo doanh thu', desc: 'Báo cáo phân tích chuyên sâu kèm biểu đồ phát triển', ADMIN: true, MANAGER: true, STAFF: false, CUSTOMER: false },
        { id: 'stat_hot_prod', name: 'Thống kê sản phẩm bán chạy', desc: 'Xác định top các sản phẩm có lượt mua cao nhất', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: false },
        { id: 'stat_order_count', name: 'Thống kê đơn hàng', desc: 'Tổng hợp số lượng đơn thành công, hoàn trả, hủy bỏ', ADMIN: true, MANAGER: true, STAFF: true, CUSTOMER: false },
      ]
    }
  ]);

  // State thông báo khi lưu thành công
  const [showToast, setShowToast] = useState(false);

  // HÀM SWITCH TRIGGER: Thay đổi trạng thái quyền khi click trực tiếp trên bảng
  const handleTogglePermission = (moduleId, permId, roleKey) => {
    setPermissionMatrix(prevMatrix => 
      prevMatrix.map(moduleGroup => {
        if (moduleGroup.module === moduleId) {
          return {
            ...moduleGroup,
            permissions: moduleGroup.permissions.map(perm => {
              if (perm.id === permId) {
                return { ...perm, [roleKey]: !perm[roleKey] };
              }
              return perm;
            })
          };
        }
        return moduleGroup;
      })
    );
  };

  // HÀM XỬ LÝ LƯU TOÀN BỘ CẤU HÌNH TRÊN TRANG
  const handleSavePermissions = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); 
  };

  // HÀM KHÔI PHỤC MẶC ĐỊNH
  const handleResetDefaults = () => {
    if (window.confirm("Bạn có chắc chắn muốn khôi phục lại cài đặt phân quyền mặc định?")) {
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-gray-800 font-sans antialiased relative w-full">
      
      {/* SIDEBAR */}
      <div className="w-60 bg-[#0f172a] text-white border-r border-slate-800 flex flex-col justify-between shrink-0 hidden md:flex">
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
            <Link to="/roles" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
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
            <Link to="/phanquyen" className="flex items-center gap-3 px-3 py-2 text-xs font-black bg-blue-600 text-white rounded-xl shadow-sm transition-all">
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

      {/* RIGHT CONTENT AREA */}
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
          
          {/* PAGE TITLE & ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-xl font-black text-[#0f172a] tracking-tight">Cấu hình phân quyền</h1>
              <p className="text-xs font-medium text-slate-400">Quản lý tổng hợp {permissionMatrix.reduce((acc, m) => acc + m.permissions.length, 0)} chức năng nghiệp vụ của hệ thống.</p>
            </div>
            
            <div className="flex items-center gap-2.5 self-end sm:self-auto">
              <button 
                onClick={handleResetDefaults}
                className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-bold px-3.5 h-10 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw size={14} />
                <span className="hidden sm:inline">Mặc định</span>
              </button>
              
              <button 
                onClick={handleSavePermissions}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 h-10 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save size={14} />
                <span>Lưu cấu hình quyền</span>
              </button>
            </div>
          </div>

          {/* BẢNG MA TRẬN PHÂN QUYỀN CHÍNH */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 h-12 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    <th className="pl-6 py-3 w-[36%]">Chức năng hệ thống</th>
                    {roles.map(role => (
                      <th key={role.key} className="px-4 py-3 text-center w-[16%]">
                        <span className={`inline-block px-2 py-0.5 border font-mono text-[9px] font-bold rounded-md tracking-wider ${role.style}`}>
                          {role.key}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-slate-100">
                  {permissionMatrix.map((group) => (
                    <React.Fragment key={group.module}>
                      {/* Tiêu đề nhóm Module chức năng */}
                      <tr className="bg-slate-50/30">
                        <td colSpan={roles.length + 1} className="pl-6 py-2.5 text-[11px] font-black tracking-wide text-blue-600 bg-blue-50/10 uppercase border-y border-slate-100">
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck size={13} />
                            <span>{group.module}</span>
                          </div>
                        </td>
                      </tr>

                      {/* Chi tiết từng chức năng con */}
                      {group.permissions.map((perm) => (
                        <tr key={perm.id} className="hover:bg-slate-50/30 transition-colors h-14">
                          <td className="pl-8 pr-4 py-2.5">
                            <div className="space-y-0.5">
                              <p className="text-xs font-bold text-slate-800">{perm.name}</p>
                              <p className="text-[10px] font-medium text-slate-400 leading-normal">{perm.desc}</p>
                            </div>
                          </td>
                          
                          {/* Render Nút bật/tắt (Switch) tương ứng cho từng vai trò */}
                          {roles.map((role) => (
                            <td key={role.key} className="px-4 py-2.5 text-center">
                              <div className="flex items-center justify-center">
                                <button
                                  type="button"
                                  onClick={() => handleTogglePermission(group.module, perm.id, role.key)}
                                  className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 outline-none cursor-pointer ${perm[role.key] ? 'bg-blue-600' : 'bg-slate-200'}`}
                                >
                                  <div 
                                    className={`bg-white w-4.5 h-4.5 rounded-full shadow-xs transform transition-transform duration-200 ${perm[role.key] ? 'translate-x-4.5' : 'translate-x-0'}`}
                                  ></div>
                                </button>
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* FOOTER CỦA BẢNG */}
            <div className="px-6 py-3.5 bg-slate-50/30 border-t border-slate-100 text-[11px] text-slate-400 font-semibold text-right">
              Mã phân quyền cập nhật: v2.2.0-stable
            </div>
          </div>
        </main>
      </div>

      {/* TOAST THÔNG BÁO KHI CLICK "LƯU CẤU HÌNH" */}
      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white rounded-xl shadow-xl px-4 py-3 border border-slate-800 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <div className="text-xs font-bold tracking-tight">
            Cập nhật ma trận phân quyền hệ thống thành công!
          </div>
        </div>
      )}

    </div>
  );
}