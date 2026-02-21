import Navbar from "../component/admin/Navbar";
import Sidebar from "../component/admin/Sidebar";
import Footer from "../component/admin/Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="main-wrapper container">
      <div className="navbar-bg"></div>
      <Navbar />
      <Sidebar />
      <main>
        <div className="main-content">
          <section className="section">
            <Outlet />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
