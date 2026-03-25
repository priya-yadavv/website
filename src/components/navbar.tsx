"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes"; // ✅ added

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ theme hook
  const { theme, setTheme } = useTheme();

  // check login on load
  useEffect(() => {
    checkLogin();
  }, []);

  // re-check when storage changes
  useEffect(() => {
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const checkLogin = () => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black/80 backdrop-blur-md border-b border-white/10">

      {/* 🔥 LOGO */}
      <Link href="/" className="flex items-center gap-2 text-white">
        <span className="text-2xl">&lt;/&gt;</span>
        <span className="text-xl font-bold">LuminaCode</span>
      </Link>

      {/* 🔥 NAV LINKS */}
      <div className="flex gap-6 items-center">
        <Link href="/" className="text-white/80 hover:text-white">
          Home
        </Link>
        <Link href="/features" className="text-white/80 hover:text-white">
          Features
        </Link>
        <Link href="/help" className="text-white/80 hover:text-white">
          Help
        </Link>
        <Link href="/feedback" className="text-white/80 hover:text-white">
          Feedback
        </Link>

        {/* 🌙 THEME TOGGLE */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-white border px-2 py-1 rounded"
        >
          Toggle
        </button>

        {/* 🔐 AUTH */}
        {!isLoggedIn ? (
          <>
            <Link href="/login" className="text-white/80 hover:text-white">
              Login
            </Link>
            <Link href="/signup" className="text-white/80 hover:text-white">
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}