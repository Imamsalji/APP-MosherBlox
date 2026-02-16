import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../api/order";
import type { GetOrders } from "../types/Order";

import CyberpunkOrderDetailModal from "../component/transaksi/CyberpunkOrderDetailModal";
import type { OrderDetail } from "../component/transaksi/CyberpunkOrderDetailModal";
type OrderStatus = "pending" | "paid";

// const orders: Order[] = [
//   {
//     id: "ORD-78421",
//     game: "Cyber Battle X",
//     amount: "Rp 150.000",
//     status: "pending",
//     date: "15 Jan 2026",
//   },
//   {
//     id: "ORD-78422",
//     game: "Neon Realm",
//     amount: "Rp 75.000",
//     status: "paid",
//     date: "14 Jan 2026",
//   },
//   {
//     id: "ORD-78423",
//     game: "Quantum Strike",
//     amount: "Rp 300.000",
//     status: "paid",
//     date: "13 Jan 2026",
//   },
// ];

const statusStyle = {
  pending:
    "text-yellow-400 border-yellow-400/40 shadow-[0_0_15px_rgba(250,204,21,0.4)]",
  paid: "text-cyan-400 border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.4)]",
};

const OrderList = () => {
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [orders, setOrders] = useState<GetOrders[]>([]);

  const navigate = useNavigate();

  const payment = async (id: number | String) => {
    console.log(id);
    navigate(`/payment/${id}`);
  };

  const fetchCart = async () => {
    try {
      const data = await getMyOrders();

      if (data.length != 0) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);
  console.log();

  return (
    <section className="relative py-20 bg-[#05080f] text-white overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute -inset-16 bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-purple-600/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_65%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-10">
        {/* TITLE */}
        <h2 className="text-xl md:text-3xl font-bold tracking-widest text-cyan-400 mb-10">
          ORDER HISTORY
        </h2>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="
                relative
                p-5
                rounded-2xl
                bg-[#0b0f1a]
                border
                border-white/10
                backdrop-blur
                hover:scale-[1.01]
                transition
              "
            >
              {/* INNER GLOW */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-fuchsia-500/5 blur-xl" />

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                {/* GAME */}
                {/* <div>
                  <p className="text-xs text-gray-400 tracking-widest">GAME</p>
                  <p className="font-semibold">{order.items.}</p>
                </div> */}

                {/* ORDER ID */}
                <div>
                  <p className="text-xs text-gray-400 tracking-widest">
                    ORDER ID
                  </p>
                  <p className="font-mono text-sm">{order.id}</p>
                </div>

                {/* AMOUNT */}
                <div>
                  <p className="text-xs text-gray-400 tracking-widest">
                    AMOUNT
                  </p>
                  <p className="font-semibold text-fuchsia-400">
                    {order.total_price}
                  </p>
                </div>

                {/* STATUS */}
                <div>
                  <p className="text-xs text-gray-400 tracking-widest">
                    STATUS
                  </p>
                  <span
                    className={`
                      inline-block
                      px-3 py-1
                      mt-1
                      text-xs
                      rounded-full
                      border
                      ${statusStyle[order.status]}
                    `}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>

                {/* ACTION */}
                <div className="flex md:justify-end">
                  {order.status === "pending" ? (
                    <button
                      className="
                        px-4 py-2
                        rounded-lg
                        text-xs
                        font-bold
                        tracking-widest
                        bg-gradient-to-r
                        from-yellow-400
                        to-orange-500
                        text-black
                        hover:brightness-125
                        transition
                      "
                      onClick={() => payment(order.id)}
                    >
                      Bayar Sekarang
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setSelectedOrder({
                          id: order.id,
                          game: order.items,
                          product: "Diamond Pass",
                          amount: order.amount,
                          status: order.status,
                          paymentMethod: "QRIS",
                          date: order.date,
                        })
                      }
                      className="px-4 py-2 rounded-lg text-xs font-bold tracking-widest border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 transition"
                    >
                      VIEW
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* MODAL */}
      <CyberpunkOrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </section>
  );
};

export default OrderList;
