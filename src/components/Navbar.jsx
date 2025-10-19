import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Trash2, Archive } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    setOpen(false);
  };

  const linkClass = (path) =>
    `hover:underline flex items-center gap-1 ${location.pathname === path ? "underline font-bold" : ""}`;

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-lg font-bold tracking-wide">XNote</Link>

        {/* Hamburger button (mobile only) */}
        <button aria-label="Toggle menu" className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className={linkClass("/")}>Notes</Link>
          <Link to="/archive" className={linkClass("/archive")}>
            <Archive className="w-4 h-4" /> Archive
          </Link>
          <Link to="/trash" className={linkClass("/trash")}>
            <Trash2 className="w-4 h-4" /> Trash
          </Link>
          {user ? (
            <>
              <Link to="/profile" className={linkClass("/profile")}>Profile</Link>
              <button onClick={handleLogout} className="bg-white text-blue-600 px-3 py-1 rounded-lg hover:bg-gray-100">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkClass("/login")}>Login</Link>
              <Link to="/register" className={linkClass("/register")}>Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "500px" : "0" }}
      >
        <div className="bg-blue-700 px-4 pb-3 flex flex-col gap-3">
          <Link to="/" className={linkClass("/")} onClick={() => setOpen(false)}>Notes</Link>
          <Link to="/archive" className={linkClass("/archive")} onClick={() => setOpen(false)}>
            <Archive className="w-4 h-4" /> Archive
          </Link>
          <Link to="/trash" className={linkClass("/trash")} onClick={() => setOpen(false)}>
            <Trash2 className="w-4 h-4" /> Trash
          </Link>
          {user ? (
            <>
              <Link to="/profile" className={linkClass("/profile")} onClick={() => setOpen(false)}>Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1 rounded-lg hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkClass("/login")} onClick={() => setOpen(false)}>Login</Link>
              <Link to="/register" className={linkClass("/register")} onClick={() => setOpen(false)}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
