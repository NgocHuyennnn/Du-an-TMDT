import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

// Import tấm ảnh nền từ thư mục assets
import loginBanner from '../assets/nen.png'; 

export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("https://tmdt-backend-ego0.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailOrPhone,
        password: password,
      }),
    });

    const data = await res.json();

console.log("LOGIN RESPONSE:", data);
console.log("DATA KEYS:", Object.keys(data));

if (!res.ok) {
  throw new Error(data.message || "Đăng nhập thất bại");
}

const token = data.data?.access_token;
const user = data.data?.user;

if (!token) {
  throw new Error("BE không trả token");
}

localStorage.setItem("access_token", token);
localStorage.setItem("user", JSON.stringify(user));
localStorage.setItem("refresh_token", res.data.refresh_token)

const role = user.roleid;

if (role === 1) {
  navigate("/admin");
} else if (role === 2) {
  navigate("/manager");
} else {
  navigate("/");
}

console.log(
  "TOKEN TRONG LOCAL:",
  localStorage.getItem("access_token")
);



  } catch (err) {
    console.log("LOGIN ERROR:", err);
    alert(err.message);
  }
};
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      
      {/* ================= BACKGROUND: ẢNH CHÌM LÀM NỀN MỜ TOÀN TRANG ================= */}
      <div className="absolute inset-0 z-0 w-full h-full select-none pointer-events-none">
        <img 
          src={loginBanner} 
          alt="Login Background" 
          className="w-full h-full object-cover opacity-40 filter contrast-[1.05]" 
        />
      </div>

      {/* ================= FOREGROUND: KHỐI FORM ĐỔ BÓNG MỊN (ĐỒNG BỘ UI) ================= */}
      <div className="relative z-10 bg-white/90 backdrop-blur-lg w-full max-w-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white p-8 sm:p-10 min-h-[550px] flex flex-col justify-between transition-all duration-300">
        
        <div>
          {/* 1. Logo TECH TONIC */}
          <div className="flex justify-center mb-6">
            <Link to="/" className="shrink-0 flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <span className="text-2xl font-black tracking-tight text-gray-900">TECH</span>
              <span className="text-2xl font-black tracking-tight text-blue-600">TONIC</span>
            </Link>
          </div>

          {/* 2. Tiêu đề Đăng nhập */}
          <div className="text-left mb-6">
            <h1 className="text-[26px] font-semibold text-gray-900 mb-2 tracking-tight font-sans">Đăng nhập</h1>
            <p className="text-gray-500 text-sm leading-relaxed">Chào mừng bạn quay lại với hệ thống!</p>
          </div>

          {/* 3. Form nhập liệu */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Ô nhập Email / SĐT */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Email hoặc Số điện thoại
              </label>
              <div className="relative flex items-center">
                <User size={16} className="absolute left-4 text-gray-400 pointer-events-none" />
                <input 
                  type="text" 
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="Nhập email hoặc số điện thoại" 
                  className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all text-sm text-gray-900 placeholder-gray-400 bg-white"
                />
              </div>
            </div>

            {/* Ô nhập Mật khẩu */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Mật khẩu
                </label>
                <Link to="/quen-mat-khau" className="text-xs font-bold text-blue-600 underline hover:text-blue-700 transition-colors">
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative flex items-center">
                <Lock size={16} className="absolute left-4 text-gray-400 pointer-events-none" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu của bạn" 
                  className="w-full h-12 pl-11 pr-11 border border-gray-200 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all text-sm text-gray-900 placeholder-gray-400 bg-white"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Nút Đăng nhập dạng Submit chuẩn */}
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white h-12 rounded-xl font-bold hover:bg-blue-700 active:scale-[0.98] transition-all text-sm mt-2 shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)] cursor-pointer flex items-center justify-center tracking-wide"
            >
              Đăng nhập
            </button>
          </form>

          {/* 4. Thành phần phân cách HOẶC */}
          <div className="relative flex py-4 items-center w-full">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink mx-4 text-[10px] text-gray-400 font-bold tracking-widest">HOẶC</span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          {/* 5. Nút Đăng nhập với Google */}
          <button 
            type="button" 
            className="w-full bg-white border border-gray-200 text-gray-700 h-11 rounded-xl font-medium hover:bg-gray-50 active:scale-[0.99] transition-all text-sm flex items-center justify-center gap-2.5 cursor-pointer shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.227C18.423 1.487 15.62 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.854 11.57-11.77 0-.795-.085-1.4-.195-1.945H12.24z"/>
            </svg>
            <span className="text-xs font-bold text-gray-700">Tiếp tục với Google</span>
          </button>
        </div>

        {/* 6. Liên kết chuyển đổi sang Đăng ký */}
        <div className="text-center text-xs text-gray-500 mt-6 border-t border-gray-100 pt-4">
          Chưa có tài khoản?{' '}
          <Link
  to="/quen-mat-khau"
  state={{ type: "register" }}
  className="font-bold text-blue-600 underline hover:text-blue-700 ml-1 cursor-pointer"
>
  Đăng ký ngay
</Link>
        </div>

      </div>
    </div>
  );
}