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

import {
  product,
  shop,
  specs,
  description,
  reviews,
  similarProducts,
  breadcrumbs,
} from "../data/productData";

export default function ProductDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-sm text-gray-800">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-4">
        <Breadcrumb items={breadcrumbs} />

        {/* Product main card */}
        <div className="bg-white rounded-lg p-5 mb-4 flex gap-6 shadow-sm">
          <ProductGallery thumbnails={[1, 2, 3]} />
          <ProductInfo product={product} />
        </div>

        <ShopInfo shop={shop} />
        <ProductSpecs specs={specs} />
        <ProductDescription paragraphs={description} />
        <ProductReviews
          rating={product.rating}
          totalReviews={85}
          reviews={reviews}
        />
        <SimilarProducts products={similarProducts} />
      </div>

      <Footer />
    </div>
  );
}
