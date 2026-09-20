'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import FoodInsightForm from '@/components/insight/FoodInsightForm';
import InsightResult from '@/components/insight/InsightResult';
import ErrorState from '@/components/ui/ErrorState';
import { useFoodInsight } from '@/hooks/use-food-insight';
import { 
  Sparkles, 
  RotateCcw, 
  Search, 
  Zap, 
  ShieldAlert, 
  CheckCircle2, 
  Scale, 
  ChevronRight, 
  ArrowRight,
  Flame,
  Activity
} from 'lucide-react';

const SCAN_STEPS = [
  'Ingesting packaging nomenclature & brand formulations...',
  'Querying Google Gemini 3.6 Flash neural model...',
  'Auditing 60+ hidden sugar synonyms & emulsifiers...',
  'Cross-referencing USDA FoodData Central baselines...',
  'Calculating clinical Truth Score & AHA threshold...'
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
    }, 1100);
    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalyze = async (foodName: string, brand?: string) => {
    await submitInsight(foodName, brand);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto min-h-screen animate-fade-in pb-24 relative">
      {/* Ambient Radial Background Shimmers */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-emerald-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />

      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill mb-4 shadow-sm border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-[var(--text-secondary)] font-['var(--font-dm-sans)']">
            Neural Food Scanner • Gemini 3.6 Flash Engine
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-['var(--font-dm-sans)'] mb-3.5 text-[var(--text-primary)]">
          AI Food <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Insight</span>
        </h1>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
          Type any packaged supermarket food or beverage. Our neural model deconstructs marketing claims, exposes hidden sugar aliases, and computes an objective biochemical Truth Score.
        </p>
      </div>

      {/* Input Console */}
      <FoodInsightForm onSubmit={handleAnalyze} loading={loading} />

      {/* Scanning Laboratory HUD */}
      {loading && (
        <div className="w-full max-w-2xl mx-auto mt-10 card p-7 sm:p-9 border border-emerald-500/40 scanline relative overflow-hidden text-center rounded-3xl shadow-2xl bg-[var(--surface)] animate-fade-in">
          {/* Animated Holographic Aperture Reticle */}
          <div className="relative w-20 h-20 mx-auto mb-5 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/40 animate-spin" style={{ animationDuration: '6s' }} />
            <div className="absolute inset-2 rounded-full border border-cyan-500/40 animate-pulse" />
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-black font-['var(--font-dm-sans)'] text-[var(--text-primary)] mb-1">
            Deconstructing Biochemical Matrix
          </h3>

          <p className="text-xs sm:text-sm font-mono text-emerald-600 dark:text-emerald-400 font-semibold h-6 flex items-center justify-center gap-2">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>{SCAN_STEPS[scanStepIndex]}</span>
          </p>

          {/* Shimmering Progress Bar */}
          <div className="w-56 h-2 bg-[var(--surface-hover)] rounded-full mx-auto mt-6 overflow-hidden border border-[var(--border)]">
            <div className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 rounded-full animate-pulse" style={{ width: '82%' }} />
          </div>

          <p className="text-[11px] text-[var(--text-muted)] mt-4">
            Auditing FDA 21 CFR loopholes, AHA 25g daily sugar threshold, and USDA baselines
          </p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="max-w-2xl mx-auto mt-8">
          <ErrorState message={error.message || 'An error occurred during neural analysis'} onRetry={clearResult} />
        </div>
      )}

      {/* Diagnostic Result View */}
      {result && !loading && (
        <div className="mt-8 space-y-4">
          <div className="flex justify-end max-w-4xl mx-auto">
            <button
              onClick={clearResult}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] hover:border-emerald-500/40 shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-97"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-500" />
              <span>Decode Another Product</span>
            </button>
          </div>
          <InsightResult result={result} />
        </div>
      )}

      {/* Welcome / Interactive Case Studies Showcase (When no active result) */}
      {!result && !loading && !error && (
        <div className="max-w-4xl mx-auto mt-14 space-y-10 animate-fade-in">
          {/* Section Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px bg-[var(--border)] flex-1" />
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-['var(--font-dm-sans)'] flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              Notable Health Halo Scams to Explore
            </span>
            <div className="h-px bg-[var(--border)] flex-1" />
          </div>

          {/* 3 Interactive Case Study Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CURATED_CASE_STUDIES.map((study, idx) => (
              <div
                key={idx}
                onClick={() => handleAnalyze(study.food, study.brand)}
                className="group card p-5 rounded-2xl border border-[var(--border)] hover:border-emerald-500/40 bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{study.emoji}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      {study.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-emerald-500 transition-colors font-['var(--font-dm-sans)'] mb-1">
                    {study.title}
                  </h3>

                  <div className="text-xs font-semibold text-[var(--text-secondary)] mb-2 flex items-center gap-1">
                    <span>{study.food}</span>
                    <span className="text-[10px] text-[var(--text-muted)]">({study.brand})</span>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                    {study.insight}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">{study.tag}</span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Run Audit <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* How the Neural Scanner Works */}
          <div className="card p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] via-[var(--surface)] to-[var(--surface-hover)] shadow-md">
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-['var(--font-dm-sans)']">
                Under the Hood
              </span>
              <h3 className="text-lg sm:text-xl font-black font-['var(--font-dm-sans)'] text-[var(--text-primary)] mt-1">
                How NutriLens Audits Packaged Foods
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 font-black text-xs flex items-center justify-center mx-auto">
                  01
                </div>
                <h4 className="text-xs font-bold text-[var(--text-primary)]">Deconstruct Formulation</h4>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  Identifies 60+ hidden sugar aliases (maltodextrin, dextrose) and emulsifiers on the ingredient label.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] space-y-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-500 font-black text-xs flex items-center justify-center mx-auto">
                  02
                </div>
                <h4 className="text-xs font-bold text-[var(--text-primary)]">Normalize Serving Size</h4>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  Standardizes shrunken manufacturer portion sizes to realistic consumer portions and computes 4g sugar cubes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] space-y-2">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 font-black text-xs flex items-center justify-center mx-auto">
                  03
                </div>
                <h4 className="text-xs font-bold text-[var(--text-primary)]">Compute Truth Score</h4>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  Generates an objective 0–100 Truth Score and pairs you with a whole-food alternative that prevents glycemic spikes.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AIInsightPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
      </div>
    }>
      <FoodInsightContent />
    </Suspense>
  );
}
