import { useNavigate } from "react-router-dom";
import { X, Code, Mail, Key, Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const SignUpModal = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    try {
      setIsSubmitting(true);

      const response = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailId: formData.emailId,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201 || response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response) {
        if (error.response.status === 409) {
          setSubmitError("Email already in use");
        } else {
          setSubmitError("Signup failed. Please try again.");
        }
      } else {
        setSubmitError("Network error. Please check your connection.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl max-w-md w-full p-6 border border-gray-800 relative">
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

        {submitError && (
          <div className="mb-4 p-3 bg-red-900/30 text-red-300 text-sm rounded-md border border-red-800/50">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="firstName"
                className="block text-xs text-gray-300 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`bg-gray-800 border ${
                  errors.firstName ? "border-red-500" : "border-gray-700"
                } focus:ring-purple-500 focus:border-purple-500 w-full py-2 px-3 rounded-md text-sm text-white`}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-xs text-gray-300 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`bg-gray-800 border ${
                  errors.lastName ? "border-red-500" : "border-gray-700"
                } focus:ring-purple-500 focus:border-purple-500 w-full py-2 px-3 rounded-md text-sm text-white`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="emailId"
              className="block text-xs text-gray-300 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="email"
                id="emailId"
                value={formData.emailId}
                onChange={handleChange}
                className={`bg-gray-800 border ${
                  errors.emailId ? "border-red-500" : "border-gray-700"
                } focus:ring-purple-500 focus:border-purple-500 w-full pl-9 py-2 rounded-md text-sm text-white`}
                placeholder="you@example.com"
              />
              {errors.emailId && (
                <p className="mt-1 text-xs text-red-400">{errors.emailId}</p>
              )}
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
                value={formData.password}
                onChange={handleChange}
                className={`bg-gray-800 border ${
                  errors.password ? "border-red-500" : "border-gray-700"
                } focus:ring-purple-500 focus:border-purple-500 w-full pl-9 py-2 rounded-md text-sm text-white`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">{errors.password}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Account"
            )}
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
