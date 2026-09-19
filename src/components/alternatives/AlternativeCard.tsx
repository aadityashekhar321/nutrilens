import { ArrowRight, AlertTriangle, Check, Info, Sparkles, TrendingDown } from 'lucide-react';
import { FoodAlternative } from '@/types';

export default function AlternativeCard({ alternative }: { alternative: FoodAlternative }) {
  return (
    <div className="card card-spotlight overflow-hidden border border-[var(--border)] shadow-md hover:shadow-xl transition-all duration-300">
      <div className="p-6 sm:p-7">
        {/* Swap Flow Visualizer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-6">
          {/* Avoid / Left */}
          <div className="flex-1 w-full bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-600 dark:text-rose-400 block mb-1">
              Deceptive Pick
            </span>
            <span className="font-bold text-base sm:text-lg text-[var(--text-primary)] block leading-tight">
              {alternative.popularFood}
            </span>
          </div>
          
          {/* Visual Transfer Arrow */}
          <div className="w-10 h-10 rounded-full bg-[var(--surface-hover)] border border-[var(--border)] flex items-center justify-center text-emerald-500 flex-shrink-0 shadow-xs">
            <ArrowRight className="w-4 h-4 rotate-90 sm:rotate-0" />
          </div>
          
          {/* Choose / Right */}
          <div className="flex-1 w-full bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-1">
              NutriLens Swap
            </span>
            <span className="font-bold text-base sm:text-lg text-[var(--text-primary)] block leading-tight">
              {alternative.alternativeFood}
            </span>
          </div>
        </div>

        {/* Reason / Biochemical Why */}
        <div className="bg-[var(--surface-hover)] rounded-2xl p-4 mb-4 border border-[var(--border)]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 mb-1.5 font-['var(--font-dm-sans)']">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Core Concern: {alternative.concern}</span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            {alternative.reason}
          </p>
        </div>

        {/* Macro Upgrade Quick Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {alternative.comparisonMetrics.map((diff, i) => (
            <span key={i} className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 flex items-center gap-1 font-mono">
              <Check className="w-3 h-3 text-emerald-500" />
              <span>{diff.metric}: {diff.alternative} (vs {diff.popular})</span>
            </span>
          ))}
        </div>

        {/* Nutritional Metrics Differential Table */}
        <div className="rounded-xl overflow-hidden border border-[var(--border)]">
          <div className="grid grid-cols-3 text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] bg-[var(--surface-hover)] py-2.5 px-3 border-b border-[var(--border)]">
            <div>Nutrient</div>
            <div className="text-center text-rose-500">Popular</div>
            <div className="text-center text-emerald-500 font-bold">Alternative</div>
          </div>
          <div className="divide-y divide-[var(--border)] text-xs">
            {alternative.comparisonMetrics.map((diff, i) => (
              <div key={i} className="grid grid-cols-3 py-2.5 px-3 items-center hover:bg-[var(--surface-hover)]/40 transition-colors">
                <div className="font-medium text-[var(--text-primary)]">{diff.metric}</div>
                <div className="text-center text-[var(--text-secondary)] font-mono">{diff.popular}</div>
                <div className="text-center text-emerald-600 dark:text-emerald-400 font-mono font-bold flex items-center justify-center gap-1">
                  <span>{diff.alternative}</span>
                  <Check className="w-3 h-3 text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
