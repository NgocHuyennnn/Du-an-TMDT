export default function ProductDescription({ paragraphs }) {
  const list = Array.isArray(paragraphs)
    ? paragraphs
    : paragraphs
      ? [paragraphs]
      : [];

  return (
    <div className="bg-white rounded-lg p-5 mb-4 shadow-sm">
      <h2 className="font-bold text-base mb-3 uppercase tracking-wide border-b pb-2">
        Mô tả sản phẩm
      </h2>

      <div className="text-sm text-gray-700 leading-relaxed space-y-3">
        {list.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
    </div>
  );
}