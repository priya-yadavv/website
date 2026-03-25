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

      console.log("SIGNUP RESPONSE:", data); // 🔥 DEBUG

      if (!res.ok) {
        alert(data.message || "Signup failed ❌");
        return;
      }

      alert("Signup successful ✅");
      router.push("/login");

    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4">
      <motion.div className="max-w-md w-full p-10 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded flex justify-center items-center gap-2 disabled:opacity-50"
          >
            <UserPlus className="w-5 h-5" />
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}