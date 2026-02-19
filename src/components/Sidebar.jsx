import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Analytics", path: "/analytics" },
  ];

  return (
    <motion.div
      initial={{ x: -120 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4 }}
      className="hidden md:flex flex-col w-64 bg-white shadow-xl p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-10 tracking-tight">
        CodeTracker
      </h2>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full text-left px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 
                ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
                }`}>
              {item.name}
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
};

export default Sidebar;
