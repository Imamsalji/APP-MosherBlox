import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import logo from "./../assets/img/logoMosher.jpeg";
import { useAuthStore } from "../store/auth";
import { getCart } from "../api/cart";
import type { CartItem } from "../types/Cart";
import { useAppStore, useNotifStore } from "../store/appStore";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  //   const [cart, setCart] = useState<CartItem[]>([]);
  const setNavCart = useAppStore((s) => s.setCart);
  const titleNavCart = useAppStore((s) => s.cart);
  let listOrder;
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const logout = async () => {
  //     if (!confirm("Yakin mau keluar?")) return;
  //     await api.post(`/logout`);
  //     localStorage.setItem("token", '');
  //     navigate("/");
  const fetchCart = async () => {
    try {
      const data = await getCart();
      //   setCart(data.items);
      if (data.length != 0) {
        setNavCart(data.items.length);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const token = useAuthStore.getState().token;
    if (token) {
      fetchCart();
    }
  }, []);
  let LogContent = (
    <div className="hidden md:flex space-x-4">
      <button
        className="px-4 py-2 text-sm border border-gray-500 rounded-lg"
        onClick={() => navigate("/login")}
      >
        LOG IN
      </button>
      <button
        className="px-4 py-2 text-sm bg-purple-600 rounded-lg"
        onClick={() => navigate("/register")}
      >
        SIGN UP
      </button>
    </div>
  );
  let LogContentMobile = (
    <div className="flex flex-col space-y-2 pt-2">
      <button
        className="w-full px-4 py-2 text-sm border border-gray-500 rounded-lg"
        onClick={() => navigate("/login")}
      >
        LOG IN
      </button>
      <button
        className="w-full px-4 py-2 text-sm bg-purple-600 rounded-lg"
        onClick={() => navigate("/register")}
      >
        SIGN UP
      </button>
    </div>
  );
  const scrollToSection = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();

    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const fLogout = () => {
    useNotifStore.getState().show({
      title: "Konfirmasi Logout",
      message: "Apakah anda yakin ingin keluar?",
      onConfirm: async () => {
        useAuthStore.getState().logout();
        navigate("/");
      },
    });
  };

  if (isAuthenticated) {
    listOrder = (
      <a
        onClick={(e) => {
          navigate("/list-order");
        }}
        className="block hover:text-purple-400"
      >
        Order List
      </a>
    );
    LogContent = (
      <div className="hidden md:flex items-center space-x-4">
        <div className="flex items-center h-10">
          <div id="google_translate_element"></div>
        </div>

        {/* CART */}
        <button
          className="relative px-4 py-2 text-sm border border-gray-500 hover:brightness-125 rounded-lg"
          onClick={() => navigate("/carts")}
        >
          Keranjang
          <span
            className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 
        flex items-center justify-center 
        text-xs font-bold text-white 
        bg-red-600 rounded-full"
          >
            {titleNavCart}
          </span>
        </button>

        {/* PROFILE DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-purple-500 rounded-lg hover:shadow-[0_0_10px_#a855f7] transition"
          >
            <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold">
              {user?.name?.charAt(0)}
            </div>
            <span className="text-sm">{user?.name}</span>
          </button>

          {/* DROPDOWN */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-black/80 backdrop-blur-lg border border-purple-500/30 rounded-xl shadow-[0_0_20px_#a855f7] p-2 z-50">
              <button
                className="w-full text-left px-3 py-2 text-sm hover:bg-purple-500/20 rounded-lg"
                onClick={() => navigate("/profile")}
              >
                👤 Profile
              </button>

              <button
                className="w-full text-left px-3 py-2 text-sm hover:bg-purple-500/20 rounded-lg"
                onClick={() => navigate("/profile/edit")}
              >
                ⚙️ Edit Profile
              </button>

              <hr className="my-2 border-gray-700" />

              <button
                className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 rounded-lg"
                onClick={() => fLogout()}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    );

    LogContentMobile = (
      <div className="border border-purple-500/30 rounded-lg p-3 bg-black/40">
        <p className="text-sm text-gray-300">👤 {user?.name}</p>

        <button
          className="w-full mt-2 px-4 py-2 text-sm hover:bg-purple-500/20 rounded-lg"
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>

        <button
          className="w-full mt-2 px-4 py-2 text-sm hover:bg-purple-500/20 rounded-lg"
          onClick={() => navigate("/profile/edit")}
        >
          Edit Profile
        </button>
        <hr className="my-2 border-gray-700" />

        <button
          className="w-full mt-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 rounded-lg"
          onClick={() => fLogout()}
        >
          🚪 Logout
        </button>
      </div>
    );
  }

  return (
    <nav
      className="fixed w-full z-50 bg-[#1a162d]/90 backdrop-blur-md px-6 py-4 md:px-10"
      data-aos="fade-down"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-500 rounded-full">
            <img src={logo} alt="Hero" />
          </div>
          <span className="font-bold text-xl">MosherBLOX</span>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <a
            href="#home"
            onClick={(e) => {
              navigate("/");
              scrollToSection(e, "home");
            }}
            className="block hover:text-purple-400"
          >
            Home
          </a>
          <a href="#" className="block hover:text-purple-400">
            About Us
          </a>
          <a
            href="#komunitas"
            onClick={(e) => {
              navigate("/");
              scrollToSection(e, "komunitas");
            }}
            className="block hover:text-purple-400"
          >
            Komunitas
          </a>
          <a
            href=""
            onClick={(e) => {
              navigate("/game");
              scrollToSection(e, "games");
            }}
            className="block hover:text-purple-400"
          >
            Games
          </a>
          {listOrder}
        </div>
        {LogContent}
      </div>

      <div
        id="mobile-menu"
        className={`${isOpen ? "flex" : "hidden"} flex-col space-y-4 mt-4 pb-4 md:hidden border-t border-gray-700 pt-4`}
      >
        <a
          href="#home"
          onClick={(e) => {
            navigate("/");
            scrollToSection(e, "home");
          }}
          className="block hover:text-purple-400"
        >
          Home
        </a>
        <a href="#" className="block hover:text-purple-400">
          About Us
        </a>
        <a
          href="#komunitas"
          onClick={(e) => {
            navigate("/");
            scrollToSection(e, "komunitas");
          }}
          className="block hover:text-purple-400"
        >
          Komunitas
        </a>
        <a
          href=""
          onClick={(e) => {
            navigate("/game");
            scrollToSection(e, "games");
          }}
          className="block hover:text-purple-400"
        >
          Games
        </a>
        {listOrder}
        {LogContentMobile}
      </div>
    </nav>
  );
}
