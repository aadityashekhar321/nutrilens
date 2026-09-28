'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import FoodInsightForm from '@/components/insight/FoodInsightForm';
import InsightResult from '@/components/insight/InsightResult';
import ErrorState from '@/components/ui/ErrorState';
import { useFoodInsight } from '@/hooks/use-food-insight';
import { 
  Sparkles, 
  RotateCcw, 
  ShieldAlert, 
  ArrowRight,
  Activity,
  ScanLine,
  Database,
  Binary
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SCAN_STEPS = [
  { text: 'Ingesting packaging nomenclature & brand formulations...', icon: Database },
  { text: 'Querying Google Gemini 3.6 Flash neural model...', icon: Binary },
  { text: 'Auditing 60+ hidden sugar synonyms & emulsifiers...', icon: ShieldAlert },
  { text: 'Cross-referencing USDA FoodData Central baselines...', icon: Activity },
  { text: 'Calculating clinical Truth Score & AHA threshold...', icon: Sparkles }
];

const CURATED_CASE_STUDIES = [
  {
    title: 'The Greek Yogurt Sugar Trap',
    food: 'French Vanilla Greek Yogurt',
    brand: 'Chobani',
    emoji: '🥣',
    tag: '14g Added Sugar',
    badge: 'High Deception',
    insight: 'Marketed as an active fitness snack, but packs 3.5 physical sugar cubes in one small tub.'
  },
  {
    title: 'The Plant Milk Starch Spike',
    food: 'Barista Edition Oat Milk',
    brand: 'Oatly',
    emoji: '🥛',
    tag: 'Rapeseed Oil + Maltose',
    badge: 'Moderate Halo',
    insight: 'Enzymatic manufacturing converts complex oats into rapid-spiking maltose, emulsified with dipotassium phosphate.'
  },
  {
    title: 'The "Artisan" Protein Bar',
    food: 'Artisan Honey Oat Protein Bar',
    brand: 'Nature Valley',
    emoji: '🍫',
    tag: '7 Sugar Cubes',
    badge: 'Severe Halo',
    insight: 'Uses ingredient splitting across 3 syrups to mask that added sugars outweigh actual intact dietary fiber.'
  },
];

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

function FoodInsightContent() {
  const searchParams = useSearchParams();
  const { 
    submitInsight, 
    loading, 
    result, 
    error,
    clearResult 
  } = useFoodInsight();

  const [scanStepIndex, setScanStepIndex] = useState(0);

  // Read initial query parameter from URL (e.g., from search dialog)
  useEffect(() => {
    const q = searchParams.get('q');
    if (q && !result && !loading) {
      submitInsight(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, submitInsight]);

  // Telemetry cycling during active scanning
  useEffect(() => {
    if (!loading) {
      setScanStepIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setScanStepIndex((prev) => (prev + 1) % SCAN_STEPS.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalyze = async (foodName: string, brand?: string) => {
    await submitInsight(foodName, brand);
  };

  const CurrentScanIcon = SCAN_STEPS[scanStepIndex].icon;

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto min-h-screen pb-24 relative overflow-hidden">
      {/* Premium Ambient Radial Background Shimmers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-gradient-to-b from-emerald-500/15 via-cyan-500/5 to-transparent blur-[100px] pointer-events-none -z-10 rounded-full mix-blend-screen" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-teal-500/10 to-transparent blur-[80px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-500/10 to-transparent blur-[80px] pointer-events-none -z-10 rounded-full" />

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 pt-4 sm:pt-8"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill mb-6 shadow-lg border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-md"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-['var(--font-dm-sans)'] tracking-wide uppercase">
            Neural Food Scanner • Gemini 3.6 Flash Engine
          </span>
        </motion.div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight font-['var(--font-dm-sans)'] mb-5 text-[var(--text-primary)]">
          AI Food <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 drop-shadow-sm">Insight</span>
        </h1>

        <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed font-medium">
          Type any packaged supermarket food or beverage. Our neural model deconstructs marketing claims, exposes hidden sugar aliases, and computes an objective biochemical Truth Score.
        </p>
      </motion.div>

      {/* Input Console */}
      <FoodInsightForm onSubmit={handleAnalyze} loading={loading} />

      <AnimatePresence mode="wait">
        {/* Scanning Laboratory HUD */}
        {loading && (
          <motion.div 
            key="loading"
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl mx-auto mt-12"
          >
            <div className="card p-8 sm:p-12 rounded-[2.5rem] border border-emerald-500/40 scanline relative overflow-hidden text-center shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)] bg-[var(--surface)]/80 backdrop-blur-2xl">
              
              {/* Premium Animated Holographic Aperture Reticle */}
              <div className="relative w-28 h-28 mx-auto mb-8 flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-y-2 border-emerald-500/60 opacity-80" 
                />
                <motion.div 
                  animate={{ rotate: -360 }} 
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 rounded-full border-x-2 border-cyan-500/60 opacity-60" 
                />
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-4 rounded-full bg-emerald-500/10 blur-md" 
                />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/40 relative z-10">
                  <ScanLine className="w-8 h-8 animate-pulse" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-['var(--font-dm-sans)'] text-[var(--text-primary)] mb-3 tracking-tight">
                Deconstructing Biochemical Matrix
              </h3>

              <div className="h-8 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={scanStepIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-center gap-2.5"
                  >
                    <CurrentScanIcon className="w-4 h-4" />
                    <span>{SCAN_STEPS[scanStepIndex].text}</span>
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Shimmering Progress Bar */}
              <div className="w-64 h-1.5 bg-[var(--surface-elevated)] rounded-full mx-auto mt-8 overflow-hidden shadow-inner relative">
                <motion.div 
                  className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 15, ease: "circOut" }}
                />
              </div>

              <p className="text-xs text-[var(--text-muted)] mt-5 font-medium uppercase tracking-widest opacity-60">
                Auditing FDA 21 CFR loopholes & USDA baselines
              </p>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div 
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-2xl mx-auto mt-10"
          >
            <ErrorState message={error.message || 'An error occurred during neural analysis'} onRetry={clearResult} />
          </motion.div>
        )}

        {/* Diagnostic Result View */}
        {result && !loading && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="mt-10 space-y-6 relative z-20"
          >
            <div className="flex justify-end max-w-4xl mx-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearResult}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border)] hover:border-emerald-500/50 hover:bg-emerald-500/10 shadow-sm transition-colors cursor-pointer group"
              >
                <RotateCcw className="w-4 h-4 text-emerald-500 group-hover:-rotate-180 transition-transform duration-500" />
                <span>Decode Another Product</span>
              </motion.button>
            </div>
            <InsightResult result={result} />
          </motion.div>
        )}

        {/* Welcome / Interactive Case Studies Showcase (When no active result) */}
        {!result && !loading && !error && (
          <motion.div 
            key="showcase"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-5xl mx-auto mt-20 space-y-16"
          >
            {/* Section Divider */}
            <motion.div variants={itemVariants} className="flex items-center gap-6">
              <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-[var(--border)] flex-1" />
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] font-['var(--font-dm-sans)'] flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-hover)]">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                Notable Health Halo Scams
              </span>
              <div className="h-px bg-gradient-to-l from-transparent via-[var(--border)] to-[var(--border)] flex-1" />
            </motion.div>

            {/* 3 Interactive Case Study Cards */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CURATED_CASE_STUDIES.map((study, idx) => (
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  key={idx}
                  onClick={() => handleAnalyze(study.food, study.brand)}
                  className="group card p-6 rounded-3xl border border-[var(--border)] hover:border-emerald-500/50 bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 relative flex flex-col justify-between overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full -z-10 group-hover:bg-emerald-500/10 transition-colors" />
                  
                  <div>
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-sm">
                        {study.emoji}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                        {study.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-[var(--text-primary)] group-hover:text-emerald-500 transition-colors font-['var(--font-dm-sans)'] mb-1">
                      {study.title}
                    </h3>

                    <div className="text-xs font-semibold text-[var(--text-secondary)] mb-3 flex items-center gap-1.5">
                      <span>{study.food}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface-elevated)] text-[var(--text-muted)] font-mono">
                        {study.brand}
                      </span>
                    </div>

                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {study.insight}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-[var(--border)] flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500">
                    <span className="text-[11px] font-mono text-[var(--text-muted)] px-2 py-1 rounded bg-[var(--surface-elevated)] border border-[var(--border)]">{study.tag}</span>
                    <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform bg-emerald-500/10 px-3 py-1.5 rounded-lg">
                      Run Audit <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* How the Neural Scanner Works */}
            <motion.div variants={itemVariants} className="card p-8 sm:p-10 rounded-[2.5rem] border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] via-[var(--surface)] to-[var(--surface-hover)] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="text-center max-w-2xl mx-auto mb-10 relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-['var(--font-dm-sans)'] mb-3">
                  Under the Hood
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-['var(--font-dm-sans)'] text-[var(--text-primary)]">
                  How NutriLens Audits Packaged Foods
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
                {[
                  {
                    step: '01',
                    title: 'Deconstruct Formulation',
                    desc: 'Identifies 60+ hidden sugar aliases (maltodextrin, dextrose) and emulsifiers on the ingredient label.',
                    color: 'emerald'
                  },
                  {
                    step: '02',
                    title: 'Normalize Serving Size',
                    desc: 'Standardizes shrunken manufacturer portion sizes to realistic consumer portions and computes 4g sugar cubes.',
                    color: 'cyan'
                  },
                  {
                    step: '03',
                    title: 'Compute Truth Score',
                    desc: 'Generates an objective 0–100 Truth Score and pairs you with a whole-food alternative that prevents glycemic spikes.',
                    color: 'purple'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-6 rounded-[2rem] bg-[var(--surface-elevated)] border border-[var(--border)] space-y-4 hover:border-[var(--border-glow)] transition-colors">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl font-black text-lg flex items-center justify-center",
                      item.color === 'emerald' ? "bg-emerald-500/10 text-emerald-500" :
                      item.color === 'cyan' ? "bg-cyan-500/10 text-cyan-500" :
                      "bg-purple-500/10 text-purple-500"
                    )}>
                      {item.step}
                    </div>
                    <h4 className="text-sm font-black text-[var(--text-primary)] tracking-wide">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AIInsightPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
      </div>
    }>
      <FoodInsightContent />
    </Suspense>
  );
}
