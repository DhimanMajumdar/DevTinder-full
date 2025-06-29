import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useEffect } from "react";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status == 401) {
        navigate("/");
      }
      console.log(error);
    }
  };
  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);
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
