"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔥 check login on load
  useEffect(() => {
    checkLogin();
  }, []);

  // 🔥 ALSO re-check when page changes
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
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black text-white">

      <div className="font-bold text-lg">LuminaCode</div>

      <div className="flex gap-6 items-center">
        <Link href="/">Home</Link>
        <Link href="/features">Features</Link>
        <Link href="/help">Help</Link>
        <Link href="/feedback">Feedback</Link>

        {!isLoggedIn ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        ) : (
          <>
            <button onClick={handleLogout} className="text-red-400">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}