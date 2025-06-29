import { useNavigate } from "react-router-dom";
import { X, Code, Mail, Key } from "lucide-react";

const SignUpModal = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl max-w-md w-full p-6 border border-gray-800 relative">
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <Code className="h-8 w-8 text-purple-500 mx-auto" />
          <h2 className="mt-3 text-xl font-bold text-white">Create Account</h2>
          <p className="mt-1 text-sm text-gray-400">
            Join the DevFusion community
          </p>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="first-name"
                className="block text-xs text-gray-300 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                required
                className="bg-gray-800 border border-gray-700 focus:ring-purple-500 focus:border-purple-500 w-full py-2 px-3 rounded-md text-sm text-white"
                placeholder="John"
              />
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-xs text-gray-300 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                required
                className="bg-gray-800 border border-gray-700 focus:ring-purple-500 focus:border-purple-500 w-full py-2 px-3 rounded-md text-sm text-white"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="email"
                id="email"
                required
                className="bg-gray-800 border border-gray-700 focus:ring-purple-500 focus:border-purple-500 w-full pl-9 py-2 rounded-md text-sm text-white"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs text-gray-300 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="password"
                id="password"
                required
                className="bg-gray-800 border border-gray-700 focus:ring-purple-500 focus:border-purple-500 w-full pl-9 py-2 rounded-md text-sm text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-purple-600 border-gray-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="terms" className="ml-2 text-xs text-gray-300">
              I agree to the{" "}
              <a href="#" className="text-purple-400 hover:text-purple-300">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-purple-400 hover:text-purple-300">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500"
          >
            Create Account
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-2 w-full py-2 rounded-md text-sm font-medium text-white bg-gray-800 hover:bg-gray-700"
          >
            Sign In Instead
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
