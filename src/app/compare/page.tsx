'use client';
import { useState, useMemo } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import CategorySelector from '@/components/comparison/CategorySelector';
import MetricToggleGroup from '@/components/comparison/MetricToggleGroup';
import ComparisonCard from '@/components/comparison/ComparisonCard';
import NutritionChart from '@/components/comparison/NutritionChart';
import ExplanationPanel from '@/components/comparison/ExplanationPanel';
import Badge from '@/components/ui/Badge';
import { Scale, Sparkles, Info, SlidersHorizontal } from 'lucide-react';

import { comparisons as foodComparisons } from '@/data/comparisons';
import { nutritionMetrics } from '@/data/nutrition-metrics';
import { foods } from '@/data/foods';
import { FOOD_CATEGORY_LABELS } from '@/types/food';
import { generateExplanation } from '@/lib/explanation-engine';
import { normalizeToServing } from '@/lib/comparison-engine';
import type { MetricComparison, ComparisonChartData } from '@/types';

const foodCategories = Object.entries(FOOD_CATEGORY_LABELS).map(([id, label]) => ({ id, name: label, description: '', foods: [] as string[] }));

export default function ComparePage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(foodCategories[0]?.id || '');
  const [selectedMetricIds, setSelectedMetricIds] = useState<string[]>(['calories', 'totalSugar', 'protein', 'sodium', 'fiber']);
  const [servingMode, setServingMode] = useState<'stated' | 'standardized'>('stated');
  
  const comparison = useMemo(() => {
    return foodComparisons.find(c => c.categoryId === selectedCategoryId);
  }, [selectedCategoryId]);

  const foodA = useMemo(() => {
    return comparison ? foods.find(f => f.id === comparison.foodAId) : undefined;
  }, [comparison]);

  const foodB = useMemo(() => {
    return comparison ? foods.find(f => f.id === comparison.foodBId) : undefined;
  }, [comparison]);

  // Compute active nutrition based on servingMode (stated vs standardized 100g)
  const activeNutritionA = useMemo(() => {
    if (!foodA) return null;
    if (servingMode === 'standardized') {
      return normalizeToServing(foodA.nutrition, foodA.servingSize.amount, 100);
    }
    return foodA.nutrition;
  }, [foodA, servingMode]);

  const activeNutritionB = useMemo(() => {
    if (!foodB) return null;
    if (servingMode === 'standardized') {
      return normalizeToServing(foodB.nutrition, foodB.servingSize.amount, 100);
    }
    return foodB.nutrition;
  }, [foodB, servingMode]);

  const metricComparisons: MetricComparison[] = useMemo(() => {
    if (!foodA || !foodB || !activeNutritionA || !activeNutritionB) return [];
    
    return selectedMetricIds.map(metricId => {
      const metric = nutritionMetrics.find(m => m.id === metricId);
      if (!metric) return null;
      
      const valA = (activeNutritionA as unknown as Record<string, number | null>)[metricId] ?? null;
      const valB = (activeNutritionB as unknown as Record<string, number | null>)[metricId] ?? null;
      
      let winner: 'a' | 'b' | 'tie' | 'unknown' = 'unknown';
      let margin: number | null = null;
      let percentDiff: number | null = null;
      
      if (valA !== null && valB !== null) {
        margin = Math.abs(valA - valB);
        const max = Math.max(valA, valB);
        percentDiff = max > 0 ? Math.round((margin / max) * 100) : 0;
        
        if (valA === valB) {
          winner = 'tie';
        } else if (metric.preferredDirection === 'higher') {
          winner = valA > valB ? 'a' : 'b';
        } else if (metric.preferredDirection === 'lower') {
          winner = valA < valB ? 'a' : 'b';
        } else {
          winner = 'unknown';
        }
      }

      const mc: MetricComparison = {
        metricId,
        displayName: metric.displayName,
        unit: metric.unit,
        valueA: valA,
        valueB: valB,
        winner,
        margin,
        percentDiff,
        interpretation: '',
        preferredDirection: metric.preferredDirection,
      };
      return mc;
    }).filter((m): m is MetricComparison => m !== null);
  }, [foodA, foodB, activeNutritionA, activeNutritionB, selectedMetricIds]);

  const chartData: ComparisonChartData[] = useMemo(() => {
    if (!foodA || !foodB) return [];
    return metricComparisons.map(mc => ({
      metric: mc.metricId,
      displayName: mc.displayName,
      unit: mc.unit,
      foodA: mc.valueA ?? 0,
      foodB: mc.valueB ?? 0,
      foodAName: foodA.name,
      foodBName: foodB.name,
      winner: mc.winner,
    }));
  }, [foodA, foodB, metricComparisons]);

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto pb-24 animate-fade-in">
      {/* Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill mb-4 shadow-xs">
          <Scale className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-semibold text-[var(--text-secondary)]">Direct Food Spectrometer</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-['var(--font-dm-sans)'] tracking-tight text-[var(--text-primary)] mb-3">
          Food Face-Off
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          See past the clever front-of-box claims. Compare "perceived healthy" foods against genuinely superior alternatives.
        </p>
      </div>
      
      {/* Control Console */}
      <div className="card p-6 sm:p-8 mb-10 border border-[var(--border)] shadow-md space-y-6">
        <CategorySelector 
          categories={foodCategories}
          selectedId={selectedCategoryId}
          onChange={setSelectedCategoryId}
        />

        {/* Serving Size Normalization Switch */}
        <div className="pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5 font-['var(--font-dm-sans)']">
              <Scale className="w-3.5 h-3.5 text-emerald-500" /> Serving Size Baseline
            </span>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Standardizing to 100g exposes deceptive serving size tricks used by food manufacturers.
            </p>
          </div>
          <div className="flex items-center p-1 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)]">
            <button
              type="button"
              onClick={() => setServingMode('stated')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                servingMode === 'stated'
                  ? 'bg-[var(--surface)] text-[var(--text-primary)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              📦 As Stated on Box
            </button>
            <button
              type="button"
              onClick={() => setServingMode('standardized')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                servingMode === 'standardized'
                  ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>⚖️ Standardized 100g</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-white/20 font-mono">Fair</span>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--border)]">
          <MetricToggleGroup 
            metrics={nutritionMetrics}
            selectedIds={selectedMetricIds}
            onChange={setSelectedMetricIds}
          />
        </div>
      </div>

      {!foodA || !foodB || !comparison ? (
        <div className="card p-12 text-center text-[var(--text-secondary)]">
          <Info className="w-8 h-8 mx-auto mb-4 opacity-50" />
          <p>Select a category above to view comparison</p>
        </div>
      ) : (
        <div className="animate-fade-in">
          {/* Face-Off Split View */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Center VS Beacon for Desktop */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[var(--surface)] border-4 border-[var(--background)] shadow-2xl items-center justify-center font-black italic text-base z-20 text-[var(--text-primary)]">
              VS
            </div>

            {/* Left Card: Perceived Healthy */}
            <div className="relative">
              <ComparisonCard 
                food={foodA} 
                metrics={metricComparisons} 
                variant="perceived" 
                servingMode={servingMode}
              />
            </div>

            {/* Mobile VS Pill */}
            <div className="flex lg:hidden justify-center -my-2 z-10">
              <span className="px-4 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-md text-xs font-black italic">
                VS
              </span>
            </div>

            {/* Right Card: Better Alternative */}
            <div className="relative">
              <ComparisonCard 
                food={foodB} 
                metrics={metricComparisons} 
                variant="better" 
                servingMode={servingMode}
              />
            </div>
          </div>
          
          {/* Nutrition Chart */}
          <NutritionChart data={chartData} servingMode={servingMode} />
          
          {/* Explanation Verdict Panel */}
          <ExplanationPanel 
            explanation={generateExplanation(metricComparisons, foodA.name, foodB.name)}
            foodAName={foodA.name}
            foodBName={foodB.name}
          />
        </div>
      )}
    </div>
  );
}
