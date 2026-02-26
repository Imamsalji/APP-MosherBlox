import { useAuthStore } from "../store/auth";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
  const { user } = useAuthStore();

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;
