"use client";

import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed ❌");
        return;
      }

      alert("Signup successful ✅");

      // 👉 redirect after signup
      router.push("/login");

    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg p-10 rounded-3xl shadow-2xl border 
                   bg-white/10 backdrop-blur-xl"
      >

        {/* TITLE */}
        <h2 className="text-4xl font-extrabold text-center mb-6">
          Create Account 🚀
        </h2>

        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-5">

          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl border outline-none 
                       focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl border outline-none 
                       focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-black text-white 
                       font-bold flex items-center justify-center gap-2
                       hover:scale-[1.02] transition
                       disabled:opacity-50"
          >
            <UserPlus className="w-5 h-5" />
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold underline">
            Login
          </Link>
        </p>

      </motion.div>
    </div>
  );
}