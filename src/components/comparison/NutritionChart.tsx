'use client';
import { ComparisonChartData } from '@/types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface NutritionChartProps {
  data: ComparisonChartData[];
  servingMode?: 'stated' | 'standardized';
}

export default function NutritionChart({ data, servingMode = 'stated' }: NutritionChartProps) {
  if (!data || data.length === 0) return null;
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const entryA = payload[0];
      const entryB = payload[1];
      const unit = data.find(d => d.displayName === label)?.unit || '';
      const valA = Number(entryA.value || 0);
      const valB = Number(entryB.value || 0);
      const diff = Math.abs(valA - valB);
      const maxVal = Math.max(valA, valB);
      const pctDiff = maxVal > 0 ? Math.round((diff / maxVal) * 100) : 0;

      return (
        <div className="bg-[var(--surface)] p-4 rounded-xl shadow-xl border border-[var(--border)] text-xs space-y-2">
          <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-1.5">
            <p className="font-bold text-sm text-[var(--text-primary)]">{label}</p>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface-hover)] text-[var(--text-muted)]">
              {servingMode === 'standardized' ? 'per 100g' : 'per serving'}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-amber-500 font-semibold">{entryA.name}:</span>
            <span className="font-mono font-bold">{valA % 1 === 0 ? valA : valA.toFixed(1)} {unit}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-emerald-500 font-semibold">{entryB.name}:</span>
            <span className="font-mono font-bold">{valB % 1 === 0 ? valB : valB.toFixed(1)} {unit}</span>
          </div>
          {diff > 0 && (
            <div className="pt-1.5 border-t border-[var(--border)] text-[10px] flex justify-between items-center">
              <span className="text-[var(--text-muted)]">Comparison Delta:</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                Δ {diff % 1 === 0 ? diff : diff.toFixed(1)} {unit} ({pctDiff}% diff)
              </span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full mt-10 p-6 sm:p-8 card border border-[var(--border)] shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-[var(--text-primary)] font-['var(--font-dm-sans)']">
              Macro & Micro Spectrometer
            </h4>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {servingMode === 'standardized' ? '⚖️ Standardized 100g' : '📦 As Stated On Box'}
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            {servingMode === 'standardized' 
              ? 'Both foods normalized to 100g baseline for true nutrient density comparison'
              : 'Direct side-by-side comparison using manufacturer package serving sizes'}
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-amber-500">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> {data[0]?.foodAName || 'Perceived Healthy'}
          </span>
          <span className="flex items-center gap-1.5 text-emerald-500">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> {data[0]?.foodBName || 'Better Alternative'}
          </span>
        </div>
      </div>

      <div className="w-full min-w-0 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 15, right: 20, left: 0, bottom: 5 }} barGap={6}>
            <XAxis 
              dataKey="displayName" 
              tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontWeight: 500 }} 
              axisLine={{ stroke: 'var(--border)' }}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--surface-hover)', opacity: 0.5 }} />
            <Bar 
              dataKey="foodA" 
              name={data[0]?.foodAName || 'Food A'} 
              radius={[6, 6, 0, 0]}
              fill="rgba(245, 158, 11, 0.85)"
              animationDuration={800}
            />
            <Bar 
              dataKey="foodB" 
              name={data[0]?.foodBName || 'Food B'} 
              radius={[6, 6, 0, 0]}
              fill="rgba(16, 185, 129, 0.9)"
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
