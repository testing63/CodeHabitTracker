import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { SnackbarContext } from "../context/SnackbarContext";
import Loader from "../components/Loader";

const Login = () => {
  const { login, loading } = useContext(AuthContext);
  const { showSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      showSnackbar("Login successful 🎉", "success");
      navigate("/dashboard");
    } catch (error) {
      showSnackbar(error.response?.data?.message || "Login failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex">
      {loading && <Loader />}

      {/* Left Side */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Code Habit Tracker</h1>
          <p className="text-lg opacity-90">
            Track your coding consistency, analyze productivity, and build
            unstoppable habits.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-2xl shadow-xl w-[400px]">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Welcome Back 👋
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-300">
            Login
          </button>

          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 font-medium">
              Register
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Login;
