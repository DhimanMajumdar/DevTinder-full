import {
  Code,
  User,
  Users,
  GitPullRequest,
  LogOut,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-lg border-b border-gray-700/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Code className="h-8 w-8 text-purple-400 hover:text-purple-300 transition-colors" />
              <span
                className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-blue-300 transition-all cursor-pointer"
                onClick={() => navigate("/")}
              >
                DevFusion
              </span>
            </div>
          </div>

          {/* Right Section */}
          <div className="ml-4 flex items-center md:ml-6 relative">
            {user ? (
              <>
                {/* Large Screen - Name + Icons + Photo */}
                <div className="hidden md:flex items-center space-x-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative group">
                      <User
                        className="h-6 w-6 text-gray-300 hover:text-purple-400 cursor-pointer transition-all transform group-hover:scale-110"
                        onClick={() => navigate("/profile")}
                      />
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 group-hover:text-purple-300 transition-all opacity-0 group-hover:opacity-100">
                        Profile
                      </span>
                    </div>

                    <div className="relative group">
                      <Users
                        className="h-6 w-6 text-gray-300 hover:text-blue-400 cursor-pointer transition-all transform group-hover:scale-110"
                        onClick={() => navigate("/connections")}
                      />
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 group-hover:text-blue-300 transition-all opacity-0 group-hover:opacity-100">
                        Connections
                      </span>
                    </div>

                    <div className="relative group">
                      <GitPullRequest
                        className="h-6 w-6 text-gray-300 hover:text-green-400 cursor-pointer transition-all transform group-hover:scale-110"
                        onClick={() => navigate("/requests")}
                      />
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 group-hover:text-green-300 transition-all opacity-0 group-hover:opacity-100">
                        Requests
                      </span>
                    </div>

                    <div className="relative group">
                      <LogOut
                        className="h-6 w-6 text-gray-300 hover:text-red-400 cursor-pointer transition-all transform group-hover:scale-110"
                        onClick={handleLogout}
                      />
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 group-hover:text-red-300 transition-all opacity-0 group-hover:opacity-100">
                        Logout
                      </span>
                    </div>
                  </div>

                  <div
                    className="flex items-center space-x-3 cursor-pointer group"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span className="text-gray-200 font-medium group-hover:text-white transition-colors">
                      {user.firstName}
                    </span>
                    <div className="relative">
                      <img
                        src={
                          user?.photoUrl ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="Profile"
                        className="h-10 w-10 rounded-full object-cover border-2 border-purple-500 hover:border-blue-400 transition-all group-hover:scale-105 shadow-lg"
                      />
                      {dropdownOpen ? (
                        <ChevronUp className="absolute -bottom-2 -right-2 h-5 w-5 text-purple-400 bg-gray-800 rounded-full p-1 border border-gray-700" />
                      ) : (
                        <ChevronDown className="absolute -bottom-2 -right-2 h-5 w-5 text-gray-400 bg-gray-800 rounded-full p-1 border border-gray-700 group-hover:text-purple-400 transition-colors" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile - Name + Photo with Dropdown */}
                <div className="md:hidden flex items-center space-x-3">
                  <span className="text-gray-200 font-medium">
                    {user.firstName}
                  </span>
                  <div className="relative">
                    <img
                      src={
                        user?.photoUrl ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover border border-purple-500 cursor-pointer hover:border-blue-400 transition-all"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    />
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-2 z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-700">
                          <p className="text-sm font-medium text-gray-200">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {user.emailId}
                          </p>
                        </div>
                        <button
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-200 hover:bg-gray-700/50 transition-colors"
                          onClick={() => navigate("/profile")}
                        >
                          <User className="h-4 w-4 mr-3 text-purple-400" />
                          Profile
                        </button>
                        <button
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-200 hover:bg-gray-700/50 transition-colors"
                          onClick={() => navigate("/connections")}
                        >
                          <Users className="h-4 w-4 mr-3 text-blue-400" />
                          Connections
                        </button>
                        <button
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-200 hover:bg-gray-700/50 transition-colors"
                          onClick={() => navigate("/requests")}
                        >
                          <GitPullRequest className="h-4 w-4 mr-3 text-green-400" />
                          Requests
                        </button>
                        <button
                          className="flex items-center w-full px-4 py-3 text-sm text-red-400 hover:bg-gray-700/50 transition-colors"
                          onClick={handleLogout}
                        >
                          <LogOut className="h-4 w-4 mr-3 text-red-400" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-gray-300 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:text-white px-4 py-2 hover:from-purple-700 hover:to-blue-700 transition-all rounded-md text-sm font-medium shadow-lg hover:shadow-purple-500/20"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="ml-4 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-blue-500/20"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
