import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { SnackbarContext } from "../context/SnackbarContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { showSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const Name = localStorage.getItem("Name");

  if (!Name) {
    navigate("/login");
  }

  const handleLogout = async () => {
    await logout();
    showSnackbar("Logged out successfully 👋", "info");
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Dashboard
        </h1>

        <div className="flex items-center gap-6">
          {/* User Section */}
          <div className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 transition-all duration-200 px-4 py-2 rounded-full shadow-sm border border-gray-200">
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-md">
              {Name.charAt(0)?.toUpperCase()}
            </div>

            <span className="text-gray-800 font-medium text-sm tracking-wide">
              {Name}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg active:scale-95 transition-all cursor-pointer  duration-200">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
