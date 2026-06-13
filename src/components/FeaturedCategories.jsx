import { Shirt, Cpu, Home, Dumbbell, BookOpen, Sparkles } from "lucide-react";

const categories = [
  {
    label: "Thời trang",
    icon: Shirt,
    color: "bg-pink-50 text-pink-600 group-hover:bg-pink-100",
    border: "border-pink-100 group-hover:border-pink-300",
  },
  {
    label: "Điện tử",
    icon: Cpu,
    color: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
    border: "border-blue-100 group-hover:border-blue-300",
  },
  {
    label: "Gia dụng",
    icon: Home,
    color: "bg-orange-50 text-orange-600 group-hover:bg-orange-100",
    border: "border-orange-100 group-hover:border-orange-300",
  },
  {
    label: "Thể thao",
    icon: Dumbbell,
    color: "bg-green-50 text-green-600 group-hover:bg-green-100",
    border: "border-green-100 group-hover:border-green-300",
  },
  {
    label: "Sách",
    icon: BookOpen,
    color: "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
    border: "border-amber-100 group-hover:border-amber-300",
  },
  {
    label: "Sắc đẹp",
    icon: Sparkles,
    color: "bg-purple-50 text-purple-600 group-hover:bg-purple-100",
    border: "border-purple-100 group-hover:border-purple-300",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">
            Danh mục nổi bật
          </h2>
          <a
            href="#"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
          >
            Xem tất cả
          </a>
        </div>

        <div className="grid grid-cols-6 gap-4">
          {categories.map(({ label, icon: Icon, color, border }) => (
            <a
              key={label}
              href="#"
              className="group flex flex-col items-center gap-3 cursor-pointer"
            >
              <div
                className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-200 ${color} ${border} group-hover:scale-105 group-hover:shadow-md`}
              >
                <Icon size={26} strokeWidth={1.5} />
              </div>
              <span className="text-xs font-semibold text-gray-700 group-hover:text-blue-700 transition-colors text-center">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
