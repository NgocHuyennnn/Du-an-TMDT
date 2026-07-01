// src/routes/index.js
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import Dangki from '../pages/Dangki';
import HomePage1 from '../pages/HomePage1';
import QuenMK from '../pages/QuenMK';
import NhapOTP from '../pages/NhapOTP';
import DoiMK from '../pages/DoiMK';
import ResetPassword from '../pages/ResetPassword';
import GioHang from '../pages/GioHang';
import ThanhToan from '../pages/ThanhToan';
import Donhang from '../pages/Donhang';
import Danhgia from '../pages/Danhgia';
import DSTKhoan from '../QLTKhoan/DSTKhoan';
import PQuyen from '../QLTKhoan/PQuyen';
import DKTKhoan from '../QLTKhoan/DKTKhoan';
import TKCNhan from '../pages/TKCNhan';
import DSDHang from '../DonHang/DSDHang';
import ChatUser from '../pages/manager/ChatUser';


import ProductDetailPage from '@/pages/ProductDetailPage';


import EditStore from '@/pages/EditStore';
import StoreDetail from '@/pages/StoreDetail';
import RoleList from '@/pages/admin/RoleList';
import RoleAdd from '@/pages/admin/RoleAdd';
import RoleDetail from '@/pages/admin/RoleDetail';
import RoleEdit from '@/pages/admin/RoleEdit';
import Baocao from '@/pages/admin/BaoCao';
import DoanhThu from '@/pages/admin/DoanhThu';
import CuaHang from '@/pages/admin/CuaHang';
import CreateStore from '@/pages/admin/CreateStore';
//import CategoriesAdmin from '@/pages/admin/CategoriesAdmin';
export const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/dangki', component: Dangki },
    { path: '/page1', component: HomePage1 },
    { path: '/quen-mat-khau', component: QuenMK },
    { path: '/nhapOTP', component: NhapOTP },
    { path: '/doi-mat-khau', component: DoiMK },
    { path: '/reset-password', component: ResetPassword },
    { path: '/giohang', component: GioHang },
    { path: '/thanhtoan', component: ThanhToan },
    { path: '/donhang', component: Donhang },
    { path: '/danhgia', component: Danhgia },
    { path: '/dstkhoan', component: DSTKhoan },
    { path: '/phanquyen', component: PQuyen },
    { path: '/dktkhoan', component: DKTKhoan },
    { path: '/tkcnhan', component: TKCNhan },
    { path: '/dsdhang', component: DSDHang },
    { path: '/baocao', component: Baocao },
    { path: '/doanhthu', component: DoanhThu },
    { path: '/chitietsanpham/:id', component: ProductDetailPage },
    { path: '/cuahang', component: CuaHang },
    { path: '/chat', component: ChatUser },
    //{ path: '/danhmuc', component: CategoriesAdmin },
    {
    path: "/roles",
    component: RoleList,
  },
  {
    path: "/roles/add",
    component: RoleAdd,
  },
   {
    path: "/roles/detail/:id",
    component: RoleDetail,
  },
   {
    path: "/roles/edit/:id",
    component: RoleEdit,
  },
  
    {
      path: "/cuahang/create",
      component: CreateStore,
    },
    {
      path: "/cuahang/edit/:id",
      component: EditStore,
    },
    {
      path: "/cuahang/:id",
      component: StoreDetail,
    },
    
];

// Danh sách các trang bảo mật, bắt đăng nhập mới xem được (Ví dụ: Admin, Profile)
export const privateRoutes = [
  // { path: '/admin', component: AdminDashboard },
];