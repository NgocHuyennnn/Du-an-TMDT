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

export const products = [
  {
    id: 'p1', sku: 'SKU-203-91-SM',
    name: 'Nike Air Max Pro 2024', brand: 'Nike',
    price: 4500000, stock: 150, status: 'active',
    category: 'Giày dép', weight: '420g (Size M)', origin: 'Trung Quốc',
    colors: ['#1a1a1a', '#6b7280', '#3b82f6'], sizes: ['S', 'M', 'L', 'XL'],
    wishlist: 82, views: 1400,
    description: 'Áo khoác kỹ thuật cao cấp, thiết kế tối giản cho môi trường đô thị. Màng tuyết chắn gió 3 lớp, dày từ sự thoải mái trong mọi điều kiện thời tiết.\n\nChất liệu: Polyamide và chỉ, GORE-TEX Pro®\nBảo quản: Giặt máy nước lạnh, không dùng chất tẩy mạnh.',
  },
  {
    id: 'p2', sku: 'SKU-SW-12345',
    name: 'Smart Watch Series X', brand: 'SmartTech',
    price: 12000000, stock: 8, status: 'hidden',
    category: 'Điện tử', weight: '65g', origin: 'Đài Loan',
    colors: ['#1a1a1a', '#d1d5db'], sizes: ['One Size'],
    wishlist: 34, views: 820,
    description: 'Đồng hồ thông minh thế hệ mới với màn hình AMOLED sắc nét, pin 7 ngày và theo dõi sức khỏe toàn diện.',
  },
  {
    id: 'p3', sku: 'SKU-MB-001',
    name: 'MacBook Pro M3 14"', brand: 'Apple',
    price: 28000000, stock: 0, status: 'soldout',
    category: 'Điện tử', weight: '1.6kg', origin: 'Mỹ',
    colors: ['#6b7280', '#d1d5db'], sizes: ['14 inch', '16 inch'],
    wishlist: 210, views: 5300,
    description: 'Laptop cao cấp với chip M3 mạnh mẽ, màn hình Liquid Retina XDR 14.2 inch và thời lượng pin lên đến 18 giờ.',
  },
  {
    id: 'p4', sku: 'SKU-JK-009',
    name: 'Lumina Technical Jacket', brand: 'Lumina',
    price: 4490000, stock: 124, status: 'active',
    category: 'Thời trang', weight: '460g (Size M)', origin: 'Việt Nam',
    colors: ['#1a1a1a', '#4b5563', '#9ca3af'], sizes: ['S', 'M', 'L', 'XL'],
    wishlist: 82, views: 1400,
    description: 'Áo khoác kỹ thuật cao cấp, thiết kế tối giản cho môi trường đô thị. Màng tuyết chắn gió 3 lớp, dày từ sự thoải mái trong mọi điều kiện thời tiết.\n\nChất liệu: Polyamide và chỉ, GORE-TEX Pro®\nBảo quản: Giặt máy nước lạnh, không dùng chất tẩy mạnh.',
  },
  {
    id: 'p5', sku: 'SKU-BT-202',
    name: 'Bluetooth Speaker Max', brand: 'SoundX',
    price: 1890000, stock: 55, status: 'active',
    category: 'Điện tử', weight: '850g', origin: 'Hàn Quốc',
    colors: ['#1a1a1a', '#dc2626'], sizes: ['Standard'],
    wishlist: 45, views: 980,
    description: 'Loa Bluetooth không dây với âm thanh 360° và pin 24 giờ, chống nước IPX7.',
  },
  {
    id: 'p6', sku: 'SKU-SN-301',
    name: 'Adidas Ultraboost 23', brand: 'Adidas',
    price: 3200000, stock: 3, status: 'active',
    category: 'Giày dép', weight: '330g', origin: 'Việt Nam',
    colors: ['#ffffff', '#1a1a1a', '#f59e0b'], sizes: ['39', '40', '41', '42', '43'],
    wishlist: 128, views: 3200,
    description: 'Giày chạy bộ hiệu suất cao với đế Boost thế hệ mới, mang lại sự bật đàn hồi tối ưu.',
  },
  {
    id: 'p7', sku: 'SKU-HC-044',
    name: 'Wireless Headphone Pro', brand: 'SoundX',
    price: 2450000, stock: 0, status: 'soldout',
    category: 'Điện tử', weight: '250g', origin: 'Trung Quốc',
    colors: ['#1a1a1a', '#d1d5db'], sizes: ['Standard'],
    wishlist: 67, views: 1850,
    description: 'Tai nghe chống ồn chủ động ANC, pin 40 giờ, âm thanh Hi-Res Audio chuẩn Sony.',
  },
  {
    id: 'p8', sku: 'SKU-BG-117',
    name: 'Urban Tote Bag Lux', brand: 'Lumina',
    price: 890000, stock: 78, status: 'hidden',
    category: 'Phụ kiện', weight: '580g', origin: 'Việt Nam',
    colors: ['#92400e', '#1a1a1a', '#6b7280'], sizes: ['One Size'],
    wishlist: 29, views: 640,
    description: 'Túi tote cao cấp da PU nhân tạo, nhiều ngăn tiện dụng, phù hợp đi làm và dạo phố.',
  },
  {
    id: 'p9', sku: 'SKU-CT-888',
    name: 'Ceramic Coffee Mug Set', brand: 'HomeStyle',
    price: 450000, stock: 200, status: 'active',
    category: 'Gia dụng', weight: '620g', origin: 'Nhật Bản',
    colors: ['#ffffff', '#6b7280'], sizes: ['280ml', '350ml'],
    wishlist: 18, views: 430,
    description: 'Bộ cốc gốm sứ cao cấp, thiết kế tối giản, an toàn lò vi sóng và máy rửa bát.',
  },
  {
    id: 'p10', sku: 'SKU-YG-500',
    name: 'Premium Yoga Mat Pro', brand: 'FitLife',
    price: 680000, stock: 42, status: 'active',
    category: 'Thể thao', weight: '1.2kg', origin: 'Hàn Quốc',
    colors: ['#059669', '#7c3aed', '#1a1a1a'], sizes: ['183cm x 61cm'],
    wishlist: 53, views: 1100,
    description: 'Thảm yoga chống trượt cao su tự nhiên NBR, dày 6mm, dễ cuộn và vệ sinh.',
  },
  {
    id: 'p11', sku: 'SKU-SC-009',
    name: 'Scented Candle Collection', brand: 'HomeStyle',
    price: 320000, stock: 5, status: 'active',
    category: 'Gia dụng', weight: '280g', origin: 'Pháp',
    colors: ['#fef3c7', '#fde8d8'], sizes: ['150g', '300g'],
    wishlist: 41, views: 880,
    description: 'Nến thơm từ sáp đậu nành tự nhiên, hương thơm tinh tế kéo dài 60 giờ.',
  },
  {
    id: 'p12', sku: 'SKU-GS-210',
    name: 'Gaming Chair Elite', brand: 'TechComfort',
    price: 5500000, stock: 12, status: 'active',
    category: 'Nội thất', weight: '18kg', origin: 'Trung Quốc',
    colors: ['#1a1a1a', '#dc2626', '#3b82f6'], sizes: ['Standard'],
    wishlist: 95, views: 2700,
    description: 'Ghế gaming cao cấp với lưng tựa điều chỉnh 180°, tựa tay 4D và đệm thắt lưng nhớ hình.',
  },
];

export const productStatusConfig = {
  active: { label: 'Đang bán', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  hidden: { label: 'Tạm ẩn', bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
  soldout: { label: 'Hết hàng', bg: 'bg-rose-50', text: 'text-rose-600', dot: 'bg-rose-400' },
};

export const productCategories = [
  'Giày dép', 'Thời trang', 'Điện tử', 'Phụ kiện',
  'Gia dụng', 'Nội thất', 'Thể thao', 'Sách & Văn phòng phẩm',
];


export const orders=[
    { 
      id: '#ORD-8821', 
      customerName: 'Nguyễn Văn A', 
      customerEmail: 'nva@gmail.com', 
      customerPhone: '0905123456', 
      date: '2026-05-24', 
      total: 900000, 
      status: 'HOÀN THÀNH', 
      items: 'Áo sơ mi nam Tech (x2)', 
      paymentMethod: 'Chuyển khoản',
      shippingUnit: 'GHN - Giao Hàng Nhanh',
      shippingCode: 'GHN-8821992',
      address: 'Phường Mỹ An, Quận Ngũ Hành Sơn, Đà Nẵng',
      subtotal: 850000,
      shippingFee: 50000,
      discount: 0,
      products: [
        { name: 'Áo sơ mi nam Tech Premium', sku: 'Màu: Trắng | Size: L', qty: 2, price: 425000 }
      ],
      timeline: [
        { title: 'Giao hàng thành công', time: '16:30 - 24/05/2026', desc: 'Người mua đã nhận hàng và ký xác nhận.', active: true },
        { title: 'Đang vận chuyển', time: '08:15 - 24/05/2026', desc: 'Đơn hàng đã được bàn giao cho đối tác GHN.', active: false },
        { title: 'Xác nhận đơn hàng', time: '19:00 - 23/05/2026', desc: 'Hệ thống đã xác nhận thanh toán chuyển khoản thành công.', active: false }
      ]
      
    },
    { 
      id: '#ORD-8820', 
      customerName: 'Trần Thị B', 
      customerEmail: 'ttb@outlook.com', 
      customerPhone: '0914987654', 
      date: '2026-06-09', 
      total: 450000, 
      status: 'ĐANG GIAO', 
      items: 'Chuột không dây Silent', 
      paymentMethod: 'COD',
      shippingUnit: 'Viettel Post',
      shippingCode: 'VTP-772183',
      address: 'Khu đô thị Hòa Xuân, Quận Cẩm Lệ, Đà Nẵng',
      subtotal: 420000,
      shippingFee: 30000,
      discount: 0,
      products: [
        { name: 'Chuột không dây Silent Tech O1', sku: 'Màu: Xám Không Gian', qty: 1, price: 420000 }
      ],
      timeline: [
        { title: 'Đang giao hàng', time: '09:00 - 24/05/2026', desc: 'Bưu tá đang trên đường giao đến địa chỉ người nhận.', active: true },
        { title: 'Đã xuất kho', time: '15:20 - 23/05/2026', desc: 'Hàng đã rời kho tổng Đà Nẵng.', active: false }
      ]
    },
    { 
      id: '#ORD-8819', 
      customerName: 'Lê Văn C', 
      customerEmail: 'levanc@example.vn', 
      customerPhone: '0935111222', 
      date: '2026-01-13', 
      total: 3100000, 
      status: 'CHỜ XỬ LÝ', 
      items: 'Bàn phím cơ Tonic Pro V2', 
      paymentMethod: 'Chuyển khoản',
      shippingUnit: 'Chưa bàn giao',
      shippingCode: '---',
      address: '71 Ngũ Hành Sơn, Quận Ngũ Hành Sơn, Đà Nẵng',
      subtotal: 3100000,
      shippingFee: 0,
      discount: 0,
      products: [
        { name: 'Bàn phím cơ Tonic Pro V2 (Wireless)', sku: 'Switch: Blue | Keycap: PBT', qty: 1, price: 3100000 }
      ],
      timeline: [
        { title: 'Chờ xác nhận thanh toán', time: '21:10 - 23/05/2026', desc: 'Đang chờ kế toán đối soát giao dịch ngân hàng.', active: true }
      ]
    },
    { 
      id: '#ORD-8818', 
      customerName: 'Phạm Minh D', 
      customerEmail: 'pmd@gmail.com', 
      customerPhone: '0888333444', 
      date: '2026-03-03', 
      total: 890000, 
      status: 'ĐÃ HỦY', 
      items: 'Tai nghe Bluetooth Gaming', 
      paymentMethod: 'Ví điện tử',
      shippingUnit: 'Không có',
      shippingCode: '---',
      address: 'Liên Chiểu, Đà Nẵng',
      subtotal: 890000,
      shippingFee: 0,
      discount: 0,
      products: [
        { name: 'Tai nghe Bluetooth Gaming Low-Latency', sku: 'Màu: LED RGB', qty: 1, price: 890000 }
      ],
      timeline: [
        { title: 'Đơn hàng đã hủy', time: '10:00 - 23/05/2026', desc: 'Khách hàng chủ động hủy đơn trên ứng dụng.', active: true }
      ]
    },
    { 
      id: '#ORD-8817', 
      customerName: 'Hoàng Anh E', 
      customerEmail: 'hae@gmail.com', 
      customerPhone: '0972555666', 
      date: '2026-10-23', 
      total: 5500000, 
      status: 'HOÀN THÀNH', 
      items: 'Màn hình 24inch 144Hz', 
      paymentMethod: 'Chuyển khoản',
      shippingUnit: 'J&T Express',
      shippingCode: 'JT-991203',
      address: 'Hải Châu, Đà Nẵng',
      subtotal: 5450000,
      shippingFee: 50000,
      discount: 0,
      products: [
        { name: 'Màn hình Gaming 24inch 144Hz IPS', sku: 'Độ phân giải: FHD', qty: 1, price: 5450000 }
      ],
      timeline: [
        { title: 'Đã hoàn thành', time: '15:00 - 23/05/2026', desc: 'Đơn hàng hoàn tất chu trình.', active: true }
      ]
    },
    { 
      id: '#ORD-8816', 
      customerName: 'Ngô Quốc Bảo', 
      customerEmail: 'baonq@gmail.com', 
      customerPhone: '0901999888', 
      date: '2026-06-09', 
      total: 1250000, 
      status: 'HOÀN THÀNH', 
      items: 'Balo chống nước Tech Pack', 
      paymentMethod: 'Chuyển khoản',
      shippingUnit: 'GHN',
      shippingCode: 'GHN-110293',
      address: 'Sơn Trà, Đà Nẵng',
      subtotal: 1220000,
      shippingFee: 30000,
      discount: 0,
      products: [
        { name: 'Balo chống nước Tech Pack v3', sku: 'Dung tích: 25L', qty: 1, price: 1220000 }
      ],
      timeline: [
        { title: 'Đã giao', time: '11:00 - 21/05/2026', desc: 'Hoàn tất giao hàng.', active: true }
      ]
    },
    { 
      id: '#ORD-8815', 
      customerName: 'Vũ Thu Thảo', 
      customerEmail: 'thao@due.udn.vn', 
      customerPhone: '0947222333', 
      date: '2026-02-25', 
      total: 240000, 
      status: 'ĐANG GIAO', 
      items: 'Cáp sạc nhanh Type-C 100W', 
      paymentMethod: 'COD',
      shippingUnit: 'GrabExpress',
      shippingCode: 'GRAB-0021',
      address: 'Trường Đại học Kinh tế - ĐHĐN, Ngũ Hành Sơn, Đà Nẵng',
      subtotal: 220000,
      shippingFee: 20000,
      discount: 0,
      products: [
        { name: 'Cáp sạc nhanh Type-C 100W Bọc Dù', sku: 'Chiều dài: 2m', qty: 1, price: 220000 }
      ],
      timeline: [
        { title: 'Tài xế đang lấy hàng', time: '13:45 - 19/05/2026', desc: 'Đang chuẩn bị giao hàng hỏa tốc.', active: true }
      ]
    },
    { 
      id: '#ORD-8814', 
      customerName: 'Đặng Đình Phong', 
      customerEmail: 'phongdd@gmail.com', 
      customerPhone: '0963777111', 
      date: '2026-05-18', 
      total: 1850000, 
      status: 'CHỜ XỬ LÝ', 
      items: 'Ổ cứng SSD NVMe 512GB', 
      paymentMethod: 'Ví điện tử',
      shippingUnit: 'Chưa xử lý',
      shippingCode: '---',
      address: 'Thanh Khê, Đà Nẵng',
      subtotal: 1850000,
      shippingFee: 0,
      discount: 0,
      products: [
        { name: 'Ổ cứng SSD NVMe 512GB Gen4', sku: 'Tốc độ: 5000MB/s', qty: 1, price: 1850000 }
      ],
      timeline: [
        { title: 'Đang xử lý', time: '08:00 - 18/05/2026', desc: 'Đơn hàng mới tạo.', active: true }
      ]
    },
    { 
      id: '#ORD-8813', 
      customerName: 'Phan Ngọc Huyền', 
      customerEmail: 'huyenpn@gmail.com', 
      customerPhone: '0911444555', 
      date: '2026-11-11', 
      total: 350000, 
      status: 'ĐÃ HỦY', 
      items: 'Lót chuột cỡ lớn RGB', 
      paymentMethod: 'COD',
      shippingUnit: 'Không có',
      shippingCode: '---',
      address: 'Hòa Vang, Đà Nẵng',
      subtotal: 350000,
      shippingFee: 0,
      discount: 0,
      products: [
        { name: 'Lót chuột cỡ lớn Gaming RGB', sku: 'Kích thước: 900x400mm', qty: 1, price: 350000 }
      ],
      timeline: [
        { title: 'Đã hủy hệ thống', time: '23:59 - 15/05/2026', desc: 'Hủy tự động do hết hạn giữ hàng.', active: true }
      ]
    },
    {
  id: '#ORD-8812',
  customerName: 'Nguyễn Hoàng Nam',
  customerEmail: 'namhn@gmail.com',
  customerPhone: '0988777666',
  date: '2026-06-12',
  total: 1290000,
  status: 'HOÀN THÀNH',
  items: 'Loa Bluetooth Mini X2',
  paymentMethod: 'COD',
  shippingUnit: 'GHN',
  shippingCode: 'GHN-8812',
  address: 'Thanh Khê, Đà Nẵng',
  subtotal: 1250000,
  shippingFee: 40000,
  discount: 0,
  products: [
    { name: 'Loa Bluetooth Mini X2', sku: 'Màu: Đen', qty: 1, price: 1250000 }
  ],
  timeline: [{ title: 'Đã giao hàng', time: '14:00 - 12/06/2026', desc: 'Khách đã nhận hàng.', active: true }]
},

{
  id: '#ORD-8811',
  customerName: 'Lê Minh Tâm',
  customerEmail: 'tam@gmail.com',
  customerPhone: '0911222333',
  date: '2026-06-11',
  total: 680000,
  status: 'ĐANG GIAO',
  items: 'Bàn di chuột RGB XXL',
  paymentMethod: 'Chuyển khoản',
  shippingUnit: 'J&T',
  shippingCode: 'JT-8811',
  address: 'Hải Châu, Đà Nẵng',
  subtotal: 650000,
  shippingFee: 30000,
  discount: 0,
  products: [
    { name: 'Bàn di chuột RGB XXL', sku: '900x400', qty: 1, price: 650000 }
  ],
  timeline: [{ title: 'Đang giao hàng', time: '08:30 - 11/06/2026', desc: 'Đơn đang vận chuyển.', active: true }]
},

{
  id: '#ORD-8810',
  customerName: 'Phạm Gia Hưng',
  customerEmail: 'hungpg@gmail.com',
  customerPhone: '0977444555',
  date: '2026-06-10',
  total: 3490000,
  status: 'HOÀN THÀNH',
  items: 'Màn hình Gaming 27 inch',
  paymentMethod: 'Ví điện tử',
  shippingUnit: 'Viettel Post',
  shippingCode: 'VTP-8810',
  address: 'Liên Chiểu, Đà Nẵng',
  subtotal: 3440000,
  shippingFee: 50000,
  discount: 0,
  products: [
    { name: 'Màn hình Gaming 27 inch', sku: '2K 165Hz', qty: 1, price: 3440000 }
  ],
  timeline: [{ title: 'Hoàn thành', time: '18:00 - 10/06/2026', desc: 'Đã giao thành công.', active: true }]
},

{
  id: '#ORD-8809',
  customerName: 'Đặng Quốc Khánh',
  customerEmail: 'khanhdq@gmail.com',
  customerPhone: '0909888777',
  date: '2026-06-08',
  total: 520000,
  status: 'CHỜ XỬ LÝ',
  items: 'Webcam Full HD',
  paymentMethod: 'COD',
  shippingUnit: 'Chưa xử lý',
  shippingCode: '---',
  address: 'Sơn Trà, Đà Nẵng',
  subtotal: 520000,
  shippingFee: 0,
  discount: 0,
  products: [
    { name: 'Webcam Full HD', sku: '1080p', qty: 1, price: 520000 }
  ],
  timeline: [{ title: 'Đang xử lý', time: '09:00 - 08/06/2026', desc: 'Đơn mới tạo.', active: true }]
},

{
  id: '#ORD-8808',
  customerName: 'Ngô Minh Châu',
  customerEmail: 'chaunm@gmail.com',
  customerPhone: '0935333111',
  date: '2026-06-07',
  total: 2250000,
  status: 'HOÀN THÀNH',
  items: 'SSD NVMe 1TB',
  paymentMethod: 'Chuyển khoản',
  shippingUnit: 'GHN',
  shippingCode: 'GHN-8808',
  address: 'Cẩm Lệ, Đà Nẵng',
  subtotal: 2200000,
  shippingFee: 50000,
  discount: 0,
  products: [
    { name: 'SSD NVMe 1TB Gen4', sku: 'PCIe 4.0', qty: 1, price: 2200000 }
  ],
  timeline: [{ title: 'Hoàn thành', time: '17:00 - 07/06/2026', desc: 'Đã giao thành công.', active: true }]
},

{
  id: '#ORD-8807',
  customerName: 'Trần Nhật Minh',
  customerEmail: 'minhtn@gmail.com',
  customerPhone: '0977111222',
  date: '2026-06-06',
  total: 790000,
  status: 'ĐÃ HỦY',
  items: 'Tai nghe Bluetooth',
  paymentMethod: 'COD',
  shippingUnit: 'Không có',
  shippingCode: '---',
  address: 'Ngũ Hành Sơn, Đà Nẵng',
  subtotal: 790000,
  shippingFee: 0,
  discount: 0,
  products: [
    { name: 'Tai nghe Bluetooth Gaming', sku: 'RGB', qty: 1, price: 790000 }
  ],
  timeline: [{ title: 'Đã hủy', time: '11:20 - 06/06/2026', desc: 'Khách yêu cầu hủy.', active: true }]
},

{
  id: '#ORD-8806',
  customerName: 'Võ Gia Bảo',
  customerEmail: 'baovg@gmail.com',
  customerPhone: '0948666555',
  date: '2026-06-05',
  total: 1450000,
  status: 'HOÀN THÀNH',
  items: 'Router Wifi 6',
  paymentMethod: 'Ví điện tử',
  shippingUnit: 'J&T',
  shippingCode: 'JT-8806',
  address: 'Hải Châu, Đà Nẵng',
  subtotal: 1400000,
  shippingFee: 50000,
  discount: 0,
  products: [
    { name: 'Router Wifi 6 AX3000', sku: 'Dual Band', qty: 1, price: 1400000 }
  ],
  timeline: [{ title: 'Hoàn thành', time: '16:00 - 05/06/2026', desc: 'Đã giao hàng.', active: true }]
},

{
  id: '#ORD-8805',
  customerName: 'Phan Thị Lan',
  customerEmail: 'lanpt@gmail.com',
  customerPhone: '0919888222',
  date: '2026-06-04',
  total: 3990000,
  status: 'ĐANG GIAO',
  items: 'Ghế Gaming Pro',
  paymentMethod: 'Chuyển khoản',
  shippingUnit: 'Viettel Post',
  shippingCode: 'VTP-8805',
  address: 'Thanh Khê, Đà Nẵng',
  subtotal: 3940000,
  shippingFee: 50000,
  discount: 0,
  products: [
    { name: 'Ghế Gaming Pro', sku: 'Màu Đen Đỏ', qty: 1, price: 3940000 }
  ],
  timeline: [{ title: 'Đang giao hàng', time: '08:00 - 04/06/2026', desc: 'Đang vận chuyển.', active: true }]
},

{
  id: '#ORD-8804',
  customerName: 'Bùi Đức Anh',
  customerEmail: 'anhbd@gmail.com',
  customerPhone: '0963555777',
  date: '2026-06-03',
  total: 950000,
  status: 'HOÀN THÀNH',
  items: 'Balo chống nước',
  paymentMethod: 'COD',
  shippingUnit: 'GHN',
  shippingCode: 'GHN-8804',
  address: 'Liên Chiểu, Đà Nẵng',
  subtotal: 920000,
  shippingFee: 30000,
  discount: 0,
  products: [
    { name: 'Balo chống nước Tech Pack', sku: '25L', qty: 1, price: 920000 }
  ],
  timeline: [{ title: 'Hoàn thành', time: '15:30 - 03/06/2026', desc: 'Đã giao thành công.', active: true }]
},

{
  id: '#ORD-8803',
  customerName: 'Lý Quốc Việt',
  customerEmail: 'vietlq@gmail.com',
  customerPhone: '0932444666',
  date: '2026-06-02',
  total: 2750000,
  status: 'CHỜ XỬ LÝ',
  items: 'Bàn phím cơ Wireless',
  paymentMethod: 'Chuyển khoản',
  shippingUnit: 'Chưa xử lý',
  shippingCode: '---',
  address: 'Sơn Trà, Đà Nẵng',
  subtotal: 2750000,
  shippingFee: 0,
  discount: 0,
  products: [
    { name: 'Bàn phím cơ Wireless Pro', sku: 'Switch Red', qty: 1, price: 2750000 }
  ],
  timeline: [{ title: 'Đang xử lý', time: '09:45 - 02/06/2026', desc: 'Chờ xác nhận.', active: true }]
},
]
export const MOCK_ROLES = [
  {
    id: 1,
    name: 'Admin',
    description: 'Toàn quyền hệ thống',
    permissions: [],
    status: 'active',
    createdAt: '2024-01-15',
    updatedAt: '2024-06-10',
    userCount: 3,
  },
  {
    id: 2,
    name: 'Seller',
    description: 'Người quản lý cửa hàng',
    permissions: [],
    status: 'active',
    createdAt: '2024-02-20',
    updatedAt: '2024-05-18',
    userCount: 12,
  },
  {
    id: 3,
    name: 'Staff',
    description: 'Nhân viên hỗ trợ',
    permissions: [],
    status: 'active',
    createdAt: '2024-03-05',
    updatedAt: '2024-06-01',
    userCount: 8,
  },
  {
    id: 4,
    name: 'Customer',
    description: 'Khách hàng',
    permissions: [],
    status: 'active',
    createdAt: '2024-01-01',
    updatedAt: '2024-06-15',
    userCount: 156,
  },
];

export const PERMISSION_GROUPS = [
  {
    id: 'product',
    name: 'Quản lý sản phẩm',
    permissions: [
      { id: 'product_view', name: 'Xem danh sách sản phẩm', checked: false },
      { id: 'product_create', name: 'Thêm sản phẩm', checked: false },
      { id: 'product_edit', name: 'Chỉnh sửa sản phẩm', checked: false },
      { id: 'product_delete', name: 'Xóa sản phẩm', checked: false },
    ],
  },
  {
    id: 'order',
    name: 'Quản lý đơn hàng',
    permissions: [
      { id: 'order_view', name: 'Xem danh sách đơn hàng', checked: false },
      { id: 'order_process', name: 'Xử lý đơn hàng', checked: false },
      { id: 'order_cancel', name: 'Hủy đơn hàng', checked: false },
    ],
  },
  {
    id: 'store',
    name: 'Quản lý cửa hàng',
    permissions: [
      { id: 'store_view', name: 'Xem danh sách cửa hàng', checked: false },
    ],
  },
  {
    id: 'user',
    name: 'Quản lý người dùng',
    permissions: [
      { id: 'user_view', name: 'Xem danh sách người dùng', checked: false },
      { id: 'user_create', name: 'Thêm người dùng', checked: false },
      { id: 'user_edit', name: 'Chỉnh sửa người dùng', checked: false },
      { id: 'user_delete', name: 'Xóa người dùng', checked: false },
    ],
  },
  {
    id: 'report',
    name: 'Báo cáo',
    permissions: [
      { id: 'report_view', name: 'Xem báo cáo', checked: false },
      { id: 'report_export', name: 'Xuất báo cáo', checked: false },
    ],
  },
];
