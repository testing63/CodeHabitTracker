import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { SnackbarContext } from "../context/SnackbarContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Auth = () => {
  const { login, register, loading } = useContext(AuthContext);
  const { showSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        await register(form.name, form.email, form.password);
        showSnackbar("Registration successful 🎉", "success");
      } else {
        await login(form.email, form.password);
        showSnackbar("Login successful 🎉", "success");
      }

      navigate("/dashboard");
    } catch (error) {
      showSnackbar(
        error.response?.data?.message ||
          (isRegister ? "Registration failed" : "Login failed"),
        "error",
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      {loading && <Loader />}

      {/* LEFT PANEL (UNCHANGED) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Code Habit Tracker</h1>
          <p className="text-lg opacity-90">
            Track your coding consistency, analyze productivity, and build
            unstoppable habits.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <motion.form
          layout
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="relative bg-white p-10 rounded-3xl shadow-2xl w-[420px] border border-gray-100">
          {/* Soft Glow Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-100 to-purple-100 opacity-20 blur-2xl -z-10"></div>

          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            {isRegister ? "Create Account 🚀" : "Welcome Back 👋"}
          </h2>

          {/* Smooth Animated Name Field */}
          <AnimatePresence>
            {isRegister && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full mb-4 px-4 py-3 border rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </motion.div>
            )}
          </AnimatePresence>

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-3 border rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-3 border rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white py-3 rounded-xl transition duration-300 shadow-md hover:shadow-lg">
            {isRegister ? "Register" : "Login"}
          </button>

          <p className="mt-5 text-sm text-center text-gray-600">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-indigo-600 cursor-pointer font-semibold hover:underline">
              {isRegister ? "Login" : "Register"}
            </button>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Auth;
