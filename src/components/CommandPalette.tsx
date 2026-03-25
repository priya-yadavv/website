"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Code2, Home, Search, FileCode, MessageSquarePlus } from "lucide-react";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setOpen(false)}>
      <div className="bg-[var(--color-background)] border border-[var(--color-panel-border)] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        <Command className="w-full">
          <div className="flex items-center border-b border-[var(--color-panel-border)] px-4 py-4 gap-3 bg-[var(--color-panel)]">
            <Search className="w-5 h-5 text-[var(--color-foreground)] opacity-50" />
            <Command.Input 
              placeholder="Type a command or search..." 
              className="w-full bg-transparent border-none outline-none text-[var(--color-foreground)] placeholder:text-[var(--color-foreground)]/30 font-medium text-lg"
              autoFocus
            />
          </div>
          <Command.List className="max-h-[350px] overflow-y-auto p-2 bg-[var(--color-background)]">
            <Command.Empty className="p-4 text-center text-sm text-[var(--color-foreground)]/50 font-medium py-10">No results found.</Command.Empty>

            <Command.Group heading="Navigation" className="px-2 py-3 text-xs font-bold text-[var(--color-foreground)]/40 uppercase tracking-widest">
              <Command.Item onSelect={() => { router.push("/features"); setOpen(false); }} className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-[var(--color-foreground)] rounded-lg hover:bg-[var(--color-panel-border)] cursor-pointer aria-selected:bg-[var(--color-panel-border)] transition-colors">
                <Code2 className="w-4 h-4 text-[var(--color-primary)]" /> Launch Analyzer
              </Command.Item>
              <Command.Item onSelect={() => { router.push("/"); setOpen(false); }} className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-[var(--color-foreground)] rounded-lg hover:bg-[var(--color-panel-border)] cursor-pointer aria-selected:bg-[var(--color-panel-border)] transition-colors mt-1">
                <Home className="w-4 h-4 text-[var(--color-primary)]" /> Return Home
              </Command.Item>
              <Command.Item onSelect={() => { router.push("/help"); setOpen(false); }} className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-[var(--color-foreground)] rounded-lg hover:bg-[var(--color-panel-border)] cursor-pointer aria-selected:bg-[var(--color-panel-border)] transition-colors mt-1">
                <FileCode className="w-4 h-4 text-[var(--color-primary)]" /> Documentation & FAQs
              </Command.Item>
              <Command.Item onSelect={() => { router.push("/feedback"); setOpen(false); }} className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-[var(--color-foreground)] rounded-lg hover:bg-[var(--color-panel-border)] cursor-pointer aria-selected:bg-[var(--color-panel-border)] transition-colors mt-1">
                <MessageSquarePlus className="w-4 h-4 text-[var(--color-primary)]" /> Submit Feedback
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Settings" className="px-2 pt-4 pb-2 text-xs font-bold text-[var(--color-foreground)]/40 uppercase tracking-widest border-t border-[var(--color-panel-border)]/50 mt-2">
              <Command.Item onSelect={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); setOpen(false); }} className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-[var(--color-foreground)] rounded-lg hover:bg-[var(--color-panel-border)] cursor-pointer aria-selected:bg-[var(--color-panel-border)] transition-colors">
                {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-slate-500" />} 
                Toggle Light/Dark Theme
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
        
        <div className="bg-[var(--color-panel)] px-4 py-3 border-t border-[var(--color-panel-border)] text-xs text-[var(--color-foreground)]/40 flex justify-between font-medium">
           <span>Use <span className="font-sans font-bold text-[var(--color-foreground)]/70">↑</span> <span className="font-sans font-bold text-[var(--color-foreground)]/70">↓</span> to navigate</span>
           <span><span className="font-mono bg-[var(--color-background)] px-1.5 py-0.5 rounded border border-[var(--color-panel-border)] text-[var(--color-foreground)]/70 mr-1 shadow-sm">ESC</span> to close</span>
        </div>
      </div>
    </div>
  );
}
