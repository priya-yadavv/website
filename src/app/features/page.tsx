"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Copy, CheckCircle2, AlertTriangle, XCircle, Send, Bot, Check, Zap, BookOpen, ArrowRightLeft, Bug } from "lucide-react";
import Typewriter from "@/components/Typewriter";
import { useTheme } from "next-themes";
import Image from "next/image";

const LANGUAGES = [
  "JavaScript", "Python", "Java", "C++", "C", 
  "TypeScript", "Go", "Rust", "PHP", "Swift", "Kotlin", "Auto Detect"
];

const DEFAULT_SNIPPET = `// Welcome to LuminaCode!
// Paste your software here, or test my intelligence with this snippet:

function processMetrics(data) {
  let sum = 0;
  for(let i=0; i < data.length; i++) {
    sum += data[i].value;
  }
  return sum;
}`;

export default function FeaturesPage() {
  const [code, setCode] = useState(DEFAULT_SNIPPET);
  const [language, setLanguage] = useState("JavaScript");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [followUp, setFollowUp] = useState("");
  const [chats, setChats] = useState<{question: string, answer: string}[]>([]);
  const [isChatting, setIsChatting] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  type ActionType = "analyze" | "fix" | "optimize" | "explain" | "convert" | "audit";
  const [selectedAction, setSelectedAction] = useState<ActionType>("analyze");

  const ACTION_CONFIGS: Record<ActionType, { id: ActionType, label: string, icon: any, loading: string, title: string, activeClass: string, inactiveClass: string, accentText: string, borderColor: string }> = {
    analyze: { id: "analyze", label: "Analyze", icon: Play, loading: "Analyzing your code...", title: "Code Quality", activeClass: "bg-[var(--color-primary)] text-[var(--color-background)] border-[var(--color-primary)] shadow-md", inactiveClass: "bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20 hover:bg-[var(--color-primary)]/20", accentText: "text-[var(--color-primary)]", borderColor: "border-[var(--color-primary)]" },
    fix: { id: "fix", label: "Fix Errors", icon: AlertTriangle, loading: "Fixing errors...", title: "Fixed Code", activeClass: "bg-orange-500 text-white border-orange-500 shadow-md", inactiveClass: "bg-orange-500/10 text-orange-600 border-orange-500/20 hover:bg-orange-500/20", accentText: "text-orange-500", borderColor: "border-orange-500" },
    optimize: { id: "optimize", label: "Optimize", icon: Zap, loading: "Optimizing performance...", title: "Optimized Code", activeClass: "bg-emerald-500 text-white border-emerald-500 shadow-md", inactiveClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20", accentText: "text-emerald-500", borderColor: "border-emerald-500" },
    explain: { id: "explain", label: "Explain", icon: BookOpen, loading: "Breaking it down...", title: "Code Explanation", activeClass: "bg-blue-500 text-white border-blue-500 shadow-md", inactiveClass: "bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20", accentText: "text-blue-500", borderColor: "border-blue-500" },
    convert: { id: "convert", label: "Convert", icon: ArrowRightLeft, loading: "Converting code...", title: "Converted Code", activeClass: "bg-purple-500 text-white border-purple-500 shadow-md", inactiveClass: "bg-purple-500/10 text-purple-500 border-purple-500/20 hover:bg-purple-500/20", accentText: "text-purple-500", borderColor: "border-purple-500" },
    audit: { id: "audit", label: "Find Bugs", icon: Bug, loading: "Scanning for bugs...", title: "Detected Issues", activeClass: "bg-red-500 text-white border-red-500 shadow-md", inactiveClass: "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20", accentText: "text-red-500", borderColor: "border-red-500" }
  };

  const isAppDark = mounted && (resolvedTheme === "dark" || theme === "dark");
  const invertedBg = isAppDark ? "bg-[#FDFBF7]" : "bg-[#111113]";
  const invertedBorder = isAppDark ? "border-[#EAE5D9]" : "border-[#2B1D25]";
  const invertedText = isAppDark ? "text-slate-900" : "text-slate-100";
  const invertedMuted = isAppDark ? "text-slate-600" : "text-slate-400";
  const bgRed = isAppDark ? "bg-red-500/10" : "bg-red-500/20";
  const textRed = isAppDark ? "text-red-700" : "text-red-400";

  const handleAnalyze = async (actionType: ActionType = "analyze") => {
    if (!code.trim()) {
        alert("Please paste some code in the editor before executing an AI analysis.");
        return;
    }
    setSelectedAction(actionType);
    setIsAnalyzing(true);
    setResult(null);

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language, actionType })
    });

    if (res.ok) {
      const data = await res.json();
      setResult(data.result);
      setChats([]); // clear old chats
    } else {
      const err = await res.json();
      alert(`Analysis Framework Error: ${err.error}`);
    }
    setIsAnalyzing(false);
  };

  const handleAskAI = async () => {
    if (!followUp.trim() || !code.trim()) return;
    
    const currentQ = followUp;
    setFollowUp("");
    setIsChatting(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
         code, 
         question: currentQ,
         analysis: result ? JSON.stringify(result) : ""
      })
    });

    if (res.ok) {
      const data = await res.json();
      setChats(prev => [...prev, { question: currentQ, answer: data.answer }]);
    } else {
      const err = await res.json();
      alert(`Agent Sync Error: ${err.error}`);
    }
    setIsChatting(false);
  };

  const copyToClipboard = () => {
    if (result?.correctedCode) {
      navigator.clipboard.writeText(result.correctedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!mounted) return <div className="min-h-screen bg-[var(--color-background)]" />;

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] font-sans pb-32 overflow-x-hidden relative">
      
      {/* Dynamic Lateral Thinking Robot (Fixed Left Side - Mirrored) */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-0 hidden lg:flex flex-col items-center justify-center pointer-events-none transition-all duration-1000 delay-100 opacity-100 translate-y-[calc(-50%-20px)]">
         <motion.div animate={isAnalyzing ? { scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] } : { scale: 1, opacity: 0 }} transition={{ repeat: Infinity, duration: 3.2 }} className="absolute -top-2 left-12 w-16 h-16 rounded-full bg-yellow-400 blur-3xl z-0" />
         <motion.div animate={isAnalyzing ? { scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] } : { scale: 1, opacity: 0.1 }} transition={{ repeat: Infinity, duration: 3.8, delay: 0.5 }} className="absolute top-10 -right-6 w-12 h-12 rounded-full bg-cyan-400 blur-2xl z-0" />
         
         <motion.div animate={{ y: [-15, 15, -15] }} transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }} className="relative z-10 flex flex-col items-center">
           <Image 
              src="/hero-robot-thinking.png" 
              alt="Thinking AI Mascot" 
              width={350} 
              height={350} 
              priority
              className="w-64 h-64 object-cover mix-blend-screen drop-shadow-2xl scale-x-[-1]"
              style={{ WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 68%)', maskImage: 'radial-gradient(circle at center, black 40%, transparent 68%)' }}
           />
           <motion.div animate={isAnalyzing ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.8 }} transition={{ repeat: Infinity, duration: 2.5 }} className={`mt-0 text-xs font-bold tracking-widest uppercase ${isAnalyzing ? 'text-[var(--color-primary)] bg-white/10 dark:bg-white/10' : 'text-slate-500 bg-white/5 dark:bg-white/5'} backdrop-blur-md px-5 py-2 rounded-full border border-black/10 dark:border-white/10 shadow-lg transition-colors`}>
             {isAnalyzing ? "Thinking..." : result ? "Results below 👇" : "How can I help?"}
           </motion.div>
         </motion.div>
      </div>

      {/* Dynamic Lateral Thinking Robot (Fixed Right Side) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-0 hidden lg:flex flex-col items-center justify-center pointer-events-none transition-all duration-1000 opacity-100 translate-y-[calc(-50%-20px)]">
         <motion.div animate={isAnalyzing ? { scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] } : { scale: 1, opacity: 0 }} transition={{ repeat: Infinity, duration: 3 }} className="absolute -top-2 right-12 w-16 h-16 rounded-full bg-yellow-400 blur-3xl z-0" />
         <motion.div animate={isAnalyzing ? { scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] } : { scale: 1, opacity: 0.1 }} transition={{ repeat: Infinity, duration: 4, delay: 1 }} className="absolute top-10 -left-6 w-12 h-12 rounded-full bg-cyan-400 blur-2xl z-0" />
         
         <motion.div animate={{ y: [-15, 15, -15] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="relative z-10 flex flex-col items-center">
           <Image 
              src="/hero-robot-thinking.png" 
              alt="Thinking AI Mascot" 
              width={350} 
              height={350} 
              priority
              className="w-64 h-64 object-cover mix-blend-screen drop-shadow-2xl"
              style={{ WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 68%)', maskImage: 'radial-gradient(circle at center, black 40%, transparent 68%)' }}
           />
           <motion.div animate={isAnalyzing ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.8 }} transition={{ repeat: Infinity, duration: 2.5 }} className={`mt-0 text-xs font-bold tracking-widest uppercase ${isAnalyzing ? 'text-[var(--color-primary)] bg-white/10 dark:bg-white/10' : 'text-slate-500 bg-white/5 dark:bg-white/5'} backdrop-blur-md px-5 py-2 rounded-full border border-black/10 dark:border-white/10 shadow-lg transition-colors`}>
             {isAnalyzing ? "Thinking..." : result ? "Results below 👇" : "How can I help?"}
           </motion.div>
         </motion.div>
      </div>

      <div className="max-w-3xl mx-auto pt-24 px-4 sm:px-6 flex flex-col gap-6 relative z-10">

        {/* 1. Language Selector (Top) */}
        <div className="flex flex-wrap gap-2 justify-start mb-2">
          {LANGUAGES.map(lang => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
                language === lang 
                  ? "bg-[var(--color-primary)] text-[var(--color-background)]" 
                  : "bg-transparent border border-[var(--color-panel-border)] text-[var(--color-foreground)]/60 hover:bg-[var(--color-panel-border)]"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* 2. Code Input Box */}
        <div className={`w-full rounded-2xl overflow-hidden border ${invertedBorder} ${invertedBg} p-2 sm:p-4 shadow-sm`}>
          <div className="h-[300px] sm:h-[400px] relative rounded-xl overflow-hidden">
            <Editor
              height="100%"
              language={language.includes("Auto Detect") ? "javascript" : language.toLowerCase()}
              theme={isAppDark ? "light" : "vs-dark"}
              value={code}
              onChange={(val) => setCode(val || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                fontFamily: "var(--font-jetbrains-mono), monospace",
              }}
            />
          </div>
        </div>

        {/* 3. Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 w-full">
           {(Object.keys(ACTION_CONFIGS) as ActionType[]).map((actionKey) => {
             const config = ACTION_CONFIGS[actionKey];
             const isActive = selectedAction === actionKey && (isAnalyzing || result !== null);
             return (
               <button 
                 key={actionKey}
                 onClick={() => handleAnalyze(actionKey)}
                 disabled={isAnalyzing}
                 className={`w-full py-4 px-2 rounded-xl font-bold text-sm sm:text-base flex flex-col items-center justify-center gap-1 transition-all border disabled:opacity-50 disabled:cursor-not-allowed ${isActive ? config.activeClass : config.inactiveClass}`}
               >
                 <config.icon className="w-5 h-5 mb-1" /> {config.label}
               </button>
             );
           })}
        </div>


        {/* 5. AI THINKING STATE (STRICT REQUIREMENT) */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: "auto" }} 
              exit={{ opacity: 0, height: 0 }}
              className="w-full flex flex-col items-center justify-center py-12 gap-8 overflow-hidden"
            >
              <div className="flex flex-col items-center text-center mt-2 z-20">
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={selectedAction}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-extrabold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent"
                  >
                    {ACTION_CONFIGS[selectedAction].loading}
                  </motion.span>
                </AnimatePresence>
                
                {/* Custom glowing dot animation (...) */}
                <div className="flex items-center gap-1.5 mt-4">
                  <motion.div animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] opacity-50" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }} className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] opacity-50" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }} className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] opacity-50" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 6. OUTPUT SECTION (AFTER LOADING) */}
        {!isAnalyzing && result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 10 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col mt-4"
          >
            {/* Dynamic Universal Output Container */}
            <div className={`w-full rounded-2xl border ${ACTION_CONFIGS[selectedAction].borderColor} ${invertedBg} p-6 flex flex-col gap-6 shadow-xl relative overflow-hidden transition-all duration-700`}>
               {/* Accent Color Band */}
               <div className={`absolute top-0 left-0 w-2 h-full bg-current ${ACTION_CONFIGS[selectedAction].accentText} opacity-100`} />
               
               <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/5 dark:border-white/5 pb-4 pl-3">
                  <h2 className={`text-2xl font-extrabold flex items-center gap-3 ${ACTION_CONFIGS[selectedAction].accentText}`}>
                     {(() => {
                        const IconComponent = ACTION_CONFIGS[selectedAction].icon;
                        return <IconComponent className="w-6 h-6" />;
                     })()}
                     {ACTION_CONFIGS[selectedAction].title}
                  </h2>
                  
                  {/* Performance Indicators / Badges (Display dynamically depending on analysis/audit) */}
                  {(selectedAction === "analyze" || selectedAction === "audit") && result.reviewStatus && (
                    <div className="ml-auto">
                      {result.reviewStatus === "Correct" ? (
                        <span className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm"><CheckCircle2 className="w-4 h-4"/> Good</span>
                      ) : result.reviewStatus === "Minor Issues" ? (
                        <span className="flex items-center gap-2 bg-amber-500/10 text-amber-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm"><AlertTriangle className="w-4 h-4"/> Needs Action</span>
                      ) : (
                        <span className="flex items-center gap-2 bg-red-500/10 text-red-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm"><XCircle className="w-4 h-4"/> Poor</span>
                      )}
                    </div>
                  )}
               </div>

               {/* Primary Computed Explanation Array */}
               <div className={`text-base leading-relaxed pl-3 ${invertedMuted}`}>
                 <Typewriter text={result.explanation || "Execution verified."} delay={5} />
               </div>

               {/* Map Key Issues strictly for Analyze or Audit directives natively blocking Code Outputs */}
               {(selectedAction === "analyze" || selectedAction === "audit") && result.errors && result.errors.length > 0 && result.errors[0] !== "No major errors found." && (
                 <div className="pl-3 mt-2 flex flex-col gap-3">
                    <h3 className={`text-sm font-extrabold flex items-center gap-2 ${invertedText}`}><AlertTriangle className="w-4 h-4 text-red-500" /> Detected Vulnerabilities</h3>
                    <ul className="flex flex-col gap-2">
                      {result.errors.map((issue: string, idx: number) => (
                        <li key={idx} className={`flex items-start gap-3 ${bgRed} px-4 py-3 rounded-lg border border-red-500/10 text-sm font-bold ${textRed}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.6)]" /> {issue}
                        </li>
                      ))}
                    </ul>
                 </div>
               )}

               {/* Map Improvements explicitly onto Analyze optimizations natively */}
               {selectedAction === "analyze" && result.suggestedImprovements && result.suggestedImprovements.length > 0 && (
                 <div className="pl-3 mt-2 flex flex-col gap-3">
                    <h3 className={`text-sm font-extrabold flex items-center gap-2 ${invertedText}`}><Zap className="w-4 h-4 text-[#C7B7A3]" /> Optimizations & Advice</h3>
                    <ul className="flex flex-col gap-2">
                      {result.suggestedImprovements.map((imp: string, idx: number) => (
                        <li key={idx} className={`flex items-start gap-3 bg-black/5 dark:bg-white/5 px-4 py-3 rounded-lg border border-black/5 dark:border-white/5 text-sm font-medium ${invertedMuted}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] mt-1.5 shrink-0" /> {imp}
                        </li>
                      ))}
                    </ul>
                 </div>
               )}

               {/* Map Dynamic Generative Editor Block (Fix, Optimize, Convert conditionally hook this UI array seamlessly!) */}
               {result.correctedCode && result.correctedCode.trim() !== "" && result.correctedCode !== code && selectedAction !== "audit" && selectedAction !== "explain" && (
                 <div className={`w-full overflow-hidden rounded-xl border border-black/10 dark:border-white/10 mt-4 shadow-xl`}>
                    <div className="flex items-center justify-between px-5 py-3 bg-[#111113] border-b border-black/20">
                       <span className={`text-xs font-bold uppercase tracking-wider text-slate-100`}>Generated Output</span>
                       <button onClick={copyToClipboard} className={`text-xs px-3 py-1.5 rounded font-bold flex items-center gap-2 transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                         {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                       </button>
                    </div>
                    <div className="p-3 bg-[#1e1e1e]">
                      <Editor height="250px" language={language.includes("Auto Detect") ? "javascript" : language.toLowerCase()} theme="vs-dark" value={result.correctedCode} options={{ readOnly: true, minimap: { enabled: false }, fontSize: 13, scrollBeyondLastLine: false, fontFamily: "var(--font-jetbrains-mono), monospace" }} />
                    </div>
                 </div>
               )}
            </div>


          </motion.div>
        )}

        {/* 7. Chat Section (Strictly below the AI Output) */}
        {!isAnalyzing && result && (
          <div className="w-full flex flex-col gap-6 mt-12 border-t border-black/10 dark:border-white/10 pt-8">
            <h2 className="text-2xl font-serif font-bold text-[var(--color-foreground)] flex items-center gap-3 mb-2">
               <Bot className="w-6 h-6 text-[var(--color-primary)]" /> Chat with AI
            </h2>
            
            {/* Chat History */}
            {chats.length > 0 && (
              <div className="w-full flex flex-col gap-6 mb-2">
                {chats.map((chat, idx) => (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={idx} className="flex flex-col gap-4">
                     <div className="self-end bg-[var(--color-primary)] text-[var(--color-background)] px-5 py-3 rounded-2xl rounded-tr-md max-w-[85%] shadow-md">
                       <p className="text-sm font-medium">{chat.question}</p>
                     </div>
                     <div className={`self-start ${invertedBg} border ${invertedBorder} px-6 py-5 rounded-2xl rounded-tl-md w-full shadow-sm`}>
                       <div className="flex items-center gap-2 mb-2 text-[var(--color-primary)] font-bold text-sm">
                         <Bot className="w-4 h-4" /> LuminaCode AI
                       </div>
                       <p className={`text-sm leading-relaxed ${invertedText}`}><Typewriter text={chat.answer} delay={5} /></p>
                     </div>
                  </motion.div>
                ))}
              </div>
            )}

            {isChatting && (
              <div className="w-full flex items-center justify-start mb-2">
                 <div className="flex items-center gap-3 text-[var(--color-primary)] font-medium animate-pulse bg-[var(--color-primary)]/10 px-5 py-3 rounded-full text-sm">
                    <Bot className="w-4 h-4" /> Generating response...
                 </div>
              </div>
            )}

            {/* Chat Input Box */}
            <div className={`w-full flex items-center gap-2 p-2 rounded-xl border ${invertedBorder} ${invertedBg} shadow-sm sticky bottom-4 z-50`}>
               <input 
                 type="text" 
                 placeholder="Type a message to ask the AI..." 
                 value={followUp}
                 onChange={(e) => setFollowUp(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                 className={`flex-1 bg-transparent border-none ${invertedText} outline-none px-4 font-medium placeholder:opacity-50`}
               />
               <button 
                  onClick={handleAskAI}
                  disabled={isChatting || !followUp.trim()}
                  className={`px-6 py-2 rounded-lg bg-[var(--color-primary)]/10 font-bold flex items-center gap-2 hover:bg-[var(--color-primary)] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isAppDark ? 'text-[var(--color-primary)]' : 'text-[#E8D8C4]'}`}
               >
                  <Send className="w-4 h-4" /> Ask
               </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
