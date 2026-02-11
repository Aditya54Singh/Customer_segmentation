import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/login", {
        email,
        password
      });

      // Store JWT token
      localStorage.setItem("token", res.data.token);

      navigate("/home");

    } catch (err) {
      setError(
        err.response?.data?.error || "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-gray-50"
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Login to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl
                       font-semibold hover:bg-indigo-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </motion.div>
  );
}

export default Login;
