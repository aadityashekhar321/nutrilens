'use client';
import { NutritionMetric } from '@/types';
import { Check, ArrowUpRight, ArrowDownRight, SlidersHorizontal } from 'lucide-react';

interface MetricToggleGroupProps {
  metrics: NutritionMetric[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export default function MetricToggleGroup({ metrics, selectedIds, onChange }: MetricToggleGroupProps) {
  const toggleMetric = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        onChange(selectedIds.filter(mId => mId !== id));
      }
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const selectPreset = (presetType: 'all' | 'sugar-sodium' | 'macros') => {
    if (presetType === 'all') {
      onChange(metrics.map(m => m.id));
    } else if (presetType === 'sugar-sodium') {
      onChange(['totalSugar', 'addedSugar', 'sodium', 'calories'].filter(id => metrics.some(m => m.id === id)));
    } else if (presetType === 'macros') {
      onChange(['protein', 'dietaryFiber', 'fiber', 'calories', 'totalFat'].filter(id => metrics.some(m => m.id === id)));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Header & Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5 font-['var(--font-dm-sans)']">
          <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-500" /> Active Nutrition Filters
        </span>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] mr-1 hidden sm:inline">
            Presets:
          </span>
          <button
            type="button"
            onClick={() => selectPreset('all')}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[var(--surface-hover)] hover:bg-[var(--border)] text-[var(--text-secondary)] transition-colors cursor-pointer"
          >
            All Nutrients
          </button>
          <button
            type="button"
            onClick={() => selectPreset('sugar-sodium')}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/20 transition-colors cursor-pointer"
          >
            Sugar & Sodium Trap
          </button>
          <button
            type="button"
            onClick={() => selectPreset('macros')}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 transition-colors cursor-pointer"
          >
            Protein & Fiber
          </button>
        </div>
      </div>

      {/* Metric Pills Grid */}
      <div className="flex flex-wrap gap-2 pt-1">
        {metrics.map((m) => {
          const isSelected = selectedIds.includes(m.id);
          const isHigher = m.preferredDirection === 'higher';
          const isLower = m.preferredDirection === 'lower';

          return (
            <button
              key={m.id}
              onClick={() => toggleMetric(m.id)}
              className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                isSelected 
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 scale-[1.02]' 
                  : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
              }`}
            >
              <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                isSelected ? 'bg-white/20 text-white' : 'bg-[var(--surface-hover)] text-[var(--text-muted)]'
              }`}>
                {isSelected ? (
                  <Check className="w-2.5 h-2.5" />
                ) : isHigher ? (
                  <ArrowUpRight className="w-2.5 h-2.5 text-emerald-500" />
                ) : isLower ? (
                  <ArrowDownRight className="w-2.5 h-2.5 text-rose-500" />
                ) : null}
              </div>

              <span>{m.displayName || m.shortName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
