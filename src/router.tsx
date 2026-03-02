import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Cart from "./pages/Cart";
import Game from "./pages/Game";
import AllGame from "./pages/AllGame";
import Payment from "./pages/Payment";
import OrderList from "./pages/OrderList";
import CyberpunkCarousel from "./component/transaksi/CyberpunkCarousel";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
//admin
import Dashboard from "./pages/admin/Dashboard";
import CreateProduct from "./pages/admin/products/CreateProduct";
import ProductList from "./pages/admin/products/ProductList";
import ProductEdit from "./pages/admin/products/EditProduct";
import GameList from "./pages/admin/games/GameList";
import CreateGame from "./pages/admin/games/CreateGame";
import GameEdit from "./pages/admin/games/EditGame";

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
              <Route path="/admin/game" element={<GameList />} />
              <Route path="/admin/game/create" element={<CreateGame />} />
              <Route path="/admin/game/edit/:id" element={<GameEdit />} />
              <Route path="/admin/products" element={<ProductList />} />
              <Route path="/admin/product/create" element={<CreateProduct />} />
              <Route path="/admin/product/edit/:id" element={<ProductEdit />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
