export default function SimilarProducts({ products }) {
  return (
    <div className="bg-white rounded-lg p-5 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 border-b pb-2">
        <h2 className="font-bold text-base uppercase tracking-wide">Sản phẩm tương tự</h2>
        <a href="#" className="text-xs text-blue-600 hover:underline">XEM TẤT CẢ</a>
      </div>

      <div className="grid grid-cols-6 gap-3">
        {products.map((p, i) => (
          <div key={i} className="cursor-pointer group">
            <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-xs text-gray-700 font-medium leading-tight group-hover:text-blue-600 line-clamp-2">
              {p.name}
            </p>
            <p className="text-xs text-red-500 font-bold mt-1">{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
