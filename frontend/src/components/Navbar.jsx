import {
  Code,
  User,
  Users,
  GitPullRequest,
  LogOut,
  ChevronDown,
  ChevronUp,
  Home,
  Menu,
  X,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const navItems = [
    { icon: Home, label: "Feed", path: "/feed", color: "yellow" },
    { icon: User, label: "Profile", path: "/profile", color: "purple" },
    { icon: Users, label: "Connections", path: "/connections", color: "blue" },
    {
      icon: GitPullRequest,
      label: "Requests",
      path: "/requests",
      color: "green",
    },
  ];

  return (
    <nav className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-lg border-b border-gray-700/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <Code className="h-8 w-8 text-purple-400 hover:text-purple-300 transition-colors" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-blue-300 transition-all">
                DevFusion
              </span>
            </div>
          </div>

          {/* Right Section */}
          <div className="ml-4 flex items-center md:ml-6 relative">
            {user ? (
              <>
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                  {navItems.map((item) => (
                    <div key={item.label} className="relative group">
                      <item.icon
                        className={`h-6 w-6 text-gray-300 hover:text-${item.color}-400 cursor-pointer transition-all transform group-hover:scale-110`}
                        onClick={() => navigate(item.path)}
                      />
                      <span
                        className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 group-hover:text-${item.color}-300 transition-all opacity-0 group-hover:opacity-100`}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}

                  <div className="relative group">
                    <LogOut
                      className="h-6 w-6 text-gray-300 hover:text-red-400 cursor-pointer transition-all transform group-hover:scale-110"
                      onClick={handleLogout}
                    />
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 group-hover:text-red-300 transition-all opacity-0 group-hover:opacity-100">
                      Logout
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-gray-200 font-medium">
                      {user.firstName}
                    </span>
                    <img
                      src={
                        user?.photoUrl ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover border-2 border-purple-500 hover:border-blue-400 transition-all shadow-lg"
                    />
                  </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-gray-300 hover:text-white focus:outline-none"
                  >
                    {mobileMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-gray-300 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:text-white px-3 py-1.5 md:px-4 md:py-2 hover:from-purple-700 hover:to-blue-700 transition-all rounded-md text-sm font-medium shadow-lg hover:shadow-purple-500/20"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="ml-2 md:ml-4 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-md text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-blue-500/20"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && user && (
          <div className="md:hidden bg-gray-800/95 border-t border-gray-700/50 mt-2 py-3 px-4 rounded-lg">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center text-gray-200 hover:text-white transition-colors"
                >
                  <item.icon
                    className={`h-5 w-5 mr-3 text-${item.color}-400`}
                  />
                  {item.label}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </button>
              <div className="flex items-center pt-2 border-t border-gray-700/50">
                <img
                  src={
                    user?.photoUrl ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover border border-purple-500 mr-3"
                />
                <div>
                  <p className="text-sm font-medium text-white">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-400">{user.emailId}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
