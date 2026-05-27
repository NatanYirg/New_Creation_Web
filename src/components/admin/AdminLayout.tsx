import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout: React.FC = () => {
  const token = localStorage.getItem("ncic_token");
  if (!token) return <Navigate to="/ncic-admin-panel1/login" replace />;

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
