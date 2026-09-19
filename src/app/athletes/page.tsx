'use client';
import { useState, useMemo } from 'react';
import MythCard from '@/components/education/MythCard';
import { athleteMyths } from '@/data/athlete-myths';
import { MythCategory, MYTH_CATEGORY_LABELS } from '@/types';
import { Dumbbell, Search, Sparkles, X, CheckCheck, RotateCcw } from 'lucide-react';

export default function AthletesPage() {
  const [activeCategory, setActiveCategory] = useState<MythCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [forceBusted, setForceBusted] = useState<boolean | null>(null);
  
  const categories: (MythCategory | 'all')[] = ['all', 'protein', 'hydration', 'energy', 'recovery', 'supplements'];

  const filteredMyths = useMemo(() => {
    return athleteMyths.filter(m => {
      const matchesCat = activeCategory === 'all' || m.category === activeCategory;
      if (!matchesCat) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        m.myth.toLowerCase().includes(q) ||
        m.truth.toLowerCase().includes(q) ||
        m.explanation.toLowerCase().includes(q) ||
        m.practicalGuidance.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-5xl mx-auto pb-24 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill mb-4 shadow-xs">
          <Dumbbell className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-semibold text-[var(--text-secondary)]">Sports Science Evidence Base</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-['var(--font-dm-sans)'] tracking-tight text-[var(--text-primary)] mb-3">
          Athlete MythBusters
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          The fitness supplement and sports nutrition market thrives on exaggerated marketing. Tap below to bust pervasive myths with clinical biochemical facts.
        </p>
      </div>

      {/* Live Search & Bulk Toggle Controls */}
      <div className="card p-4 sm:p-5 border border-[var(--border)] shadow-md mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Live Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search myths by keyword (e.g. protein, electrolytes, timing, creatine)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--surface-hover)] border border-transparent focus:border-emerald-500 rounded-xl pl-10 pr-10 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-all font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Bulk Action */}
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={() => setForceBusted(prev => prev === true ? null : true)}
              className={`flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                forceBusted === true
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]'
              }`}
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>{forceBusted === true ? 'All Busted' : 'Bust All'}</span>
            </button>

            {forceBusted !== null && (
              <button
                type="button"
                onClick={() => setForceBusted(null)}
                className="px-3 py-2.5 rounded-xl text-xs font-semibold bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border)] cursor-pointer"
                title="Reset manual expansion"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[var(--border)]">
          {categories.map((cat) => {
            const count = cat === 'all' 
              ? athleteMyths.length 
              : athleteMyths.filter(m => m.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === cat 
                    ? 'bg-emerald-500 text-white shadow-xs' 
                    : 'bg-[var(--surface-hover)]/70 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent'
                }`}
              >
                <span>{cat === 'all' ? 'All Myths' : MYTH_CATEGORY_LABELS[cat as MythCategory] || cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeCategory === cat ? 'bg-white/20 text-white' : 'bg-[var(--border)] text-[var(--text-muted)]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Myth Grid */}
      <div className="flex flex-col gap-4">
        {filteredMyths.map((myth, i) => (
          <MythCard key={myth.id || i} myth={myth} forceBusted={forceBusted} />
        ))}
        {filteredMyths.length === 0 && (
          <div className="text-center py-16 card p-8 border border-[var(--border)] text-[var(--text-secondary)] space-y-2">
            <p className="font-bold text-sm text-[var(--text-primary)]">No athlete myths found matching "{searchQuery}"</p>
            <p className="text-xs text-[var(--text-muted)]">Try searching for broader terms like "protein", "carbs", or "recovery".</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-3 px-4 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold cursor-pointer inline-block"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
