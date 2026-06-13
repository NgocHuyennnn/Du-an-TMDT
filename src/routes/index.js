// src/routes/index.js
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import Dangki from '../pages/Dangki';
import HomePage1 from '../pages/HomePage1';
import QuenMK from '../pages/QuenMK';
import NhapOTP from '../pages/NhapOTP';
import DoiMK from '../pages/DoiMK';
import GioHang from '../pages/GioHang';

export const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/dangki', component: Dangki },
    { path: '/page1', component: HomePage1 },
    { path: '/quen-mat-khau', component: QuenMK },
    { path: '/nhapOTP', component: NhapOTP },
    { path: '/doi-mat-khau', component: DoiMK },
    { path: '/giohang', component: GioHang },
];

// Danh sách các trang bảo mật, bắt đăng nhập mới xem được (Ví dụ: Admin, Profile)
export const privateRoutes = [
  // { path: '/admin', component: AdminDashboard },
];