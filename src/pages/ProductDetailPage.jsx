import { useParams } from "react-router-dom";
import { allProducts } from "../data/productData";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import ShopInfo from "../components/ShopInfo";
import ProductSpecs from "../components/ProductSpecs";
import ProductDescription from "../components/ProductDescription";
import ProductReviews from "../components/ProductReviews";
import SimilarProducts from "../components/SimilarProducts";
// MAI MỐT CÓ API THẬT THÌ ĐỔI 
export default function ProductDetailPage() {
  const { id } = useParams();
  const data = allProducts.find((item) => item.id === Number(id));

  if (!data) return <div className="p-10 text-center text-lg">Sản phẩm không tồn tại!</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-sm text-gray-800">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Breadcrumb items={data.breadcrumbs} />
        <div className="bg-white rounded-lg p-5 mb-4 flex gap-6 shadow-sm">
          <ProductGallery thumbnails={[data.product.image]} />
          <ProductInfo product={data.product} />
        </div>
        <ShopInfo shop={data.shop} />
        <ProductSpecs specs={data.specs} />
        <ProductDescription paragraphs={data.description} />
        <ProductReviews rating={data.product.rating} totalReviews={data.product.reviewsCount} reviews={data.reviews} />
        <SimilarProducts products={data.similarProducts} />
      </div>
      <Footer />
    </div>
  );
}