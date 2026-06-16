export const allProducts = [
  {
    id: 1,
    product: {
      name: "MÁY ẢNH MIRRORLESS RETRO",
      price: 15900000,
      sold: 260,
      stock: 10,
      rating: 4.9,
      reviewsCount: 132,
      variants: ["Bản tiêu chuẩn", "Kèm ống kính", "Combo Deluxe"],
      image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    shop: {
      name: "RETRO CAMERA STORE",
      lastOnline: "Online 2 giờ trước",
      stats: [
        { value: "4.8K", label: "ĐÁNH GIÁ" },
        { value: "190", label: "SẢN PHẨM" },
        { value: "96%", label: "TRẢ PHẢN HỒI" },
      ],
    },
    specs: [
      ["DANH MỤC", "Merchant Console > Thiết bị điện tử > Máy ảnh"],
      ["THƯƠNG HIỆU", "RetroCam"],
      ["LOẠI BẢO HÀNH", "Bảo hành chính hãng"],
      ["HẠN BẢO HÀNH", "12 tháng"],
    ],
    description: [
      "Máy ảnh Mirrorless Retro là sự kết hợp hoàn hảo giữa vẻ đẹp cổ điển và công nghệ hiện đại. Với cảm biến Full-frame thế hệ mới, sản phẩm mang đến chất lượng hình ảnh sắc nét, dải nhạy sáng cao và khả năng lấy nét chủ nhanh.",
      "Thiết kế vỏ kim loại nguyên khối chắc chắn, các nút vận vật lý được thiết kế mạnh lại cảm giác hoài cổ đây cảm hứng cho người sử dụng.",
    ],
    reviews: [
      {
        name: "N***H",
        stars: 5,
        date: "2024-03-11 14:23",
        variant: "Bản tiêu chuẩn",
        content: "Sản phẩm tuyệt vời, đóng gói kỹ càng. Giao hàng nhanh hơn dự kiến. Rất đáng tiền.",
      },
    ],
    similarProducts: [
      { name: "Ống kính Prime 35mm", price: 4200000 },
      { name: "Túi máy ảnh da cừu", price: 850000 },
      { name: "Tripod Carbon siêu nhẹ", price: 2150000 },
    ],
    breadcrumbs: [
      { label: "Trang chủ", href: "/" },
      { label: "Thiết bị điện tử", href: "/category" },
      { label: "Máy ảnh Mirrorless Retro" },
    ],
  },
  // Bạn có thể thêm các sản phẩm khác ở đây với cấu trúc y hệt
];