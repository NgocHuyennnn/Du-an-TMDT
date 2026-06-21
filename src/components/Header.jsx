import { useState } from "react";
import { Search, ShoppingCart, Bell, User, ChevronDown } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [cartCount] = useState(3);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  // 1. Cho phép thay đổi giá trị của ô tìm kiếm bằng setSearchValue
  const [searchValue, setSearchValue] = useState(""); 
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 h-16">
          
          {/* Logo */}
          <a href="/" className="shrink-0 flex items-center gap-1">
            <span className="text-base sm:text-xl font-black tracking-tight text-gray-900">
              TECH
            </span>
            <span className="text-base sm:text-xl font-black tracking-tight text-blue-600">
              TONIC
            </span>
          </a>

          {/* Search Bar - Tự co giãn linh hoạt theo màn hình */}
          <div className="flex-1 max-w-xl mx-1 sm:mx-4">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchValue}
                // 2. Thêm onChange để cập nhật chữ khi người dùng gõ phím
                onChange={(e) => setSearchValue(e.target.value)} 
                placeholder="Tìm kiếm..."
                className="w-full h-9 sm:h-10 pl-3 sm:pl-4 pr-10 sm:pr-12 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-full outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 placeholder-gray-400"
              />
              <button className="absolute right-1 h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                {/* 3. Sửa nhẹ prop 'sm' bị thừa trong Lucide cũ, giữ size chuẩn */}
                <Search size={16} className="text-white" /> 
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
            {/* Cart */}
            <Link 
              to="/giohang" 
              className="relative flex items-center gap-1 px-2 py-1.5 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 cursor-pointer"
            >
              <div className="relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium hidden md:block">Giỏ hàng</span>
            </Link>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 hidden sm:block">
              <Bell size={18} />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-red-500 rounded-full"></span>
            </button>

            <div className="w-px h-5 bg-gray-200 mx-0.5 sm:mx-1 hidden sm:block" />

            {/* Auth */}
          <div className="flex items-center gap-1">
            {user ? (
  <div className="relative">

  

    <button
      onClick={() => setShowMenu(!showMenu)}
      className="flex items-center gap-1 hover:text-blue-600"
    >
      <User size={18} />
      <span className="text-sm font-semibold">
        {user.fullname}
      </span>
      <ChevronDown size={14}/>
    </button>



    {showMenu && (
      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
        
        <button
          onClick={() => {
            setShowMenu(false);

            if (user.roleid === 1) {
              navigate("/dstkhoan");
            } else if (user.roleid === 2) {
              navigate("/accounts");
            } else {
              navigate("/tkcnhan");
            }
          }}
          className="w-full text-left px-4 py-3 hover:bg-gray-100"
        >
          Tài khoản của tôi
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
            navigate("/login");
          }}
          className="w-full text-left px-4 py-3 hover:bg-gray-100 text-red-500"
        >
          Đăng xuất
        </button>

      </div>
    )}
  </div>
) : (
  <>
    <Link
      to="/login"
      className="flex items-center justify-center p-2 sm:px-3 sm:py-2 text-gray-600"
    >
      <User size={18} />
      <span className="hidden sm:block ml-1">
        Đăng nhập
      </span>
    </Link>

    <Link
      to="/dangki"
      className="bg-blue-600 text-white px-5 py-2 rounded-full"
    >
      Đăng ký
    </Link>
  </>
)}
            </div>
            
          </div>
        </div>
      </div>
    </header>
  );
}