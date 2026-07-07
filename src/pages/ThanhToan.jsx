

import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { checkoutCart } from "@/api/cartApi";
import { 
  User, Phone, MapPin, FileText, ShoppingBag, CreditCard, 
  CheckCircle, ShieldCheck, RefreshCw, Truck, Headphones, Lock
} from 'lucide-react';
import { createOrder } from "@/api/orderApi";

export default function ThanhToan() {
  const navigate = useNavigate();
  const location = useLocation();
  const buyNowItems = location.state?.items || [];
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  const items = location.state?.items || [];
  // Nếu location.state trống (khi F5), hệ thống tự lấy data giả lập để không bị lỗi total = 0
  const {
    subTotal = 350000,
    shippingFee = 30000,
    discount = 50000
  } = location.state || {};


  // Tổng tiền cuối cùng
  const total = subTotal + shippingFee - discount;
//Thêm thông tin sản phẩm 
{buyNowItems.length > 0 && (
  <div className="bg-white rounded-xl border p-4 mb-4">
    
    <h3 className="font-bold mb-3">
      Sản phẩm
    </h3>

    {buyNowItems.map((item) => (
      <div
        key={item.product.ProductID}
        className="flex justify-between"
      >
        <div>
          <p>{item.product.ProductName}</p>
          <p className="text-sm text-gray-500">
            {item.variant}
          </p>
        </div>

        <div>
          x{item.quantity}
        </div>

        <div>
          {formatCurrency(item.product.Price)}
        </div>
      </div>
    ))}
  </div>
)}
  // State thông tin giao hàng
  const [shippingInfo, setShippingInfo] = useState({
  fullName: "",
  phone: "",
  address: "",
  note: ""
});

  const [paymentMethod, setPaymentMethod] = useState('cod');


  

  // Đồng bộ hàm xử lý thay đổi text cho các ô input gõ chữ mượt mà
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOrder = async (e) => {
  e.preventDefault();

  try {

    // ===== MUA NGAY =====
    if (items.length > 0) {

      const firstProduct = items[0].product;

      const data = {
        shopid: firstProduct.ShopID,
        shipping_name: shippingInfo.fullName,
        shipping_phone: shippingInfo.phone,
        shipping_address: shippingInfo.address,
        paymentmethod: paymentMethod === "cod" ? "COD" : "BANK",
        note: shippingInfo.note,

        items: items.map(item => ({
          ProductID: item.product.ProductID,
          Quantity: item.quantity,
        })),
      };

      await createOrder(data);

      alert("Đặt hàng thành công!");
      navigate("/donhang");
      return;
    }

    // ===== THANH TOÁN GIỎ HÀNG =====
    await checkoutCart({
      payment_method: paymentMethod === "cod" ? "COD" : "BANK",
      shipping_name: shippingInfo.fullName,
      shipping_phone: shippingInfo.phone,
      shipping_address: shippingInfo.address,
      note: shippingInfo.note,
      voucher_code: null,
    });

    alert("Đặt hàng thành công!");
    navigate("/donhang");

  } catch (err) {
    console.log(err);
    alert(err.response?.data?.message || "Đặt hàng thất bại");
  }
};
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-gray-800 py-6 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-6xl mx-auto">
       
        {/* LOGO & STEP PROGRESS BAR */}
        <div className="flex flex-col items-center justify-center mb-6 bg-white py-4 rounded-xl border border-gray-100 shadow-xs">
          <div className="flex items-center gap-1.5 text-blue-600 font-black text-xl tracking-tight mb-4">
            <ShoppingBag size={22} className="fill-blue-600/10" />
            <span>TechTonic</span>
          </div>
         
          <div className="flex items-center w-full max-w-md justify-between px-4 text-xs font-bold text-gray-400">
            <Link to="/giohang" className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors cursor-pointer">
              <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-[10px]">🛒</span>
              <span>Giỏ hàng</span>
            </Link>
            <div className="flex-1 h-px border-t border-dashed border-gray-200 mx-3"></div>
            <div className="flex items-center gap-1.5 text-blue-600">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
              <span>Thanh toán</span>
            </div>
            <div className="flex-1 h-px border-t border-dashed border-gray-200 mx-3"></div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center text-[10px]">✓</span>
              <span>Hoàn tất</span>
            </div>
          </div>
        </div>


        {/* BỐ CỤC CHÍNH HAI CỘT */}
        <form onSubmit={handleOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
         
          {/* CỘT TRÁI */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-linear-to-r from-blue-500 to-indigo-600 rounded-xl p-4 text-white flex items-center justify-between relative overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 z-10">
                <div className="text-2xl">🎁</div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-tight">Ưu đãi dành riêng cho bạn!</h3>
                  <p className="text-[11px] text-blue-100 mt-0.5">Mã giảm giá được áp dụng trực tiếp từ giỏ hàng của bạn.</p>
                </div>
              </div>
              <div className="bg-white text-blue-600 px-3 py-1.5 rounded-lg text-center z-10 shrink-0">
                <p className="text-[10px] font-black uppercase tracking-wider">FREESHIP</p>
              </div>
            </div>


            {/* THÔNG TIN GIAO HÀNG */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-xs p-5 relative">
              <div className="flex items-center gap-2 border-b border-gray-50 pb-3 mb-4">
                <MapPin size={18} className="text-blue-600" />
                <h2 className="text-sm font-black text-gray-900">Thông tin giao hàng</h2>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-8 space-y-3.5 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Họ và tên</label>
                    <div className="relative flex items-center">
                      <User size={14} className="absolute left-3 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-lg pl-9 pr-3 h-9 outline-none focus:border-blue-500 focus:bg-white text-gray-800 transition-all"
                        required
                      />
                    </div>
                  </div>


                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Số điện thoại</label>
                    <div className="relative flex items-center">
                      <Phone size={14} className="absolute left-3 text-gray-400" />
                      <input
                        type="text"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-lg pl-9 pr-3 h-9 outline-none focus:border-blue-500 focus:bg-white text-gray-800 transition-all"
                        required
                      />
                    </div>
                  </div>


                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Địa chỉ</label>
                    <div className="relative flex items-center">
                      <MapPin size={14} className="absolute left-3 text-gray-400" />
                      <input
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-lg pl-9 pr-3 h-9 outline-none focus:border-blue-500 focus:bg-white text-gray-800 transition-all"
                        required
                      />
                    </div>
                  </div>


                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Ghi chú (Nếu có)</label>
                    <div className="relative">
                      <FileText size={14} className="absolute left-3 top-2.5 text-gray-400" />
                      <textarea
                        rows="2"
                        name="note"
                        placeholder="Nhập ghi chú cho đơn hàng..."
                        value={shippingInfo.note}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 outline-none focus:border-blue-500 focus:bg-white text-gray-800 transition-all resize-none text-[11px]"
                      />
                    </div>
                  </div>
                </div>


                <div className="hidden md:flex md:col-span-4 flex-col items-center justify-center p-4">
                  <div className="relative w-full max-w-35 aspect-square bg-blue-50/40 rounded-full flex items-center justify-center border border-blue-100/40">
                    <div className="absolute text-blue-600"><MapPin size={32} className="fill-blue-500/20" /></div>
                    <div className="text-4xl mt-12">🛵</div>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold mt-3 text-center">Giao hàng tận tay bạn</p>
                </div>
              </div>
            </div>


            {/* BOX MUA SẮM AN TÂM */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-xs p-4">
              <h4 className="text-[11px] font-extrabold text-gray-900 uppercase tracking-wider mb-3">Mua sắm an tâm tại TechShop</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left">
                <div className="p-2.5 bg-slate-50/50 rounded-xl border border-slate-100 flex items-center gap-2">
                  <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg shrink-0"><CheckCircle size={14} /></div>
                  <span className="text-[10px] font-bold text-gray-700 leading-tight">Sản phẩm chính hãng 100%</span>
                </div>
                <div className="p-2.5 bg-slate-50/50 rounded-xl border border-slate-100 flex items-center gap-2">
                  <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg shrink-0"><RefreshCw size={14} /></div>
                  <span className="text-[10px] font-bold text-gray-700 leading-tight">Đổi trả dễ dàng trong 7 ngày</span>
                </div>
                <div className="p-2.5 bg-slate-50/50 rounded-xl border border-slate-100 flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg shrink-0"><ShieldCheck size={14} /></div>
                  <span className="text-[10px] font-bold text-gray-700 leading-tight">Bảo mật thông tin tuyệt đối</span>
                </div>
                <div className="p-2.5 bg-slate-50/50 rounded-xl border border-slate-100 flex items-center gap-2">
                  <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg shrink-0"><User size={14} /></div>
                  <span className="text-[10px] font-bold text-gray-700 leading-tight">Hơn 50.000+ KH tin dùng</span>
                </div>
              </div>
            </div>
          </div>


          {/* CỘT PHẢI */}
          <div className="lg:col-span-5 space-y-4">
            <div className="grid grid-cols-4 gap-1 bg-white p-2.5 rounded-xl border border-gray-100 shadow-xs text-center text-gray-500 text-[10px] font-bold">
              <div className="space-y-1"><Lock size={12} className="mx-auto text-blue-600" /><span>Bảo mật</span></div>
              <div className="space-y-1"><RefreshCw size={12} className="mx-auto text-emerald-600" /><span>7 Ngày</span></div>
              <div className="space-y-1"><Truck size={12} className="mx-auto text-indigo-600" /><span>Nhanh chóng</span></div>
              <div className="space-y-1"><Headphones size={12} className="mx-auto text-amber-600" /><span>24/7</span></div>
            </div>

            {items.length > 0 && (
  <div className="bg-white rounded-xl border border-gray-200 p-5 mb-5">
    <h3 className="text-lg font-semibold mb-4">
      Sản phẩm đặt mua
    </h3>

    {items.map((item, index) => (
      <div
        key={index}
        className="flex items-center justify-between border-b last:border-0 pb-3 mb-3"
      >
        <div>
          <p className="font-medium">
            {item.product.ProductName}
          </p>

          <p className="text-sm text-gray-500">
            Phân loại: {item.variant || "Mặc định"}
          </p>

          <p className="text-sm text-gray-500">
            Số lượng: {item.quantity}
          </p>
        </div>

        <div className="text-right">
          <p className="font-bold text-red-600">
            {formatCurrency(item.product.Price)}
          </p>
        </div>
      </div>
    ))}
  </div>
)}
            {/* BOX THÔNG TIN GIÁ TIỀN */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-xs p-4 space-y-3">
              <div className="flex items-center gap-2 border-b border-gray-50 pb-2">
                <FileText size={16} className="text-blue-600" />
                <h3 className="text-xs font-black text-gray-900">Thông tin đơn hàng</h3>
              </div>
             
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-gray-400 font-medium">
                  <span>Tạm tính:</span>
                  <span className="text-gray-800 font-bold">{formatCurrency(subTotal)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-400 font-medium">
                  <span>Phí vận chuyển:</span>
                  <span className="text-gray-800 font-bold">{formatCurrency(shippingFee)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-400 font-medium">
                  <span>Giảm giá:</span>
                  <span className="text-red-500 font-bold">-{formatCurrency(discount)}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 my-1 flex justify-between items-end">
                  <span className="text-xs font-black text-gray-900">Tổng thanh toán:</span>
                  <span className="text-lg font-black text-blue-600 tracking-tight">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>


            {/* PHƯƠNG THỨC THANH TOÁN */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-xs p-4 space-y-3">
              <div className="flex items-center gap-2 border-b border-gray-50 pb-2">
                <CreditCard size={16} className="text-blue-600" />
                <h3 className="text-xs font-black text-gray-900">Phương thức thanh toán</h3>
              </div>


              <div className="space-y-2.5">
                <label className={`flex items-center gap-3 border p-3 rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50/5' : 'border-gray-100 hover:bg-gray-50'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-4 h-4 text-blue-600" />
                  <div className="text-2xl">💵</div>
                  <div className="text-xs">
                    <p className="font-extrabold text-gray-900">Thanh toán khi nhận hàng (COD)</p>
                  </div>
                </label>


                <label className={`flex items-center gap-3 border p-3 rounded-xl cursor-pointer transition-all ${paymentMethod === 'bank' ? 'border-blue-600 bg-blue-50/5' : 'border-gray-100 hover:bg-gray-50'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} className="w-4 h-4 text-blue-600" />
                  <div className="text-2xl">🏦</div>
                  <div className="text-xs">
                    <p className="font-extrabold text-gray-900">Chuyển khoản ngân hàng</p>
                  </div>
                </label>
              </div>
            </div>


            {/* NÚT BẤM ĐẶT HÀNG */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white h-11 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-blue-700 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag size={14} />
                <span>Đặt hàng ngay ({formatCurrency(total)})</span>
              </button>
            </div>


          </div>
        </form>


      </div>
    </div>
  );
}

