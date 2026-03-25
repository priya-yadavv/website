"use client";

import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import { ThemeSwitcher } from './ThemeSwitcher';
import { Code2 } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-[var(--color-panel-border)] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-3">
              <Code2 className="w-8 h-8 text-[var(--color-primary)]" />
              <span className="text-3xl font-extrabold tracking-tighter text-gradient-primary">LuminaCode</span>
            </Link>
            {session && (
              <div className="hidden md:flex gap-6 items-center">
                <Link href="/" className="text-[var(--color-foreground)] opacity-80 hover:opacity-100 hover:text-[var(--color-primary)] transition-all text-sm font-semibold tracking-wide">Home</Link>
                <Link href="/features" className="text-[var(--color-foreground)] opacity-80 hover:opacity-100 hover:text-[var(--color-primary)] transition-all text-sm font-semibold tracking-wide">Features</Link>
                <Link href="/help" className="text-[var(--color-foreground)] opacity-80 hover:opacity-100 hover:text-[var(--color-primary)] transition-all text-sm font-semibold tracking-wide">Help</Link>
                <Link href="/feedback" className="text-[var(--color-foreground)] opacity-80 hover:opacity-100 hover:text-[var(--color-primary)] transition-all text-sm font-semibold tracking-wide">Feedback</Link>
              </div>
            )}
          </div>
          <div className="flex items-center gap-6">
            <ThemeSwitcher />
            {session ? (
              <button 
                onClick={() => signOut()} 
                className="px-6 py-2.5 rounded-full bg-[var(--color-primary)] text-[var(--color-background)] font-bold text-sm hover:scale-105 transition-transform ethereal-glow shadow-md"
              >
                Sign Out
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-[var(--color-foreground)] opacity-80 hover:opacity-100 transition-opacity text-sm font-semibold hidden sm:block">
                  Log In
                </Link>
                <Link href="/signup" className="text-[var(--color-foreground)] opacity-80 hover:opacity-100 transition-opacity text-sm font-semibold hidden sm:block">
                  Sign Up
                </Link>
                <Link href="/login" className="px-6 py-2.5 rounded-full bg-[var(--color-primary)] text-[var(--color-background)] font-bold text-sm hover:scale-105 transition-transform ethereal-glow shadow-md">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
