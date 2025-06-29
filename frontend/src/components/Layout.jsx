import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main content with top padding to offset the fixed Navbar */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      {/* Footer stays at the bottom */}
      <Footer />
    </div>
  );
};

export default Layout;
