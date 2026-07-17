import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Star, ShoppingCart} from "lucide-react";
import { addToCart } from "@/api/cartApi";
//import { Products } from "@/data/productData";


const PAGE_SIZE = 12;

function formatPrice(price) {
  return Number(price).toLocaleString("vi-VN") + "đ";
}


export default function RecommendedSection() {

const [page,setPage] = useState(1);
const navigate = useNavigate();
const [total,setTotal] = useState(0);
const [products,setProducts] = useState([]);

const [showPopup, setShowPopup] = useState(false);
const [showLoginPopup, setShowLoginPopup] = useState(false);

const handleAddToCart = async (e, product) => {
  e.stopPropagation();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    setShowLoginPopup(true);
    return;
  }

  try {
    await addToCart(product.ProductID, 1);

    window.dispatchEvent(new Event("cartUpdated"));

    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  } catch (err) {
    console.error(err);
    alert("Không thể thêm sản phẩm vào giỏ hàng.");
  }
};
useEffect(()=>{

 async function fetchProducts(){

  try{
    
   const res = await axios.get(
    `https://tmdt-backend-ego0.onrender.com/api/products?page=${page}&limit=12`

   );

   
   setProducts(prev =>
     page === 1 
     ? res.data.data 
     : [...prev, ...res.data.data]
   );
   
   setTotal(res.data.pagination.total_items);


  }catch(err){

   console.log("Lỗi lấy sản phẩm",err);

  }

 }


 fetchProducts();

},[page]);
const displayed = products.slice(
 0,
 PAGE_SIZE * page
);


//const hasMore = products.length < total;
const hasMore = products.length < total;
if(!products.length){
 return (
  <section className="max-w-7xl mx-auto px-4 py-4">
    <div className="bg-white p-5 rounded-xl">
      Đang tải sản phẩm...
    </div>
  </section>
 )
}
const BASE_URL = "https://tmdt-backend-ego0.onrender.com";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-10">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">
            Gợi ý dành cho bạn
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displayed.map((product) => (
           <div
 key={product.ProductID}
 onClick={() =>
   navigate(`/chitietsanpham/${product.ProductID}`)
 }
 className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-blue-200 hover:shadow-lg transition-all duration-200 cursor-pointer"
>
              

              

              <div className="aspect-square bg-gray-50 overflow-hidden">
                <img
  src={
    product.Images?.length
      ? `${BASE_URL}${product.Images[0].ImageURL}`
      : product.PrimaryImage
      ? `${BASE_URL}${product.PrimaryImage}`
      : "https://via.placeholder.com/300"
  }
  alt={product.ProductName}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
/>
              </div>

              {/* Thêm padding-bottom pb-12 để chừa sẵn chỗ trống cố định cho nút Mua trượt lên, không lo bị đè chữ */}
              <div className="p-3 pb-12">
                <p className="text-xs text-gray-700 font-medium line-clamp-2 leading-snug mb-1.5 h-8">
                  {product.ProductName}
                </p>

                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={9}
                        className={
                          i < 5
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-200 fill-gray-200"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400">

                  Đã bán {product.SoldQuantity}

                  </span>
                  
                </div>

                <div>
                  <p className="text-sm font-black text-blue-700">
                    {formatPrice(product.Price)}
                  </p>
                  
                </div>
              </div>

              <div className="p-3 pt-0">
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <ShoppingCart size={12} /> Thêm giỏ hàng 
                </button>
                
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setPage(prev=>prev+1)}
              className="px-10 py-2.5 border-2 border-blue-600 text-blue-600 text-sm font-bold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200 active:scale-95"
            >
              Tải thêm
            </button>
          
          </div>
        )}
        {showPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="bg-black/70 text-white px-8 py-6 rounded-lg flex flex-col items-center gap-3">
      <div className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center text-3xl">
        ✓
      </div>

      <p className="text-sm font-medium">
        Đã thêm vào giỏ hàng
      </p>
    </div>
  </div>
  
)}
{showLoginPopup && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-80 shadow-lg">
      <h3 className="text-lg font-semibold mb-2">
        Yêu cầu đăng nhập
      </h3>

      <p className="text-gray-600 mb-4">
        Vui lòng đăng nhập để tiếp tục mua sắm.
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowLoginPopup(false)}
          className="px-4 py-2 border rounded"
        >
          Hủy
        </button>

        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </section>
  );
}