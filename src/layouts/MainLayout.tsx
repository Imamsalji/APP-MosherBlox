import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import Header from "../component/Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="h-20"></div>
      {/* <Header /> */}

      <Outlet />
      {/* <CyberpunkCart/>

    <CyberpunkPayment/>

    <CyberpunkOrderList/> */}

      <Footer />
    </>
  );
}

export default MainLayout;
