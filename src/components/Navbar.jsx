import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
const aps = process.env.REACT_APP_API_URL;
export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-lg font-bold tracking-wide">
          XNote
        </Link>

        {/* Hamburger button (mobile only) */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:underline">Notes</Link>
          {user ? (
            <>
              <Link to="/profile" className="hover:underline">Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1 rounded-lg hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-blue-700 px-4 pb-3 flex flex-col gap-3">
          <Link to="/" className="hover:underline" onClick={() => setOpen(false)}>Notes</Link>
          {user ? (
            <>
              <Link to="/profile" className="hover:underline" onClick={() => setOpen(false)}>Profile</Link>
              <button
                onClick={() => { handleLogout(); setOpen(false); }}
                className="bg-white text-blue-600 px-3 py-1 rounded-lg hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/register" className="hover:underline" onClick={() => setOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
