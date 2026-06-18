import { AlertCircle } from 'lucide-react';

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel,
  variant = 'warning',
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  const colors = {
    danger: {
      icon: 'bg-red-50 text-red-500',
      confirm: 'bg-red-500 hover:bg-red-600',
    },
    warning: {
      icon: 'bg-amber-50 text-amber-500',
      confirm: 'bg-gray-900 hover:bg-gray-800',
    },
    info: {
      icon: 'bg-blue-50 text-blue-500',
      confirm: 'bg-blue-500 hover:bg-blue-600',
    },
  };

  const c = colors[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className={`w-14 h-14 ${c.icon} rounded-full flex items-center justify-center mb-4`}>
              <AlertCircle size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">{message}</p>
            <div className="flex gap-3 w-full">
              <button
                onClick={onCancel}
                className="flex-1 px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                className={`flex-1 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-colors ${c.confirm}`}
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
