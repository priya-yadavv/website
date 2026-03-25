"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bot, Star, ThumbsUp, Lightbulb, Frown, HelpCircle } from "lucide-react";
import { useState } from "react";

const QUICK_REPLIES = [
  { id: "helpful", label: "Very Helpful", icon: ThumbsUp, color: "text-emerald-500", bg: "bg-emerald-500/10", activeBg: "bg-emerald-500" },
  { id: "improve", label: "Needs Improvement", icon: Lightbulb, color: "text-amber-500", bg: "bg-amber-500/10", activeBg: "bg-amber-500" },
  { id: "confusing", label: "Confusing", icon: Frown, color: "text-orange-500", bg: "bg-orange-500/10", activeBg: "bg-orange-500" },
  { id: "suggest", label: "Have Suggestions", icon: HelpCircle, color: "text-blue-500", bg: "bg-blue-500/10", activeBg: "bg-blue-500" },
];

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
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
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 relative">

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full p-10 rounded-3xl shadow-2xl border bg-white/10 backdrop-blur-md"
      >
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10"
            >
              <Bot className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Thanks for your feedback 🚀</h2>
              <p className="text-gray-400 mt-2">
                This helps improve the system
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* 🤖 Header */}
              <div className="text-center">
                <Bot className="w-12 h-12 mx-auto mb-3" />

                <h2 className="text-2xl font-bold">
                  Share your feedback 💬
                </h2>

                {/* ✅ HUMAN THINKING LINE (FIXED POSITION) */}
                <p className="text-gray-400 mt-2 text-sm italic">
                  I'm learning from your thoughts...
                </p>
              </div>

              {/* ⭐ Rating */}
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={`w-8 h-8 transition ${
                        (hoverRating || rating) >= star
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* 💬 Quick options */}
              <div className="grid grid-cols-2 gap-3">
                {QUICK_REPLIES.map((reply) => {
                  const isSelected = quickLabel === reply.id;

                  return (
                    <button
                      key={reply.id}
                      type="button"
                      onClick={() =>
                        setQuickLabel(isSelected ? null : reply.id)
                      }
                      className={`p-3 rounded-xl border flex items-center gap-2 text-sm transition ${
                        isSelected
                          ? `${reply.activeBg} text-white`
                          : `${reply.bg} ${reply.color}`
                      }`}
                    >
                      <reply.icon className="w-4 h-4" />
                      {reply.label}
                    </button>
                  );
                })}
              </div>

              {/* 📝 Textarea */}
              <textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder="Write your feedback..."
                className="w-full p-4 rounded-xl border bg-transparent outline-none"
              />

              {/* 🚀 Submit */}
              <button
                type="submit"
                disabled={!rating && !quickLabel && !suggestion.trim()}
                className="w-full bg-black text-white py-3 rounded-xl disabled:opacity-50"
              >
                Submit Feedback
              </button>

            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}