export const Allstores = [
  { id: '1', code: 'STR-00192', name: 'Cửa hàng Trung tâm', email: 'contact@trungtam.vn', phone: '+84 24 1234 5678', status: 'active', rating: 4.9, city: 'Hà Nội' },
  { id: '2', code: 'STR-00241', name: 'Chi nhánh Ngoại thành', email: 'info@ngoaithanh.io', phone: '+84 24 0987 6543', status: 'pending', rating: 4.6, city: 'Hà Nội' },
  { id: '3', code: 'STR-00388', name: 'Cửa hàng Phía Đông', email: 'admin@phiadong.net', phone: '+84 24 4444 3322', status: 'closed', rating: 4.2, city: 'TP.HCM' },
  { id: '4', code: 'STR-00411', name: 'Chi nhánh Miền Nam', email: 'sales@miennam.vn', phone: '+84 28 3333 2211', status: 'active', rating: 4.7, city: 'TP.HCM' },
  { id: '5', code: 'STR-00455', name: 'Showroom Đà Nẵng', email: 'dn@showroom.vn', phone: '+84 23 6655 4433', status: 'active', rating: 4.8, city: 'Đà Nẵng' },
  { id: '6', code: 'STR-00502', name: 'Cửa hàng Quận 1', email: 'q1@stores.vn', phone: '+84 28 1122 3344', status: 'pending', rating: 4.5, city: 'TP.HCM' },
  { id: '7', code: 'STR-00539', name: 'Chi nhánh Cần Thơ', email: 'cantho@branch.vn', phone: '+84 29 9988 7766', status: 'active', rating: 4.3, city: 'Cần Thơ' },
];

export const stats = {
  total: 124,
  active: 118,
  avgRating: 4.8,
  pendingApproval: 6,
};

export const statusConfig = {
  active: { label: 'Hoạt động', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  pending: { label: 'Đang chờ', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  closed: { label: 'Đã đóng', bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-400' },
};
export const suspendReasons = [
  'Bảo trì kho hàng',
  'Vi phạm chính sách',
  'Khiếu nại từ khách hàng',
  'Kiểm tra pháp lý',
  'Ngừng kinh doanh tạm thời',
  'Lý do khác',
];

