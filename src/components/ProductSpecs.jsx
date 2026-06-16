export default function ProductSpecs({ specs }) {
  return (
    <div className="bg-white rounded-lg p-5 mb-4 shadow-sm">
      <h2 className="font-bold text-base mb-4 uppercase tracking-wide border-b pb-2">Chi tiết sản phẩm</h2>
      <table className="w-full text-sm">
        <tbody>
          {specs.map(([key, val]) => (
            <tr key={key} className="border-b border-gray-100">
              <td className="py-2.5 pr-6 text-gray-500 font-medium w-40">{key}</td>
              <td className="py-2.5 text-gray-800">{val}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
