'use client';
import { useState, useMemo } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  Sparkles, 
  Info,
  Layers,
  Scale,
  ShieldAlert,
  Flame,
  Check,
  Award
} from 'lucide-react';
import { FoodInsightResponse } from '@/types';
import RiskBadge from './RiskBadge';

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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-slide-up">
      {/* 1. Diagnostic Report Executive Bento Card */}
      <div className="card p-6 sm:p-8 bg-gradient-to-br from-[var(--surface)] via-[var(--surface)] to-[var(--surface-hover)] border border-[var(--border)] shadow-2xl relative overflow-hidden rounded-3xl">
        {/* Glow Accent */}
        <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl ${scoreTheme.bg} blur-3xl pointer-events-none -z-10 rounded-full`} />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[var(--border)]">
          {/* Left Title & Status */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-['var(--font-dm-sans)']">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                AI Diagnostic Telemetry
              </span>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                Model: Gemini 3.6 Flash
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black font-['var(--font-dm-sans)'] text-[var(--text-primary)] tracking-tight">
              {result.foodName}
            </h2>

            <div className="flex items-center gap-3 pt-1">
              <RiskBadge risk={result.healthHaloRisk} />
              <span className="text-xs font-semibold text-[var(--text-secondary)]">
                {scoreTheme.label}
              </span>
            </div>
          </div>

          {/* Right Circular Holographic Gauge */}
          <div className="flex items-center gap-4 bg-[var(--surface-hover)] p-4 sm:p-5 rounded-2xl border border-[var(--border)] shadow-inner flex-shrink-0">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                {/* Track background */}
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  className="stroke-[var(--border)]"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Score Fill */}
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke={scoreTheme.stroke}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
                <span className="text-2xl font-black font-mono text-[var(--text-primary)] leading-none">
                  {score}
                </span>
                <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider mt-0.5">
                  / 100
                </span>
              </div>
            </div>
            <div className="text-left space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Truth Score
              </div>
              <div className={`text-sm font-extrabold ${scoreTheme.text}`}>
                {scoreTheme.label}
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] max-w-[140px] leading-tight">
                {scoreTheme.sub}
              </p>
            </div>
          </div>
        </div>

        {/* Algorithmic Narrative Synthesis */}
        <div className="pt-6 space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2 flex items-center gap-1.5">
              <span>Algorithmic Clinical Synthesis</span>
            </h3>
            <p className="text-base sm:text-lg text-[var(--text-primary)] leading-relaxed font-normal bg-[var(--surface-hover)]/60 p-4 sm:p-5 rounded-2xl border border-[var(--border)] border-l-4 border-l-emerald-500">
              {result.summary}
            </p>
          </div>

          {result.importantCaveat && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold">Important Nutritional Caveat:</span>
                <p className="text-[var(--text-secondary)] dark:text-amber-200/90 leading-relaxed">
                  {result.importantCaveat}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Interactive Portion Reality Multiplier HUD */}
      <div className="card p-5 sm:p-7 border border-[var(--border)] bg-[var(--surface)] shadow-lg rounded-3xl space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-2 font-['var(--font-dm-sans)']">
              <Layers className="w-4 h-4 text-emerald-500" /> Portion Reality Multiplier
            </span>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Food companies shrink serving sizes to make sugar appear low. Select how much you actually eat:
            </p>
          </div>
          
          {/* Multiplier Segmented Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)] self-stretch sm:self-auto justify-between sm:justify-start">
            {[
              { label: '1.0x Box Serving', val: 1.0 },
              { label: '1.5x Typical Bowl', val: 1.5 },
              { label: '2.0x Double Portion', val: 2.0 },
              { label: '2.5x Whole Bag', val: 2.5 },
            ].map((p) => (
              <button
                key={p.val}
                type="button"
                onClick={() => setPortionMultiplier(p.val)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  portionMultiplier === p.val
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Sugar Cubes Physical Stacking Meter */}
        {activeSugarGrams !== null && (
          <div className="space-y-4 pt-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[var(--surface-hover)]/70 p-4 rounded-2xl border border-[var(--border)]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[var(--text-secondary)]">
                    Physical Sugar ({portionMultiplier}x portion):
                  </span>
                  <span className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400">
                    {activeSugarGrams.toFixed(1)}g ≈ {activeSugarCubes} sugar cubes
                  </span>
                </div>
                
                {/* AHA Daily Limit Bar */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[11px] text-[var(--text-muted)]">AHA 25g Daily Limit:</span>
                  <div className="w-32 h-2 rounded-full bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${isAhaExceeded ? 'bg-rose-500' : 'bg-emerald-500'}`}
                      style={{ width: `${Math.min(100, ahaPercent)}%` }}
                    />
                  </div>
                  <span className={`font-mono text-[11px] font-bold ${isAhaExceeded ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {ahaPercent}%
                  </span>
                </div>
              </div>

              {/* 3D Physical Sugar Cubes Stacks */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[...Array(Math.min(12, activeSugarCubes))].map((_, i) => (
                  <div
                    key={i}
                    title="1 sugar cube = 4 grams of pure sugar"
                    className="w-5 h-5 rounded-md bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-400/90 dark:to-amber-500 border border-amber-300 dark:border-amber-200/50 shadow-sm text-[8px] font-black text-amber-900 flex items-center justify-center transition-all hover:scale-125 select-none"
                  >
                    4g
                  </div>
                ))}
                {activeSugarCubes > 12 && (
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono pl-1">
                    +{activeSugarCubes - 12} more
                  </span>
                )}
              </div>
            </div>

            {isAhaExceeded && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center gap-2.5 text-xs text-rose-700 dark:text-rose-300 animate-fade-in font-medium">
                <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span>
                  <strong>AHA Limit Exceeded:</strong> At {portionMultiplier}x portion, this single serving delivers <strong>{ahaPercent}%</strong> of the American Heart Association&apos;s daily recommended added sugar maximum (25g).
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Nutritional Highlights Spectrometer (5 Macros) */}
      {result.nutritionalHighlights && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-['var(--font-dm-sans)']">
              Macro Spectrometer (Scaled to {portionMultiplier}x portion)
            </span>
            <span className="text-[11px] text-[var(--text-muted)]">
              USDA Baseline Aligned
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { label: 'Added Sugar', ...scaleNutrient(result.nutritionalHighlights.sugar), color: 'text-amber-500', bar: 'bg-amber-500' },
              { label: 'Protein', ...scaleNutrient(result.nutritionalHighlights.protein), color: 'text-emerald-500', bar: 'bg-emerald-500' },
              { label: 'Dietary Fiber', ...scaleNutrient(result.nutritionalHighlights.fiber), color: 'text-cyan-500', bar: 'bg-cyan-500' },
              { label: 'Sodium', ...scaleNutrient(result.nutritionalHighlights.sodium), color: 'text-rose-500', bar: 'bg-rose-500' },
              { label: 'Total Fat', ...scaleNutrient(result.nutritionalHighlights.fat), color: 'text-purple-500', bar: 'bg-purple-500' },
            ].map((item, idx) => (
              <div key={idx} className="card p-4 text-center border border-[var(--border)] bg-[var(--surface)] hover:border-emerald-500/30 transition-all rounded-2xl">
                <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  {item.label}
                </span>
                <span className={`text-lg sm:text-xl font-black font-mono mt-1.5 block ${item.color}`}>
                  {item.val || 'N/A'}
                </span>
                {/* Sub-bar indicator */}
                <div className="w-full h-1 bg-[var(--surface-hover)] rounded-full mt-2.5 overflow-hidden">
                  <div className={`h-full ${item.bar} rounded-full`} style={{ width: '65%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Deconstructed Flags vs Marketing Claims Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hidden Flags to Watch */}
        {result.potentialConcerns && result.potentialConcerns.length > 0 && (
          <div className="card p-6 border border-rose-500/20 bg-gradient-to-br from-rose-500/5 to-transparent rounded-3xl space-y-4">
            <h3 className="text-base font-bold flex items-center gap-2.5 text-[var(--text-primary)] font-['var(--font-dm-sans)']">
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <span>Hidden Red Flags to Watch</span>
            </h3>
            <ul className="space-y-3">
              {result.potentialConcerns.map((concern, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
                  <span>{concern}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Deconstructed Marketing Claims */}
        {result.likelyMarketingClaims && result.likelyMarketingClaims.length > 0 && (
          <div className="card p-6 border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent rounded-3xl space-y-4">
            <h3 className="text-base font-bold flex items-center gap-2.5 text-[var(--text-primary)] font-['var(--font-dm-sans)']">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Info className="w-4 h-4" />
              </div>
              <span>Marketing Buzzwords vs Reality</span>
            </h3>
            <ul className="space-y-3">
              {result.likelyMarketingClaims.map((claim, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                  <span>{claim}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 5. Interactive Grocery Aisle Reading Checklist */}
      {result.whatToCheckOnLabel && result.whatToCheckOnLabel.length > 0 && (
        <div className="card p-6 sm:p-7 border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold flex items-center gap-2.5 text-[var(--text-primary)] font-['var(--font-dm-sans)']">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                <Eye className="w-4 h-4" />
              </div>
              <span>Grocery Aisle Inspection Checklist</span>
            </h3>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              {checkedCount}/{totalTips} Verified
            </span>
          </div>

          <p className="text-xs text-[var(--text-secondary)]">
            Tap each checklist item as you inspect the physical package:
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {result.whatToCheckOnLabel.map((tip, i) => {
              const isChecked = !!checkedTips[i];
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleCheckTip(i)}
                  className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-[var(--text-primary)]'
                      : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)] hover:border-cyan-500/30'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-lg border flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors ${
                    isChecked
                      ? 'bg-cyan-500 border-cyan-500 text-white'
                      : 'border-[var(--border)] bg-[var(--surface-hover)]'
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className={`text-xs leading-relaxed ${isChecked ? 'line-through opacity-80' : ''}`}>
                    {tip}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Recommended Superior Whole-Food Alternative */}
      {result.betterChoiceGuidance && (
        <div className="card p-6 sm:p-8 border border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 via-[var(--surface)] to-transparent shadow-xl rounded-3xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block font-['var(--font-dm-sans)']">
                Scientifically Superior Alternative
              </span>
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-['var(--font-dm-sans)']">
                Whole-Food Smart Substitution
              </h3>
            </div>
          </div>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed pl-13 font-medium">
            {result.betterChoiceGuidance}
          </p>
        </div>
      )}
    </div>
  );
}
