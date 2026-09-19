'use client';
import { useState } from 'react';
import AlternativeCard from '@/components/alternatives/AlternativeCard';
import { foodAlternatives } from '@/data/alternatives';
import { ArrowRightLeft, Sparkles, TrendingDown, Flame, Scale, Heart } from 'lucide-react';

export default function AlternativesPage() {
  const [weeklySwaps, setWeeklySwaps] = useState(5);

  // Math: Average swap saves ~18g added sugar and ~140 empty calories per serving
  const annualSugarGrams = weeklySwaps * 18 * 52;
  const annualSugarLbs = (annualSugarGrams / 453.592).toFixed(1);
  const annualTeaspoons = Math.round(annualSugarGrams / 4);
  const annualSugarCubes = Math.round(annualSugarGrams / 4);
  const annualSodaCans = Math.round(annualSugarGrams / 39); // 39g sugar per standard 12oz soda
  const annualCalories = Math.round(weeklySwaps * 140 * 52);
  const metabolicDays = (annualCalories / 2000).toFixed(1);

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto pb-24 animate-fade-in">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill mb-4 shadow-xs">
          <ArrowRightLeft className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-semibold text-[var(--text-secondary)]">Nutrition Upgrade Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-['var(--font-dm-sans)'] tracking-tight text-[var(--text-primary)] mb-3">
          Smart Swaps Studio
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          Upgrade your daily fuel without sacrificing flavor. Replace deceptive "health foods" with genuine whole-food powerhouses.
        </p>
      </div>

      {/* Interactive Annual Health Savings Calculator Widget */}
      <div className="card p-6 sm:p-8 border border-emerald-500/30 shadow-xl bg-gradient-to-br from-[var(--surface)] via-[var(--surface)] to-emerald-500/5 mb-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Interactive Compounding Calculator
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold font-['var(--font-dm-sans)'] text-[var(--text-primary)]">
              Your Projected 1-Year Dietary Savings
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Slide to adjust how many times per week you make one of these smart swaps.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[var(--surface-hover)] px-4 py-2.5 rounded-2xl border border-[var(--border)]">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Weekly Swaps:</span>
            <span className="text-2xl font-black font-mono text-emerald-500">{weeklySwaps}x</span>
          </div>
        </div>

        {/* Slider Input */}
        <div className="py-6">
          <div className="flex justify-between text-xs text-[var(--text-muted)] font-semibold mb-2">
            <span>1 swap / week</span>
            <span>7 swaps / week (1/day)</span>
            <span>14 swaps / week (2/day)</span>
          </div>
          <input
            type="range"
            min="1"
            max="14"
            value={weeklySwaps}
            onChange={(e) => setWeeklySwaps(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-2 bg-[var(--surface-hover)] rounded-lg appearance-none"
            aria-label="Weekly swaps slider"
          />
        </div>

        {/* Calculated Stats Grid with Real World Analogies */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[var(--surface-hover)]/70 border border-[var(--border)] text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500 block mb-1">
              Hidden Sugar Eliminated
            </span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-[var(--text-primary)] block">
              {annualSugarLbs} lbs
            </span>
            <div className="mt-2 pt-2 border-t border-[var(--border)] space-y-0.5 text-[11px] text-[var(--text-secondary)] font-medium">
              <span className="block text-amber-600 dark:text-amber-400 font-semibold">
                ≈ {annualSugarCubes.toLocaleString()} sugar cubes
              </span>
              <span className="block text-[var(--text-muted)]">
                Equivalent to {annualSodaCans} cans of soda purged
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--surface-hover)]/70 border border-[var(--border)] text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500 block mb-1">
              Empty Calories Avoided
            </span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-[var(--text-primary)] block">
              {annualCalories.toLocaleString()} kcal
            </span>
            <div className="mt-2 pt-2 border-t border-[var(--border)] space-y-0.5 text-[11px] text-[var(--text-secondary)] font-medium">
              <span className="block text-emerald-600 dark:text-emerald-400 font-semibold">
                ≈ {metabolicDays} days of basal metabolic energy
              </span>
              <span className="block text-[var(--text-muted)]">
                Equivalent to ~{(annualCalories / 3500).toFixed(1)} lbs of body fat energy
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--surface-hover)]/70 border border-[var(--border)] text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 block mb-1">
              Metabolic Resilience
            </span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-500 block">
              Maximum
            </span>
            <div className="mt-2 pt-2 border-t border-[var(--border)] space-y-0.5 text-[11px] text-[var(--text-secondary)] font-medium">
              <span className="block text-emerald-600 dark:text-emerald-400 font-semibold">
                Zero glycemic spikes
              </span>
              <span className="block text-[var(--text-muted)]">
                Eliminates afternoon insulin crashes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Alternatives Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {foodAlternatives.map((alt) => (
          <AlternativeCard key={alt.id} alternative={alt} />
        ))}
      </div>
    </div>
  );
}
