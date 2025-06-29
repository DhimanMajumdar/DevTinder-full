import { useNavigate } from "react-router-dom";
import { X, Code, Mail, Key } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const LoginModal = () => {
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true } // Important for cookies
      );
      console.log(res.data);
      dispatch(addUser(res.data));
      navigate("/profile"); // Redirect after successful login
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Login failed: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl max-w-md w-full p-8 border border-gray-800 relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-8">
          <Code className="h-10 w-10 text-purple-500 mx-auto" />
          <h2 className="mt-4 text-2xl font-bold text-white">Welcome back</h2>
          <p className="mt-2 text-gray-400">Login to your DevFusion account</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email address
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                id="email"
                value={emailId}
                required
                className="bg-gray-800 border border-gray-700 block w-full pl-10 py-3 rounded-md text-white"
                placeholder="you@example.com"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="password"
                id="password"
                value={password}
                required
                className="bg-gray-800 border border-gray-700 block w-full pl-10 py-3 rounded-md text-white"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">Don't have an account?</p>
          <button
            onClick={() => navigate("/signup")}
            className="mt-3 w-full py-3 rounded-md text-sm font-medium text-white bg-gray-800 hover:bg-gray-700"
          >
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
