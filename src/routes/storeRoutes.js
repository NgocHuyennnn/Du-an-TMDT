import ProductManagement from "@/components/manager/ProductManagement";
import ProductDetail from "@/components/manager/ProductDetail";
import ProductForm from "@/components/manager/ProductForm";

import CreateStore from "@/components/manager/CreateStore";
import EditStore from "@/components/manager/EditStore";

import StoreDetail from "@/components/manager/StoreDetail";
import StoreManagement from "@/components/manager/StoreManagement";

import CustomersPage from "@/pages/CustomersPage";
import DashboardPage from "@/pages/DashboargPage";
import OrdersPage from "@/pages/OrdersPage";
import ReportsPage from "@/pages/ReportsPage";
import TKManager from "@/pages/TKManager";
import CategoriesManagement from "@/pages/CategoriesMangement";


export const publicRoutes = [
  {
    path: "/stores",
    component: StoreManagement,
  },
  {
    path: "/stores/create",
    component: CreateStore,
  },
  {
    path: "/stores/edit/:id",
    component: EditStore,
  },
  {
    path: "/stores/:id",
    component: StoreDetail,
  },


  // ===== PRODUCT =====

  {
    path: "/products",
    component: ProductManagement,
  },

  // tạo sản phẩm
  {
    path: "/products/create",
    component: ProductForm,
  },

  // chi tiết sản phẩm
  {
    path: "/products/:id",
    component: ProductDetail,
  },

  // chỉnh sửa sản phẩm
  {
    path: "/products/edit/:id",
    component: ProductForm,
  },


  {
    path: "/tongquat",
    component: DashboardPage,
  },

  {
    path: "/orders",
    component: OrdersPage,
  },

  {
    path: "/customers",
    component: CustomersPage,
  },

  {
    path: "/reports",
    component: ReportsPage,
  },
  {
    path: "/accounts",
    component: TKManager,
  },
  {
    path: "/categories",
    component: CategoriesManagement,
  },
];


export const privateRoutes = [
];
