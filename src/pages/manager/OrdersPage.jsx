import { useState, useMemo, useEffect } from "react";
import {
  getOrders,
  updateOrderStatus,
} from "../../api/orderApi";

import {
  Search,
  RefreshCw,
  Eye,
  Calendar,
  CreditCard,
  Phone,
  User,
  MapPin,
  Package,
  ShoppingBag,
  X,
} from "lucide-react";

import { createPortal } from "react-dom";
import hinhNenTechTonic from "@/assets/nen.png"; 

export default function DanhSachDonHang() {
  // 1. DỮ LIỆU ĐƠN HÀNG
  const [orders, setOrders] = useState([]);

  // STATE ĐIỀU KHIỂN MODAL CHI TIẾT
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // STATE BỘ LỌC
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tất cả trạng thái');
  const [dateFilter, setDateFilter] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const handleUpdateStatus = async () => {
  if (!selectedOrder) return;

  try {
    await updateOrderStatus(
      selectedOrder.id,
      selectedOrder.status
    );

    alert("Cập nhật trạng thái thành công!");

    await fetchOrders();

    setSelectedOrder(null);

  } catch (err) {
    console.log(err);

    alert("Không thể cập nhật trạng thái.");
  }
};

  // XỬ LÝ LỌC DỮ LIỆU REAL-TIME
const filteredOrders = useMemo(() => {
  return orders.filter((order) => {

    // Tìm theo tên sản phẩm
    const matchesProduct = order.items?.some((item) =>
      item.ProductName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Tìm kiếm
    const matchesSearch =
      order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone?.includes(searchTerm) ||
      matchesProduct;

    // Lọc trạng thái
    const matchesStatus =
      statusFilter === "Tất cả trạng thái" ||
      order.status === statusFilter;

    // Lọc ngày
    const matchesDate =
      !dateFilter ||
      order.date?.slice(0, 10) === dateFilter;

    // Lọc giá
    const minPrice = priceFrom ? Number(priceFrom) : 0;
    const maxPrice = priceTo ? Number(priceTo) : Infinity;

    const matchesPrice =
      order.total >= minPrice &&
      order.total <= maxPrice;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesDate &&
      matchesPrice
    );
  });
}, [
  orders,
  searchTerm,
  statusFilter,
  dateFilter,
  priceFrom,
  priceTo,
]);
  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('Tất cả trạng thái');
    setDateFilter('');
    setPriceFrom('');
    setPriceTo('');
  };

  // ĐÃ SỬA: Hàm xử lý xóa đơn hàng tách biệt, không bị lồng

  const getStatusStyle = (status) => {
  switch (status) {
    case "Đã giao":
      return "bg-emerald-50 border-emerald-200 text-emerald-700";

    case "Đang giao":
      return "bg-blue-50 border-blue-200 text-blue-700";

    case "Chờ xác nhận":
      return "bg-amber-50 border-amber-200 text-amber-700";

    case "Đã hủy":
      return "bg-rose-50 border-rose-200 text-rose-700";

    default:
      return "bg-slate-50 border-slate-200 text-slate-700";
  }
};

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };
  
  useEffect(() => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    console.warn("No token - stop fetch");
    return;
  }

  fetchOrders();
}, []);

  const fetchOrders = async () => {
  try {
    const res = await getOrders();

    console.log(res.data);

    const raw = res.data.data || [];

    console.log("RAW =", raw);
    console.log(raw[0]);
    console.log(JSON.stringify(raw[0], null, 2));

    const mapped = raw.map((o) => ({
  id: o.OrderID,
  shopName: o.ShopName,
  userId: o.UserID,
  shopId: o.ShopID,
  date: o.OrderDate,
  total: Number(o.TotalAmount),
  status: o.Status,
  paymentMethod: o.PaymentMethod,
  paymentStatus: o.PaymentStatus,
 customerName: o.ShippingName,
customerPhone: o.ShippingPhone,
shippingAddress: o.ShippingAddress,

customerEmail: o.CustomerEmail || "",

  items: o.Items || [],
}));
    console.log("MAPPED =", mapped);

    setOrders(mapped);
    console.log("Đơn hàng đầu tiên:", mapped[0]);
console.log(
  JSON.stringify(mapped[0]?.items[0], null, 2)
);
  } catch (err) {
    console.log(err);
  }
};

  const formatDateDisplay = (dateStr) => {
  if (!dateStr) return "";

  const d = new Date(dateStr);

  return d.toLocaleDateString("vi-VN");
};

  return (
   <div className="min-h-full bg-[#f8fafc] text-gray-800 font-sans antialiased relative w-full z-0">
      <div className="w-full relative">
       <div className="p-4 lg:p-8 relative z-10">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-15 filter pointer-events-none"
            style={{ backgroundImage: `url(${hinhNenTechTonic})` }}
          ></div>
          <div className="absolute inset-0 bg-linear-to-tr from-slate-100/30 via-transparent to-blue-50/10 z-0 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Danh sách đơn hàng</h2>
              <p className="text-xs font-medium text-slate-400">Quản lý và theo dõi tất cả các giao dịch hệ thống thương mại điện tử.</p>
            </div>

            <div className="flex items-center gap-3">
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
              
            </div>
          </div>

          <div className="relative z-10 bg-white/90 backdrop-blur-md border border-slate-200/60 rounded-2xl p-4 mb-6 shadow-xs grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Trạng thái</label>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-10 bg-slate-50/50 border border-slate-200 rounded-xl px-3 text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all cursor-pointer"
              >
                <option>Tất cả trạng thái</option>
                <option>Chờ xác nhận</option>
                <option>Đang giao</option>
                <option>Đã giao</option>
                <option>Đã hủy</option>
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

                              <span className="font-bold text-blue-600">
                                  {order.userId}
                              </span>

                              <span className="text-[10px] text-slate-500">
                                  {order.customerName}
                              </span>

                          </div>
                      </td>
                        <td className="py-4 px-5">

                          <div className="space-y-2">

                              {order.items.map((item,index)=>(
                                  <div
                                      key={index}
                                      className="flex justify-between rounded-lg bg-slate-100 px-3 py-2"
                                  >

                                      <span className="font-semibold">
                                          {item.ProductName}
                                      </span>

                                      <span className="font-bold text-blue-600">
                                          x{item.Quantity}
                                      </span>

                                  </div>
                              ))}

                          </div>

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
                            <button 
                              onClick={() => setSelectedOrder(order)}
                              className="p-1.5 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-all cursor-pointer bg-transparent border-none" 
                              title="Xem chi tiết"
                            >
                              <Eye size={14} />
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
          </div>
        </div>
      </div>

      {/* MODAL CHI TIẾT ĐƠN HÀNG */}
      
      {selectedOrder &&
  createPortal(
    <div
      className="fixed inset-0 z-[99999] bg-slate-900/55 backdrop-blur-md animate-in fade-in duration-300"
      onClick={() => setSelectedOrder(null)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2

        w-[94vw]
        max-w-7xl
        max-h-[92vh]

        overflow-hidden

        rounded-[32px]

        border
        border-slate-200/70

        bg-gradient-to-br
        from-slate-50
        via-white
        to-slate-100

        shadow-[0_35px_80px_rgba(15,23,42,.22)]

        animate-in
        zoom-in-95
        duration-300
      "
      >

        {/* HEADER */}

        <div className="relative overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500"/>

          <div className="absolute right-0 top-0 w-72 h-72 rounded-full bg-white/10 blur-3xl"/>

          <div className="relative px-8 py-7 flex items-center justify-between">

            <div>

              <p className="text-blue-100 text-xs font-semibold uppercase tracking-[4px]">

                TECH TONIC

              </p>

              <h2 className="text-2xl font-bold text-white mt-1">

                Chi tiết đơn hàng

              </h2>

              <p className="text-blue-100 mt-1 text-sm">

                #{selectedOrder.id}

              </p>

            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="
              w-11
              h-11
              rounded-2xl

              bg-white/15

              hover:bg-white/25

              backdrop-blur

              transition

              flex
              items-center
              justify-center

              text-white
              "
            >
              <X size={20}/>
            </button>

          </div>

        </div>

        {/* BODY */}

        <div className="bg-slate-100/60 p-8 overflow-y-auto max-h-[78vh]">

          <div className="grid grid-cols-3 gap-8">

            {/* LEFT */}

            <div className="col-span-2 space-y-7">

              {/* CARD PRODUCT */}

              <div
                className="
                rounded-[28px]
                bg-white

                border
                border-slate-200/70

                shadow-xl
                shadow-slate-200/50

                overflow-hidden
              "
              >

                {/* HEADER */}

                <div
                  className="
                  px-7
                  py-5

                  border-b

                  border-slate-100

                  bg-gradient-to-r
                  from-slate-50
                  to-white

                  flex
                  items-center
                  gap-3
                "
                >

                  <div className="w-11 h-11 rounded-2xl bg-blue-100 flex items-center justify-center">

                    <Package
                      className="text-blue-600"
                      size={20}
                    />

                  </div>

                  <div>

                    <h3 className="font-black text-xl text-slate-800">

                      Danh sách sản phẩm

                    </h3>

                    <p className="text-xs text-slate-400">

                      {selectedOrder.items.length} sản phẩm

                    </p>

                  </div>

                </div>

                {/* LIST */}

                <div className="p-7 space-y-6">

                  {selectedOrder.items.map((item,index)=>(

                    <div

                      key={index}

                      className="
                      group

                      rounded-[24px]

                      border

                      border-slate-200

                      bg-gradient-to-br
                      from-white
                      to-slate-50

                      hover:border-blue-300

                      hover:shadow-2xl
                      hover:shadow-blue-100/60

                      transition-all

                      duration-300

                      p-6
                      "

                    >

                      <div className="flex justify-between">

                        {/* LEFT */}

                        <div className="flex gap-6">

                          <div className="relative">

                            <img

                              src={
                                item.ImageURL ||
                                "https://placehold.co/120x120"
                              }

                              className="
                              w-28
                              h-28

                              rounded-3xl

                              object-cover

                              border
                              border-slate-200

                              shadow-md
                              "

                            />

                            <div

                              className="
                              absolute

                              -top-3
                              -right-3

                              w-8
                              h-8

                              rounded-full

                              bg-blue-600

                              text-white

                              text-sm

                              font-black

                              flex
                              items-center
                              justify-center

                              shadow-lg
                              "

                            >

                              {item.Quantity}

                            </div>

                          </div>

                          <div className="space-y-4">

                            <div>

                              <h2 className="text-2xl font-black text-slate-800 group-hover:text-blue-600 transition">

                                {item.ProductName}

                              </h2>

                              <p className="text-xs text-slate-400 mt-1">

                                Product ID

                              </p>

                              <p className="font-semibold text-slate-600 break-all">

                                {item.ProductID}

                              </p>

                            </div>

                            <div className="flex gap-2">

                              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">

                                SL: {item.Quantity}

                              </span>

                              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">

                                Chính hãng

                              </span>

                            </div>

                          </div>

                        </div>

                        {/* RIGHT */}

                        <div className="text-right flex flex-col justify-center">

                          <p className="text-xs uppercase tracking-widest text-slate-400">

                            Đơn giá

                          </p>

                          <h3 className="text-xl font-bold text-slate-800">

                            {formatCurrency(item.UnitPrice)}

                          </h3>

                          <div className="my-5 border-t border-dashed border-slate-300"/>

                          <p className="text-xs uppercase tracking-widest text-slate-400">

                            Thành tiền

                          </p>

                          <h1 className="text-3xl font-black text-blue-600">

                            {formatCurrency(item.UnitPrice*item.Quantity)}

                          </h1>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

                {/* FOOTER */}
<div
  className="
    bg-slate-50
    border-t
    border-slate-200
    px-8
    py-6
    flex
    justify-between
    items-center
  "
>
  <div>
    <p className="text-sm text-slate-500">
      Tổng thanh toán
    </p>

    <h2 className="text-4xl font-black text-blue-600">
      {formatCurrency(selectedOrder.total)}
    </h2>
  </div>

  <ShoppingBag
    size={48}
    className="text-blue-200"
  />
</div>

</div> {/* <-- Đóng CARD PRODUCT */}

</div> {/* <-- Đóng LEFT (col-span-2) */}

{/* RIGHT */}
<div className="space-y-7">

  {/* ================= KHÁCH HÀNG ================= */}

  <div
    className="
    overflow-hidden

    rounded-[28px]

    border border-slate-200/70

    bg-white

    shadow-xl
    shadow-slate-200/40
    "
  >

    {/* HEADER */}

    <div className="relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400"/>

      <div className="absolute right-0 -top-10 w-40 h-40 rounded-full bg-white/10 blur-2xl"/>

      <div className="relative px-7 py-7">

        <div className="flex items-center gap-5">

          <div
            className="
            w-20
            h-20

            rounded-3xl

            bg-white/20

            backdrop-blur

            flex
            items-center
            justify-center

            text-white
            text-3xl
            font-black
            "
          >

            {selectedOrder.customerName
              ?.charAt(0)
              .toUpperCase()}

          </div>

          <div>

            <h2 className="text-2xl font-black text-white">

              {selectedOrder.customerName}

            </h2>

            <p className="text-blue-100 mt-1">

              {selectedOrder.userId}

            </p>

          </div>

        </div>

      </div>

    </div>

    {/* BODY */}

    <div className="p-7 space-y-5">

      <div className="flex gap-4">

        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

          <Phone
            className="text-blue-600"
            size={20}
          />

        </div>

        <div>

          <p className="text-xs uppercase tracking-widest text-slate-400">

            Số điện thoại

          </p>

          <p className="font-bold text-slate-800 mt-1">

            {selectedOrder.customerPhone}

          </p>

        </div>

      </div>

      <div className="border-t border-dashed border-slate-200"/>

      <div className="flex gap-4">

        <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">

          <MapPin
            className="text-emerald-600"
            size={20}
          />

        </div>

        <div>

          <p className="text-xs uppercase tracking-widest text-slate-400">

            Địa chỉ giao hàng

          </p>

          <p className="font-bold text-slate-800 mt-1">

            {selectedOrder.shippingAddress}

          </p>

        </div>

      </div>

    </div>

  </div>



  {/* ================= THANH TOÁN ================= */}

  <div
    className="
    rounded-[28px]

    bg-white

    border border-slate-200/70

    shadow-xl
    shadow-slate-200/40

    p-7
    "
  >

    <h3 className="text-xl font-black mb-6">

      Thanh toán

    </h3>

    <div className="space-y-5">

      <div className="flex justify-between">

        <span className="text-slate-500">

          Phương thức

        </span>

        <span className="font-bold">

          {selectedOrder.paymentMethod}

        </span>

      </div>

      <div className="flex justify-between items-center">

        <span className="text-slate-500">

          Trạng thái

        </span>

        <span
          className={`

          px-4

          py-2

          rounded-full

          text-xs

          font-bold

          ${
            selectedOrder.paymentStatus==="Đã thanh toán"
            ? "bg-emerald-100 text-emerald-700"
            : "bg-amber-100 text-amber-700"
          }

          `}
        >

          {selectedOrder.paymentStatus}

        </span>

      </div>

      <div className="border-t border-dashed pt-5 flex justify-between items-center">

        <span className="text-slate-500">

          Tổng tiền

        </span>

        <span className="text-2xl font-black text-blue-600">

          {formatCurrency(selectedOrder.total)}

        </span>

      </div>

    </div>

  </div>



  {/* ================= QUẢN LÝ ================= */}

  <div
    className="
    rounded-[28px]

    bg-gradient-to-br

    from-white

    to-slate-50

    border

    border-slate-200/70

    shadow-xl

    shadow-blue-100/30

    p-7
    "
  >

    <h3 className="text-xl font-black mb-6">

      Quản lý đơn hàng

    </h3>

    <select

      value={selectedOrder.status}

      onChange={(e)=>

        setSelectedOrder({

          ...selectedOrder,

          status:e.target.value

        })

      }

      className={`
      w-full

      h-14

      rounded-2xl

      px-4

      border-2

      font-bold

      transition-all

      ${getStatusStyle(selectedOrder.status)}

      `}
    >

      <option>Chờ xác nhận</option>

      <option>Đang giao</option>

      <option>Đã giao</option>

      <option>Đã hủy</option>

    </select>

    <button

      onClick={handleUpdateStatus}

      className="
      mt-6

      w-full

      h-14

      rounded-2xl

      bg-gradient-to-r

      from-blue-600

      via-sky-500

      to-cyan-500

      hover:from-blue-700

      hover:to-cyan-600

      text-white

      text-lg

      font-black

      shadow-xl

      shadow-blue-200

      hover:scale-[1.02]

      active:scale-100

      transition-all
      "
    >

      Cập nhật trạng thái

    </button>

  </div>

</div>
  </div>

</div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}