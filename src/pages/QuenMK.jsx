import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import loginBanner from '../assets/nen.png'; 

export default function QuenMK() {
  const [accountInfo, setAccountInfo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Lưu vào localStorage để chắc chắn trang sau lấy được, không lo bị rỗng
    localStorage.setItem('user_reset_email', accountInfo);

    // Điều hướng sang trang nhập OTP và đính kèm state
    navigate('/nhapOTP', { state: { email: accountInfo } }); 
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 w-full h-full select-none pointer-events-none">
        <img src={loginBanner} alt="Background" className="w-full h-full object-cover opacity-40 filter contrast-[1.05]" />
      </div>

      <div className="relative z-10 bg-white/90 backdrop-blur-lg w-full max-w-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white p-8 sm:p-10 min-h-130 flex flex-col justify-between transition-all duration-300">
        <div className="w-full">
          <div className="flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-gray-900">TECH</span>
              <span className="text-2xl font-black tracking-tight text-blue-600">TONIC</span>
            </Link>
          </div>

          <div className="text-left mb-6">
            <h1 className="text-[26px] font-semibold text-gray-900 mb-2 tracking-tight font-sans">Quên mật khẩu</h1>
            <p className="text-gray-500 text-sm leading-relaxed">Nhập email hoặc số điện thoại đã đăng ký để nhận mã xác thực (OTP).</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Email hoặc số điện thoại</label>
              <input 
                type="text" 
                required
                value={accountInfo}
                onChange={(e) => setAccountInfo(e.target.value)}
                placeholder="Nhập email hoặc số điện thoại" 
                className="w-full h-12 px-4 border border-gray-200 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all text-sm text-gray-900 bg-white"
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white h-12 rounded-xl font-bold hover:bg-blue-700 active:scale-[0.98] transition-all text-sm shadow-[0_4px_12px_rgba(37,99,235,0.2)] cursor-pointer flex items-center justify-center tracking-wide">
              Gửi mã OTP
            </button>
          </form>
        </div>

        <div className="w-full space-y-5 mt-6">
          <div className="flex justify-center border-t border-gray-100 pt-4">
            <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-900 hover:text-blue-600 transition-colors group">
              <ArrowLeft size={14} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Quay lại đăng nhập</span>
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