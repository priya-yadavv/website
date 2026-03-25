"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 👉 check login (simple version)
    const user = localStorage.getItem("user");
    if (user) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black text-white px-6 py-4 flex justify-between items-center">
      
      {/* LEFT */}
      <div className="font-bold text-lg">LuminaCode</div>

      {/* RIGHT */}
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
            <Link href="/features">Dashboard</Link>
            <button onClick={handleLogout} className="text-red-400">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}