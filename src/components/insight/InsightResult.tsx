'use client';
import { useState, useMemo } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  Info, 
  Eye, 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight,
  Flame,
  Activity,
  Layers,
  Scale
} from 'lucide-react';
import { FoodInsightResponse } from '@/types';
import RiskBadge from './RiskBadge';

export default function InsightResult({ result }: { result: FoodInsightResponse }) {
  const [portionMultiplier, setPortionMultiplier] = useState<number>(1.0);

  if (!result) return null;

  // Calculate a visual Truth Score based on healthHaloRisk
  const score = result.healthHaloRisk === 'low' 
    ? 88 
    : result.healthHaloRisk === 'medium' 
    ? 58 
    : result.healthHaloRisk === 'high' 
    ? 32 
    : 50;

  const scoreColor = result.healthHaloRisk === 'low'
    ? 'text-emerald-500 stroke-emerald-500'
    : result.healthHaloRisk === 'medium'
    ? 'text-amber-500 stroke-amber-500'
    : 'text-rose-500 stroke-rose-500';

  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Function to scale a nutrient string e.g. "14g" or "220mg"
  const scaleNutrient = (rawVal: string | undefined): string => {
    if (!rawVal) return 'N/A';
    const match = rawVal.match(/^([\d.]+)\s*([a-zA-Z%]+)?$/);
    if (!match) return rawVal;
    const num = parseFloat(match[1]);
    const unit = match[2] || '';
    const scaled = num * portionMultiplier;
    return `${scaled % 1 === 0 ? scaled : scaled.toFixed(1)}${unit}`;
  };

  // Parse raw sugar grams for physical cube visualizer
  const rawSugarGrams = useMemo(() => {
    if (!result.nutritionalHighlights?.sugar) return null;
    const match = result.nutritionalHighlights.sugar.match(/([\d.]+)/);
    return match ? parseFloat(match[1]) : null;
  }, [result.nutritionalHighlights]);

  const activeSugarGrams = rawSugarGrams !== null ? rawSugarGrams * portionMultiplier : null;
  const activeSugarCubes = activeSugarGrams !== null ? Math.round(activeSugarGrams / 4) : 0;
  const isAhaExceeded = activeSugarGrams !== null && activeSugarGrams > 25;

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 space-y-8 animate-slide-up">
      {/* Executive Summary Card with Truth Score Gauge */}
      <div className="card p-6 sm:p-8 bg-gradient-to-br from-[var(--surface)] via-[var(--surface)] to-[var(--surface-hover)] border border-[var(--border)] shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--border)]">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-['var(--font-dm-sans)']">
                AI Diagnostic Report
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-['var(--font-dm-sans)'] text-[var(--text-primary)]">
              {result.foodName}
            </h2>
            <div className="mt-3">
              <RiskBadge risk={result.healthHaloRisk} />
            </div>
          </div>

          {/* Circular Animated Truth Score Gauge */}
          <div className="flex items-center gap-4 bg-[var(--surface-hover)] p-4 rounded-2xl border border-[var(--border)] flex-shrink-0">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 84 84">
                <circle
                  cx="42"
                  cy="42"
                  r="36"
                  className="stroke-[var(--border)]"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="42"
                  cy="42"
                  r="36"
                  className={`${scoreColor} transition-all duration-1000 ease-out`}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-extrabold font-mono text-[var(--text-primary)] leading-none">
                  {score}
                </span>
                <span className="text-[9px] uppercase font-bold text-[var(--text-muted)] tracking-wider">
                  / 100
                </span>
              </div>
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-[var(--text-primary)]">Truth Score</div>
              <p className="text-[11px] text-[var(--text-secondary)] max-w-[130px] leading-tight mt-0.5">
                {result.healthHaloRisk === 'low' 
                  ? 'Clean nutritional profile matches marketing.' 
                  : result.healthHaloRisk === 'medium'
                  ? 'Moderate discrepancy with package claims.'
                  : 'Severe deceptive health halo detected.'}
              </p>
            </div>
          </div>
        </div>

        {/* Narrative Summary */}
        <div className="pt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
            Algorithmic Synthesis
          </h3>
          <p className="text-base sm:text-lg text-[var(--text-primary)] leading-relaxed font-medium">
            {result.summary}
          </p>

          {result.importantCaveat && (
            <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span><strong>Caveat:</strong> {result.importantCaveat}</span>
            </div>
          )}
        </div>
      </div>

      {/* Portion Eaten Multiplier Console */}
      <div className="card p-5 sm:p-6 border border-[var(--border)] bg-[var(--surface)] shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border)]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5 font-['var(--font-dm-sans)']">
              <Layers className="w-4 h-4 text-emerald-500" /> Portion Reality Multiplier
            </span>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Companies set tiny serving sizes to make sugar look low. Select how much you actually consume:
            </p>
          </div>
          
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)]">
            {[
              { label: '1.0x Box Serving', val: 1.0 },
              { label: '1.5x Typical Bowl', val: 1.5 },
              { label: '2.0x Double', val: 2.0 },
              { label: '2.5x Whole Bag', val: 2.5 },
            ].map((p) => (
              <button
                key={p.val}
                type="button"
                onClick={() => setPortionMultiplier(p.val)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  portionMultiplier === p.val
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Sugar Cubes Physical Meter */}
        {activeSugarGrams !== null && (
          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[var(--text-secondary)]">
                Physical Sugar ({portionMultiplier}x portion):
              </span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                {activeSugarGrams.toFixed(1)}g ≈ {activeSugarCubes} sugar cubes
              </span>
              {isAhaExceeded && (
                <span className="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 text-[10px] font-extrabold border border-rose-500/20">
                  ⚠️ Exceeds AHA 25g Daily Limit
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {[...Array(Math.min(10, activeSugarCubes))].map((_, i) => (
                <span
                  key={i}
                  className="w-4 h-4 rounded-sm bg-amber-200 dark:bg-amber-400/80 border border-amber-400 dark:border-amber-300 text-[8px] font-black text-amber-900 flex items-center justify-center shadow-xs"
                >
                  4g
                </span>
              ))}
              {activeSugarCubes > 10 && (
                <span className="text-[10px] font-bold text-amber-600 font-mono">
                  +{activeSugarCubes - 10} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Nutritional Highlights Grid (if provided) */}
      {result.nutritionalHighlights && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'Sugar', val: scaleNutrient(result.nutritionalHighlights.sugar), color: 'text-amber-500' },
            { label: 'Protein', val: scaleNutrient(result.nutritionalHighlights.protein), color: 'text-emerald-500' },
            { label: 'Fiber', val: scaleNutrient(result.nutritionalHighlights.fiber), color: 'text-cyan-500' },
            { label: 'Sodium', val: scaleNutrient(result.nutritionalHighlights.sodium), color: 'text-rose-500' },
            { label: 'Fat', val: scaleNutrient(result.nutritionalHighlights.fat), color: 'text-purple-500' },
          ].map((item, idx) => (
            <div key={idx} className="card p-3.5 text-center border border-[var(--border)]">
              <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                {item.label} ({portionMultiplier}x)
              </span>
              <span className={`text-sm sm:text-base font-bold font-mono mt-1 block ${item.color}`}>
                {item.val || 'N/A'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Deconstructed Concerns & Marketing Claims */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Concerns */}
        {result.potentialConcerns && result.potentialConcerns.length > 0 && (
          <div className="card p-6 border-rose-500/20 bg-gradient-to-br from-rose-500/5 to-transparent">
            <h3 className="text-base font-bold flex items-center gap-2 mb-4 text-[var(--text-primary)] font-['var(--font-dm-sans)']">
              <AlertTriangle className="w-5 h-5 text-rose-500 flex-shrink-0" /> 
              <span>Hidden Flags to Watch</span>
            </h3>
            <ul className="space-y-3">
              {result.potentialConcerns.map((concern, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
                  <span>{concern}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Marketing Claims */}
        {result.likelyMarketingClaims && result.likelyMarketingClaims.length > 0 && (
          <div className="card p-6 border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent">
            <h3 className="text-base font-bold flex items-center gap-2 mb-4 text-[var(--text-primary)] font-['var(--font-dm-sans)']">
              <Info className="w-5 h-5 text-amber-500 flex-shrink-0" /> 
              <span>Deconstructed Marketing Claims</span>
            </h3>
            <ul className="space-y-3">
              {result.likelyMarketingClaims.map((claim, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                  <span>{claim}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* What to Check on the Label */}
      {result.whatToCheckOnLabel && result.whatToCheckOnLabel.length > 0 && (
        <div className="card p-6 border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent">
          <h3 className="text-base font-bold flex items-center gap-2 mb-4 text-[var(--text-primary)] font-['var(--font-dm-sans)']">
            <Eye className="w-5 h-5 text-cyan-500 flex-shrink-0" /> 
            <span>Label Reading Checklist for this Product</span>
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {result.whatToCheckOnLabel.map((tip, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-secondary)] leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Better Choice Guidance */}
      {result.betterChoiceGuidance && (
        <div className="card p-6 sm:p-8 border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-[var(--surface)] to-transparent shadow-md">
          <h3 className="text-lg font-bold flex items-center gap-2.5 mb-3 text-[var(--text-primary)] font-['var(--font-dm-sans)']">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" /> 
            <span>Recommended Superior Alternative</span>
          </h3>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {result.betterChoiceGuidance}
          </p>
        </div>
      )}
    </div>
  );
}
