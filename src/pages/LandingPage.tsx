import Navbar from "../component/Navbar";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useLocation } from "react-router-dom";
import CyberpunkCarousel from "../component/transaksi/CyberpunkCarousel";
import GlobalConfirm from "../component/GlobalConfirm";
import { useEffect, useState } from "react";
import Toast from "../component/transaksi/Toast";
import AboutUsSection from "../component/landingPage/About";
import Review from "../component/landingPage/Review";
import Games from "../component/landingPage/Games";
import Komunitas from "../component/landingPage/Komunitas";

function App() {
  const location = useLocation();
  const message = location.state?.message;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, []);

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
      <Games />
      <div className="h-[2px] bg-[linear-gradient(90deg,transparent,#00ffff,#00ffff,#00ffff,transparent)] h-1 w-full m-0"></div>
      <Komunitas />
      <div className="h-[2px] bg-[linear-gradient(90deg,transparent,#00ffff,#00ffff,#00ffff,transparent)] h-1 w-full m-0"></div>
      <Review />
      <Footer />
    </>
  );
}

export default App;
