import { Code } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Code className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                DevFusion
              </span>
            </div>
            <div className="hidden md:block ml-10">
              {/* You can add navigation links here if needed */}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                onClick={() => navigate("/login")}
                className="text-gray-300 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:text-white px-4 py-2 hover:from-purple-700 hover:to-blue-700 transition-all rounded-md text-sm font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="ml-4 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                Sign Up
              </button>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            {/* Mobile menu button would go here */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
