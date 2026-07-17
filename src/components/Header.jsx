import { useEffect, useState } from "react";
import { getCart } from "../api/cartApi";
import { Search, ShoppingCart, Bell, User, ChevronDown } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  // 1. Cho phép thay đổi giá trị của ô tìm kiếm bằng setSearchValue
  const [searchValue, setSearchValue] = useState(""); 
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
  const loadCartCount = async () => {
    try {
      const token = localStorage.getItem("access_token");

      // Chưa đăng nhập thì badge = 0
      if (!token) {
        setCartCount(res.data.data.items.length);
        return;
      }

      const res = await getCart();

      const total = res.data.data.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      setCartCount(total);
    } catch (err) {
      console.log(err);
    }
  };

  loadCartCount();

  window.addEventListener("cartUpdated", loadCartCount);

  return () => {
    window.removeEventListener("cartUpdated", loadCartCount);
  };
}, []);
  return (
    <header className="bg-blue-700 border-b border-blue-800 sticky top-0 z-50 shadow-md text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between gap-2 sm:gap-4 h-16">
      
      {/* Logo */}
      <a href="/" className="shrink-0 flex items-center gap-1">
        <span className="text-xl sm:text-2xl font-black tracking-tight text-white">TECH</span>
        <span className="text-xl sm:text-2xl font-black tracking-tight text-blue-200">TONIC</span>
      </a>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl mx-1 sm:mx-4">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Tìm kiếm..."
            className="w-full h-10 pl-4 pr-12 text-sm bg-blue-50 border-none rounded-full outline-none text-gray-900 focus:ring-2 focus:ring-blue-300 transition-all"
          />
          <button className="absolute right-1 h-8 w-8 flex items-center justify-center bg-blue-800 rounded-full hover:bg-blue-900 transition-colors">
            <Search size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
        <Link 
          to="/giohang" 
          className="relative flex items-center gap-1 px-3 py-1.5 hover:bg-blue-600 rounded-lg transition-all cursor-pointer"
        >
          <div className="relative">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-yellow-400 text-blue-900 text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-sm font-bold hidden md:block">Giỏ hàng</span>
        </Link>

        <button className="relative p-2 hover:bg-blue-600 rounded-lg transition-all hidden sm:block">
          <Bell size={20} />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-red-500 rounded-full"></span>
        </button>

        <div className="w-px h-5 bg-blue-500 mx-1 hidden sm:block" />

        {/* Auth (Logic giữ nguyên) */}
        <div className="flex items-center gap-1">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-1 hover:text-blue-200 font-bold"
              >
                <User size={20} />
                <span className="text-sm">{user.fullname}</span>
                <ChevronDown size={16}/>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 text-gray-700">
                  {user.rolename === "Manager" && (
                    <button onClick={() => { setShowMenu(false); navigate("/accounts"); }} className="w-full text-left px-4 py-3 hover:bg-gray-100">Kênh bán hàng</button>
                  )}
                  <button onClick={() => { setShowMenu(false); switch (user.rolename) { case "Admin": navigate("/dstkhoan"); break; case "Manager": navigate("/tkcnhan"); break; case "Customer": navigate("/tkcnhan"); break; default: navigate("/"); } }} className="w-full text-left px-4 py-3 hover:bg-gray-100">Tài khoản của tôi</button>
                  <button onClick={() => { localStorage.removeItem("access_token"); localStorage.removeItem("user"); navigate("/login"); }} className="w-full text-left px-4 py-3 hover:bg-gray-100 text-red-500">Đăng xuất</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="flex items-center justify-center p-2 font-bold hover:text-blue-200">
                <User size={20} />
                <span className="hidden sm:block ml-1">Đăng nhập</span>
              </Link>
              <Link to="/quen-mat-khau" className="bg-yellow-400 text-blue-900 px-5 py-2 rounded-full font-bold hover:bg-yellow-300">Đăng ký</Link>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
</header>
  );
}