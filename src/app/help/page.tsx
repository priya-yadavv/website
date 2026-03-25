"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Bot, Code2, Zap, MessageSquare, Lightbulb, PlayCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

// 📚 Help Constraints (Card Style)
const HELP_CARDS = [
  {
    id: "analysis",
    icon: Code2,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    title: "How does code analysis work?",
    content: "Simply paste your script into the code editor on the Features page. Click 'Analyze', and I will scan your syntax, measure logical complexity, and assign a quality score instantly! You'll get step-by-step suggestions on how to improve your architecture."
  },
  {
    id: "fix",
    icon: Zap,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    title: "How to fix errors?",
    content: "If your code is broken, don't panic! Click the orange 'Fix Errors' button. I will automatically detect the bugs, explain exactly why they are failing, and directly project a fully corrected, drop-in replacement script for you to use."
  },
  {
    id: "chat",
    icon: MessageSquare,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    title: "How to use chat with code?",
    content: "After running an analysis or a fix, a dedicated 'Chat with AI' input will automatically appear at the bottom of the feed. You can ask follow-up questions like 'Why did you change that variable?'—and I will remember the exact code context we are working on!"
  },
  {
    id: "tips",
    icon: Lightbulb,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    title: "Tips to improve your code",
    content: "1. Always name your variables clearly. 2. Lean on the 'Optimize' button to refactor long loops into modern, concise syntax. 3. Choose the 'Explain' button if you are learning a new framework to get a beginner-friendly code breakdown."
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openCardId, setOpenCardId] = useState<string | null>(null);

  // 💡 Smart Search Filter
  const filteredCards = HELP_CARDS.filter(card => 
    card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    card.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[var(--color-background)]">
      {/* Soft Gradient Background Aura */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--color-primary)]/10 via-[var(--color-background)] to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-12 relative z-10">
        
        {/* 🤖 AI Assistant Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-6"
        >
          {/* Friendly Glowing Robot Illustration */}
          <div className="relative group cursor-default">
            <div className="absolute inset-0 bg-[var(--color-primary)] opacity-20 blur-3xl rounded-full animate-pulse group-hover:opacity-40 transition-opacity" />
            <div className="w-24 h-24 rounded-full bg-[var(--color-background-accent)] border border-[var(--color-primary)]/30 flex items-center justify-center shadow-2xl relative z-10">
               <Bot className="w-12 h-12 text-[var(--color-primary)]" />
            </div>
            {/* Thinking Particles */}
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -top-1 right-0 w-3 h-3 bg-[var(--color-secondary)]/80 rounded-full shadow-[0_0_10px_var(--color-secondary)]" />
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }} className="absolute top-4 -left-2 w-2 h-2 bg-[var(--color-primary)]/80 rounded-full shadow-[0_0_8px_var(--color-primary)]" />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-foreground)]">
              Hi! I'm your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">AI assistant.</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--color-foreground-muted)] font-medium">
              How can I help you today?
            </p>
          </div>
        </motion.div>

        {/* 💡 Smart Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative w-full max-w-xl mx-auto z-20"
        >
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[var(--color-foreground-muted)]" />
          </div>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => {
               setSearchQuery(e.target.value);
               if (e.target.value !== "") setOpenCardId(null);
            }}
            placeholder="Ask a question..."
            className="w-full pl-14 pr-4 py-4 rounded-2xl bg-[var(--color-background-accent)] border border-black/10 dark:border-white/10 text-[var(--color-foreground)] shadow-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all placeholder:text-[var(--color-foreground-muted)]/60 font-medium text-lg"
          />
        </motion.div>

        {/* 📚 Help Options (Clickable Cards) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-4"
        >
           <AnimatePresence>
             {filteredCards.length === 0 ? (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
                 <p className="text-[var(--color-foreground-muted)] font-medium text-lg">No direct matches found. Try clicking our Quick Demo below!</p>
               </motion.div>
             ) : (
               filteredCards.map((card, idx) => {
                 const isOpen = openCardId === card.id;
                 return (
                   <motion.div 
                     layout
                     key={card.id}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.98 }}
                     transition={{ duration: 0.2, delay: idx * 0.05 }}
                     className={`w-full overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? 'bg-[var(--color-background-accent)] border-[var(--color-primary)]/40 shadow-lg' : 'bg-[var(--color-background-accent)] border-black/5 dark:border-white/5 shadow-sm hover:border-black/20 dark:hover:border-white/20 hover:shadow-md cursor-pointer'}`}
                   >
                     <button 
                       onClick={() => setOpenCardId(isOpen ? null : card.id)}
                       className="w-full text-left px-5 sm:px-6 py-5 flex items-center justify-between outline-none"
                     >
                        <div className="flex items-center gap-4">
                           <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${card.bg} ${card.color} ${card.border} shadow-inner`}>
                             <card.icon className="w-6 h-6" />
                           </div>
                           <h3 className={`font-bold text-lg sm:text-xl ${isOpen ? 'text-[var(--color-foreground)]' : 'text-[var(--color-foreground)]/80'}`}>
                             {card.title}
                           </h3>
                        </div>
                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-[var(--color-foreground-muted)] ml-2">
                          <ChevronDown className="w-5 h-5" />
                        </motion.div>
                     </button>
                     
                     <AnimatePresence>
                       {isOpen && (
                         <motion.div 
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: "auto", opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="overflow-hidden"
                         >
                           <div className="px-6 pb-6 pt-2 pl-[88px]">
                             <p className="text-[var(--color-foreground-muted)] leading-relaxed font-medium text-base sm:text-lg">
                               {card.content}
                             </p>
                           </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </motion.div>
                 );
               })
             )}
           </AnimatePresence>
        </motion.div>

        {/* 🎥 Quick Demo Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 w-full p-8 rounded-3xl bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent border border-[var(--color-primary)]/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden group"
        >
          {/* Lightning hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-primary)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

          <div className="flex flex-col gap-2 z-10 text-center sm:text-left text-[var(--color-foreground)]">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[var(--color-primary)] font-bold tracking-wide">
              <PlayCircle className="w-5 h-5" /> QUICK DEMO
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">Try a sample code</h2>
            <p className="text-[var(--color-foreground-muted)] font-medium max-w-sm text-lg mt-1">Experience my intelligence instantly. See how I identify bugs, explain execution loops, and rewrite syntax!</p>
          </div>
          
          <Link href="/features" className="z-10 group/btn bg-[var(--color-primary)] text-[var(--color-background)] px-8 py-4 rounded-full font-bold shadow-xl shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/40 hover:-translate-y-1 hover:scale-105 transition-all flex items-center gap-2 text-lg">
            Launch Platform <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
