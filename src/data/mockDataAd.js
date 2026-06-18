export const ROLES = [
  { 
   id: 1,
    key: 'ADMIN',
    name: 'Quản trị viên',
    description: 'Quản lý toàn bộ hệ thống',
    status:'active',
    userCount:1,
    permissions: [],
    createdAt:'2024-05-01',
    updatedAt:'2024-06-10',
    style: 'bg-[#0f172a] text-white'
  },
  { 
    id:2,
    key:'MANAGER',
    name:'Người quản lý cửa hàng',
    description: 'Quản lý hoạt động của cửa hàng',
    status:'active',
    permissions: [],
    userCount:3,
    createdAt:'2024-05-02',
    updatedAt:'2024-06-08',
    style: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  { 
    id: 3,
    key: 'STAFF', 
    name: 'Nhân viên',
    description: 'Nhân viên hỗ trợ',
    permissions: [],
    status:'active',
    userCount:10,
    createdAt:'2024-05-03',
    updatedAt:'2024-06-09',
    style: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  { 
    id: 4,
    key: 'CUSTOMER', 
    name: 'Khách hàng',
    status:'active',
    description: 'Người mua sắm',
    permissions: [],
    userCount:50,
    createdAt:'2024-05-04',
    updatedAt:'2024-06-10',
    style: 'bg-slate-50 text-slate-600 border-slate-200'
  }
];

export const MOCK_PERMISSION_MATRIX = [
  // copy nguyên permissionMatrix trong PhanQuyen.jsx bỏ vô đây
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
];
export const mockUsers = [
    { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', avatar: 'A' },
    { id: 2, name: 'Trần Thị B', email: 'b@example.com', avatar: 'B' },
    { id: 3, name: 'Lê Văn C', email: 'c@example.com', avatar: 'C' },
  ];

 export const mockHistory = [
  { id: 1, action: 'Cập nhật quyền', by: 'Admin', date: '2024-06-10 14:30' },
  { id: 2, action: 'Thay đổi mô tả', by: 'Admin', date: '2024-05-18 09:15' },
  { id: 3, action: 'Tạo vai trò', by: 'System' },
];
