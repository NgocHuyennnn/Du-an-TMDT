import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import Header from "@/components/Header1";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import RecommendedSection from "@/components/RecommendedSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans antialiased text-gray-900">
      {/* Thanh Header trên cùng */}
      <Header />
      
      {/* Thanh điều hướng menu */}
      <NavBar />
      
      {/* Phần thân chính của trang chủ */}
      <main className="flex-1">
        {/* Banner chính và danh mục bên cạnh */}
        <HeroSection />
        
        {/* Các danh mục nổi bật */}
        <FeaturedCategories />
        
        {/* Các sản phẩm bán chạy */}
        <FeaturedProducts />
        
        {/* Lưới sản phẩm gợi ý */}
        <RecommendedSection />
      </main>
      
      {/* Chân trang */}
      <Footer />
    </div>
  );
}