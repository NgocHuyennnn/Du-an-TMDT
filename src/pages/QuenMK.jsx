import  { useState } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import loginBanner from '../assets/nen.png'; 
import axios from "axios";
export default function QuenMK() {
  const [accountInfo, setAccountInfo] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
const type = location.state?.type || "forgot";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!accountInfo) {
        alert("Vui lòng nhập email");
        return;
    }

    try {

        let res;

        // ==========================
        // ĐĂNG KÝ
        // ==========================
        if (type === "register") {

            res = await axios.post(
                "https://tmdt-backend-ego0.onrender.com/api/auth/register/request-otp",
                {
                    email: accountInfo
                }
            );

            alert("OTP đã được gửi về email");

            navigate("/nhapOTP", {
                state: {
                    type: "register",
                    email: accountInfo,
                    step1Token: res.data.data.step1_token
                }
            });

            return;
        }

        // ==========================
        // QUÊN MẬT KHẨU
        // ==========================

        res = await axios.post(
            "https://tmdt-backend-ego0.onrender.com/api/auth/forgot-password",
            {
                email: accountInfo
            }
        );

        localStorage.setItem(
            "user_reset_email",
            accountInfo
        );

        alert("OTP đã được gửi về email");

        navigate("/nhapOTP", {
            state: {
                type: "forgot",
                email: accountInfo
            }
        });

    } catch (err) {

        console.log(err.response?.data);

        alert(
            err.response?.data?.message ||
            "Không gửi được OTP"
        );

    }  finally {

    setLoading(false);
};}

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
  <h1 className="text-[26px] font-semibold text-gray-900 mb-2 tracking-tight font-sans">
    {type === "register" ? "Đăng ký tài khoản" : "Quên mật khẩu"}
  </h1>

  <p className="text-gray-500 text-sm leading-relaxed">
    {type === "register"
      ? "Nhập email để nhận mã OTP xác thực tài khoản."
      : "Nhập email đã đăng ký để nhận mã OTP đặt lại mật khẩu."}
  </p>
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

            <button
    type="submit"
    disabled={loading}
    className="w-full bg-blue-600 text-white h-12 rounded-xl font-bold disabled:bg-gray-400"
>
    {loading
        ? "Đang gửi..."
        : type === "register"
            ? "Tiếp tục"
            : "Gửi mã OTP"}
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