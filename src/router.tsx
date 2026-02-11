import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Cart from "./pages/cart";
import Game from "./pages/Game";
import AllGame from "./pages/AllGame";
import CyberpunkCart from "./component/transaksi/CyberpunkCart";
import CyberpunkPayment from "./component/transaksi/CyberpunkPayment";
import CyberpunkOrderList from "./component/transaksi/CyberpunkOrderList";
import CyberpunkCarousel from "./component/transaksi/CyberpunkCarousel";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import ListOrder from "./pages/ListOrder";

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
            <Route path="/cart" element={<CyberpunkCart />} />
            <Route path="/payment/:id" element={<CyberpunkPayment />} />
            <Route path="/list-order" element={<CyberpunkOrderList />} />
            <Route path="/tes" element={<CyberpunkCarousel />} />
            <Route path="/list-orders" element={<ListOrder />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    );
}
