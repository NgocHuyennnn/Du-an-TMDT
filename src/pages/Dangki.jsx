import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, Mail, ShieldCheck } from 'lucide-react';

// Import tấm ảnh nền mờ của bạn
import loginBanner from '../assets/nen.png'; 

export default function RegisterPage() {
  // Quản lý ẩn/hiện mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Các state lưu giá trị đầu vào
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // State lưu thông báo lỗi
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // Hàm xử lý kiểm tra bảo mật và trùng khớp khi bấm nút Đăng ký
  const handleSubmit = async (e) => {
  e.preventDefault();
   console.log("ĐÃ BẤM ĐĂNG KÝ");
  setErrorMessage('');

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    setErrorMessage(
      'Mật khẩu phải từ 8 ký tự trở lên, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.'
    );
    return;
  }

  if (password !== confirmPassword) {
    setErrorMessage(
      'Mật khẩu nhập lại không trùng khớp. Vui lòng kiểm tra lại!'
    );
    return;
  }

  try {
    const response = await fetch('https://tmdt-backend-ego0.onrender.com/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
  fullname: fullName,
  email: email,
  password: password,
  phonenumber: phone,
  address: address,
}),
    });

    const data = await response.json();

    if (!response.ok) {
  console.log(data);
  setErrorMessage(
    data.message ||
    data.error ||
    JSON.stringify(data)
  );
  return;
}

    const regToken = data.data.reg_token;

navigate("/nhapOTP", {
    state: {
        type: "register",
        email,
        regToken,
    },
});
  } catch (error) {
    console.error(error);
    setErrorMessage('Không thể kết nối tới server');
  }
};

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      
      {/* BACKGROUND: ẢNH CHÌM LÀM NỀN MỜ TOÀN TRANG */}
      <div className="absolute inset-0 z-0 w-full h-full select-none pointer-events-none">
        <img 
          src={loginBanner} 
          alt="Register Background" 
          className="w-full h-full object-cover opacity-40 filter contrast-[1.05]" 
        />
      </div>

      {/* FOREGROUND: KHỐI FORM ĐĂNG KÝ CHÍNH GIỮA (ĐỒNG BỘ UI KÍNH MỜ) */}
      <div className="relative z-10 bg-white/90 backdrop-blur-lg w-full max-w-lg rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white p-8 sm:p-10 min-h-[580px] flex flex-col justify-between transition-all duration-300">
        
        <div>
          {/* Logo TECH TONIC */}
          <div className="flex justify-center mb-6">
            <Link to="/" className="shrink-0 flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <span className="text-2xl font-black tracking-tight text-gray-900">TECH</span>
              <span className="text-2xl font-black tracking-tight text-blue-600">TONIC</span>
            </Link>
          </div>

          {/* Tiêu đề */}
          <div className="text-left mb-6">
            <h1 className="text-[26px] font-semibold text-gray-900 mb-2 tracking-tight font-sans">Tạo tài khoản mới</h1>
            <p className="text-gray-500 text-sm leading-relaxed">Điền thông tin bên dưới để bắt đầu trải nghiệm dịch vụ.</p>
          </div>

          {/* HIỂN THỊ THÔNG BÁO LỖI VÀ ĐIỀU KIỆN MẬT KHẨU */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-semibold text-left leading-relaxed animate-fade-in">
              {errorMessage}
            </div>
          )}

          {/* Form nhập liệu */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Ô nhập Họ và tên */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Họ và tên</label>
              <div className="relative flex items-center">
                <User size={16} className="absolute left-4 text-gray-400 pointer-events-none" />
                <input 
                  type="text" 
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nguyễn Văn A" 
                  className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all text-sm text-gray-900 placeholder-gray-400 bg-white"
                />
              </div>
            </div>

            {/* Ô nhập Địa chỉ Email */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Địa chỉ Email</label>
              <div className="relative flex items-center">
                <Mail size={16} className="absolute left-4 text-gray-400 pointer-events-none" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@domain.com" 
                  className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all text-sm text-gray-900 placeholder-gray-400 bg-white"
                />
              </div>
            </div>
            <div className="space-y-2">
  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
    Số điện thoại
  </label>

  <input
    type="text"
    required
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    placeholder="0912345678"
    className="w-full h-12 px-4 border border-gray-200 rounded-xl"
  />
</div>
          <div className="space-y-2">
  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
    Địa chỉ
  </label>

  <input
    type="text"
    required
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    placeholder="Huế"
    className="w-full h-12 px-4 border border-gray-200 rounded-xl"
  />
</div>

            {/* Hàng chứa Mật khẩu & Xác nhận mật khẩu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Ô Mật khẩu */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Mật khẩu</label>
                <div className="relative flex items-center">
                  <Lock size={16} className="absolute left-4 text-gray-400 pointer-events-none" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********" 
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

              {/* Ô Xác nhận mật khẩu */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Xác nhận mật khẩu</label>
                <div className="relative flex items-center">
                  <Lock size={16} className="absolute left-4 text-gray-400 pointer-events-none" />
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="********" 
                    className="w-full h-12 pl-11 pr-11 border border-gray-200 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all text-sm text-gray-900 placeholder-gray-400 bg-white"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

            </div>

            {/* Checkbox điều khoản */}
            <div className="flex items-start gap-2 pt-2">
              <input type="checkbox" id="terms" required className="mt-0.5 accent-blue-600 h-4 w-4 rounded border-gray-300" />
              <label htmlFor="terms" className="text-xs text-gray-500 leading-tight select-none">
                Tôi đồng ý với <span className="font-bold text-gray-700 underline cursor-pointer hover:text-blue-600">Điều khoản dịch vụ</span> và <span className="font-bold text-gray-700 underline cursor-pointer hover:text-blue-600">Chính sách bảo mật</span>
              </label>
            </div>

            {/* Nút Đăng ký */}
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white h-12 rounded-xl font-bold hover:bg-blue-700 active:scale-[0.98] transition-all text-sm mt-4 shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2 cursor-pointer tracking-wide"
            >
              <span>Đăng ký</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7M21 12H3" />
              </svg>
            </button>
          </form>
        </div>

        {/* Quay lại Đăng nhập */}
        <div className="w-full space-y-4 mt-6">
          <div className="text-center text-xs text-gray-500 border-t border-gray-100 pt-4">
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-bold text-blue-600 underline hover:text-blue-700 ml-1 cursor-pointer">
              Đăng nhập ngay
            </Link>
          </div>
          
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 select-none">
            <ShieldCheck size={14} />
            <span>Powered by <span className="font-semibold text-gray-500">CommiTrack Securify</span></span>
          </div>
        </div>

      </div>
    </div>
  );
}