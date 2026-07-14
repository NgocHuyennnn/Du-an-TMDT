import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Mail } from 'lucide-react';
import loginBanner from '../assets/nen.png'; 
import axios from "axios";
export default function NhapOTP() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(89); 
  const inputRefs = useRef([]);
  
  const location = useLocation();
  const navigate = useNavigate();

  // ĐỒNG BỘ EMAIL CHUẨN: Ưu tiên lấy từ state chuyển trang, nếu không thấy sẽ lấy từ localStorage
  const emailReceived = location.state?.email || localStorage.getItem('user_reset_email') || "";
const type = location.state?.type;
const step1Token = location.state?.step1Token;


  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // SỬA LỖI TRÙNG VÀ KẸT SỐ: Hàm xử lý gõ chuẩn từng ô độc lập
  const handleInputChange = (e, index) => {
    const val = e.target.value;
    
    // Chỉ lấy số, loại bỏ chữ
    const cleanVal = val.replace(/[^0-9]/g, '');
    
    const newOtp = [...otp];
    // Luôn lấy ký tự cuối cùng nếu ô đó đã có sẵn số từ trước
    newOtp[index] = cleanVal ? cleanVal.substring(cleanVal.length - 1) : "";
    setOtp(newOtp);

    // Nếu gõ số vào thành công và chưa đến ô cuối cùng -> Tự động chuyển con trỏ sang ô bên phải
    if (newOtp[index] !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Xử lý nút xóa lùi (Backspace) từng ô một cách chính xác
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // Chặn trình duyệt xử lý lỗi mặc định
      const newOtp = [...otp];

      if (otp[index] !== "") {
        // Nếu ô đang có số -> Xóa số ô này đi và giữ nguyên vị trí chuột
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Nếu ô đang trống -> Xóa số của ô phía trước và nhảy con trỏ về trước
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Hỗ trợ người dùng copy-paste cả chuỗi mã 6 số vào ô đầu tiên
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, '').substring(0, 6);
    if (pastedData.length === 6) {
      setOtp(pastedData.split(""));
      inputRefs.current[5].focus(); // Nhảy về ô cuối cùng sau khi paste xong
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const finalOtp = otp.join("");

  if (type === "register" && !step1Token) {
    alert("Phiên đăng ký đã hết hạn.");
    navigate("/quenmk", {
        state: {
            type: "register"
        }
    });
    return;
}

  if (finalOtp.length !== 6) {
    alert("Vui lòng nhập đủ 6 số OTP!");
    return;
  }

  try {

    // ===== Đăng ký =====
    if (type === "register") {

      const res = await axios.post(
    "https://tmdt-backend-ego0.onrender.com/api/auth/register/verify-otp",
    {
        step1_token: step1Token,
        otp: finalOtp
    }
);

alert("Xác thực OTP thành công");

navigate("/dangki", {
    state: {
        step2Token: res.data.data.step2_token,
        email: emailReceived
    }
});

return;
    }

    // ===== Quên mật khẩu =====
    await axios.post(
      "https://tmdt-backend-ego0.onrender.com/api/auth/verify-otp",
      {
        email: emailReceived,
        otp: finalOtp,
      }
    );

    localStorage.setItem(
      "user_reset_email",
      emailReceived
    );

    alert("Xác nhận OTP thành công");

    navigate("/reset-password", {
      state: {
        email: emailReceived,
        otp: finalOtp,
      },
    });

  } catch (err) {

    console.log(err);

    alert(
      err.response?.data?.message ||
      "OTP không hợp lệ"
    );

  }
};
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 w-full h-full select-none pointer-events-none">
        <img src={loginBanner} alt="Background" className="w-full h-full object-cover opacity-40 filter contrast-[1.05]" />
      </div>

      <div className="relative z-10 bg-white/90 backdrop-blur-lg w-full max-w-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white p-8 sm:p-10 min-h-[580px] flex flex-col justify-between transition-all duration-300">
        <div className="w-full flex flex-col items-center">
          <div className="flex justify-center mb-6">
            <Link to="/" className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-gray-900">TECH</span>
              <span className="text-2xl font-black tracking-tight text-blue-600">TONIC</span>
            </Link>
          </div>

          <span className="text-[11px] font-bold text-gray-400 tracking-widest uppercase self-start mb-4"> Nhập OTP</span>

          <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center mb-5 shadow-sm">
            <Mail size={28} className="text-gray-700" strokeWidth={1.5} />
          </div>

          <div className="text-center mb-6 w-full">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight font-sans">Nhập mã OTP</h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              Mã OTP đã được gửi đến email <br />
              <span className="font-bold text-gray-800 break-all">{emailReceived}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div className="flex justify-between gap-2 my-2" onPaste={handlePaste}>
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={data}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-11 h-12 sm:w-12 border border-gray-300 rounded-lg text-center text-xl font-bold outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-white transition-all text-gray-900"
                />
              ))}
            </div>

            <div className="text-center text-xs text-gray-500 my-3">
              Mã sẽ hết hạn sau: <span className="font-mono font-bold text-gray-800">{formatTime(timeLeft)}</span>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white h-12 rounded-xl font-bold hover:bg-blue-700 active:scale-[0.98] transition-all text-sm shadow-[0_4px_12px_rgba(37,99,235,0.2)] cursor-pointer flex items-center justify-center tracking-wide">
              Xác nhận
            </button>
          </form>

          <div className="text-center mt-5">
            <button 
              type="button"
              onClick={async () => {

  try {
if (type === "register") {

  const res = await axios.post(
    "https://tmdt-backend-ego0.onrender.com/api/auth/register/request-otp",
    {
      email: emailReceived
    }
  );

  alert("Đã gửi lại OTP");
  setTimeLeft(89);

  navigate("/nhapOTP", {
    replace: true,
    state: {
      type: "register",
      email: emailReceived,
      step1Token: res.data.data.step1_token
    }
  });

} else {

      await axios.post(
        "https://tmdt-backend-ego0.onrender.com/api/auth/forgot-password",
        {
          email: emailReceived
        }
      );

    }

    alert("Đã gửi lại OTP");
    setTimeLeft(89);

  } catch (err) {

    alert(
      err.response?.data?.message ||
      "Không thể gửi lại OTP"
    );

  }

}}
              disabled={timeLeft > 0}
              className={`text-xs font-bold underline transition-colors ${timeLeft > 0 ? 'text-gray-300 cursor-not-allowed' : 'text-blue-600 hover:text-blue-700 cursor-pointer'}`}
            >
              Gửi lại mã OTP
            </button>
          </div>
        </div>

        <div className="w-full space-y-4 mt-6">
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