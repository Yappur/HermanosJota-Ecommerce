import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./admin-layout.css";
import { useAuth } from "../../../contexts/AuthContext";

const AdminLayout = () => {
  const { user } = useAuth();
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="welcome-banner">
        <h2>¡Bienvenido/a, {user?.nombre || "Administrador"}!</h2>
      </div>

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
