import { useState } from 'react';
import { X, AlertTriangle, ChevronDown } from 'lucide-react';
import { suspendReasons } from '@/data/mockDataCH';


export default function SuspendModal({ store, onClose, onConfirm }) {
  const [reason, setReason] = useState('Bảo trì kho hàng');
  const [note, setNote] = useState('');

  if (!store) return null;

  function handleConfirm() {
    onConfirm(store, reason, note);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5">
          <h2 className="text-base font-bold text-slate-800">Xác nhận đình chỉ cửa hàng</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-5">
          {/* Warning block */}
          <div className="flex items-start gap-4 border border-rose-200 bg-rose-50 rounded-xl p-4">
            <div className="w-10 h-10 shrink-0 border-2 border-rose-300 rounded-xl flex items-center justify-center bg-white">
              <AlertTriangle size={18} className="text-rose-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                Đang đình chỉ &ldquo;{store.name}&rdquo;
              </p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Hành động này sẽ vô hiệu hóa ngay lập tức tất cả các hệ thống điểm bán hàng và đặt hàng trực tuyến cho địa điểm này. Nhân viên sẽ bị đăng xuất và không thể truy cập lại cho đến khi cửa hàng được kích hoạt lại.
              </p>
            </div>
          </div>

          {/* Reason dropdown */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
              Lý do đình chỉ
            </label>
            <div className="relative">
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full appearance-none px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all cursor-pointer pr-9"
              >
                {suspendReasons.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Note textarea */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
              Ghi chú nội bộ{' '}
              <span className="normal-case font-normal text-slate-400">(tuỳ chọn)</span>
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Cung cấp thêm bối cảnh cho nhật ký quản lý..."
              rows={3}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-700 text-white text-sm font-bold rounded-xl transition-colors"
          >
            Xác nhận đình chỉ
          </button>
        </div>
      </div>
    </div>
  );
}
