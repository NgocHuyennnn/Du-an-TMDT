import  { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag, Home, Users, ClipboardList, Settings, HelpCircle,
  User, Mail, Phone,
  ShieldCheck, Camera, Save, Award, LogOut, X,
  UserPlus
} from 'lucide-react';


import hinhNenTechTonic from '../assets/nen.png';


export default function TaiKhoanCaNhan() {
  const navigate = useNavigate();


  // 1. ĐÃ SỬA: Lấy tên từ localStorage để đồng bộ với Header, nếu không có mới dùng tên mặc định
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isManager = currentUser?.rolename === "Manager";

const [profileData, setProfileData] = useState({
  fullName: currentUser?.fullname || "",
  email: currentUser?.email || "",
  phone: currentUser?.phone || "",
  gender: currentUser?.gender || "",
  birthday: currentUser?.birthday || "",
});


  const [isSaving, setIsSaving] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });


  // 2. ĐÃ THÊM: Lắng nghe thay đổi từ hệ thống (Nếu bấm thoát từ Header, trang này tự cập nhật ngay)
  useEffect(() => {
    const handleAuthChange = () => {
      const user = JSON.parse(localStorage.getItem("user"));


setProfileData(prev => ({
  ...prev,
  fullName: user?.fullname || "",
  email: user?.email || "",
  phone: user?.phone || "",
  gender: user?.gender || "",
  birthday: user?.birthday || "",
 
}));
    };
    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);
// Xử lý khi nhập thông tin
const handleProfileChange = (e) => {
  const { name, value } = e.target;


  setProfileData(prev => ({
    ...prev,
    [name]: value
  }));


  if (msg.text) {
    setMsg({
      type: '',
      text: ''
    });
  }
};
  // Xử lý thay đổi thông tin hồ sơ
  const handleSaveProfile = (e) => {
  e.preventDefault();
  setIsSaving(true);
   
  setTimeout(() => {
    setIsSaving(false);


    const user = JSON.parse(localStorage.getItem("user"));


    const newUser = {
      ...user,
      fullname: profileData.fullName,
      phone: profileData.phone,
      gender: profileData.gender,
      birthday: profileData.birthday
    };


    localStorage.setItem("user", JSON.stringify(newUser));


    window.dispatchEvent(new Event("auth-change"));


    setMsg({
      type: "success",
      text: "Cập nhật thông tin thành công!"
    });


  }, 1500); // 👈 đóng setTimeout
}; // 👈 đóng handleSaveProfile




// Đặt ra ngoài đây
const handleConfirmLogout = () => {
  setIsLogoutModalOpen(false);


  localStorage.removeItem("user");
  localStorage.removeItem("access_token");


  window.dispatchEvent(new Event("auth-change"));


  navigate('/');
};


  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-gray-800 font-sans antialiased relative w-full overflow-hidden">
     
      {/* ==================== 1. SIDEBAR ==================== */}
      <div className="w-60 bg-white border-r border-gray-100 flex flex-col justify-between shrink-0 z-20">
        <div>
          <div className="p-5 border-b border-gray-50 flex items-center gap-1.5 text-blue-600 font-black text-xl tracking-tight">
            <ShoppingBag size={22} className="fill-blue-600/10" />
            <span className="text-base sm:text-xl font-black tracking-tight text-gray-900">TECH</span>
            <span className="text-base sm:text-xl font-black tracking-tight text-blue-600">TONIC</span>
          </div>
          <nav className="p-3 space-y-1">
            <Link to="/" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-all">
              <Home size={16} /> <span>Trang chủ</span>
            </Link>
            <Link to="/tkcnhan" className="flex items-center gap-3 px-3 py-2 text-xs font-black bg-blue-50 text-blue-600 rounded-xl shadow-sm transition-all">
              <Users size={16} /> <span>Tài khoản</span>
            </Link>
           
            <Link to="/donhang" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-all">
              <ClipboardList size={16} /> <span>Đơn hàng</span>
            </Link>
            <Link to="/verify" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-all">
              <ShieldCheck size={16} /> <span>Đổi mật khẩu</span>
            </Link>
            
            {!isManager && (
  <Link
    to="/dktkhoan"
    className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-all"
  >
    <UserPlus size={16} />
    <span>Đăng kí bán hàng</span>
  </Link>
)}
          </nav>
        </div>


        <div className="p-3 border-t border-gray-100 space-y-1">
          <Link to="/cai-dat" className="flex items-center gap-3 px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-blue-600">
            <Settings size={14} /> <span>Cài đặt</span>
          </Link>
          <Link to="/ho-tro" className="flex items-center gap-3 px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-blue-600">
            <HelpCircle size={14} /> <span>Hỗ trợ</span>
          </Link>
         
          <button
            type="button"
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-1.5 text-xs font-bold text-red-400 hover:text-red-600 hover:bg-red-50/50 rounded-lg transition-all border-none bg-transparent text-left cursor-pointer"
          >
            <LogOut size={14} /> <span>Đăng xuất</span>
          </button>
        </div>
      </div>


      {/* ==================== 2. MAIN WORKSPACE CONTENT ==================== */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8 relative overflow-y-auto">
       
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 filter pointer-events-none"
          style={{ backgroundImage: `url(${hinhNenTechTonic})` }}
        ></div>


        <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/40 via-transparent to-blue-50/20 z-0 pointer-events-none"></div>


        {/* MAIN CONTAINER */}
        <div className="max-w-[900px] w-full bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-3 animate-in fade-in zoom-in-95 duration-200">
         
          {/* CỘT TRÁI */}
          <div className="bg-slate-50/70 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-200/60 flex flex-col items-center text-center justify-between">
            <div className="w-full space-y-6">
              <div className="relative w-24 h-24 mx-auto group">
                <div className="w-full h-full rounded-full bg-blue-100 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                  <User size={44} className="text-blue-500" />
                </div>
                <button type="button" className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 shadow-xs cursor-pointer transition-all">
                  <Camera size={12} />
                </button>
              </div>


              <div className="space-y-1.5">
                <h3 className="text-sm font-black text-slate-900">{profileData.fullName}</h3>
                <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-0.5 rounded-full text-[10px] font-bold">
                  <Award size={12} className="fill-amber-500/10" />
                  <span>Khách hàng</span>
                </div>
              </div>


              <div className="bg-white/80 border border-slate-100 rounded-xl p-3 text-left space-y-2 text-[11px]">


            <div className="flex items-center gap-2 text-slate-500">
            <User size={13}/>
                <span>Vai trò:<strong className="text-blue-600">Khách hàng</strong>
                </span>
            </div>


            <div className="flex items-center gap-2 text-slate-500">
                <Mail size={13}/><span>Email:<strong className="text-slate-700">{profileData.email}</strong>
                </span>
            </div>


            </div>
            <div className="mt-8 pt-4 border-t border-slate-200/50 w-full flex items-center justify-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              <ShieldCheck size={13} className="text-emerald-500" />
              <span>Tài khoản đã xác minh</span>
            </div>
          </div>
          </div>


          {/* CỘT PHẢI */}
          <div className="col-span-2 p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="space-y-1">
                <h2 className="text-base font-black text-slate-900 tracking-tight">Chi tiết tài khoản cá nhân</h2>
                <p className="text-xs font-medium text-slate-400">Quản lý thông tin hồ sơ để bảo mật tài khoản.</p>
              </div>


              {msg.text && (
                <div className={`border rounded-xl p-3 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200 ${
                  msg.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${msg.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  <span>{msg.text}</span>
                </div>
              )}


              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">1. Thông tin liên hệ cơ bản</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-700 block">Họ và tên chủ sở hữu</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none"><User size={14} /></span>
                      <input type="text" name="fullName" value={profileData.fullName} onChange={handleProfileChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 h-10 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all" />
                    </div>
                  </div>


                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-700 block">Số điện thoại liên hệ</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none"><Phone size={14} /></span>
                      <input type="text" name="phone" value={profileData.phone} onChange={handleProfileChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 h-10 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all" />
                    </div>
                  </div>


                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-black text-slate-400 block">Email đăng nhập hệ thống (Cố định)</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none"><Mail size={14} /></span>
                      <input type="email" value={profileData.email} disabled className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-4 h-10 text-xs font-medium text-slate-400 cursor-not-allowed select-none" />
                    </div>
                  </div>
                </div>


                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1 pt-1">
  2. Thông tin cá nhân
</div>


<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


{/* Giới tính */}
<div className="space-y-1">
<label className="text-xs font-black text-slate-700 block">
  Giới tính
</label>


<select
 name="gender"
 value={profileData.gender}
 onChange={handleProfileChange}
 className="w-full bg-slate-50 border border-slate-200 rounded-xl h-10 px-3 text-xs"
>
<option value="">Chọn giới tính</option>
<option value="Nam">Nam</option>
<option value="Nữ">Nữ</option>
<option value="Khác">Khác</option>
</select>


</div>




{/* Ngày sinh */}
<div className="space-y-1">
<label className="text-xs font-black text-slate-700 block">
 Ngày sinh
</label>


<input
 type="date"
 name="birthday"
 value={profileData.birthday}
 onChange={handleProfileChange}
 className="w-full bg-slate-50 border border-slate-200 rounded-xl h-10 px-3 text-xs"
/>


</div>


</div>
                <div className="flex justify-end pt-3">
                  
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold h-10 px-5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer select-none"
                  >
                    {isSaving ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Save size={14} />
                        <span>Lưu thay đổi hồ sơ</span>
                      </>
                    )}
                  </button>
                  
                </div>
                
              </form>
            </div>
          </div>


        </div>
      </div>


      {/* ==================== 3. POPUP XÁC NHẬN ĐĂNG XUẤT ==================== */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setIsLogoutModalOpen(false)}
          ></div>
         
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full relative z-10 shadow-xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>


            <div className="text-center space-y-3 mt-2">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 mx-auto font-bold text-xl">
                ⚠️
              </div>
              <h3 className="text-sm font-black text-slate-900 tracking-tight">Xác nhận đăng xuất</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Bạn có chắc chắn muốn đăng xuất khỏi tài khoản quản trị hệ thống hiện tại không?
              </p>
            </div>


            <div className="flex items-center gap-2 mt-6">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 h-9 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="flex-1 h-9 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
   
  );
}
