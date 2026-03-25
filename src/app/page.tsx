"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bug, Lightbulb, Code2, Clock, Brain, Trophy, PlayCircle, MessageSquare, AlertTriangle, BookOpen, Zap } from "lucide-react";

const HeroRobot = () => {
  return (
    <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center mt-8 md:mt-0">
       {/* Ambient Glow behind robot */}
       <motion.div 
         animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.6, 0.2] }} 
         transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} 
         className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] rounded-full blur-[100px]"
       />
       
       {/* Main Robot Body floating */}
       <motion.div 
         animate={{ y: [-25, 25, -25] }} 
         transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
         className="relative z-10 flex flex-col items-center"
       >
          <motion.div animate={{ rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}>
             <Image 
                src="/hero-robot-v3.png" 
                alt="LuminaCode AI Assistant" 
                width={800} 
                height={800} 
                priority
                className="w-80 h-80 md:w-[500px] md:h-[500px] object-cover mix-blend-screen pointer-events-none drop-shadow-[0_20px_50px_rgba(114,28,58,0.7)]"
                style={{ WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 68%)', maskImage: 'radial-gradient(circle at center, black 40%, transparent 68%)' }}
             />
          </motion.div>
       </motion.div>

       {/* Orbital Particles / Data streams meaning "alive" */}
       <motion.div 
         animate={{ y: [-40, 40, -40], x: [-25, 25, -25], rotate: 360 }} 
         transition={{ repeat: Infinity, duration: 8, ease: "linear" }} 
         className="absolute top-8 left-0 w-8 h-8 bg-[#C7B7A3] rounded-full blur-[2px] shadow-[0_0_20px_#C7B7A3]" 
       />
       <motion.div 
         animate={{ y: [50, -50, 50], x: [30, -30, 30], rotate: -360 }} 
         transition={{ repeat: Infinity, duration: 7, ease: "linear" }} 
         className="absolute bottom-10 right-0 w-12 h-12 bg-[#6D2932] rounded-full blur-[3px] shadow-[0_0_25px_#6D2932]" 
       />
       <motion.div 
         animate={{ scale: [1, 2.5, 1], opacity: [0, 1, 0] }} 
         transition={{ repeat: Infinity, duration: 3, ease: "circInOut", delay: 1 }} 
         className="absolute top-1/4 right-8 w-3 h-3 bg-[#E8D8C4] rounded-full shadow-[0_0_15px_#E8D8C4]" 
       />
    </div>
  );
};

export default function Home() {
  const stagger = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const fadeUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
      <main className="w-full max-w-7xl mx-auto flex flex-col gap-32 relative z-10">
        
        {/* 1. HERO SECTION (Redesigned with Robot) */}
        <motion.section 
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-8 max-w-6xl mx-auto w-full"
        >
          {/* Left Text Content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 relative z-10">
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-sans font-extrabold tracking-tight leading-[1.15] text-[var(--color-foreground)]">
              Understand, fix, and <span className="font-serif italic text-[var(--color-secondary)]">improve</span> your code — <span className="text-[var(--color-primary)] font-serif whitespace-nowrap">instantly.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="mt-8 text-xl text-[var(--color-foreground)] opacity-90 leading-relaxed font-medium max-w-xl">
              Detect bugs, optimize performance, and get clear explanations in seconds.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 pt-10 w-full sm:w-auto">
              <Link href="/features" className="px-10 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[#8c2a4c] text-white rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(114,28,58,0.4)] hover:shadow-[0_0_40px_rgba(114,28,58,0.6)] w-full sm:w-auto">
                Get Started
              </Link>
              <a href="#how-it-works" className="px-10 py-4 glass-panel border border-[var(--color-panel-border)] text-[var(--color-foreground)] rounded-full font-bold text-lg hover:bg-[var(--color-panel-border)] transition-colors w-full sm:w-auto flex items-center justify-center gap-2 shadow-lg">
                <PlayCircle className="w-5 h-5 text-[var(--color-secondary)]" /> How it works
              </a>
            </motion.div>
          </div>
          
          {/* Right Hero Robot */}
          <motion.div variants={fadeUp} className="flex-1 flex justify-center md:justify-end items-center relative w-full">
             <HeroRobot />
          </motion.div>
        </motion.section>

        {/* 1.5 FEATURE STRIP (MINIMAL GRID) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 w-full"
        >
           {[
             { title: "Detect Bugs", desc: "Find errors and issues in your code instantly", icon: Bug, color: "text-red-500", bg: "bg-red-500/10", border: "hover:border-red-500/40" },
             { title: "Optimize Code", desc: "Improve performance and structure automatically", icon: Zap, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "hover:border-emerald-500/40" },
             { title: "Explain Code", desc: "Understand what your code does in simple language", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10", border: "hover:border-blue-500/40" },
             { title: "Fix Code", desc: "Get corrected and cleaner versions of your code", icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-500/10", border: "hover:border-orange-500/40" },
             { title: "Ask Questions", desc: "Chat with your code and get instant answers", icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-500/10", border: "hover:border-purple-500/40" },
           ].map((feat, idx) => (
             <motion.div 
               key={idx}
               whileHover={{ y: -5, scale: 1.02 }}
               className={`glass-panel border-2 border-[var(--color-panel-border)]/50 p-5 rounded-2xl ${feat.border} transition-all duration-300 flex flex-col items-center text-center shadow-md group backdrop-blur-xl`}
             >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feat.bg} ${feat.color} group-hover:scale-110 transition-transform duration-300 relative`}>
                   <feat.icon className="w-6 h-6 z-10" />
                   <div className="absolute inset-0 blur-xl bg-inherit opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                </div>
                <h3 className="font-bold text-[var(--color-foreground)] mb-2 tracking-tight">{feat.title}</h3>
                <p className="text-sm font-medium text-[var(--color-foreground)] opacity-70 leading-snug">{feat.desc}</p>
             </motion.div>
           ))}
        </motion.section>

        {/* 2. WORKFLOW SECTION */}
        <motion.section 
          id="how-it-works"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mt-12"
        >
          <div className="glass-panel border-2 border-[var(--color-panel-border)]/50 rounded-full px-12 py-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 w-full max-w-4xl shadow-2xl backdrop-blur-2xl">
             <div className="flex items-center gap-4 font-bold text-xl text-[var(--color-foreground)]">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[#6D2932] text-white font-serif italic flex items-center justify-center text-lg shadow-lg">1</span>
                Input Logic
             </div>
             
             <ArrowRight className="w-6 h-6 text-[var(--color-accent)] opacity-60 hidden md:block" />
             <div className="w-px h-8 bg-[var(--color-panel-border)] md:hidden" />

             <div className="flex items-center gap-4 font-bold text-xl text-[var(--color-foreground)]">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-secondary)] to-[#a1b392] text-white font-serif italic flex items-center justify-center text-lg shadow-lg">2</span>
                Robot Thinks
             </div>

             <ArrowRight className="w-6 h-6 text-[var(--color-accent)] opacity-60 hidden md:block" />
             <div className="w-px h-8 bg-[var(--color-panel-border)] md:hidden" />

             <div className="flex items-center gap-4 font-bold text-xl text-[var(--color-foreground)]">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[#E8D8C4] text-black font-serif italic flex items-center justify-center text-lg shadow-lg">3</span>
                Clean Code
             </div>
          </div>
        </motion.section>

        {/* 3. PREMIUM UI GRID */}
        <section className="text-center relative">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-extrabold text-[var(--color-foreground)] mb-16 tracking-tight drop-shadow-sm"
          >
            Powerful integrations, <span className="font-serif italic text-[var(--color-secondary)]">beautiful</span> workflow.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Component 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel border-2 border-[var(--color-panel-border)]/50 p-10 rounded-3xl hover:border-[var(--color-primary)] transition-all duration-300 hover:shadow-[0_10px_40px_rgba(114,28,58,0.2)] group backdrop-blur-xl text-left shadow-lg"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[var(--color-primary)]/20 to-transparent flex items-center justify-center mb-8 shadow-inner overflow-hidden relative group-hover:scale-110 transition-transform duration-500 border border-[var(--color-primary)]/20">
                 <motion.div animate={{ rotate: [0, -15, 15, -15, 0], scale: [1, 1.15, 0.95, 1.1, 1], y: [0, -5, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
                   <Bug className="w-10 h-10 text-[var(--color-primary)]" />
                 </motion.div>
                 <div className="absolute top-0 right-0 w-8 h-8 bg-[var(--color-primary)] blur-xl rounded-full" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-[var(--color-foreground)] mb-4">Deep Scanning</h3>
              <p className="text-[var(--color-foreground)] opacity-80 text-lg leading-relaxed font-medium">
                Our engine intelligently scans your logic for <span className="text-[var(--color-primary)] font-bold">syntax errors</span> and fatal vulnerabilities before you deploy.
              </p>
            </motion.div>

            {/* Component 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-panel border-2 border-[var(--color-panel-border)]/50 p-10 rounded-3xl hover:border-[var(--color-secondary)] transition-all duration-300 hover:shadow-[0_10px_40px_rgba(92,107,82,0.2)] group backdrop-blur-xl text-left shadow-lg"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[var(--color-secondary)]/20 to-transparent flex items-center justify-center mb-8 shadow-inner overflow-hidden relative group-hover:scale-110 transition-transform duration-500 border border-[var(--color-secondary)]/20">
                 <motion.div animate={{ scale: [1, 1.2, 0.9, 1.1, 1], rotate: [0, 10, -10, 0], y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                   <Lightbulb className="w-10 h-10 text-[var(--color-secondary)]" />
                 </motion.div>
                 <div className="absolute top-0 right-0 w-8 h-8 bg-[var(--color-secondary)] blur-xl rounded-full" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-[var(--color-foreground)] mb-4">Smart Architecture</h3>
              <p className="text-[var(--color-foreground)] opacity-80 text-lg leading-relaxed font-medium">
                Receive an actionable list of suggestions targeting computational <span className="text-[var(--color-secondary)] font-bold">time constraints</span> and readability.
              </p>
            </motion.div>

            {/* Component 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-panel border-2 border-[var(--color-panel-border)]/50 p-10 rounded-3xl hover:border-[var(--color-accent)] transition-all duration-300 hover:shadow-[0_10px_40px_rgba(184,144,48,0.2)] group backdrop-blur-xl text-left shadow-lg"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[var(--color-accent)]/20 to-transparent flex items-center justify-center mb-8 shadow-inner overflow-hidden relative group-hover:scale-110 transition-transform duration-500 border border-[var(--color-accent)]/20">
                 <motion.div animate={{ y: [0, -8, 0], scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                   <Code2 className="w-10 h-10 text-[var(--color-accent)]" />
                 </motion.div>
                 <div className="absolute top-0 right-0 w-8 h-8 bg-[var(--color-accent)] blur-xl rounded-full" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-[var(--color-foreground)] mb-4">Clean Outputs</h3>
              <p className="text-[var(--color-foreground)] opacity-80 text-lg leading-relaxed font-medium">
                Instantly receive a perfectly formatted, fully corrected code array seamlessly constrained to a <span className="text-[var(--color-accent)] font-bold">copy clipboard</span>.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 4. WHY CHOOSE LUMINACODE */}
        <section className="glass-panel border-2 border-[var(--color-panel-border)]/50 rounded-[40px] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl backdrop-blur-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-primary)]/5" />
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-[var(--color-foreground)] mb-16 relative z-10 tracking-tight"
          >
            Why <span className="font-serif italic text-[var(--color-primary)]">engineers</span> rely on LuminaCode
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center gap-4 group">
              <div className="p-6 rounded-3xl bg-[var(--color-background)] border border-[var(--color-panel-border)] shadow-md group-hover:border-[var(--color-primary)] group-hover:shadow-[0_5px_30px_rgba(114,28,58,0.2)] transition-all">
                 <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                    <Clock className="w-10 h-10 text-[var(--color-primary)]" />
                 </motion.div>
              </div>
              <h4 className="text-2xl font-serif font-bold text-[var(--color-foreground)]">Saves Time</h4>
              <p className="text-[var(--color-foreground)] opacity-70 text-lg font-medium">Automate massive syntax validation sequences instantaneously.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex flex-col items-center gap-4 group">
              <div className="p-6 rounded-3xl bg-[var(--color-background)] border border-[var(--color-panel-border)] shadow-md group-hover:border-[var(--color-secondary)] group-hover:shadow-[0_5px_30px_rgba(92,107,82,0.2)] transition-all">
                 <motion.div animate={{ scale: [1, 1.1, 1], opacity: [1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                    <Brain className="w-10 h-10 text-[var(--color-secondary)]" />
                 </motion.div>
              </div>
              <h4 className="text-2xl font-serif font-bold text-[var(--color-foreground)]">Elevates Logic</h4>
              <p className="text-[var(--color-foreground)] opacity-70 text-lg font-medium">Learn deep systems architecture organically from AI feedback.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col items-center gap-4 group">
              <div className="p-6 rounded-3xl bg-[var(--color-background)] border border-[var(--color-panel-border)] shadow-md group-hover:border-[var(--color-accent)] group-hover:shadow-[0_5px_30px_rgba(184,144,48,0.2)] transition-all">
                 <motion.div animate={{ y: [0, -6, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                    <Trophy className="w-10 h-10 text-[var(--color-accent)]" />
                 </motion.div>
              </div>
              <h4 className="text-2xl font-serif font-bold text-[var(--color-foreground)]">Deploys Clean</h4>
              <p className="text-[var(--color-foreground)] opacity-70 text-lg font-medium">Construct fundamentally bulletproof applications autonomously.</p>
            </motion.div>
          </div>
        </section>

      </main>
    </div>
  );
}
