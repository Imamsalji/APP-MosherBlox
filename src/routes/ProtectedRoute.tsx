import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import ConfirmModal from "../component/Confirm";
import { useAuthStore } from "../store/auth";

export default function ProtectedRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const { isAuthenticated, user, logout } = useAuthStore();

  if (!isAuthenticated) {
    const handleConfirmLogin = () => {
      navigate("/login", {
        state: { from: location.pathname },
        replace: true,
      });
    };

    const handleCancel = () => {
      navigate(-1);
    };

    return (
      <ConfirmModal
        open={open}
        title="Login Diperlukan"
        message="Untuk mengakses halaman ini, silakan login terlebih dahulu."
        onConfirm={handleConfirmLogin}
        onCancel={handleCancel}
      />
    );
  }

  return <Outlet />;
}
