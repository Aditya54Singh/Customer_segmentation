import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const baseLink =
    "px-4 py-2 rounded-lg text-sm font-medium transition duration-200";

  const inactive =
    "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50";

  const active =
    "text-indigo-600 bg-indigo-100";

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo / App Name */}
        <div
          onClick={() => navigate("/home")}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            CS
          </div>
          <span className="text-lg font-semibold text-gray-800">
            Customer Segmentation
          </span>
        </div>

        {/* Nav Links */}
        <div className="flex items-center space-x-3">

          <NavLink
            to="/home"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/predict"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            Predict
          </NavLink>

          <NavLink
            to="/bulk-predict"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            Bulk Predict
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            History
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            About
          </NavLink>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-300 mx-2" />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition duration-200"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
