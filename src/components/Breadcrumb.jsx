export default function Breadcrumb({ items }) {
  return (
    <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span>/</span>}
          {item.href ? (
            <a href={item.href} className="hover:text-blue-600">{item.label}</a>
          ) : (
            <span className="text-gray-800 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
