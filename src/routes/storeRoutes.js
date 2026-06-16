import CreateStore from "@/components/manager/CreateStore";
import EditStore from "@/components/manager/EditStore";
import StoreDetail from "@/components/manager/StoreDetail";
import StoreManagement from "@/components/manager/StoreManagement";

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
  
];