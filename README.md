# Dự án Thương mại điện tử TECHTONIC
Dự án hướng đến việc xây dựng một nền tảng thương mại điện tử hỗ trợ quy trình mua sắm trực tuyến từ khâu quản lý sản phẩm đến trải nghiệm thanh toán. Hệ thống được thiết kế theo mô hình đa người dùng (Multi-role), tập trung vào hiệu năng cao, trải nghiệm người dùng mượt mà và khả năng mở rộng trong tương lai.
Sàn thương mại điện tử làm đồ án nhóm, chia theo 3 nhóm người dùng chính: người mua, người quản lý cửa hàng và admin hệ thống. Phần này là frontend, viết bằng React + Vite, giao diện dựng bằng Tailwind CSS và shadcn/ui, dữ liệu lấy từ backend thật qua REST API (một vài màn còn dùng data giả để dựng UI trước khi API xong).
 
Repo gốc: https://github.com/NgocHuyennnn/Du-an-TMDT
 
## Mục lục
- [Yêu cầu môi trường](#Cài-đặt-và-chạy-dự-án)
- [Cài đặt và chạy](#bắt-đầu-nhanh)
- [Stack đang dùng](#stack-đang-dùng)
- [Phân quyền người dùng](#Phân-quyền-người-dùng)
- [Cấu trúc code](#cấu-trúc-code)
- [Route](#route)
- [Cách xử lý đăng nhập](#cách-xử-lý-đăng-nhập)
- [Dữ liệu mock](#dữ-liệu-mock)
- [Lint & build](#lint--build)
- [Deploy](#deploy)
- [Việc chưa hoàn thành](#việc-chưa-hoàn-thành)

## Yêu cầu môi trường
 
- Node.js 20 trở lên
- npm 10 trở lên
- Có kết nối mạng khi chạy dev (font chữ và icon Material Symbols được load qua Google Fonts CDN, không phải file local)
Kiểm tra phiên bản đang có:
 
```bash
node -v
npm -v
```
## Cài đặt và chạy dự án
 
### 1. Clone repository
git clone https://github.com/NgocHuyennnn/Du-an-TMDT.git
cd Du-an-TMDT

### 2. Cài đặt các thư viện phụ thuộc
npm install

### 3. Cài đặt các thư viện cho tính năng Chat (Socket.IO)
npm install socket.io-client

### 4. Khởi chạy môi trường phát triển
npm run dev
 
App chạy ở `http://localhost:5173` (cổng mặc định của Vite).

## Stack đang dùng
 
| Nhóm | Công nghệ |
|---|---|
| Framework | React 19, Vite 8 |
| Routing | React Router v7 (`react-router` + `react-router-dom`) |
| Style | Tailwind CSS v4, shadcn/ui (style `radix-nova`), Radix UI, lucide-react |
| State / data | Redux Toolkit + react-redux, TanStack React Query |
| Gọi API | Axios (có interceptor gắn token) |
| Realtime | Socket.IO client (cho phần chat) |
| Khác | sonner (toast), clsx, tailwind-merge, class-variance-authority |
| Dev tooling | ESLint (flat config), `@vitejs/plugin-react` |
 
Không dùng TypeScript, không dùng Bootstrap/MUI/Ant Design.

 
## Phân quyền người dùng
### Customer
- Duyệt trang chủ, danh mục nổi bật, sản phẩm nổi bật, sản phẩm đề xuất
- Xem danh sách cửa hàng và chi tiết cửa hàng
- Xem chi tiết sản phẩm: ảnh, mô tả, thông số, đánh giá, sản phẩm tương tự
- Giỏ hàng → thanh toán → theo dõi đơn hàng
- Đánh giá sản phẩm đã mua
- Chat trực tiếp với cửa hàng
- Đăng ký / đăng nhập / quên mật khẩu / xác thực OTP / đặt lại mật khẩu
- Quản lý thông tin tài khoản cá nhân
### Manager
- Dashboard riêng cho cửa hàng
- CRUD sản phẩm, xem chi tiết sản phẩm
- Quản lý danh mục sản phẩm của cửa hàng
- Xử lý đơn hàng
- Xem danh sách khách hàng, xem báo cáo
- Tạo/sửa/xem chi tiết cửa hàng, tạm ngưng cửa hàng
- Quản lý tài khoản nhân sự trong cửa hàng
- Chat với khách hàng
### Admin hệ thống
- Quản lý cửa hàng toàn sàn (danh sách, chi tiết, tạo mới)
- Quản lý danh mục sản phẩm cấp hệ thống
- Phân quyền: danh sách vai trò, thêm/sửa/xem chi tiết vai trò
- Quản lý danh sách tài khoản người dùng
- Xem báo cáo và doanh thu toàn sàn
- Xác thực (verify) các yêu cầu liên quan tài khoản/cửa hàng
### Đăng ký tài khoản Manager

Hệ thống hỗ trợ người dùng đăng ký trực tiếp tài khoản Manager thông qua trang đăng kí bán hàng.
    -  Hệ thống tạo tài khoản Manager.
    -  Người dùng đăng nhập và sử dụng ngay các chức năng quản lý cửa hàng.
## Cấu trúc code
 
```txt
src/
├── api/          gọi API: product, cart, order, shop, chat
├── components/   component dùng chung
│   ├── ui/       component shadcn/ui (button, card, dialog, pagination...)
│   ├── admin/    component riêng cho khu vực admin (layout, chart, modal...)
│   └── manager/  component riêng cho khu vực quản lý cửa hàng
├── pages/        trang theo từng chức năng
│   ├── admin/    trang admin (báo cáo, danh mục, cửa hàng, vai trò...)
│   └── manager/  trang quản lý cửa hàng (dashboard, đơn hàng, khách hàng...)
├── QLTKhoan/     module quản lý tài khoản & phân quyền
├── DonHang/      module danh sách đơn hàng
├── data/         mock data cho vài màn chưa nối API thật
├── lib/          axios instance dùng chung (axios.js) + hàm tiện ích (utils.js)
├── assets/       ảnh, hình minh hoạ dùng trong trang
├── routes/       khai báo route: index.js + storeRoutes.js
├── App.jsx       ghép các nhóm route + layout
└── main.jsx      điểm khởi chạy ứng dụng (render App vào #root)
```
 
Các file cấu hình ở thư mục gốc:
 
```txt
vite.config.js       cấu hình Vite, plugin Tailwind, alias "@" trỏ vào src
tailwind.config.js   cấu hình Tailwind CSS
components.json      cấu hình shadcn/ui (style, base color, icon library, alias)
jsconfig.json         hỗ trợ resolve alias "@" cho editor/IDE
eslint.config.js     cấu hình ESLint (flat config, có react-hooks + react-refresh)
index.html           HTML gốc, chứa favicon và mount point #root
public/              favicon.svg, icons.svg (sprite icon dùng trong UI)
.env                 biến môi trường (VITE_API_BASE_URL)
```
 

Alias `@` trỏ tới thư mục `src` (khai báo trong `vite.config.js` và `jsconfig.json`) — nên import kiểu `@/components/...` thay vì chuỗi `../../../` dài dòng. Tuy nhiên trong code hiện tại có chỗ dùng alias, có chỗ vẫn dùng đường dẫn tương đối (ví dụ `src/routes/index.js`), nên khi thêm code mới nên ưu tiên dùng alias cho nhất quán.
 
## Route
 
Route được khai báo ở hai nơi rồi gộp lại trong `App.jsx`:
- `src/routes/index.js` — các trang không dùng layout riêng: public, auth, giỏ hàng, đơn hàng, quản lý tài khoản, và một phần trang admin (cửa hàng, danh mục, vai trò, báo cáo, doanh thu)
- `src/routes/storeRoutes.js` — các trang dùng chung `ManagerLayout`: dashboard, sản phẩm, cửa hàng, đơn hàng, khách hàng, báo cáo, tài khoản, danh mục (phía quản lý cửa hàng)
Một số route đáng chú ý:
 
```txt
/                          trang chủ
/login, /dangki            đăng nhập / đăng ký
/quen-mat-khau, /nhapOTP   quên mật khẩu, nhập OTP
/doi-mat-khau, /reset-password  đổi / đặt lại mật khẩu
/verify                    xác thực tài khoản
/chitietsanpham/:id        chi tiết sản phẩm
/giohang, /thanhtoan       giỏ hàng, thanh toán
/donhang, /danhgia         đơn hàng, đánh giá sản phẩm (khách)
/chatkhach                 chat với cửa hàng (khách)
/tkcnhan                   thông tin tài khoản cá nhân
/dstkhoan, /dktkhoan       danh sách tài khoản, đăng ký tài khoản
/phanquyen, /roles         phân quyền, danh sách vai trò
/roles/add, /roles/edit/:id, /roles/detail/:id   thêm / sửa / xem chi tiết vai trò
/cuahang, /cuahang/:id     cửa hàng, chi tiết cửa hàng (phía admin)
/cuahang/create, /cuahang/edit/:id   tạo / sửa cửa hàng
/danhmuc                   quản lý danh mục (admin)
/baocao, /doanhthu         báo cáo, doanh thu (admin)
/tongquat                  dashboard quản lý cửa hàng (manager)
/stores, /stores/:id       quản lý cửa hàng (manager)
/products, /products/:id   quản lý sản phẩm (manager)
/orders, /customers        đơn hàng, khách hàng (manager)
/reports, /accounts        báo cáo, tài khoản (manager)
/categories                danh mục (manager)
/dsdhang                   danh sách đơn hàng (module DonHang riêng)
/chat                      chat với khách (manager)
```
 
## Cách xử lý đăng nhập
 
- Token lưu ở `localStorage` với key `access_token`, thông tin user lưu ở key `user`.
- Axios interceptor (trong `src/lib/axios.js`) tự gắn `Authorization: Bearer <token>` vào mọi request nếu có token.
- Nếu backend trả về `401`: interceptor xoá `access_token` và `user` khỏi `localStorage`, bắn sự kiện `auth-change` (để các component khác có thể lắng nghe và cập nhật UI), rồi điều hướng cứng về `/login` bằng `window.location.href`.
- Response interceptor trả thẳng `response.data`, nên ở phía gọi API không cần viết `res.data.data` nhiều lần.
- Vì `privateRoutes` đang rỗng (xem phần Route), việc "đăng nhập mới xem được" hiện chỉ có ý nghĩa ở tầng gọi API (API tự trả lỗi 401 nếu thiếu quyền) chứ chưa chặn được ở tầng giao diện.

## Dữ liệu mock
 
Một số màn hình đang dùng dữ liệu giả thay vì gọi API thật, nằm ở `src/data/`:
 
| File | Dùng cho |
|---|---|
| `mockDataCH.js` | Danh sách cửa hàng, thống kê cửa hàng (phía admin) |
| `mockDataAd.js` | Vai trò, phân quyền (phía admin) |
| `productData.js` | Dữ liệu sản phẩm mẫu |
 
Đây là các phần cần thay bằng API thật khi backend hoàn thiện endpoint tương ứng — xem thêm ở [Việc còn để đó](#việc-còn-để-đó).
 
## Lint & build
 
```bash
npm run lint      # kiểm tra code bằng ESLint
npm run build     # build production, output ra thư mục dist/
npm run preview   # chạy thử bản build production
```
 
Trên Windows nếu PowerShell chặn không cho chạy `npm.ps1`, dùng bản `.cmd` thay thế:
 
```bash
npm.cmd run lint
npm.cmd run build
```
 
## Deploy
 
Backend demo hiện host tại `https://tmdt-backend-ego0.onrender.com` (Render, tier free — request đầu tiên sau một thời gian không hoạt động có thể chậm vài giây do server "ngủ đông"). Frontend chưa cấu hình sẵn nơi deploy cụ thể trong repo; có thể build bằng `npm run build` rồi deploy thư mục `dist/` lên các dịch vụ static hosting như Vercel, Netlify, hoặc GitHub Pages. Nhớ cấu hình biến môi trường `VITE_API_BASE_URL` (và sửa domain hardcode nếu có) tương ứng với nơi deploy.
 
## Việc chưa hoàn thành
 
- Đồng bộ base URL: `.env` có `VITE_API_BASE_URL` nhưng `src/lib/axios.js` và `src/api/ProductApi.js` đang hardcode domain, không đọc từ biến này.
- Gộp bớt route trùng nhau phát sinh khi merge nhiều nhánh của các thành viên.
- Thay dần mock data trong `src/data/` bằng dữ liệu thật từ API khi backend xong endpoint tương ứng.
- Bổ sung `ProtectedRoute` để chặn truy cập theo trạng thái đăng nhập/vai trò (hiện `privateRoutes` ở cả hai file route đều rỗng).
- Cân nhắc host font/icon (Hanken Grotesk, Material Symbols) dạng local thay vì phụ thuộc Google Fonts CDN, để không lệ thuộc mạng khi build/chạy.
- Viết thêm test tự động nếu đồ án yêu cầu.
- Dọn lại chỗ import lẫn lộn giữa alias `@` và đường dẫn tương đối cho nhất quán.
