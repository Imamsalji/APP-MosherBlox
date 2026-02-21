import { useEffect, useState } from "react";
import { getGameDetail } from "../api/game";
import type { Game } from "../types/Game";
import { useParams } from "react-router-dom";
import GlowCard from "../component/GlowCard";
import logo from "./../assets/img/logoMosher.jpeg";
import CyberpunkSpinner from "../component/transaksi/CyberpunkSpinner";
import { addToCart, getCart } from "../api/cart";
import type { CartItem } from "../types/Cart";
import Toast from "./../component/transaksi/Toast";
import { useAppStore } from "../store/appStore";

type CartRow = {
  id: number;
  qty: number;
};

type Props = {
  id: number;
  DCart: CartRow[];
};

const CekCart = ({ id, DCart }: Props) => {
  // update Nav Global Keranjang
  const setNavCart = useAppStore((s) => s.setCart);
  const item = DCart.find((x) => x.id === id);
  setNavCart(DCart.length);
  //END update Nav Global Keranjang

  if (!item) return null;

  return (
    <span
      className="
      absolute -top-2 -right-2
      bg-fuchsia-500 text-black
      text-[10px] font-bold
      px-2 py-0.5 rounded-full
      shadow-[0_0_8px_#ff00ff]
      animate-bounce
    "
    >
      {item.qty}
    </span>
  );
};

export default function Game() {
  const [cartem, setCartem] = useState<CartRow[]>([]);
  const { slug } = useParams();
  const [game, setGame] = useState<Game[]>([]);
  const [show, setShow] = useState(false);
  const [reloadCart, setReloadCart] = useState(0);

  const handleCheckout = async (id: number, qty: number) => {
    console.log("Tambah ke cart:", id, " dan ", qty);
    setShow(true);
    const data = await addToCart(id, qty);
    setCartem((prev) => [...prev, { id, qty }]);
    setReloadCart((x) => x + 1);
  };

  useEffect(() => {
    if (!slug) return;
    const load = async () => {
      try {
        const data = await getCart();

        if (data.length != 0) {
          const ids = data.items.map((item: CartItem) => ({
            id: item.product_id,
            qty: item.qty,
          }));
          setCartem(ids);
        }

        const gameData = await getGameDetail(slug);
        setGame(gameData);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [slug, reloadCart]);
  if (!game) return null;
  console.log("cartem");
  console.log(cartem);

  return (
    <>
      <section
        id="games"
        className="container mx-auto px-6 md:px-10 py-16 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-['Comic_Sans_MS',_cursive] font-bold mb-10">
          Games
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-3">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            className="bg border-cyan-400 text-white-300 
            rounded-xl px-4 py-2 focus:outline-none 
            focus:shadow-[0_0_10px_rgba(0,255,255,0.8)]"
          />
        </div>
        <Toast
          show={show}
          message="Game Berhasil Di Tambahkan! "
          onClose={() => setShow(false)}
        />
        {game.length === 0 ? (
          <CyberpunkSpinner size={80} text="Loading" />
        ) : (
          <div
            className="
                    grid
                    grid-cols-2
                    sm:grid-cols-3
                    md:grid-cols-4
                    lg:grid-cols-6
                    gap-6
                "
          >
            {game.map((item: Game) => (
              <GlowCard
                Dcart={{ id: item.id, qty: 1 }}
                title={item.name}
                image={logo}
                description=""
                onChange={handleCheckout}
              >
                <CekCart id={item.id} DCart={cartem} />
                {/* <span
                            className="
                                absolute
                                -top-2
                                -right-2
                                bg-fuchsia-500
                                text-black
                                text-[10px]
                                font-bold
                                px-2
                                py-0.5
                                rounded-full
                                shadow-[0_0_8px_#ff00ff]
                                animate-bounce
                            "
                        >
                            3
                        </span> */}
              </GlowCard>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
