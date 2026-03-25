"use client";

import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Signup workflow activated! Since this is a hackathon scaffold, we will route you to the login demo.");
    router.push("/login");
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
          <h2 className="text-3xl font-extrabold text-[var(--color-foreground)]">Create Account</h2>
          <p className="mt-2 text-[var(--color-foreground)] opacity-70">Join the intelligence revolution today</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-[var(--color-foreground)] opacity-90 mb-2">Full Name</label>
            <input 
              type="text" 
              required 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-panel-border)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none text-[var(--color-foreground)] shadow-inner"
              placeholder="Ada Lovelace"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[var(--color-foreground)] opacity-90 mb-2">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-panel-border)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none text-[var(--color-foreground)] shadow-inner"
              placeholder="ada@example.com"
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

          <button 
            type="submit"
            className="w-full mt-6 py-4 px-4 flex justify-center items-center gap-2 rounded-xl bg-[var(--color-primary)] hover:scale-[1.02] transition-transform text-[var(--color-background)] font-extrabold text-lg ethereal-glow"
          >
            <UserPlus className="w-5 h-5" />
            Sign Up
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[var(--color-foreground)] opacity-80">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-gradient-primary hover:opacity-80">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
