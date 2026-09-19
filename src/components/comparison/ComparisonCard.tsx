import { Food, MetricComparison } from '@/types';
import { CheckCircle2, XCircle, AlertTriangle, Sparkles, Scale, Info } from 'lucide-react';
import Badge from '../ui/Badge';

interface ComparisonCardProps {
  food: Food;
  metrics: MetricComparison[];
  variant: 'perceived' | 'better';
  servingMode?: 'stated' | 'standardized';
}

export default function ComparisonCard({ food, metrics, variant, servingMode = 'stated' }: ComparisonCardProps) {
  const isBetter = variant === 'better';
  const isStandardized = servingMode === 'standardized';
  
  // Calculate sugar cubes (4g per cube)
  const sugarMetric = metrics.find(m => m.metricId === 'totalSugar' || m.metricId === 'sugar');
  const sugarValue = isBetter ? sugarMetric?.valueB : sugarMetric?.valueA;
  const sugarCubesCount = sugarValue ? Math.max(1, Math.round(sugarValue / 4)) : 0;

  return (
    <div className={`card overflow-hidden h-full flex flex-col transition-all duration-300 ${
      isBetter 
        ? 'border-emerald-500/30 hover:border-emerald-500/60 shadow-lg shadow-emerald-500/5' 
        : 'border-amber-500/30 hover:border-amber-500/60 shadow-lg shadow-amber-500/5'
    }`}>
      {/* Header Banner */}
      <div className={`p-6 border-b relative overflow-hidden ${
        isBetter 
          ? 'bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border-emerald-500/20' 
          : 'bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-transparent border-amber-500/20'
      }`}>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant={isBetter ? 'success' : 'warning'} className="px-3 py-1 text-xs font-bold uppercase tracking-wider">
            {isBetter ? '✓ Verified Better Choice' : '⚠ Health Halo Trap'}
          </Badge>

          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
            isStandardized 
              ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 font-mono'
              : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)]'
          }`}>
            {isStandardized ? '100g Standardized Baseline' : `Serving: ${food.servingSize.amount} ${food.servingSize.unit}`}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold font-['var(--font-dm-sans)'] text-[var(--text-primary)] leading-tight">
          {food.name}
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
          {food.description}
        </p>

        {/* Marketing Claims or Reality Badges */}
        {food.marketingClaims && food.marketingClaims.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {food.marketingClaims.map((claim, idx) => (
              <span 
                key={idx} 
                className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                  isBetter 
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20' 
                    : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/20'
                }`}
              >
                {isBetter ? '✓' : '“'} {claim} {isBetter ? '' : '”'}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Tangible Physical Sugar Visualizer Pill */}
      {sugarValue !== null && sugarValue !== undefined && sugarValue > 0 && (
        <div className="px-6 py-3 bg-[var(--surface-hover)]/60 border-b border-[var(--border)] flex items-center justify-between text-xs">
          <span className="font-semibold text-[var(--text-secondary)] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Sugar Equivalence:
          </span>
          <div className="flex items-center gap-1">
            <div className="flex gap-1" title={`${sugarValue}g sugar ≈ ${sugarCubesCount} standard sugar cubes`}>
              {[...Array(Math.min(8, sugarCubesCount))].map((_, i) => (
                <span 
                  key={i} 
                  className="w-4 h-4 rounded-sm bg-amber-200 dark:bg-amber-400/80 border border-amber-400 dark:border-amber-300 text-[8px] font-black text-amber-900 flex items-center justify-center shadow-xs"
                >
                  4g
                </span>
              ))}
              {sugarCubesCount > 8 && (
                <span className="text-[10px] font-bold text-amber-600">+{sugarCubesCount - 8}</span>
              )}
            </div>
            <span className="font-bold text-[var(--text-primary)] ml-1.5 font-mono">
              {sugarCubesCount} cubes
            </span>
          </div>
        </div>
      )}
      
      {/* Metric Breakdown Rows */}
      <div className="p-6 flex-1 flex flex-col gap-3">
        {metrics.map((mc) => {
          const value = isBetter ? mc.valueB : mc.valueA;
          const isWinnerA = mc.winner === 'a';
          const isWinnerB = mc.winner === 'b';
          const isWin = isBetter ? isWinnerB : isWinnerA;
          const isTie = mc.winner === 'tie' || mc.winner === 'unknown';
          
          return (
            <div 
              key={mc.metricId} 
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                isWin && !isTie
                  ? 'bg-emerald-500/5 border-emerald-500/20'
                  : !isWin && !isTie
                  ? 'bg-rose-500/5 border-rose-500/20'
                  : 'bg-[var(--surface)] border-[var(--border)]'
              }`}
            >
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[var(--text-primary)]">{mc.displayName}</span>
                {mc.percentDiff !== null && mc.percentDiff > 0 && !isTie && isWin && (
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    +{mc.percentDiff}% superior
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="font-extrabold font-mono text-base sm:text-lg text-[var(--text-primary)]">
                  {typeof value === 'number' 
                    ? (Number.isInteger(value) ? value : value.toFixed(1)) 
                    : (value ?? 'N/A')}
                  {value !== null && value !== undefined ? mc.unit : ''}
                </span>

                {!isTie && (
                  isWin ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500">
                      <XCircle className="w-4 h-4" />
                    </div>
                  )
                )}
                {isTie && (
                  <span className="w-6 h-6 rounded-full bg-[var(--surface-hover)] flex items-center justify-center text-[var(--text-muted)] text-xs font-bold">
                    =
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
