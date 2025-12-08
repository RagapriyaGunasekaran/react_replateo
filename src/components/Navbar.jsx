import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar({ openAuthModal }) {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Auto-switch logo based on theme
  const logo =
    theme === "nonedible"
      ? "https://i.ibb.co/nM20FT5t/Green-Logo.jpg"
      : "https://i.ibb.co/d0NpdWn9/Logo.png";

  // Theme button colors
  const buttonColor =
    theme === "nonedible"
      ? "bg-green-700 hover:bg-green-800"
      : "bg-orange-600 hover:bg-orange-700";

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-sm">
      <nav className="w-full max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} className="h-12" alt="Replateo Logo" />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">

          <Link to="/edible" className="hover:text-orange-600">Edible</Link>
          <Link to="/non-edible" className="hover:text-orange-600">Non-Edible</Link>
          <Link to="/directory" className="hover:text-orange-600">Directory</Link>
          <Link to="/listings" className="hover:text-orange-600">Listings</Link>
          <Link to="/contact" className="hover:text-orange-600">Support</Link>

          {user && (
            <Link
              to="/dashboard"
              className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700"
            >
              Dashboard
            </Link>
          )}

          <button
            onClick={user ? logout : openAuthModal}
            className={`py-2 px-4 rounded-lg text-white ${buttonColor}`}
          >
            {user ? "Sign Out" : "Login"}
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu className="w-7 h-7" />
        </button>
      </nav>

      {/* MOBILE MENU DROPDOWN */}
      {mobileOpen && (
        <div className="md:hidden bg-white w-full shadow-inner px-6 py-4 space-y-4">

          <Link to="/edible" onClick={() => setMobileOpen(false)}>Edible</Link>
          <Link to="/non-edible" onClick={() => setMobileOpen(false)}>Non-Edible</Link>
          <Link to="/directory" onClick={() => setMobileOpen(false)}>Directory</Link>
          <Link to="/listings" onClick={() => setMobileOpen(false)}>Listings</Link>
          <Link to="/contact" onClick={() => setMobileOpen(false)}>Support</Link>

          {user && (
            <Link
              to="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="block bg-orange-600 text-white text-center py-2 rounded-lg"
            >
              Dashboard
            </Link>
          )}

          <button
            className={`block w-full py-2 text-white text-center rounded-lg ${buttonColor}`}
            onClick={() => {
              if (user) logout();
              else openAuthModal();
              setMobileOpen(false);
            }}
          >
            {user ? "Sign Out" : "Login"}
          </button>

        </div>
      )}
    </header>
  );
}
