import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  // Theme-aware logo
  const logo =
    theme === "nonedible"
      ? "https://i.ibb.co/nM20FT5t/Green-Logo.jpg"
      : "https://i.ibb.co/d0NpdWn9/Logo.png";

  // Theme-aware Login/Logout button color
  const buttonClass =
    theme === "nonedible"
      ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-400/40"
      : "bg-orange-600 hover:bg-orange-700 shadow-orange-400/40";

  return (
    <header className="
      w-full fixed top-0 left-0 z-50 
      backdrop-blur-xl bg-white/40 border-b border-white/30
      shadow-lg shadow-orange-300/20
    ">
      <nav className="w-full max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO (not a link) */}
        <div className="flex items-center gap-2">
          <img src={logo} className="h-12 rounded-lg shadow-md" alt="Replateo Logo" />
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 font-medium">

          {/* HOME Link - as requested */}
          <Link
            to="/"
            className={`hover:text-orange-700 transition ${
              location.pathname === "/" ? "text-orange-700 font-semibold" : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/edible"
            className="hover:text-orange-700 transition"
          >
            Edible
          </Link>

          <Link
            to="/non-edible"
            className="hover:text-orange-700 transition"
          >
            Non-Edible
          </Link>

          <Link
            to="/directory"
            className="hover:text-orange-700 transition"
          >
            Directory
          </Link>

          <Link
            to="/listings"
            className="hover:text-orange-700 transition"
          >
            Listings
          </Link>

          <Link
            to="/contact"
            className="hover:text-orange-700 transition"
          >
            Support
          </Link>

          {/* DASHBOARD LINK IF LOGGED IN */}
          {user && (
            <Link
              to="/dashboard"
              className="
                px-4 py-2 rounded-xl text-white
                bg-orange-500 hover:bg-orange-600 shadow-md
                transition
              "
            >
              Dashboard
            </Link>
          )}

          {/* LOGIN / LOGOUT BUTTON */}
          <button
            onClick={user ? logout : () => (window.location.href = "/auth")}
            className={`px-4 py-2 rounded-xl text-white shadow-md transition ${buttonClass}`}
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-orange-800"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu className="w-7 h-7" />
        </button>
      </nav>

      {/* MOBILE MENU DROPDOWN */}
      {mobileOpen && (
        <div className="
          md:hidden bg-white/60 backdrop-blur-xl border-b border-white/30 
          shadow-lg shadow-orange-300/20 px-6 py-4 space-y-4 font-medium
        ">

          <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/edible" onClick={() => setMobileOpen(false)}>Edible</Link>
          <Link to="/non-edible" onClick={() => setMobileOpen(false)}>Non-Edible</Link>
          <Link to="/directory" onClick={() => setMobileOpen(false)}>Directory</Link>
          <Link to="/listings" onClick={() => setMobileOpen(false)}>Listings</Link>
          <Link to="/contact" onClick={() => setMobileOpen(false)}>Support</Link>

          {user && (
            <Link
              to="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="block bg-orange-600 text-white text-center py-2 rounded-xl"
            >
              Dashboard
            </Link>
          )}

          <button
            onClick={() => {
              if (user) logout();
              else window.location.href = "/auth";
              setMobileOpen(false);
            }}
            className={`w-full py-2 rounded-xl text-white shadow-md ${buttonClass}`}
          >
            {user ? "Logout" : "Login"}
          </button>

        </div>
      )}
    </header>
  );
}
