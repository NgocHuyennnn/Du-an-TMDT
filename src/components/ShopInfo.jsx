export default function ShopInfo({ shop }) {
  return (
    <div className="bg-white rounded-lg p-4 mb-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-sm">{shop.name}</p>
          <p className="text-xs text-gray-500">{shop.lastOnline}</p>
          <div className="flex gap-2 mt-1">
            <button className="text-xs border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">CHAT NGAY</button>
            <button className="text-xs border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">XEM SHOP</button>
          </div>
        </div>
      </div>

      <div className="flex gap-8 text-center">
        {shop.stats.map(({ value, label }) => (
          <div key={label}>
            <p className="font-bold text-blue-600">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
