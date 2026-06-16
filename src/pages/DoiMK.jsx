import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Eye, EyeOff, Lock } from 'lucide-react';

// Import tấm ảnh nền mờ của bạn
import loginBanner from '../assets/nen.png'; 

export default function DoiMK() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Kiểm tra tính hợp lệ của mật khẩu
    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại.');
      return;
    }

    console.log('Đang xử lý cập nhật mật khẩu mới...');
    
    // Giả lập cập nhật thành công -> Chuyển về trang Đăng nhập kèm thông báo
    alert('Đổi mật khẩu thành công! Hãy đăng nhập lại bằng mật khẩu mới.');
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      
      {/* BACKGROUND: ẢNH NỀN CHÌM */}
      <div className="absolute inset-0 z-0 w-full h-full select-none pointer-events-none">
        <img 
          src={loginBanner} 
          alt="Reset Password Background" 
          className="w-full h-full object-cover opacity-40 filter contrast-[1.05]" 
        />
      </div>

      {/* FOREGROUND: KHỐI FORM ĐỒ BÓNG MỊN CHUẨN UI HIỆN ĐẠI */}
      <div className="relative z-10 bg-white/90 backdrop-blur-lg w-full max-w-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white p-8 sm:p-10 min-h-[580px] flex flex-col justify-between transition-all duration-300">
        
        <div className="w-full flex flex-col">
          {/* LOGO TECH TONIC */}
          <div className="flex justify-center mb-6">
            <Link to="/" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <span className="text-2xl font-black tracking-tight text-gray-900">TECH</span>
              <span className="text-2xl font-black tracking-tight text-blue-600">TONIC</span>
            </Link>
          </div>

          {/* Dòng chữ Bước 3 nhỏ định hướng giống wireframe */}
          <span className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-4">
            Bước 3: Đặt lại mật khẩu
          </span>

          {/* Tiêu đề lớn căn trái */}
          <div className="text-left mb-6 w-full">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight font-sans">
              Đặt lại mật khẩu
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              Vui lòng nhập mật khẩu mới của bạn để hoàn tất quá trình khôi phục.
            </p>
          </div>

          {/* Hiển thị thông báo lỗi nếu mật khẩu không trùng khớp */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-semibold animate-fade-in">
              {error}
            </div>
          )}

          {/* Form nhập mật khẩu mới */}
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            
            {/* Ô nhập mật khẩu mới */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Mật khẩu mới
              </label>
              <div className="relative flex items-center">
                <Lock size={16} className="absolute left-4 text-gray-400 pointer-events-none" />
                <input
                  type={showNewPass ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới"
                  className="w-full h-12 pl-11 pr-11 border border-gray-200 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-white transition-all text-sm text-gray-900 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Ô nhập lại mật khẩu mới */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Xác nhận mật khẩu mới
              </label>
              <div className="relative flex items-center">
                <Lock size={16} className="absolute left-4 text-gray-400 pointer-events-none" />
                <input
                  type={showConfirmPass ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới"
                  className="w-full h-12 pl-11 pr-11 border border-gray-200 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-white transition-all text-sm text-gray-900 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Nút bấm Đặt lại mật khẩu màu xanh đồng bộ */}
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white h-12 rounded-xl font-bold hover:bg-blue-700 active:scale-[0.98] transition-all text-sm shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)] cursor-pointer flex items-center justify-center tracking-wide"
            >
              Đặt lại mật khẩu
            </button>
          </form>

        </div>

        {/* PHẦN DƯỚI ĐÁY: QUAY LẠI ĐĂNG NHẬP & BẢN QUYỀN */}
        <div className="w-full space-y-4 mt-6">

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 select-none">
            <ShieldCheck size={14} />
            <span>Powered by <span className="font-semibold text-gray-500">CommiTrack Securify</span></span>
          </div>
        </div>

      </div>
    </div>
  );
}