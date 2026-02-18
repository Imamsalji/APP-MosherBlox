import { useState } from "react";
import logo from "./../assets/img/logoMosher.jpeg";
import Navbar from "../component/Navbar";
import Header from "../component/Header";
import Footer from "../component/Footer";
import CyberpunkCard from "../component/transaksi/CyberpunkCard";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CyberpunkCarousel from "../component/transaksi/CyberpunkCarousel";
// import CyberpunkCart from "./../component/transaksi/CyberpunkCart";
// import CyberpunkPayment from "./../component/transaksi/CyberpunkPayment";
// import CyberpunkOrderList from "./../component/transaksi/CyberpunkOrderList";

function App() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <>
      <Navbar />
      <div className="h-20"></div>
      <Header />
      <CyberpunkCarousel />
      {/* <CyberpunkCart/>

    <CyberpunkPayment/>

    <CyberpunkOrderList/> */}
      <section
        id="games"
        className="container mx-auto px-6 md:px-10 py-16 text-center"
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
                gap-6
            "
        >
          <CyberpunkCard title="NEURAL ARENA" image={logo} tag="CYBER" />
          <CyberpunkCard title="NEURAL ARENA" image={logo} tag="CYBER" />
          <CyberpunkCard title="NEURAL ARENA" image={logo} tag="CYBER" />
          <CyberpunkCard title="NEURAL ARENA" image={logo} tag="CYBER" />
          <CyberpunkCard title="NEURAL ARENA" image={logo} tag="CYBER" />
          <CyberpunkCard title="NEURAL ARENA" image={logo} tag="CYBER" />
        </div>
        <button
          className="mt-8 border border-purple-500 text-purple-400 hover:brightness-150 px-6 py-2 rounded-full text-sm w-full md:w-auto"
          onClick={() => navigate(`/game`)}
        >
          {" "}
          VIEW MORE GAMES
        </button>
      </section>

      <section
        id="komunitas"
        className="container mx-auto px-6 md:px-10 py-16 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-10">
          Gabung Komunitas Kami
        </h2>
        <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-3 md:gap-12">
          <div className="flex flex-col items-center" data-aos="fade-up">
            <div className="bg-pink-500 w-28 h-28 md:w-32 md:h-32 blob-shape flex items-center justify-center mb-4">
              <span className="text-3xl md:text-4xl">💡</span>
            </div>
            <h4 className="font-bold text-lg">It improves your IQ</h4>
            <p className="text-gray-400 text-xs md:text-sm mt-2 px-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="flex flex-col items-center" data-aos="fade-up">
            <div className="bg-pink-500 w-28 h-28 md:w-32 md:h-32 blob-shape flex items-center justify-center mb-4">
              <span className="text-3xl md:text-4xl">💡</span>
            </div>
            <h4 className="font-bold text-lg">It improves your IQ</h4>
            <p className="text-gray-400 text-xs md:text-sm mt-2 px-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="flex flex-col items-center" data-aos="fade-up">
            <div className="bg-pink-500 w-28 h-28 md:w-32 md:h-32 blob-shape flex items-center justify-center mb-4">
              <span className="text-3xl md:text-4xl">💡</span>
            </div>
            <h4 className="font-bold text-lg">It improves your IQ</h4>
            <p className="text-gray-400 text-xs md:text-sm mt-2 px-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default App;
