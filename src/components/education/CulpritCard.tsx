'use client';
import { useState, useMemo } from 'react';
import { ChevronDown, AlertCircle, ShieldAlert, Sparkles, Eye, Search, CheckCircle2, X } from 'lucide-react';
import { NutritionCulprit } from '@/types';

export default function CulpritCard({ culprit }: { culprit: NutritionCulprit }) {
  const [aliasSearch, setAliasSearch] = useState('');

  // Daily intake statistics based on culprit type
  const intakeStats = useMemo(() => {
    const title = culprit.title.toLowerCase();
    if (title.includes('sugar')) {
      return {
        limitLabel: '25g (AHA ceiling)',
        intakeLabel: '71g average',
        percent: 284,
        note: 'Average consumer consumes nearly 3x the recommended limit of hidden sugars.'
      };
    } else if (title.includes('sodium')) {
      return {
        limitLabel: '2,300mg',
        intakeLabel: '3,400mg average',
        percent: 148,
        note: '70%+ of consumer sodium comes from packaged foods, not the kitchen salt shaker.'
      };
    } else {
      return {
        limitLabel: '<2g daily',
        intakeLabel: 'Deceptively uncounted',
        percent: 180,
        note: 'Brands utilize FDA 0.49g rounding loopholes to declare 0g trans fat.'
      };
    }
  }, [culprit.title]);

  const filteredAliases = useMemo(() => {
    if (!culprit.alternativeNames) return [];
    if (!aliasSearch.trim()) return culprit.alternativeNames;
    return culprit.alternativeNames.filter(name => 
      name.toLowerCase().includes(aliasSearch.toLowerCase())
    );
  }, [culprit.alternativeNames, aliasSearch]);

  return (
    <div className="card card-spotlight overflow-hidden border border-[var(--border)] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-[var(--border)]">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          {culprit.dailyLimit && (
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-mono">
              Limit: {culprit.dailyLimit}
            </span>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold font-['var(--font-dm-sans)'] text-[var(--text-primary)]">
          {culprit.title}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-amber-600 dark:text-amber-400 mt-1">
          {culprit.tagline}
        </p>
      </div>

      <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
        <div className="space-y-6">
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            {culprit.summary}
          </p>

          {/* Daily Limit vs Average American Intake Meter */}
          <div className="p-4 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-[var(--text-secondary)]">Intake Reality Gap</span>
              <span className="text-rose-500 font-mono font-bold">{intakeStats.percent}% of safe limit</span>
            </div>

            {/* Graphic Comparison Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] font-medium">
                <span className="text-[var(--text-muted)]">Safe Daily Limit: {intakeStats.limitLabel}</span>
                <span className="text-rose-600 dark:text-rose-400 font-bold">Actual: {intakeStats.intakeLabel}</span>
              </div>
              <div className="h-2 w-full bg-[var(--surface)] rounded-full overflow-hidden flex border border-[var(--border)]">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '35%' }} title="Safe Limit" />
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '65%' }} title="Excess Intake" />
              </div>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">{intakeStats.note}</p>
          </div>
          
          {/* Sneaky Names Section with Interactive In-Card Filter */}
          {culprit.alternativeNames && culprit.alternativeNames.length > 0 && (
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-['var(--font-dm-sans)']">
                  Sneaky Industry Pseudonyms ({culprit.alternativeNames.length}+)
                </span>
              </div>

              {/* Alias Search Filter */}
              <div className="relative mb-2.5">
                <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Type an ingredient from your label..."
                  value={aliasSearch}
                  onChange={(e) => setAliasSearch(e.target.value)}
                  className="w-full bg-[var(--surface-hover)] border border-transparent focus:border-amber-500 rounded-xl pl-8 pr-7 py-1.5 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none font-medium"
                />
                {aliasSearch && (
                  <button
                    onClick={() => setAliasSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {aliasSearch && filteredAliases.length > 0 && (
                <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Found {filteredAliases.length} hidden alias matches!</span>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                {filteredAliases.map((name, i) => {
                  const isMatch = aliasSearch && name.toLowerCase().includes(aliasSearch.toLowerCase());
                  return (
                    <span 
                      key={i} 
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                        isMatch
                          ? 'bg-amber-500 text-white font-bold border-amber-600 shadow-xs'
                          : 'bg-[var(--surface-hover)] text-[var(--text-primary)] border-[var(--border)]'
                      }`}
                    >
                      {name}
                    </span>
                  );
                })}
                {filteredAliases.length === 0 && (
                  <span className="text-xs text-[var(--text-muted)] py-1">
                    No matching alias for "{aliasSearch}" in this category.
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Where it Hides Section */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block mb-2 font-['var(--font-dm-sans)']">
              Common Traps Where It Hides
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {culprit.whereItHides.map((place, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/5 border border-rose-500/10 text-xs text-[var(--text-secondary)] font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                  <span>{place}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What to check */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs mt-4">
          <span className="font-bold text-emerald-700 dark:text-emerald-300 block mb-1">
            ✓ How to Protect Yourself:
          </span>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {culprit.whatToCheck}
          </p>
        </div>
      </div>
    </div>
  );
}
