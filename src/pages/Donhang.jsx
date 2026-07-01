import  { useState, useEffect } from 'react';
// Khôi phục điều hướng chuẩn của react-router-dom
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, Bell, HelpCircle, Home, ShoppingBag, 
  ClipboardList, Users,  Settings, MessageSquare, ArrowLeft, X,
  Trash2, Plus, Minus, ShieldCheck, Check, Truck, RefreshCw, Award, Ticket,
  UserPlus
} from 'lucide-react';

export default function QuanLyDonHang() {
  const API_URL = "https://tmdt-backend-ego0.onrender.com/api";
  const navigate = useNavigate(); // Hook điều hướng bằng lập trình (dùng cho button/sự kiện)
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // 1. ĐÃ THÊM: State quản lý tên người dùng để hiển thị Avatar đồng bộ
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("userName") || "Khách";
  });

  // 2. ĐÃ THÊM: Lắng nghe sự thay đổi tên từ localStorage (giống các trang khác)
  useEffect(() => {
    const handleAuthChange = () => {
      setUserName(localStorage.getItem("userName") || "Khách");
    };
    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);
  

  // 3. ĐÃ THÊM: Hàm tạo chữ viết tắt từ tên người dùng (Nguyễn Văn A -> NA)
  const getInitials = (name) => {
    if (!name || name === "Khách") return "K";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    // Lấy chữ cái đầu của từ đầu tiên và từ cuối cùng
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };

  const tabs = [
    'Tất cả', 'Chờ thanh toán', 'Chờ vận chuyển', 
    'Đang giao hàng', 'Hoàn thành', 'Đã hủy', 'Trả hàng/Hoàn tiền'
  ];

  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.log("Chưa có token!");
      navigate("/login");
      return;
    }

    const res = await axios.get(`${API_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setOrders(res.data.data);
  } catch (err) {
    console.log("Lỗi API:", err.response?.data);
  }
};
useEffect(() => {
  fetchOrders();
}, []);
  const handleUpdateQuantity = (orderId, type) => {
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id === orderId) {
          const newQty = type === 'inc' ? order.quantity + 1 : order.quantity - 1;
          if (newQty <= 0) return order;
          return { ...order, quantity: newQty, totalPrice: order.price * newQty };
        }
        return order;
      })
    );
  };

  const handleOpenCancelModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const handleConfirmCancel = () => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === selectedOrderId ? { ...order, status: 'ĐÃ HỦY' } : order
      )
    );
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'Tất cả') return true;
    if (activeTab === 'Chờ vận chuyển') return order.status === 'CHỜ VẬN CHUYỂN';
    if (activeTab === 'Đang giao hàng') return order.status === 'ĐANG GIAO HÀNG';
    if (activeTab === 'Hoàn thành') return order.status === 'HOÀN THÀNH';
    if (activeTab === 'Đã hủy' || activeTab === 'Trả hàng/Hoàn tiền') return order.status === 'ĐÃ HỦY';
    if (activeTab === 'Chờ thanh toán') return order.status === 'CHỜ THANH TOÁN';
    return true;
  });

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-gray-800 font-sans antialiased relative">
      
      {/* 1. SIDEBAR */}
      <div className="w-60 bg-white border-r border-gray-100 flex flex-col justify-between shrink-0">
        <div>
          <div className="p-5 border-b border-gray-50 flex items-center gap-1.5 text-blue-600 font-black text-xl tracking-tight">
            <ShoppingBag size={22} className="fill-blue-600/10" />
            <span className="text-base sm:text-xl font-black tracking-tight text-gray-900">
              TECH
            </span>
            <span className="text-base sm:text-xl font-black tracking-tight text-blue-600">
              TONIC
            </span>
          </div>
          <nav className="p-3 space-y-1">
            <Link to="/" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-all">
              <Home size={16} /> <span>Trang chủ</span>
            </Link>
            <Link to="/tkcnhan" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-all">
              <Users size={16} /> <span>Tài khoản</span>
            </Link>
            
            <Link to="/donhang" className="flex items-center gap-3 px-3 py-2 text-xs font-black bg-blue-50 text-blue-600 rounded-xl shadow-sm transition-all">
              <ClipboardList size={16} /> <span>Đơn hàng</span>
            </Link>
            <Link to="/dktkhoan" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-all">
              <UserPlus size={16} /> <span>Đăng kí bán hàng </span>
            </Link>
          </nav>
        </div>

        <div className="p-3 border-t border-gray-100 space-y-1">
          <Link to="/cai-dat" className="flex items-center gap-3 px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-blue-600">
            <Settings size={14} /> <span>Cài đặt</span>
          </Link>
          <Link to="/ho-tro" className="flex items-center gap-3 px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-blue-600">
            <HelpCircle size={14} /> <span>Hỗ trợ</span>
          </Link>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER TOPBAR */}
        <header className="h-14 bg-white border-b border-gray-100 px-6 flex items-center justify-between shrink-0">
          <div className="w-96 relative flex items-center">
            <Search size={14} className="absolute left-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm đơn hàng..." 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 h-8 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
          
          <div className="flex items-center gap-4 text-gray-600">
            <button className="p-1 hover:bg-gray-50 rounded-full relative cursor-pointer hover:text-blue-600">
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-1 hover:bg-gray-100 rounded-full cursor-pointer hover:text-blue-600">
              <HelpCircle size={16} />
            </button>
            <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
              {/* ĐÃ SỬA: Thay đổi chữ fix cứng 'NA' thành chữ viết tắt linh động dựa vào userName */}
              <div title={userName} className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center font-black text-xs text-white shadow-sm select-none">
                {getInitials(userName)}
              </div>
            </div>
          </div>
        </header>

        {/* MAIN BODY COMPONENT */}
        <main className="flex-1 p-6 overflow-y-auto space-y-4">
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/page1')} 
              className="text-gray-400 hover:text-blue-600 transition-colors border-none bg-transparent cursor-pointer p-0"
            >
              <ArrowLeft size={16} />
            </button>
            <h2 className="text-lg font-black tracking-tight text-gray-900">Đơn mua</h2>
          </div>

          {/* TÁP TRẠNG THÁI */}
          <div className="bg-white border-b border-gray-200 flex overflow-x-auto rounded-t-xl scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  activeTab === tab 
                    ? 'border-blue-600 text-blue-600 font-black' 
                    : 'border-transparent text-gray-400 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* THANH TÌM KIẾM ĐƠN HÀNG PHỤ */}
          <div className="bg-gray-50 border border-gray-200 p-3 flex items-center relative rounded-md">
            <Search size={14} className="absolute left-6 text-gray-400" />
            <input 
              type="text" 
              placeholder="Bạn có thể tìm kiếm theo ID đơn hàng hoặc Tên Sản phẩm" 
              className="w-full bg-white border border-gray-200 rounded pl-10 pr-4 h-9 text-xs outline-none focus:border-blue-500/50 transition-all"
            />
          </div>

          {/* DANH SÁCH ĐƠN HÀNG CHUYỂN ĐỔI */}
          <div className="space-y-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div key={order.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm space-y-4">
                  
                  {/* Header Đơn hàng */}
                  <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                    <div className="flex items-center gap-2">
                      <Award size={14} className="text-amber-500" />
                      <span className="text-xs font-black text-gray-900">{order.shopName}</span>
                      <button className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md hover:bg-blue-700 transition-colors shadow-sm cursor-pointer">
                        Xem shop
                      </button>
                      <button className="border border-gray-200 bg-white text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-md hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center gap-1 cursor-pointer">
                        <MessageSquare size={10} /> Chat
                      </button>
                    </div>
                    
                    <div className={`text-[11px] font-extrabold tracking-wider uppercase flex items-center gap-1.5 ${
                      order.status === 'ĐÃ HỦY' ? 'text-gray-400' : 'text-blue-600'
                    }`}>
                      {order.status === 'ĐANG GIAO HÀNG' && <Truck size={12} className="text-blue-500 animate-pulse" />}
                      {order.status === 'HOÀN THÀNH' && <Check size={12} className="text-green-500" />}
                      <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'ĐÃ HỦY' ? 'bg-gray-400' : 'bg-blue-500'}`}></span>
                      {order.status}
                    </div>
                  </div>

                  {/* Chi tiết sản phẩm trong đơn */}
                  <div className="flex items-start gap-4 py-1">
                    <img 
                      src={order.image} 
                      alt={order.productName} 
                      className="w-16 h-16 object-cover bg-gray-50 rounded border border-gray-100 shrink-0" 
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-gray-900 truncate">{order.productName}</h4>
                        <ShieldCheck size={13} className="text-blue-500 shrink-0" />
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium">Phân loại: {order.variant}</p>
                      
                      {/* Bộ tăng giảm số lượng */}
                      <div className="flex items-center gap-2 mt-1">
                        <button 
                          onClick={() => handleUpdateQuantity(order.id, 'dec')}
                          className="p-0.5 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 transition-colors cursor-pointer"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-[11px] font-bold text-gray-800 w-4 text-center">{order.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(order.id, 'inc')}
                          className="p-0.5 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 transition-colors cursor-pointer"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right shrink-0 space-y-0.5">
                      {order.oldPrice && (
                        <p className="text-[10px] text-gray-300 line-through font-medium">₫{order.oldPrice.toLocaleString('vi-VN')}</p>
                      )}
                      <p className="text-xs font-black text-gray-900">₫{order.price.toLocaleString('vi-VN')}</p>
                      {order.isVoucherApplied && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] bg-red-50 text-red-500 px-1 rounded font-bold border border-red-100">
                          <Ticket size={8} /> Mã giảm giá
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bảng giá & Nút Action */}
                  <div className="border-t border-gray-50 pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center justify-end sm:justify-start gap-1 text-xs font-bold ml-auto sm:ml-0">
                      <span className="text-[11px] text-gray-400 font-medium">💰 Tổng số tiền:</span>
                      <span className="text-sm font-black text-blue-600 underline tracking-tight">
                        ₫{order.totalPrice.toLocaleString('vi-VN')}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-end gap-2">
                      {order.status === 'HOÀN THÀNH' && (
                        <>
                          <button className="flex items-center gap-1 bg-blue-600 text-white text-xs font-bold h-8 px-3 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm cursor-pointer">
                            <RefreshCw size={12} /> Mua lại
                          </button>
                          <Link to='/danhgia' className="flex items-center justify-center border border-gray-200 bg-white text-gray-700 text-xs font-bold h-8 px-4 rounded-xl hover:bg-gray-50 hover:text-blue-600 transition-all cursor-pointer">
                            Đánh giá
                          </Link>
                        </>
                      )}
                      
                      {order.status === 'ĐANG GIAO HÀNG' && (
                        <button className="bg-gray-100 text-gray-700 text-xs font-bold h-8 px-4 rounded-xl hover:bg-gray-200 transition-all cursor-pointer">Đã nhận được hàng</button>
                      )}
                      
                      {order.status === 'CHỜ VẬN CHUYỂN' && (
                        <button 
                          onClick={() => handleOpenCancelModal(order.id)}
                          className="flex items-center gap-1 bg-gray-900 text-white text-xs font-bold h-8 px-3 rounded-xl hover:bg-black transition-all shadow-sm cursor-pointer"
                        >
                          <Trash2 size={12} /> Hủy đơn hàng
                        </button>
                      )}
                      
                      <button className="border border-gray-200 bg-white text-gray-400 text-xs font-bold h-8 px-4 rounded-xl hover:bg-gray-50 hover:text-gray-600 transition-all cursor-pointer">
                        Liên hệ người bán
                      </button>
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400 text-xs font-medium shadow-sm">
                📦 Không có đơn hàng nào trong trạng thái này.
              </div>
            )}
          </div>

        </main>
      </div>

      {/* 3. MODAL XÁC NHẬN HỦY ĐƠN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full relative z-10 shadow-xl border border-gray-100">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-slate-50 transition-colors"
            >
              <X size={16} />
            </button>

            <div className="text-center space-y-3 mt-2">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 mx-auto font-bold text-xl">
                ⚠️
              </div>
              <h3 className="text-sm font-black text-gray-900 tracking-tight">Xác nhận hủy đơn hàng</h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Bạn có chắc chắn muốn hủy đơn hàng này không? Hành động này sẽ không thể hoàn tác sau khi xác nhận.
              </p>
            </div>

            <div className="flex items-center gap-2 mt-6">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 h-9 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Đóng
              </button>
              <button 
                onClick={handleConfirmCancel}
                className="flex-1 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                Đồng ý hủy
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}