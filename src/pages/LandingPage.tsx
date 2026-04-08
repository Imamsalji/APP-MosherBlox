import Navbar from "../component/Navbar";
import Header from "../component/Header";
import Footer from "../component/Footer";
import CyberpunkCard from "../component/transaksi/CyberpunkCard";
import { useLocation, useNavigate } from "react-router-dom";
import CyberpunkCarousel from "../component/transaksi/CyberpunkCarousel";
import GlobalConfirm from "../component/GlobalConfirm";
import { useQuery } from "@tanstack/react-query";
import { getGames } from "../api/game";
import CyberpunkSpinner from "../component/transaksi/CyberpunkSpinner";
import { Game } from "../types/Game";
import { useEffect, useState } from "react";
import Toast from "../component/transaksi/Toast";
import { useAuthStore } from "../store/auth";
import AboutUsSection from "../component/About";
import ReviewSection from "../component/review";
// import CyberpunkCart from "./../component/transaksi/CyberpunkCart";
// import CyberpunkPayment from "./../component/transaksi/CyberpunkPayment";
// import CyberpunkOrderList from "./../component/transaksi/CyberpunkOrderList";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;
  const [show, setShow] = useState(false);

  const { data: game, isLoading } = useQuery({
    queryKey: ["games"],
    queryFn: getGames,
  });

  useEffect(() => {
    if (message) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, []);
  if (isLoading) return <CyberpunkSpinner size={50} text="Loading" />;

  return (
    <>
      <Navbar />
      <div className="h-20"></div>
      <Header />
      <AboutUsSection />
      <div className="h-[2px] bg-[linear-gradient(90deg,transparent,#00ffff,#00ffff,#00ffff,transparent)] h-1 w-full m-0"></div>
      <CyberpunkCarousel />
      <GlobalConfirm />
      {message && (
        <Toast show={show} message={message} onClose={() => setShow(false)} />
      )}

      {/* <CyberpunkCart/>

    <CyberpunkPayment/>

    <CyberpunkOrderList/> */}
      <div className="h-[2px] bg-[linear-gradient(90deg,transparent,#00ffff,#00ffff,#00ffff,transparent)] h-1 w-full m-0"></div>
      <section
        id="games"
        className="container mx-auto px-2 md:px-10 py-5 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-['Comic_Sans_MS',_cursive] font-bold mb-10">
          Games
        </h2>
        <div
          className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-6
                gap-6
            "
        ></div>
        <div
          className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-6
                gap-2
            "
        >
          {game?.map((item: Game) => (
            <CyberpunkCard
              title={item.name}
              image={item.image_url}
              tag={item.slug}
            />
          ))}
        </div>
        <button
          className="mt-8 border border-purple-500 text-purple-400 hover:brightness-150 px-6 py-2 rounded-full text-sm w-full md:w-auto"
          onClick={() => navigate(`/game`)}
        >
          {" "}
          VIEW MORE GAMES
        </button>
      </section>
      <div className="h-[2px] bg-[linear-gradient(90deg,transparent,#00ffff,#00ffff,#00ffff,transparent)] h-1 w-full m-0"></div>
      <section
        id="komunitas"
        className="relative bg-gray-950 container mx-auto px-6 md:px-10 py-20 text-center overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-14 text-cyan-400 tracking-widest ">
            GABUNG KOMUNITAS KAMI
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Card */}
            <div className="group p-6 rounded-2xl border border-cyan-500/20 bg-black/40 backdrop-blur-lg hover:shadow-[0_0_25px_#00ffff] transition-all duration-300">
              <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-3xl shadow-[0_0_20px_#00ffff] group-hover:scale-110 transition">
                💡
              </div>
              <h4 className="mt-6 text-lg font-bold text-white group-hover:text-cyan-400">
                WhatsApp Group
              </h4>
              <p className="text-gray-400 text-sm mt-2">
                Tingkatkan kemampuan coding dan problem solving dengan
                komunitas.
              </p>
            </div>

            {/* Card */}
            <div className="group p-6 rounded-2xl border border-pink-500/20 bg-black/40 backdrop-blur-lg hover:shadow-[0_0_25px_#ff00ff] transition-all duration-300">
              <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-3xl shadow-[0_0_20px_#ff00ff] group-hover:scale-110 transition">
                🚀
              </div>
              <h4 className="mt-6 text-lg font-bold text-white group-hover:text-pink-400">
                Discord
              </h4>
              <p className="text-gray-400 text-sm mt-2">
                Bangun relasi dengan developer lain dan peluang karir lebih
                luas.
              </p>
            </div>

            {/* Card */}
            <div className="group p-6 rounded-2xl border border-purple-500/20 bg-black/40 backdrop-blur-lg hover:shadow-[0_0_25px_#a855f7] transition-all duration-300">
              <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 text-3xl shadow-[0_0_20px_#a855f7] group-hover:scale-110 transition">
                ⚡
              </div>
              <h4 className="mt-6 text-lg font-bold text-white group-hover:text-purple-400">
                Instagram
              </h4>
              <p className="text-gray-400 text-sm mt-2">
                Kolaborasi dalam project nyata untuk portfolio dan pengalaman.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="h-[2px] bg-[linear-gradient(90deg,transparent,#00ffff,#00ffff,#00ffff,transparent)] h-1 w-full m-0"></div>
      <ReviewSection />
      <Footer />
    </>
  );
}

export default App;
