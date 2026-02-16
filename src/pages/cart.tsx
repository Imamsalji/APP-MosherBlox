import logo from "./../assets/img/logoMosher.jpeg";
import { useNavigate } from "react-router-dom";
import { removeCartItem, updateCartItem, getCart } from "../api/cart";
import type { CartItem } from "./../types/Cart";
import { useEffect, useState } from "react";
import CyberpunkSpinner from "../component/transaksi/CyberpunkSpinner";
import { useNotifStore } from "./../store/appStore";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const checkout = async () => {
    useNotifStore.getState().show({
      title: "Konfirmasi Checkout",
      message:
        "Cek dulu pesanan kamu ya. Kalau sudah sesuai, klik lanjut untuk proses pembayaran.",
      onConfirm: () => {
        console.log("hapus dijalankan");
        navigate(`/payment/order-id`);
      },
    });
  };

  const UpdateCart = async (id: number, kondisi: string) => {
    console.log("Tambah ke cart:", id, " kondisi ", kondisi);
    if (kondisi == "increment") {
      const data = await updateCartItem(id, kondisi);
    } else {
      const data = await updateCartItem(id, kondisi);
    }
    const data = await getCart();
    setCartItems(data.items);
  };

  const RemoveCart = async (id: number) => {
    await removeCartItem(id);
    const data = await getCart();
    setCartItems(data.items);
  };

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCartItems(data.items);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <section className="relative py-20 bg-[#070b14] overflow-hidden">
      {/* OUTER GLOW */}
      <div
        className="
            pointer-events-none
            absolute -inset-10
            bg-gradient-to-r
            from-cyan-500/20
            via-fuchsia-500/20
            to-purple-600/20
            blur-3xl
            "
      />

      {/* SOFT RADIAL GLOW */}
      <div
        className="
            pointer-events-none
            absolute inset-0
            bg-[radial-gradient(circle_at_center,
                rgba(34,211,238,0.15),
                transparent_65%
            )]
            "
      />

      {/* CONTENT */}
      {cartItems.length === 0 ? (
        <CyberpunkSpinner size={80} text="Loading" />
      ) : (
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-10">
          {/* Header */}
          <h2
            className="
          text-xl md:text-3xl
          font-bold
          tracking-widest
          text-cyan-400
          mb-10
        "
          >
            CART SYSTEM
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="
                  relative
                  flex gap-4
                  p-4
                  rounded-xl
                  bg-[#0b0f1a]
                  border
                  border-cyan-400/20
                  shadow-[0_0_20px_rgba(34,211,238,0.15)]
                "
                >
                  {/* Image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="
                    w-20 h-20
                    object-cover
                    rounded-lg
                    border
                    border-cyan-400/30
                  "
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm md:text-base">
                      {item.product.name}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-xs text-cyan-300">QTY</span>
                      <div
                        className="
                      px-3 py-1
                      text-xs
                      border
                      border-cyan-400/40
                      rounded
                    "
                      >
                        {item.qty}
                      </div>
                      <button
                        className="
                            px-3 py-1
                            rounded-lg
                            bg-gradient-to-r
                            from-cyan-500
                            to-fuchsia-600
                            text-xs
                            font-bold
                            tracking-widest
                            hover:brightness-125
                            transition
                           
                          "
                        // cursor-progress
                        onClick={() => UpdateCart(item.id, "increment")}
                      >
                        +
                      </button>
                      <button
                        className="
                            px-3 py-1
                            rounded-lg
                            bg-gradient-to-r
                            from-cyan-500
                            to-fuchsia-600
                            text-xs
                            font-bold
                            tracking-widest
                            hover:brightness-125
                            transition
                          "
                        onClick={() => UpdateCart(item.id, "decrement")}
                      >
                        -
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    className="
                    text-xs
                    text-pink-400
                    hover:text-pink-300
                    transition
                  "
                    onClick={() => RemoveCart(item.id)}
                  >
                    REMOVE
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div
              className="
              relative
              p-6
              rounded-xl
              bg-[#0b0f1a]
              border
              border-fuchsia-500/30
              shadow-[0_0_30px_rgba(217,70,239,0.25)]
              h-fit
            "
            >
              <h3
                className="
              text-lg
              font-bold
              tracking-widest
              text-fuchsia-400
              mb-6
            "
              >
                SUMMARY
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rp {total.toLocaleString("id-ID")}</span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Fee</span>
                  <span>Rp 0</span>
                </div>

                <div
                  className="
                border-t
                border-cyan-400/20
                pt-4
                flex justify-between
                font-bold
              "
                >
                  <span>Total</span>
                  <span className="text-cyan-400">
                    Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <button
                className="
                mt-6
                w-full
                py-3
                rounded-lg
                bg-gradient-to-r
                from-cyan-500
                to-fuchsia-600
                text-sm
                font-bold
                tracking-widest
                hover:brightness-125
                transition
              "
                onClick={() => checkout()}
              >
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
