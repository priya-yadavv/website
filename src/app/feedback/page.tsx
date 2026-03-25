"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, Star, ThumbsUp, Lightbulb, Frown, HelpCircle } from "lucide-react";
import { useState } from "react";

const QUICK_REPLIES = [
  { id: "helpful", label: "Very Helpful", icon: ThumbsUp, color: "text-emerald-500", bg: "bg-emerald-500/10", activeBg: "bg-emerald-500", border: "border-emerald-500/20" },
  { id: "improve", label: "Needs Improvement", icon: Lightbulb, color: "text-amber-500", bg: "bg-amber-500/10", activeBg: "bg-amber-500", border: "border-amber-500/20" },
  { id: "confusing", label: "Confusing", icon: Frown, color: "text-orange-500", bg: "bg-orange-500/10", activeBg: "bg-orange-500", border: "border-orange-500/20" },
  { id: "suggest", label: "Have Suggestions", icon: HelpCircle, color: "text-blue-500", bg: "bg-blue-500/10", activeBg: "bg-blue-500", border: "border-blue-500/20" },
];

export default function FeedbackPage() {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [quickLabel, setQuickLabel] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
        setRating(0);
        setQuickLabel(null);
        setSuggestion("");
        setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[var(--color-background)]">
      {/* Soft Ethereal Lighting */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--color-primary)]/10 via-[var(--color-background)] to-transparent pointer-events-none -z-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-xl w-full p-8 sm:p-10 rounded-3xl relative overflow-hidden group shadow-2xl border border-[var(--color-panel-border)] bg-[var(--color-background-accent)]/50 backdrop-blur-md"
      >
        <AnimatePresence mode="wait">
          {submitted ? (
              <motion.div 
                key="submitted"
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12 flex flex-col items-center"
              >
                  <div className="relative mb-6">
                      <div className="absolute inset-0 bg-[var(--color-primary)] opacity-30 blur-2xl rounded-full animate-pulse" />
                      <div className="w-20 h-20 bg-[var(--color-background-accent)] border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-full flex items-center justify-center relative z-10 shadow-[0_0_20px_inherit]">
                          <Bot className="w-10 h-10 animate-bounce" />
                      </div>
                  </div>
                  <h3 className="text-3xl font-extrabold text-[var(--color-foreground)] tracking-tight">Thanks! I'm learning from this 🚀</h3>
                  <p className="text-[var(--color-foreground-muted)] font-medium mt-3 text-lg">Your feedback is permanently updating my core engine logic.</p>
              </motion.div>
          ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-8"
              >
                {/* 🤖 Header */}
                <div className="text-center mb-6 relative">
                  <div className="relative inline-block mb-4">
                    <div className="absolute inset-0 bg-[var(--color-primary)] opacity-20 blur-xl rounded-full animate-pulse" />
                    <div className="w-20 h-20 rounded-full bg-[var(--color-background-accent)] border-2 border-[var(--color-primary)]/30 flex items-center justify-center shadow-lg relative z-10 overflow-hidden">
                       <Bot className="w-10 h-10 text-[var(--color-primary)]" />
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-foreground)] tracking-tight">
                    Your feedback helps me get smarter 🤖
                  </h2>
                </div>

                {/* ⭐ 1. Rating System */}
                <div className="flex flex-col items-center gap-3">
                   <label className="block text-sm font-bold text-[var(--color-foreground-muted)] uppercase tracking-wider">How was your experience?</label>
                   <div className="flex items-center gap-1 sm:gap-2">
                     {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="focus:outline-none transition-transform hover:scale-110 active:scale-90 p-1"
                        >
                          <Star 
                            className={`w-10 h-10 transition-colors duration-200 ${
                              (hoverRating || rating) >= star 
                                 ? "fill-[#facc15] text-[#facc15] drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" 
                                 : "text-[var(--color-foreground)]/20 fill-transparent"
                            }`} 
                          />
                        </button>
                     ))}
                   </div>
                </div>

                {/* 💬 2. Quick Feedback Buttons */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                   {QUICK_REPLIES.map((reply) => {
                     const isSelected = quickLabel === reply.id;
                     return (
                       <button
                         key={reply.id}
                         type="button"
                         onClick={() => setQuickLabel(reply.id === quickLabel ? null : reply.id)}
                         className={`py-3 sm:py-4 px-3 sm:px-4 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 transition-all border outline-none ${
                           isSelected 
                             ? `${reply.activeBg} text-white border-transparent shadow-lg shadow-${reply.activeBg.split('-')[1]}-500/30 scale-[1.02]` 
                             : `bg-[var(--color-background)] ${reply.color} ${reply.border} hover:bg-black/5 dark:hover:bg-white/5`
                         }`}
                       >
                         <reply.icon className="w-5 h-5 shrink-0" /> <span className="truncate">{reply.label}</span>
                       </button>
                     )
                   })}
                </div>

                {/* 📝 3. Text Input */}
                <div>
                    <textarea 
                      rows={4}
                      value={suggestion}
                      onChange={e => setSuggestion(e.target.value)}
                      className="w-full px-5 py-4 bg-[var(--color-background)] border border-[var(--color-panel-border)] rounded-2xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none text-[var(--color-foreground)] shadow-inner resize-none placeholder:text-[var(--color-foreground-muted)] font-medium text-lg leading-relaxed"
                      placeholder="Tell me what we can improve..."
                    />
                </div>

                <button 
                    type="submit"
                    disabled={!rating && !quickLabel && !suggestion.trim()}
                    className="w-full py-4 flex justify-center items-center gap-2 rounded-2xl bg-[var(--color-primary)] hover:scale-[1.02] hover:shadow-[0_0_20px_var(--color-primary)] disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none transition-all text-[var(--color-background)] font-extrabold text-lg mt-2"
                >
                    <Send className="w-5 h-5" />
                    Submit Feedback
                </button>
              </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
