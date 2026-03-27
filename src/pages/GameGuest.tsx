import { useEffect, useState } from "react";
import { getGameDetail } from "../api/game";
import type { GameList } from "../types/Game";
import { useParams } from "react-router-dom";
import GlowCard from "../component/GlowCard";
import CyberpunkSpinner from "../component/transaksi/CyberpunkSpinner";
import { addToCart, getCart } from "../api/cart";
import type { CartItem } from "../types/Cart";
import Toast from "../component/transaksi/Toast";
import { useAppStore } from "../store/appStore";
import { formatRupiah } from "../utils/format";

type CartRow = {
  id: number;
  qty: number;
};

export default function Game() {
  const { slug } = useParams();
  const [game, setGame] = useState<GameList[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const load = async () => {
      try {
        const gameData = await getGameDetail(slug);
        console.log(gameData);

        setGame(gameData);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [slug]);
  if (!game) return null;

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
            {game.map((item: GameList) => (
              <GlowCard
                Dcart={{ id: item.id, qty: 1 }}
                title={item.name}
                image={item.image_url}
                description={formatRupiah(item.price)}
              >
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
