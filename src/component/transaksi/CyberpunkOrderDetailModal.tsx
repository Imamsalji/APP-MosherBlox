// ==========================
// TYPES
// ==========================
export type OrderStatus = "pending" | "paid";

export interface OrderDetail {
  id: string;
  game: string;
  product: string;
  amount: string;
  status: OrderStatus;
  paymentMethod: string;
  date: string;
}

// ==========================
// PROPS
// ==========================
interface Props {
  order: OrderDetail | null;
  onClose: () => void;
}

// ==========================
// COMPONENT
// ==========================
const CyberpunkOrderDetailModal = ({ order, onClose }: Props) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0b0f1a] border border-cyan-400/30 shadow-[0_0_40px_rgba(34,211,238,0.35)]">
        <div className="p-6 space-y-5 text-white">

          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h3 className="text-cyan-400 font-bold tracking-widest">
              ORDER DETAIL
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-400 transition"
            >
              ✕
            </button>
          </div>

          {/* DETAIL */}
          <Detail label="Order ID" value={order.id} mono />
          <Detail label="Game" value={order.game} />
          <Detail label="Product" value={order.product} />
          <Detail label="Amount" value={order.amount} highlight />
          <Detail label="Payment" value={order.paymentMethod} />
          <Detail label="Date" value={order.date} />

          {/* FOOTER */}
          <div className="pt-4 flex justify-between items-center border-t border-white/10">
            <span
              className={`px-4 py-1 rounded-full text-xs tracking-widest border
                ${
                  order.status === "paid"
                    ? "text-cyan-400 border-cyan-400/40 shadow-[0_0_10px_rgba(34,211,238,0.4)]"
                    : "text-yellow-400 border-yellow-400/40 shadow-[0_0_10px_rgba(250,204,21,0.4)]"
                }
              `}
            >
              {order.status.toUpperCase()}
            </span>

            {order.status === "pending" && (
              <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold tracking-widest hover:brightness-125 transition">
                PAY NOW
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CyberpunkOrderDetailModal;

// ==========================
// SUB COMPONENT
// ==========================
const Detail = ({
  label,
  value,
  mono,
  highlight,
}: {
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
}) => (
  <div>
    <p className="text-xs tracking-widest text-gray-400">{label}</p>
    <p
      className={`mt-1 ${
        mono ? "font-mono text-cyan-300" : ""
      } ${highlight ? "text-fuchsia-400 font-semibold" : ""}`}
    >
      {value}
    </p>
  </div>
);
