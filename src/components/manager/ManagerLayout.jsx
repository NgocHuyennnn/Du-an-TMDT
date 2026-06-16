import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function ManagerLayout() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}