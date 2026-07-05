import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { getCart, deleteCartItem,} from "@/api/cartApi";
import {
  Trash2, Plus, Minus, ArrowLeft, ShieldCheck, ShoppingBag, Check,
  Truck, RefreshCw, Award, Ticket, ChevronRight, ChevronLeft, ShoppingCart
} from 'lucide-react';


export default function GioHang() {
  const navigate = useNavigate();


  // Mock data sản phẩm trong giỏ hàng có thêm thuộc tính màu sắc, kích cỡ
  const [cartItems, setCartItems] = useState([]);


useEffect(() => {
  loadCart();
}, []);


const loadCart = async () => {
  try {
    const res = await getCart();


    console.log("Cart API:", res.data);


    const items = res.data.data.items.map((item) => ({
      id: item.item_id,                 // CartItemID
      productId: item.product_id,       // ProductID
      name: item.product_name,
      price: Number(item.price),
      quantity: item.quantity,
      image:
        item.image_url ||
        "https://via.placeholder.com/150",
      variant: "",
      checked: true,
    }));


    setCartItems(items);
  } catch (err) {
    console.error("Lỗi lấy giỏ hàng:", err);
  }
};
  // Danh sách sản phẩm gợi ý "Có thể bạn cũng thích" phía dưới
  const suggestedProducts = [
    { id: 101, name: 'Giày thể thao nam trẻ trung', price: 690000, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&auto=format&fit=crop&q=60' },
    { id: 102, name: 'Balo nam công sở chống nước', price: 550000, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=60' },
    { id: 103, name: 'Nón lưỡi trai basic', price: 120000, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&auto=format&fit=crop&q=60' },
    { id: 104, name: 'Kính mát nam phân cực', price: 320000, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&auto=format&fit=crop&q=60' },
  ];


  const [couponCode, setCouponCode] = useState("");


const [appliedDiscount, setAppliedDiscount] = useState(0);
const [couponMessage, setCouponMessage] = useState("");
const shippingFee = 30000;
  const applyCoupon = () => {
  if (couponCode.trim().toUpperCase() === "FREESHIP30") {
    setAppliedDiscount(30000);
    setCouponMessage("Áp mã thành công.");
  } else {
    setAppliedDiscount(0);
    setCouponMessage("Mã giảm giá không hợp lệ.");
  }
};


  const handleCheckChange = (id) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };


  const updateQuantity = (id, amount) => {
  const newCart = cartItems.map(item => {
    if (item.id === id) {
      const newQty = Math.max(1, item.quantity + amount);
      return {
        ...item,
        quantity: newQty,
      };
    }
    return item;
  });


  setCartItems(newCart);


  localStorage.setItem(
  "cart",
  JSON.stringify(
    newCart.map(item => ({
      ProductID: item.productId,
      Quantity: item.quantity
    }))
  )
);
  window.dispatchEvent(new Event("cartUpdated"));
};


  const deleteItem = async (id) => {
  try {
    await deleteCartItem(id);


    await loadCart();


    window.dispatchEvent(new Event("cartUpdated"));
  } catch (err) {
    console.log(err);
  }
};


  const tempTotal = cartItems.filter(item => item.checked).reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = tempTotal > 0 ? appliedDiscount : 0;
  const finalTotal = tempTotal > 0 ? (tempTotal + shippingFee - discountAmount) : 0;
  const checkedCount = cartItems.filter(item => item.checked).length;


  const formatCurrency = (value) => {
    return value.toLocaleString('vi-VN') + ' đ';
  };


  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-gray-800 py-6 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-6xl mx-auto">
       
        {/* HEADER ĐIỀU HƯỚNG */}
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>TIẾP TỤC MUA SẮM</span>
          </Link>
        </div>


        {/* TIÊU ĐỀ TRANG VÀ SUBTITLE */}
        <div className="mb-5">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Giỏ Hàng</h1>
            <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems.length} sản phẩm
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Kiểm tra lại sản phẩm và tiến hành thanh toán</p>
        </div>


        {/* BỐ CỤC HAI CỘT CHÍNH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
         
          {/* CỘT TRÁI: TIỆN ÍCH & DANH SÁCH SẢN PHẨM (Chiếm 8/12 cột) */}
          <div className="lg:col-span-8 space-y-4">
           
            {/* THANH BADGE CAM KẾT DỊCH VỤ */}
            <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-xl border border-gray-100 shadow-xs text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-2 px-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-full"><Truck size={16} /></div>
                <div>
                  <h4 className="text-[11px] font-bold text-gray-900">Giao hàng nhanh</h4>
                  <p className="text-[10px] text-gray-400 hidden sm:block">1-3 ngày toàn quốc</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 px-2 border-x border-gray-100">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-full"><RefreshCw size={16} /></div>
                <div>
                  <h4 className="text-[11px] font-bold text-gray-900">Đổi trả dễ dàng</h4>
                  <p className="text-[10px] text-gray-400 hidden sm:block">Trong 7 ngày nếu lỗi</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 px-2">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-full"><Award size={16} /></div>
                <div>
                  <h4 className="text-[11px] font-bold text-gray-900">Sản phẩm chính hãng</h4>
                  <p className="text-[10px] text-gray-400 hidden sm:block">Cam kết chất lượng</p>
                </div>
              </div>
            </div>


            {/* DANH SÁCH GIỎ HÀNG */}
            <div className="space-y-3">
              {cartItems.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center border border-gray-100 shadow-xs">
                  <ShoppingBag size={44} className="mx-auto text-gray-300 mb-3 stroke-1" />
                  <p className="text-gray-400 text-sm font-medium">Không có sản phẩm nào trong giỏ hàng.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-xl border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-200 shadow-xs ${
                      item.checked ? 'border-blue-500/20 bg-blue-50/5' : 'border-gray-100/80'
                    }`}
                  >
                    {/* Thông tin sản phẩm bên trái */}
                    <div className="flex items-center gap-3.5 flex-1 w-full min-w-0">
                      {/* Checkbox dạng nút tròn */}
                      <button
                        onClick={() => handleCheckChange(item.id)}
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                          item.checked
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-gray-300 hover:border-gray-400 bg-white'
                        }`}
                      >
                        {item.checked && <Check size={12} strokeWidth={4} />}
                      </button>


                      {/* Ảnh sản phẩm */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>


                      {/* Chi tiết Tên, Biến thể, Đơn giá */}
                      <div className="space-y-1 flex-1 min-w-0">
                        <h3 className="font-bold text-sm text-gray-900 line-clamp-2 leading-tight tracking-tight">
                          {item.name}
                        </h3>
                        <p className="text-[11px] text-gray-400 font-medium">{item.variant}</p>
                        <p className="text-xs font-bold text-red-500 sm:hidden">{formatCurrency(item.price)}</p>
                      </div>
                    </div>


                    {/* Bộ đếm và Giá tiền bên phải */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                     
                      {/* Bộ tương tác số lượng */}
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50/50 p-0.5 h-8">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white rounded-md transition-all cursor-pointer"
                        >
                          <Minus size={11} strokeWidth={3} />
                        </button>
                        <span className="w-8 text-center font-bold text-xs text-gray-900 select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white rounded-md transition-all cursor-pointer"
                        >
                          <Plus size={11} strokeWidth={3} />
                        </button>
                      </div>


                      {/* Đơn giá hiển thị trên PC */}
                      <div className="text-right min-w-22.5 hidden sm:block">
                        <span className="font-extrabold text-sm text-gray-900 tracking-tight">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>


                      {/* Nút xóa */}
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-gray-300 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-all cursor-pointer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>


            {/* BANNER ƯU ĐÃI DÀNH RIÊNG */}
            <div className="bg-amber-50/60 border border-amber-100 p-3 rounded-xl flex items-center justify-between text-xs text-amber-900">
              <div className="flex items-center gap-2">
                <div className="bg-amber-100 p-1.5 rounded-lg text-amber-600 font-bold">✨</div>
                <div>
                  <span className="font-bold">Ưu đãi dành riêng cho bạn!</span>
                  <p className="text-[11px] text-amber-700/80 mt-0.5">Miễn phí vận chuyển cho đơn hàng từ 500.000 đ</p>
                </div>
              </div>
              <button className="text-[11px] font-bold text-blue-600 flex items-center gap-0.5 hover:underline cursor-pointer">
                Xem thêm ưu đãi <ChevronRight size={14} />
              </button>
            </div>


            {/* SECTION "CÓ THỂ BẠN CŨNG THÍCH" */}
            <div className="pt-2">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  Có thể bạn cũng thích <span className="text-rose-500">❤️</span>
                </h3>
                <div className="flex gap-1">
                  <button className="p-1 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-gray-400 transition-colors cursor-pointer"><ChevronLeft size={14} /></button>
                  <button className="p-1 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-gray-400 transition-colors cursor-pointer"><ChevronRight size={14} /></button>
                </div>
              </div>
             
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {suggestedProducts.map((prod) => (
                  <div key={prod.id} className="bg-white border border-gray-100 rounded-xl p-2.5 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
                    <div>
                      <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-100/60 relative">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <h4 className="text-xs font-bold text-gray-800 mt-2 line-clamp-2 h-8 leading-tight">{prod.name}</h4>
                    </div>
                    <div className="flex justify-between items-center mt-2 pt-1 border-t border-gray-50">
                      <span className="text-xs font-black text-blue-600">{formatCurrency(prod.price)}</span>
                      <button
                      onClick={() => handleAddSuggestedProduct(prod)}
                      className="bg-blue-50 text-blue-600 p-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                    >
                      <ShoppingCart size={12} strokeWidth={2.5} />
                    </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>


          {/* CỘT PHẢI: CHI TIẾT ĐƠN HÀNG (Chiếm 4/12 cột) */}
          <div className="lg:col-span-4 lg:sticky lg:top-6">
           
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden space-y-4 pb-4">
              {/* Tiêu đề Box Đơn hàng màu Gradient Tím Xanh cá tính như ảnh mẫu */}
              <div className="bg-linear-to-r from-violet-600 to-indigo-600 p-4 text-white flex items-center gap-2">
                <Ticket size={18} />
                <h2 className="text-sm font-bold tracking-wide">Chi tiết đơn hàng</h2>
              </div>
             
              <div className="px-4 space-y-3 text-xs">
                {checkedCount > 0 && (
                  <p className="text-[11px] text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded-md inline-block">
                    Bạn đang chọn <span className="font-bold text-violet-600">{checkedCount} sản phẩm</span>
                  </p>
                )}


                <div className="flex justify-between items-center text-gray-500 pt-1">
                  <span className="font-medium">Tạm tính</span>
                  <span className="font-bold text-gray-900">{formatCurrency(tempTotal)}</span>
                </div>


                <div className="flex justify-between items-center text-gray-500">
                  <span className="font-medium">Phí giao hàng</span>
                  <span className="font-bold text-gray-900">
                    {tempTotal > 0 ? formatCurrency(shippingFee) : '0 đ'}
                  </span>
                </div>


                {/* Input nhập Coupon */}
                <div className="pt-0.5">
                  <div className="flex gap-1.5 p-1 bg-gray-50 rounded-lg border border-gray-200 focus-within:border-indigo-500/40 transition-colors">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Nhập mã giảm giá..."
                      className="grow bg-transparent px-2 outline-none text-[11px] text-gray-900 placeholder-gray-400"
                    />
                    {couponMessage && (
                      <p
                        className={`mt-2 text-[11px] ${
                          appliedDiscount > 0
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {couponMessage}
                      </p>
                    )}
                    <button
                      onClick={applyCoupon}
                      className="bg-indigo-600 text-white text-[10px] uppercase px-3 py-1.5 rounded-md font-bold hover:bg-indigo-700"
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>


                {/* Khối hiển thị Ưu đãi hiện có đã áp dụng thành công giống trong ảnh */}
                {tempTotal > 0 && appliedDiscount > 0 && (
                  <div className="bg-amber-50/40 border border-dashed border-amber-200 p-2.5 rounded-lg flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 text-amber-800">
                      <span>🏷️</span>
                      <div>
                        <p className="font-bold text-gray-800">Ưu đãi hiện có</p>
                        <span className="text-[10px] font-mono bg-amber-100 text-amber-700 px-1 py-0.5 rounded font-bold">FREESHIP30</span>
                      </div>
                    </div>
                    <span className="font-bold text-emerald-600">-{formatCurrency(appliedDiscount)}</span>
                  </div>
                )}


                <div className="border-t border-gray-100 pt-3 my-1"></div>


                <div className="flex justify-between items-end">
                  <span className="text-gray-900 text-xs font-bold uppercase tracking-wider mb-0.5">Tổng thanh toán</span>
                  <span className="text-xl font-black text-indigo-600 tracking-tight">
                    {formatCurrency(finalTotal)}
                  </span>
                </div>
              </div>


              {/* Nút thanh toán hành động chính */}
              <div className="px-4 pt-1">
                <button
  onClick={() => {
    if (tempTotal <= 0) {
      alert("Vui lòng chọn sản phẩm!");
      return;
    }
    const selectedItems = cartItems
  .filter(item => item.checked)
  .map(item => ({
    ProductID: item.productId,
    Quantity: item.quantity,
    ShopID: localStorage.getItem("shop_id")
  }));

localStorage.setItem("cart", JSON.stringify(selectedItems));

console.log("SAVE CART =", JSON.stringify(selectedItems, null, 2));

    navigate("/thanhtoan", {
      state: {
        subTotal: tempTotal,
        shippingFee,
        discount: discountAmount,
        couponCode,
      },
    });
  }}
  className="w-full bg-indigo-600 text-white h-11 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-indigo-700 active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
>
  <ShieldCheck size={16} />
  <span>Tiến hành thanh toán</span>
</button>
                
                <p className="text-[10px] text-gray-400 text-center mt-2.5 flex items-center justify-center gap-1">
                  🔒 Thanh toán an toàn & bảo mật
                </p>
              </div>


              {/* Lợi ích cộng thêm dưới chân sidebar */}
              <div className="mx-4 border-t border-gray-100 pt-3 space-y-1.5 text-[11px] text-gray-500 font-medium">
                <div className="flex items-center gap-1.5 text-emerald-600"><Check size={12} strokeWidth={3} /> Sản phẩm chính hãng 100%</div>
                <div className="flex items-center gap-1.5 text-emerald-600"><Check size={12} strokeWidth={3} /> Đổi trả trong 7 ngày nếu có lỗi</div>
                <div className="flex items-center gap-1.5 text-emerald-600"><Check size={12} strokeWidth={3} /> Hỗ trợ khách hàng 24/7</div>
              </div>


            </div>


          </div>


        </div>


      </div>
    </div>
  );
}
