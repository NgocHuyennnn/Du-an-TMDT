import  { useState, useMemo } from 'react';
import { orders as mockOrders } from '../data/mockDataCH';
import { 
  
  Search, Download, RefreshCw, ChevronLeft, ChevronRight, 
  Eye, Trash2, Calendar, CreditCard, Phone,
  X, Truck, FileText, Package
} from 'lucide-react';

import hinhNenTechTonic from '../assets/nen.png'; 

export default function DanhSachDonHang() {
  // 1. DỮ LIỆU ĐƠN HÀNG (ĐÃ ĐƯỢC MỞ RỘNG CHI TIẾT SẢN PHẨM PHỤC VỤ HIỂN THỊ MODAL)
  const [orders, setOrders] = useState(mockOrders);

  // STATE ĐIỀU KHIỂN MODAL CHI TIẾT
  const [selectedOrder, setSelectedOrder] = useState(null);

  // STATE BỘ LỌC
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tất cả trạng thái');
  const [dateFilter, setDateFilter] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

  // XỬ LÝ LỌC DỮ LIỆU REAL-TIME
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerPhone.includes(searchTerm) ||
        order.items.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'Tất cả trạng thái' || order.status === statusFilter;
      const matchesDate = !dateFilter || order.date === dateFilter;

      const minPrice = priceFrom ? parseFloat(priceFrom) : 0;
      const maxPrice = priceTo ? parseFloat(priceTo) : Infinity;
      const matchesPrice = order.total >= minPrice && order.total <= maxPrice;

      return matchesSearch && matchesStatus && matchesDate && matchesPrice;
    });
  }, [orders, searchTerm, statusFilter, dateFilter, priceFrom, priceTo]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('Tất cả trạng thái');
    setDateFilter('');
    setPriceFrom('');
    setPriceTo('');
  };

  const handleDeleteOrder = (id) => {
    if(window.confirm(`Bạn có chắc chắn muốn xóa đơn hàng ${id}?`)) {
      setOrders(orders.filter(item => item.id !== id));
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'HOÀN THÀNH': return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      case 'ĐANG GIAO': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'CHỜ XỬ LÝ': return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'ĐA HỦY': return 'bg-rose-50 border-rose-200 text-rose-700';
      default: return 'bg-slate-50 border-slate-200 text-slate-700';
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const formatDateDisplay = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
   <div className="min-h-full bg-[#f8fafc] text-gray-800 font-sans antialiased relative w-full z-0">
      {/* WORKSPACE CHÍNH PHÂN CHIA THÀNH HEADER VÀ CONTENT */}
      <div className="w-full relative">
        {/* ==================== 3. SCROLLABLE CONTENT BODY ==================== */}
       <div className="p-4 lg:p-8 relative z-10">
          {/* ẢNH NỀN PHÍA DƯỚI */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-15 filter pointer-events-none"
            style={{ backgroundImage: `url(${hinhNenTechTonic})` }}
          ></div>
          <div className="absolute inset-0 bg-linear-to-tr from-slate-100/30 via-transparent to-blue-50/10 z-0 pointer-events-none"></div>

          {/* TIÊU ĐỀ VÀ THANH TÌM KIẾM */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Danh sách đơn hàng</h2>
              <p className="text-xs font-medium text-slate-400">Quản lý và theo dõi tất cả các giao dịch hệ thống thương mại điện tử.</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Tìm kiếm */}
              <div className="relative w-72">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                  <Search size={15} />
                </span>
                <input 
                  type="text" 
                  placeholder="Tìm mã đơn, tên khách, sđt, sản phẩm..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 bg-white border border-slate-200/80 rounded-xl pl-10 pr-4 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-500 focus:shadow-xs transition-all"
                />
              </div>
              
              <button className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs h-10 px-4 rounded-xl transition-all shadow-xs cursor-pointer">
                <Download size={14} className="text-slate-500" />
                <span>Xuất báo cáo (CSV)</span>
              </button>
            </div>
          </div>

          {/* BỘ LỌC DỮ LIỆU */}
          <div className="relative z-10 bg-white/90 backdrop-blur-md border border-slate-200/60 rounded-2xl p-4 mb-6 shadow-xs grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Trạng thái</label>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-10 bg-slate-50/50 border border-slate-200 rounded-xl px-3 text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all cursor-pointer"
              >
                <option>Tất cả trạng thái</option>
                <option>HOÀN THÀNH</option>
                <option>ĐANG GIAO</option>
                <option>CHỜ XỬ LÝ</option>
                <option>ĐA HỦY</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Ngày đặt hàng</label>
              <input 
                type="date" 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full h-10 bg-slate-50/50 border border-slate-200 rounded-xl px-3 text-xs font-semibold text-slate-600 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Khoảng giá (VNĐ)</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  placeholder="Từ" 
                  value={priceFrom}
                  onChange={(e) => setPriceFrom(e.target.value)}
                  className="w-full h-10 bg-slate-50/50 border border-slate-200 rounded-xl px-2 text-xs font-semibold focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all" 
                />
                <span className="text-slate-400 text-xs font-bold">-</span>
                <input 
                  type="number" 
                  placeholder="Đến" 
                  value={priceTo}
                  onChange={(e) => setPriceTo(e.target.value)}
                  className="w-full h-10 bg-slate-50/50 border border-slate-200 rounded-xl px-2 text-xs font-semibold focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all" 
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-100 text-slate-500 text-[11px] font-bold h-10 px-2 rounded-xl flex items-center justify-center border border-slate-200 select-none">
                Tìm thấy: {filteredOrders.length} dòng
              </div>
              <button 
                onClick={handleResetFilters}
                className="h-10 px-4 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-rose-100" 
                title="Xóa bộ lọc về mặc định"
              >
                <RefreshCw size={13} />
                <span>Xóa lọc</span>
              </button>
            </div>
          </div>

          {/* BẢNG MAIN CONTAINER */}
          <div className="relative z-10 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-xl overflow-hidden flex flex-col justify-between">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200/60 text-[11px] font-black text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-5">Mã đơn</th>
                    <th className="py-4 px-5">Khách hàng</th>
                    <th className="py-4 px-5">Chi tiết sản phẩm</th>
                    <th className="py-4 px-5">Ngày đặt & PTTT</th>
                    <th className="py-4 px-5">Tổng tiền</th>
                    <th className="py-4 px-5">Trạng thái</th>
                    <th className="py-4 px-5 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-all group">
                        <td className="py-4 px-5 font-bold text-blue-600">{order.id}</td>
                        
                        <td className="py-4 px-5">
                          <div className="flex flex-col">
                            <span className="font-black text-slate-800">{order.customerName}</span>
                            <span className="text-[10px] text-slate-400 font-normal">{order.customerEmail}</span>
                            <span className="text-[10px] text-slate-500 font-medium flex items-center gap-0.5 mt-0.5">
                              <Phone size={10} className="text-slate-400" /> {order.customerPhone}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-5 max-w-45 truncate">
                          <span className="text-slate-800 font-semibold bg-slate-100/60 px-2 py-1 rounded-md border border-slate-200/40">
                            {order.items}
                          </span>
                        </td>
                        
                        <td className="py-4 px-5 text-slate-500">
                          <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-1">
                              <Calendar size={13} className="text-slate-400" />
                              <span>{formatDateDisplay(order.date)}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-slate-400">
                              <CreditCard size={11} />
                              <span>{order.paymentMethod}</span>
                            </div>
                          </div>
                        </td>
                        
                        <td className="py-4 px-5 font-black text-slate-900 text-sm">
                          {formatCurrency(order.total)}
                        </td>
                        
                        <td className="py-4 px-5">
                          <span className={`inline-flex items-center border px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getStatusStyle(order.status)}`}>
                            <span className="w-1 h-1 rounded-full bg-current mr-1.5 shrink-0" />
                            {order.status}
                          </span>
                        </td>
                        
                        <td className="py-4 px-5 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-all">
                            {/* SỰ KIỆN CLICK VÀO MẮT ĐỂ MỞ MODAL CHI TIẾT */}
                            <button 
                              onClick={() => setSelectedOrder(order)}
                              className="p-1.5 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-all cursor-pointer bg-transparent border-none" 
                              title="Xem chi tiết"
                            >
                              <Eye size={14} />
                            </button>
                            <button 
                              onClick={() => handleDeleteOrder(order.id)}
                              className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-all cursor-pointer bg-transparent border-none" 
                              title="Xóa đơn hàng"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-12 text-center text-slate-400 font-bold bg-slate-50/20">
                        Không tìm thấy đơn hàng nào phù hợp với bộ lọc!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PHÂN TRANG */}
            <div className="p-4 bg-slate-50/40 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-400">
              <div>
                Hiển thị <span className="text-slate-700">{filteredOrders.length}</span> trên tổng số <span className="text-slate-700">{orders.length}</span> đơn hiện có
              </div>
              
              <div className="flex items-center gap-1">
                <button className="p-1.5 border border-slate-200 rounded-lg hover:bg-white text-slate-400 hover:text-slate-700 disabled:opacity-40 transition-all cursor-pointer" disabled>
                  <ChevronLeft size={14} />
                </button>
                <button className="w-7 h-7 bg-blue-600 text-white flex items-center justify-center rounded-lg shadow-xs font-bold">1</button>
                <button className="p-1.5 border border-slate-200 rounded-lg hover:bg-white text-slate-400 hover:text-slate-700 transition-all cursor-pointer">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ==================== 🌟 MODAL CHI TIẾT ĐƠN HÀNG DỰA THEO WIREFRAME 🌟 ==================== */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#f8fafc] w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto ">
            
            {/* Header của Modal */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <span>Hệ thống</span> / <span>Chi tiết đơn hàng {selectedOrder.id}</span>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer border-none bg-transparent flex items-center justify-center">
                <X size={18} />
              </button>
            </div>

            {/* Sub-Header hành động */}
            <div className="bg-white border-b border-slate-200/60 px-6 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <h2 className="text-lg font-black text-slate-900">Chi tiết đơn hàng: {selectedOrder.id}</h2>
              <div className="flex items-center gap-2">
                <button className="bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors cursor-pointer">In hóa đơn</button>
              </div>
            </div>

            {/* Layout nội dung chi tiết dạng 2 Cột chuẩn Wireframe */}
            <div className="flex-1 p-6  grid grid-cols-1 lg:grid-cols-3 gap-6 text-slate-700 text-xs">
              
              {/* CỘT TRÁI (Chiếm 2/3): Danh sách sản phẩm & Lịch sử xử lý */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* 1. Khối danh sách sản phẩm cấu trúc dạng bảng */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-800 flex items-center gap-2">
                    <Package size={15} className="text-slate-500" /> Sản phẩm trong đơn hàng
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="text-[10px] uppercase font-black text-slate-400 bg-slate-50/40 border-b border-slate-100">
                          <th className="py-2.5 px-4">Thông tin sản phẩm</th>
                          <th className="py-2.5 px-4 text-center">Số lượng</th>
                          <th className="py-2.5 px-4 text-right">Đơn giá</th>
                          <th className="py-2.5 px-4 text-right">Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {selectedOrder.products?.map((prod, index) => (
                          <tr key={index} className="hover:bg-slate-50/40">
                            <td className="py-3 px-4 flex gap-3 items-center">
                              <div className="w-9 h-9 bg-slate-100 border border-slate-200 rounded flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">
                                PROD
                              </div>
                              <div>
                                <div className="font-black text-slate-800">{prod.name}</div>
                                <div className="text-[10px] text-slate-400 mt-0.5">{prod.sku}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center font-bold text-slate-800">{prod.qty.toString().padStart(2, '0')}</td>
                            <td className="py-3 px-4 text-right text-slate-500">{formatCurrency(prod.price)}</td>
                            <td className="py-3 px-4 text-right font-black text-slate-900">{formatCurrency(prod.price * prod.qty)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Tính toán tiền mặt */}
                  <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-end">
                    <div className="w-64 space-y-2 text-slate-500 font-semibold">
                      <div className="flex justify-between"><span>Tạm tính:</span><span className="text-slate-800 font-bold">{formatCurrency(selectedOrder.subtotal)}</span></div>
                      <div className="flex justify-between"><span>Phí giao hàng:</span><span className="text-slate-800 font-bold">{formatCurrency(selectedOrder.shippingFee)}</span></div>
                      <div className="flex justify-between text-rose-600"><span>Khấu trừ voucher:</span><span>-{formatCurrency(selectedOrder.discount)}</span></div>
                      <div className="w-full h-px bg-slate-200 my-1"></div>
                      <div className="flex justify-between text-slate-900 text-sm font-black">
                        <span>Tổng thanh toán:</span>
                        <span className="text-blue-600">{formatCurrency(selectedOrder.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Khối lịch sử xử lý (Timeline trạng thái đơn hàng) */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <FileText size={15} className="text-slate-500" /> Trạng thái & Lịch sử xử lý đơn
                  </h3>
                  <div className="relative border-l-2 border-slate-200 ml-3 pl-5 space-y-5">
                    {selectedOrder.timeline?.map((step, idx) => (
                      <div key={idx} className="relative">
                        <span className={`absolute -left-6.75 top-0 w-3.5 h-3.5 rounded-full border-2 border-white ${step.active ? 'bg-blue-600 ring-4 ring-blue-50' : 'bg-slate-300'}`}></span>
                        <div className="flex flex-col">
                          <span className={`font-black ${step.active ? 'text-slate-900' : 'text-slate-500'}`}>{step.title}</span>
                          <span className="text-[10px] text-slate-400 font-semibold mt-0.5">{step.time}</span>
                          <span className="text-slate-400 mt-1 font-normal leading-relaxed">{step.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* CỘT PHẢI (Chiếm 1/3): Thông tin khách hàng & Vận chuyển */}
              <div className="space-y-6">
                
                {/* 1. Khối thông tin khách hàng */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="font-bold text-slate-800">Thông tin khách hàng</h3>
                  </div>
                  <div className="flex items-center gap-3 py-1">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-black flex items-center justify-center uppercase">
                      {selectedOrder.customerName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-black text-slate-800">{selectedOrder.customerName}</div>
                      <div className="text-[10px] text-slate-400 font-bold">Thành viên hệ thống</div>
                    </div>
                  </div>
                  <div className="space-y-2 pt-1 text-slate-500 font-semibold border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Email liên hệ</span>
                      <span className="text-slate-700 font-medium">{selectedOrder.customerEmail}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Số điện thoại</span>
                      <span className="text-slate-700 font-medium">{selectedOrder.customerPhone}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Khối Vận chuyển & Giao vận */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Truck size={14} className="text-slate-400" /> Thông tin giao nhận
                    </h3>
                  </div>
                  <div className="space-y-2 text-slate-500 font-semibold">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Địa chỉ giao hàng</span>
                      <span className="text-slate-700 font-medium mt-0.5 leading-relaxed">{selectedOrder.address}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Đơn vị vận chuyển</span>
                      <span className="text-slate-700 font-medium mt-0.5">{selectedOrder.shippingUnit}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Mã vận đơn</span>
                      <span className="text-blue-600 font-bold mt-0.5">{selectedOrder.shippingCode}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Phương thức thanh toán</span>
                      <span className="text-slate-700 font-medium mt-0.5">{selectedOrder.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                {/* 3. Khối ghi chú nội bộ hệ thống */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
                  <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Ghi chú quản trị</h3>
                  <textarea 
                    placeholder="Nhập ghi chú vận hành nội bộ cho đơn hàng này..." 
                    className="w-full h-16 bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs text-slate-700 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all resize-none font-medium"
                  />
                  <button onClick={() => alert('Ghi chú đã được lưu.')} className="w-full h-9 bg-white hover:bg-slate-50 border border-slate-200 font-black rounded-xl transition-all cursor-pointer">
                    Cập nhật ghi chú
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}