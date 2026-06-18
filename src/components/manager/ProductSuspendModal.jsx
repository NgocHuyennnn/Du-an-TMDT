import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

const reasons = [
  'Vì đã bán hết hoặc thiếu hàng tồn kho.',
  'Vì sản phẩm cần được cập nhật thông tin.',
  'Vì sản phẩm vi phạm chính sách nền tảng.',
  'Vì sản phẩm đang trong giai đoạn kiểm tra chất lượng.',
];

export default function ProductSuspendModal({ product, onClose, onConfirm }) {
  const [selected, setSelected] = useState([]);

  if (!product) return null;

  function toggle(r) {
    setSelected((prev) => prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-start gap-4 px-6 pt-6 pb-5">
          <div className="w-10 h-10 shrink-0 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-center">
            <AlertTriangle size={18} className="text-rose-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-bold text-slate-800">Đình chỉ sản phẩm?</h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Điều này sẽ ẩn sản phẩm khỏi tất cả cửa hàng ngay lập tức và dừng các đơn hàng đang hoạt động.
            </p>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* Reasons */}
        <div className="px-6 pb-5 space-y-2">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Lý do đình chỉ</p>
          {reasons.map((r) => (
            <label key={r} className="flex items-start gap-3 cursor-pointer group">
              <div
                onClick={() => toggle(r)}
                className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                  selected.includes(r) ? 'bg-slate-900 border-slate-900' : 'border-slate-300 group-hover:border-slate-500'
                }`}
              >
                {selected.includes(r) && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                    <path d="M2 5l2.5 2.5 3.5-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-xs text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">{r}</span>
            </label>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-6 py-4 flex flex-col gap-2">
          <button
            onClick={() => { onConfirm(product, selected); onClose(); }}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-700 text-white text-sm font-bold rounded-xl transition-colors"
          >
            XÁC NHẬN ĐÌNH CHỈ
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-semibold rounded-xl transition-colors"
          >
            HUỶ VÀ GIỮ HOẠT ĐỘNG
          </button>
        </div>
      </div>
    </div>
  );
}
