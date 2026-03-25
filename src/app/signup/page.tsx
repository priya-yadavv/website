"use client";

import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Signup successful");
      router.push("/login");
    } else {
      alert("Signup failed");
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

          <button className="w-full bg-black text-white p-3 rounded flex justify-center items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Signup
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}