"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-black text-white">
      
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        LuminaCode
      </Link>

      <div className="flex gap-6 items-center">
        {/* ALWAYS visible */}
        <Link href="/">Home</Link>
        <Link href="/features">Features</Link>
        <Link href="/help">Help</Link>
        <Link href="/feedback">Feedback</Link>

        {/* AUTH LOGIC */}
        {session ? (
          <button
            onClick={() => signOut()}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}