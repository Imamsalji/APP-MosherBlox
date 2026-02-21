import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Cart from "./pages/Cart";
import Game from "./pages/Game";
import AllGame from "./pages/AllGame";
import Payment from "./pages/Payment";
import OrderList from "./pages/OrderList";
import Dashboard from "./pages/admin/Dashboard";
import CyberpunkCarousel from "./component/transaksi/CyberpunkCarousel";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/game" element={<AllGame />} />
            <Route path="/detail-game/:slug" element={<Game />} />
            <Route path="/carts" element={<Cart />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/list-order" element={<OrderList />} />
            <Route path="/tes" element={<CyberpunkCarousel />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/orders" element={<AllGame />} />
              <Route path="/admin/products" element={<AllGame />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
