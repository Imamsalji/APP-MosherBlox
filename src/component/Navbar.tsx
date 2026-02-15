import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import logo from "./../assets/img/logoMosher.jpeg";
import { useAuthStore } from "../store/auth";
import { getCart } from "../api/cart";
import type { CartItem } from "../types/Cart";
import { useAppStore } from "../store/appStore";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  //   const [cart, setCart] = useState<CartItem[]>([]);
  const setNavCart = useAppStore((s) => s.setCart);
  const titleNavCart = useAppStore((s) => s.cart);
  let listOrder;
  // const logout = async () => {
  //     if (!confirm("Yakin mau keluar?")) return;
  //     await api.post(`/logout`);
  //     localStorage.setItem("token", '');
  //     navigate("/");
  const fetchCart = async () => {
    try {
      const data = await getCart();
      //   setCart(data.items);
      setNavCart(data.items.length);
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

  // console.log('cart.length');

  // };
  const [isOpen, setIsOpen] = useState(false);
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
    console.log("logout");
    useAuthStore.getState().logout();
    navigate("/");
  };

  if (isAuthenticated) {
    listOrder = (
      <a
        href=""
        onClick={(e) => {
          navigate("/list-order");
        }}
        className="block hover:text-purple-400"
      >
        Order List
      </a>
    );
    LogContent = (
      <div className="hidden md:flex space-x-4">
        <button
          className="relative px-4 py-2 text-sm border border-gray-500 rounded-lg"
          onClick={() => navigate("/carts")}
        >
          Karanjang
          <span
            className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 
                   flex items-center justify-center 
                   text-xs font-bold text-white 
                   bg-red-600 rounded-full"
          >
            {titleNavCart}
          </span>
        </button>
        <button
          className="px-4 py-2 text-sm bg-purple-600 rounded-lg"
          onClick={() => fLogout()}
        >
          Logout
        </button>
      </div>
    );

    LogContentMobile = (
      <div className="flex flex-col space-y-2 pt-2">
        <button
          className="relative w-full px-4 py-2 text-sm border border-gray-500 rounded-lg"
          onClick={() => navigate("/carts")}
        >
          Karanjang
          <span
            className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 
                   flex items-center justify-center 
                   text-xs font-bold text-white 
                   bg-red-600 rounded-full"
          >
            {titleNavCart}
          </span>
        </button>
        <button
          className="w-full px-4 py-2 text-sm bg-purple-600 rounded-lg"
          onClick={() => fLogout()}
        >
          Logout
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
