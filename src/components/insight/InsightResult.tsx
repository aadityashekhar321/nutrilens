'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Eye, 
  Sparkles, 
  Info,
  Layers,
  Check,
  Award
} from 'lucide-react';
import { FoodInsightResponse } from '@/types';
import RiskBadge from './RiskBadge';
import { cn } from '@/lib/utils';

export default function InsightResult({ result }: { result: FoodInsightResponse }) {
  const [portionMultiplier, setPortionMultiplier] = useState<number>(1.0);
  const [checkedTips, setCheckedTips] = useState<Record<number, boolean>>({});

  if (!result) return null;

  // Calculate Truth Score based on healthHaloRisk
  const score = result.healthHaloRisk === 'low' 
    ? 88 
    : result.healthHaloRisk === 'medium' 
    ? 58 
    : result.healthHaloRisk === 'high' 
    ? 32 
    : 50;

  const scoreTheme = result.healthHaloRisk === 'low'
    ? {
        text: 'text-emerald-500',
        stroke: '#10B981',
        bg: 'from-emerald-500/15 via-emerald-500/5 to-transparent',
        border: 'border-emerald-500/30',
        label: 'Clean Profile',
        sub: 'Nutritional balance aligns with marketing claims.'
      }
    : result.healthHaloRisk === 'medium'
    ? {
        text: 'text-amber-500',
        stroke: '#F59E0B',
        bg: 'from-amber-500/15 via-amber-500/5 to-transparent',
        border: 'border-amber-500/30',
        label: 'Moderate Halo',
        sub: 'Discrepancy detected between marketing buzzwords and nutritional reality.'
      }
    : {
        text: 'text-rose-500',
        stroke: '#F43F5E',
        bg: 'from-rose-500/15 via-rose-500/5 to-transparent',
        border: 'border-rose-500/30',
        label: 'Severe Deception',
        sub: 'High health halo risk. Ultra-processed formulation masquerading as healthy.'
      };

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Helper to scale nutrient values by portion multiplier
  const scaleNutrient = (rawVal: string | undefined): { val: string; num: number | null; unit: string } => {
    if (!rawVal) return { val: 'N/A', num: null, unit: '' };
    const match = rawVal.match(/^([\d.]+)\s*([a-zA-Z%]+)?$/);
    if (!match) return { val: rawVal, num: null, unit: '' };
    const num = parseFloat(match[1]);
    const unit = match[2] || '';
    const scaled = num * portionMultiplier;
    const formatted = `${scaled % 1 === 0 ? scaled : scaled.toFixed(1)}${unit}`;
    return { val: formatted, num: scaled, unit };
  };

  // Parse raw sugar grams for the physical cube visualizer
  const rawSugarGrams = useMemo(() => {
    if (!result.nutritionalHighlights?.sugar) return null;
    const match = result.nutritionalHighlights.sugar.match(/([\d.]+)/);
    return match ? parseFloat(match[1]) : null;
  }, [result.nutritionalHighlights]);

  const activeSugarGrams = rawSugarGrams !== null ? rawSugarGrams * portionMultiplier : null;
  const activeSugarCubes = activeSugarGrams !== null ? Math.round(activeSugarGrams / 4) : 0;
  
  // AHA Daily Limit: 25g for women/children, 36g for men
  const ahaPercent = activeSugarGrams !== null ? Math.round((activeSugarGrams / 25) * 100) : 0;
  const isAhaExceeded = activeSugarGrams !== null && activeSugarGrams > 25;

  const toggleCheckTip = (idx: number) => {
    setCheckedTips(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const checkedCount = Object.values(checkedTips).filter(Boolean).length;
  const totalTips = result.whatToCheckOnLabel?.length || 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full max-w-4xl mx-auto space-y-8"
    >
      {/* 1. Diagnostic Report Executive Bento Card */}
      <motion.div variants={itemVariants} className="card p-6 sm:p-8 bg-gradient-to-br from-[var(--surface)] via-[var(--surface)] to-[var(--surface-hover)] border border-[var(--border)] shadow-2xl relative overflow-hidden rounded-[2.5rem]">
        {/* Glow Accent */}
        <div className={cn("absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl blur-[100px] pointer-events-none -z-10 rounded-full opacity-60", scoreTheme.bg)} />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-[var(--border)]">
          {/* Left Title & Status */}
          <div className="flex-1 space-y-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-['var(--font-dm-sans)'] backdrop-blur-sm shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                AI Diagnostic Telemetry
              </span>
              <span className="text-[10px] sm:text-xs text-[var(--text-muted)] font-mono bg-[var(--surface-hover)] px-2 py-1 rounded-md border border-[var(--border)]">
                Model: Gemini 3.6 Flash
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-5xl font-black font-['var(--font-dm-sans)'] text-[var(--text-primary)] tracking-tight leading-tight">
              {result.foodName}
            </h2>

            <div className="flex items-center gap-3 pt-2">
              <RiskBadge risk={result.healthHaloRisk} />
              <span className="text-sm font-bold text-[var(--text-secondary)]">
                {scoreTheme.label}
              </span>
            </div>
          </div>

          {/* Right Circular Holographic Gauge */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
            className="flex items-center gap-5 bg-[var(--surface-elevated)]/80 backdrop-blur-xl p-5 sm:p-6 rounded-[2rem] border border-[var(--border)] shadow-xl flex-shrink-0"
          >
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-28 h-28 -rotate-90 drop-shadow-md" viewBox="0 0 96 96">
                <circle cx="48" cy="48" r="40" className="stroke-[var(--surface-hover)]" strokeWidth="8" fill="transparent" />
                <motion.circle
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  cx="48" cy="48" r="40"
                  stroke={scoreTheme.stroke} strokeWidth="8" strokeDasharray={circumference} strokeLinecap="round" fill="transparent"
                  className="drop-shadow-[0_0_8px_rgba(currentColor,0.5)]"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
                <motion.span 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="text-3xl font-black font-mono text-[var(--text-primary)] leading-none"
                >
                  {score}
                </motion.span>
                <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider mt-1">
                  / 100
                </span>
              </div>
            </div>
            <div className="text-left space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                Truth Score
              </div>
              <div className={cn("text-base font-black tracking-wide", scoreTheme.text)}>
                {scoreTheme.label}
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] max-w-[150px] leading-snug font-medium">
                {scoreTheme.sub}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Algorithmic Narrative Synthesis */}
        <div className="pt-8 space-y-5">
          <motion.div variants={itemVariants}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Algorithmic Clinical Synthesis
            </h3>
            <p className="text-base sm:text-lg text-[var(--text-primary)] leading-relaxed font-medium bg-[var(--surface-hover)]/40 p-5 sm:p-6 rounded-2xl border border-[var(--border)] border-l-4 border-l-emerald-500 shadow-sm">
              {result.summary}
            </p>
          </motion.div>

          {result.importantCaveat && (
            <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-900 dark:text-amber-200 flex items-start gap-4 shadow-inner">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Info className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="space-y-1 pt-1">
                <span className="font-bold tracking-wide">Important Nutritional Caveat:</span>
                <p className="text-[var(--text-secondary)] dark:text-amber-200/90 leading-relaxed">
                  {result.importantCaveat}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* 2. Interactive Portion Reality Multiplier HUD */}
      <motion.div variants={itemVariants} className="card p-6 sm:p-8 border border-[var(--border)] bg-[var(--surface)] shadow-xl rounded-[2.5rem] space-y-6">
        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-5 pb-5 border-b border-[var(--border)]">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] flex items-center gap-2 font-['var(--font-dm-sans)'] mb-1.5">
              <Layers className="w-4 h-4 text-emerald-500" /> Portion Reality Multiplier
            </span>
            <p className="text-sm text-[var(--text-muted)] max-w-lg leading-relaxed">
              Food companies shrink serving sizes to make sugar appear low. Select how much you actually eat to see the true metabolic impact:
            </p>
          </div>
          
          {/* Multiplier Segmented Tabs */}
          <div className="flex items-center p-1.5 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] self-stretch xl:self-auto justify-between xl:justify-start shadow-inner overflow-x-auto hide-scrollbar">
            {[
              { label: '1.0x Box Serving', val: 1.0 },
              { label: '1.5x Typical', val: 1.5 },
              { label: '2.0x Double', val: 2.0 },
              { label: '2.5x Whole Bag', val: 2.5 },
            ].map((p) => (
              <button
                key={p.val}
                type="button"
                onClick={() => setPortionMultiplier(p.val)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap relative",
                  portionMultiplier === p.val
                    ? "text-white"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]"
                )}
              >
                {portionMultiplier === p.val && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-emerald-500 rounded-xl shadow-md shadow-emerald-500/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Sugar Cubes Physical Stacking Meter */}
        {activeSugarGrams !== null && (
          <div className="space-y-5 pt-2">
            <motion.div 
              layout
              className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-[var(--surface-elevated)] p-6 rounded-[2rem] border border-[var(--border)] shadow-inner"
            >
              <div className="space-y-3 flex-1 w-full">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-[var(--text-secondary)]">
                    Physical Sugar Impact:
                  </span>
                  <span className="font-mono text-lg font-black text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                    {activeSugarGrams.toFixed(1)}g ≈ {activeSugarCubes} sugar cubes
                  </span>
                </div>
                
                {/* AHA Daily Limit Bar */}
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">AHA 25g Daily Limit:</span>
                  <div className="flex-1 max-w-[200px] h-2.5 rounded-full bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
                    <motion.div 
                      className={cn("h-full rounded-full transition-colors", isAhaExceeded ? "bg-rose-500" : "bg-emerald-500")}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, ahaPercent)}%` }}
                      transition={{ type: "spring", bounce: 0, duration: 1 }}
                    />
                  </div>
                  <span className={cn("font-mono text-xs font-black", isAhaExceeded ? "text-rose-500" : "text-emerald-500")}>
                    {ahaPercent}%
                  </span>
                </div>
              </div>

              {/* 3D Physical Sugar Cubes Stacks */}
              <motion.div layout className="flex items-center gap-2 flex-wrap max-w-[300px]">
                <AnimatePresence>
                  {[...Array(Math.min(15, activeSugarCubes))].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ delay: i * 0.05 }}
                      title="1 sugar cube = 4 grams of pure sugar"
                      className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-400/90 dark:to-amber-600 border border-amber-300 dark:border-amber-400/50 shadow-[0_4px_10px_-2px_rgba(245,158,11,0.5)] text-[9px] font-black text-amber-900 flex items-center justify-center transition-transform hover:-translate-y-2 select-none"
                    >
                      4g
                    </motion.div>
                  ))}
                </AnimatePresence>
                {activeSugarCubes > 15 && (
                  <motion.span 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono pl-2"
                  >
                    +{activeSugarCubes - 15} more cubes!
                  </motion.span>
                )}
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {isAhaExceeded && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-3 text-sm text-rose-700 dark:text-rose-300 font-medium mt-4 shadow-inner">
                    <AlertTriangle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      <strong className="text-rose-600 dark:text-rose-400">AHA Limit Exceeded:</strong> At {portionMultiplier}x portion, this single serving delivers <strong className="text-rose-600 dark:text-rose-400">{ahaPercent}%</strong> of the American Heart Association&apos;s daily recommended added sugar maximum (25g).
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* 3. Nutritional Highlights Spectrometer (5 Macros) */}
      {result.nutritionalHighlights && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] font-['var(--font-dm-sans)'] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]" />
              Macro Spectrometer <span className="opacity-60">(Scaled to {portionMultiplier}x)</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { label: 'Added Sugar', ...scaleNutrient(result.nutritionalHighlights.sugar), color: 'text-amber-500', bar: 'bg-amber-500' },
              { label: 'Protein', ...scaleNutrient(result.nutritionalHighlights.protein), color: 'text-emerald-500', bar: 'bg-emerald-500' },
              { label: 'Dietary Fiber', ...scaleNutrient(result.nutritionalHighlights.fiber), color: 'text-cyan-500', bar: 'bg-cyan-500' },
              { label: 'Sodium', ...scaleNutrient(result.nutritionalHighlights.sodium), color: 'text-rose-500', bar: 'bg-rose-500' },
              { label: 'Total Fat', ...scaleNutrient(result.nutritionalHighlights.fat), color: 'text-purple-500', bar: 'bg-purple-500' },
            ].map((item, idx) => (
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                key={idx} 
                className="card p-5 text-center border border-[var(--border)] bg-[var(--surface-elevated)] hover:border-emerald-500/40 transition-colors rounded-[1.5rem] shadow-md"
              >
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                  {item.label}
                </span>
                <span className={cn("text-2xl font-black font-mono tracking-tight", item.color)}>
                  {item.val || 'N/A'}
                </span>
                <div className="w-full h-1.5 bg-[var(--surface-hover)] rounded-full mt-3 overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: item.val !== 'N/A' ? '65%' : '0%' }}
                    transition={{ delay: 0.5 + (idx * 0.1), duration: 1 }}
                    className={cn("h-full rounded-full", item.bar)} 
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 4. Deconstructed Flags vs Marketing Claims Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hidden Flags to Watch */}
        {result.potentialConcerns && result.potentialConcerns.length > 0 && (
          <div className="card p-6 sm:p-8 border border-rose-500/30 bg-gradient-to-br from-rose-500/10 via-[var(--surface)] to-transparent rounded-[2rem] space-y-5 shadow-lg">
            <h3 className="text-lg font-black flex items-center gap-3 text-[var(--text-primary)] font-['var(--font-dm-sans)'] tracking-tight">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-500">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span>Hidden Red Flags</span>
            </h3>
            <ul className="space-y-3">
              {result.potentialConcerns.map((concern, i) => (
                <motion.li 
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + (i * 0.1) }}
                  key={i} className="flex items-start gap-3.5 text-sm text-[var(--text-secondary)] font-medium leading-relaxed p-3.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                  <span>{concern}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Deconstructed Marketing Claims */}
        {result.likelyMarketingClaims && result.likelyMarketingClaims.length > 0 && (
          <div className="card p-6 sm:p-8 border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-[var(--surface)] to-transparent rounded-[2rem] space-y-5 shadow-lg">
            <h3 className="text-lg font-black flex items-center gap-3 text-[var(--text-primary)] font-['var(--font-dm-sans)'] tracking-tight">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500">
                <Info className="w-5 h-5" />
              </div>
              <span>Marketing Buzzwords vs Reality</span>
            </h3>
            <ul className="space-y-3">
              {result.likelyMarketingClaims.map((claim, i) => (
                <motion.li 
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + (i * 0.1) }}
                  key={i} className="flex items-start gap-3.5 text-sm text-[var(--text-secondary)] font-medium leading-relaxed p-3.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                  <span>{claim}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>

      {/* 5. Interactive Grocery Aisle Reading Checklist */}
      {result.whatToCheckOnLabel && result.whatToCheckOnLabel.length > 0 && (
        <motion.div variants={itemVariants} className="card p-6 sm:p-8 border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-[var(--surface)] to-transparent rounded-[2.5rem] space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <h3 className="text-xl font-black flex items-center gap-3 text-[var(--text-primary)] font-['var(--font-dm-sans)'] tracking-tight">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-500 shadow-inner">
                <Eye className="w-6 h-6" />
              </div>
              <span>Grocery Aisle Checklist</span>
            </h3>
            <div className="flex items-center gap-3 bg-[var(--surface-hover)] px-4 py-2 rounded-full border border-[var(--border)]">
              <div className="w-full bg-[var(--surface)] h-1.5 rounded-full w-24 overflow-hidden">
                <div className="h-full bg-cyan-500 transition-all duration-300" style={{ width: `${(checkedCount / totalTips) * 100}%` }} />
              </div>
              <span className="text-xs font-black text-cyan-600 dark:text-cyan-400 font-mono">
                {checkedCount}/{totalTips}
              </span>
            </div>
          </div>

          <p className="text-sm text-[var(--text-muted)] font-medium relative z-10">
            Tap each checklist item as you inspect the physical package:
          </p>

          <div className="grid sm:grid-cols-2 gap-4 relative z-10">
            {result.whatToCheckOnLabel.map((tip, i) => {
              const isChecked = !!checkedTips[i];
              return (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={i}
                  type="button"
                  onClick={() => toggleCheckTip(i)}
                  className={cn(
                    "flex items-start gap-4 p-4 rounded-2xl border text-left transition-all cursor-pointer shadow-sm",
                    isChecked
                      ? "bg-cyan-500/10 border-cyan-500/40 text-[var(--text-primary)]"
                      : "bg-[var(--surface-elevated)] border-[var(--border)] text-[var(--text-secondary)] hover:border-cyan-500/40 hover:bg-[var(--surface-hover)]"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-lg border flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors",
                    isChecked
                      ? "bg-cyan-500 border-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                      : "border-[var(--border)] bg-[var(--surface)]"
                  )}>
                    <AnimatePresence>
                      {isChecked && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <Check className="w-4 h-4 stroke-[3]" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <span className={cn("text-sm leading-relaxed font-medium transition-all", isChecked && "line-through opacity-50")}>
                    {tip}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* 6. Recommended Superior Whole-Food Alternative */}
      {result.betterChoiceGuidance && (
        <motion.div variants={itemVariants} className="card p-8 sm:p-10 border border-emerald-500/40 bg-gradient-to-br from-emerald-500/15 via-[var(--surface-elevated)] to-[var(--surface)] shadow-2xl rounded-[2.5rem] space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 relative z-10">
            <div className="w-14 h-14 rounded-[1.2rem] bg-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-inner flex-shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block font-['var(--font-dm-sans)'] mb-1">
                Scientifically Superior Alternative
              </span>
              <h3 className="text-2xl font-black text-[var(--text-primary)] font-['var(--font-dm-sans)'] tracking-tight">
                Whole-Food Smart Substitution
              </h3>
            </div>
          </div>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed sm:pl-19 font-medium relative z-10">
            {result.betterChoiceGuidance}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
