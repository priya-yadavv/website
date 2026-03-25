"use client";

import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.ok) {
      router.push("/features");
    } else {
      alert("Invalid credentials. Use 'developer@luminacode.ai' and 'password'.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full glass-panel p-10 rounded-3xl relative overflow-hidden group shadow-2xl border-[var(--color-panel-border)]"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--color-primary)] opacity-10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform" />

        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-[var(--color-foreground)]">Welcome Back</h2>
          <p className="mt-2 text-[var(--color-foreground)] opacity-70">Sign in to access your intelligence dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-[var(--color-foreground)] opacity-90 mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-panel-border)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none text-[var(--color-foreground)] shadow-inner"
              placeholder="developer@luminacode.ai"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[var(--color-foreground)] opacity-90 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-panel-border)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none text-[var(--color-foreground)] shadow-inner"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm">
              <a href="#" className="font-semibold text-gradient-primary hover:opacity-80">Forgot your password?</a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-4 px-4 flex justify-center items-center gap-2 rounded-xl bg-[var(--color-primary)] hover:scale-[1.02] transition-transform text-[var(--color-background)] font-extrabold text-lg ethereal-glow"
          >
            <LogIn className="w-5 h-5" />
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[var(--color-foreground)] opacity-80">
          Don't have an account?{" "}
          <Link href="/signup" className="font-bold text-gradient-primary hover:opacity-80">Create one now</Link>
        </p>
      </motion.div>
    </div>
  );
}
