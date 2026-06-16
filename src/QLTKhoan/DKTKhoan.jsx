import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, User, Mail, Lock, Phone, Store, MapPin, 
  FileText, Eye, EyeOff, CheckCircle2, ArrowRight, ShieldCheck 
} from 'lucide-react';

// 🌟 Đã import đúng file từ thư mục assets
import hinhNenTechTonic from '../assets/nen.png'; 

export default function DangKyBanHang() {
  // State quản lý dữ liệu form đăng ký kinh doanh
  const [formData, setFormData] = useState({
    merchantName: '',
    email: '',
    phone: '',
    storeName: '',
    taxCode: '',
    storeAddress: '',
    password: '',
    confirmPassword: '',
    agreeMerchantTerms: false
  });

  // State quản lý ẩn/hiện mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State quản lý trạng thái xử lý hệ thống
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Xử lý thay đổi dữ liệu trong các ô nhập
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError(''); 
  };

  // Xử lý sự kiện Submit đăng ký gian hàng
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Kiểm tra dữ liệu đầu vào bắt buộc
    if (
      !formData.merchantName || !formData.email || !formData.phone || 
      !formData.storeName || !formData.storeAddress || 
      !formData.password || !formData.confirmPassword
    ) {
      setError('Vui lòng điền đầy đủ tất cả các trường thông tin bắt buộc (*).');
      return;
    }
    
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Số điện thoại không hợp lệ. Vui lòng nhập chính xác 10 chữ số.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu bảo mật phải chứa ít nhất từ 6 ký tự trở lên.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Xác nhận mật khẩu không trùng khớp. Vui lòng kiểm tra lại.');
      return;
    }

    if (!formData.agreeMerchantTerms) {
      setError('Bạn cần đồng ý với Điều khoản hợp tác dành cho Đối tác bán hàng.');
      return;
    }

    // Giả lập gửi dữ liệu đăng ký kinh doanh lên hệ thống duyệt
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  // Giao diện khi gửi yêu cầu đăng ký gian hàng thành công
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 antialiased font-sans relative">
        {/* 🌟 ĐÃ SỬA: Truyền biến hinhNenTechTonic vào màn hình thành công */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{ backgroundImage: `url(${hinhNenTechTonic})` }}
        ></div>

        <div className="max-w-lg w-full bg-white/95 backdrop-blur-md rounded-2xl border border-slate-100 shadow-xl p-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300 z-10">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 size={36} />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-[#0f172a] tracking-tight">Hồ sơ đã được tiếp nhận!</h2>
            <p className="text-xs font-medium text-slate-500 leading-relaxed max-w-sm mx-auto">
              Yêu cầu mở cửa hàng <span className="font-bold text-blue-600">"{formData.storeName}"</span> đã gửi tới ban quản trị <span className="font-bold text-slate-900">TECH TONIC</span>. Chúng tôi sẽ thẩm định và phản hồi qua email của bạn trong vòng 24 giờ làm việc.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-left space-y-2">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Tóm tắt thông tin đăng ký đối tác</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div><span className="text-slate-400 font-medium">Chủ sở hữu:</span> <span className="text-slate-800 font-semibold">{formData.merchantName}</span></div>
              <div><span className="text-slate-400 font-medium">Hotline liên hệ:</span> <span className="text-slate-800 font-semibold">{formData.phone}</span></div>
              <div className="col-span-2 mt-1"><span className="text-slate-400 font-medium">Email đăng nhập:</span> <span className="text-slate-800 font-semibold">{formData.email}</span></div>
              <div className="col-span-2"><span className="text-slate-400 font-medium">Địa chỉ cửa hàng:</span> <span className="text-slate-800 font-semibold">{formData.storeAddress}</span></div>
            </div>
          </div>

          <Link 
            to="/" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold h-11 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Quay lại trang Đăng nhập</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center items-center p-4 lg:p-8 antialiased font-sans relative w-full overflow-hidden">
      
      {/* 🌟 ĐÃ SỬA: Thay thế url('/nen.png') bằng biến hinhNenTechTonic */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-25 filter pointer-events-none"
        style={{ backgroundImage: `url(${hinhNenTechTonic})` }}
      ></div>

      {/* LỚP MÀU PHỦ TRỢ GIÚP CHỮ HIỂN THỊ RÕ RÀNG */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/40 via-transparent to-blue-50/20 z-0 pointer-events-none"></div>

      {/* BACKGROUND DECORATION BLURS (Giữ lại để tạo hiệu ứng ánh sáng góc) */}
      <div className="absolute top-12 left-12 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-12 right-12 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* MAIN FORM BOX - Sử dụng bg-white/95 và backdrop-blur để hòa quyện với ảnh nền phía sau */}
      <div className="max-w-[800px] w-full bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden z-10 flex flex-col">
        
        {/* BRAND LOGO HEADER */}
        <div className="p-6 pb-4 border-b border-slate-100 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-slate-50/70">
          <div className="flex items-center gap-1.5 justify-center sm:justify-start font-black text-xl tracking-tight select-none">
            <ShoppingBag size={22} className="fill-blue-500/10 text-blue-500" />
            <span className="text-slate-900">TECH</span>
            <span className="text-blue-500">TONIC</span>
          </div>
          <div className="text-[10px] sm:text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full inline-block self-center sm:self-auto">
            Kênh Đăng Ký Dành Cho Đối Tác Bán Hàng
          </div>
        </div>

        {/* MAIN FORM */}
        <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-5">
          
          <div className="space-y-1">
            <h2 className="text-lg font-black text-[#0f172a] tracking-tight">Đăng ký mở gian hàng mới</h2>
            <p className="text-xs font-medium text-slate-400">Cung cấp thông tin doanh nghiệp hoặc hộ kinh doanh cá thể để bắt đầu bán hàng trên nền tảng.</p>
          </div>

          {/* HIỂN THỊ THÔNG BÁO LỖI NẾU CÓ */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-xs font-semibold flex items-start gap-2.5 animate-in fade-in duration-200">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* CHIA FORM LÀM 2 CỘT NẰM NGANG TRÊN MÀN HÌNH LỚN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* THÔNG TIN CHỦ CỬA HÀNG (CỘT TRÁI) */}
            <div className="space-y-3.5">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">1. Thông tin người đại diện</div>
              
              {/* Họ tên */}
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-700 block">Họ và tên chủ sở hữu <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none"><User size={14} /></span>
                  <input type="text" name="merchantName" value={formData.merchantName} onChange={handleInputChange} placeholder="Nguyễn Văn A" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 h-10 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all" />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-700 block">Email liên hệ hệ thống <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none"><Mail size={14} /></span>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="doitac@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 h-10 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all" />
                </div>
              </div>

              {/* Điện thoại */}
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-700 block">Số điện thoại kinh doanh <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none"><Phone size={14} /></span>
                  <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Số điện thoại gọi hỗ trợ" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 h-10 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all" />
                </div>
              </div>
            </div>

            {/* THÔNG TIN DOANH NGHIỆP / CỬA HÀNG (CỘT PHẢI) */}
            <div className="space-y-3.5">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">2. Thông tin gian hàng kinh doanh</div>
              
              {/* Tên cửa hàng */}
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-700 block">Tên hiển thị cửa hàng <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none"><Store size={14} /></span>
                  <input type="text" name="storeName" value={formData.storeName} onChange={handleInputChange} placeholder="Ví dụ: Tech Tonic Da Nang" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 h-10 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all" />
                </div>
              </div>

              {/* Mã số thuế */}
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-700 block">Mã số thuế (Nếu có)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none"><FileText size={14} /></span>
                  <input type="text" name="taxCode" value={formData.taxCode} onChange={handleInputChange} placeholder="Mã số thuế doanh nghiệp hoặc hộ kinh doanh" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 h-10 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all" />
                </div>
              </div>

              {/* Địa chỉ cửa hàng */}
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-700 block">Địa chỉ đặt kho / cửa hàng <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none"><MapPin size={14} /></span>
                  <input type="text" name="storeAddress" value={formData.storeAddress} onChange={handleInputChange} placeholder="Số nhà, Tên đường, Quận/Huyện, Tỉnh thành" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 h-10 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all" />
                </div>
              </div>
            </div>

          </div>

          {/* PHÂN ĐOẠN KHỞI TẠO MẬT KHẨU */}
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1 pt-2">3. Thiết lập bảo mật tài khoản</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-700 block">Mật khẩu tài khoản <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none"><Lock size={14} /></span>
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange} placeholder="Tối thiểu 6 ký tự" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 h-10 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer">{showPassword ? <EyeOff size={14} /> : <Eye size={14} />}</button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-slate-700 block">Xác nhận lại mật khẩu <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none"><Lock size={14} /></span>
                <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Nhập lại chính xác mật khẩu" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 h-10 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer">{showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}</button>
              </div>
            </div>
          </div>

          {/* CHECKBOX CAM KẾT ĐIỀU KHOẢN */}
          <div className="flex items-start gap-2.5 pt-2">
            <input 
              type="checkbox" 
              id="agreeMerchantTerms" 
              name="agreeMerchantTerms" 
              checked={formData.agreeMerchantTerms} 
              onChange={handleInputChange} 
              className="mt-0.5 w-4 h-4 text-blue-600 bg-slate-50 border-slate-300 rounded-md focus:ring-blue-500 focus:ring-2 cursor-pointer" 
            />
            <label htmlFor="agreeMerchantTerms" className="text-[11px] font-medium text-slate-400 leading-normal select-none">
              Tôi cam kết cung cấp thông tin kinh doanh chính xác và hoàn toàn tuân thủ <span className="text-blue-600 font-bold hover:underline cursor-pointer">Chính sách dành cho người bán hàng</span>, quy định đối soát doanh thu và các điều khoản pháp lý của sàn thương mại.
            </label>
          </div>

          {/* NÚT THỰC HIỆN ĐĂNG KÝ */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs font-medium text-slate-400 order-2 sm:order-1">
              Bạn đã có tài khoản bán hàng?{' '}
              <Link to="/dang-nhap" className="text-blue-600 font-bold hover:underline cursor-pointer">
                Đăng nhập hệ thống
              </Link>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold h-11 px-6 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 order-1 sm:order-2 select-none ${isLoading ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Gửi hồ sơ đăng ký cửa hàng</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>

        </form>

        {/* FOOTER AN TOÀN */}
        <div className="mt-auto px-6 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Hệ thống bảo vệ dữ liệu đối tác thương mại</span>
        </div>

      </div>
    </div>
  );
}