import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import GlobalConfirm from "./../component/GlobalConfirm";
import Header from "../component/Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="h-20"></div>
      {/* <Header /> */}
      <GlobalConfirm />
      <Outlet />
      {/* <CyberpunkCart/>

    <CyberpunkPayment/>

    <CyberpunkOrderList/> */}

      <Footer />
    </>
  );
}

export default MainLayout;
