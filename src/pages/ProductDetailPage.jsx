import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
//import ShopInfo from "../components/ShopInfo";
import ProductSpecs from "../components/ProductSpecs";
import ProductDescription from "../components/ProductDescription";
//import ProductReviews from "../components/ProductReviews";
//import SimilarProducts from "../components/SimilarProducts";


export default function ProductDetailPage() {

  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchProductDetail = async () => {

      try {

        const res = await axios.get(
          `https://tmdt-backend-ego0.onrender.com/api/products/${id}`
        );


        console.log("PRODUCT DETAIL:", res.data);


        // BE ông trả dạng success_response
        setData(res.data.data);


      } catch (error) {

        console.log("Lỗi lấy chi tiết sản phẩm:", error);

      } finally {

        setLoading(false);

      }

    };


    fetchProductDetail();


  }, [id]);



  if (loading) {
    return (
      <div className="p-10 text-center text-lg">
        Đang tải sản phẩm...
      </div>
    );
  }



  if (!data) {
    return (
      <div className="p-10 text-center text-lg">
        Sản phẩm không tồn tại!
      </div>
    );
  }



  return (

    <div className="min-h-screen bg-gray-50 font-sans text-sm text-gray-800">


      <Header />


      <div className="max-w-6xl mx-auto px-4 py-4">


        <Breadcrumb 
          items={data.breadcrumbs || []} 
        />



        <div className="bg-white rounded-lg p-5 mb-4 flex gap-6 shadow-sm">


          <ProductGallery
  thumbnails={data.Images || []}
/>

          <ProductInfo
    product={data}
/>


        </div>



        {/* <ShopInfo
          shop={data.shop}
        /> */}



        <ProductSpecs
  specs={data.Specifications || []}
/>



        <ProductDescription
  paragraphs={data.Description}
/>



        {/* <ProductReviews
          rating={data.product?.rating}
          totalReviews={data.product?.reviewsCount}
          reviews={data.reviews}
        /> */}



        {/* <SimilarProducts
          products={data.similarProducts}
        /> */}  


      </div>



      <Footer />


    </div>

  );
}