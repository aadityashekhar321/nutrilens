'use client';
import { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Sparkles, Scale, Scan, Dumbbell, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { search } from '@/lib/search-engine';
import { SearchResult } from '@/types';

export default function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const router = useRouter();

  // Reset selectedIndex when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Handle keyboard navigation: ArrowUp, ArrowDown, Enter, Esc, Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
        return;
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (results.length > 0) {
          setSelectedIndex((prev) => (prev + 1) % results.length);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (results.length > 0) {
          setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        }
      } else if (e.key === 'Enter') {
        if (results.length > 0 && selectedIndex >= 0 && selectedIndex < results.length) {
          e.preventDefault();
          handleSelect(results[selectedIndex]);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Real-time search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const found = search(query, { limit: 8 });
    setResults(found);
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    setIsOpen(false);
    setQuery('');
    
    // Map internal links to our actual application routes
    let target = '/compare';
    if (result.type === 'food') target = `/food-insight?q=${encodeURIComponent(result.title)}`;
    else if (result.type === 'comparison') target = `/compare`;
    else if (result.type === 'label-term') target = `/label-detective`;
    else if (result.type === 'myth') target = `/athletes`;
    else if (result.type === 'alternative') target = `/alternatives`;
    else if (result.type === 'culprit') target = `/explore`;

    router.push(target);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md animate-fade-in" 
        onClick={() => setIsOpen(false)} 
      />

      {/* Dialog Box */}
      <div className="relative w-full max-w-2xl bg-[var(--surface)] rounded-3xl shadow-2xl border border-[var(--border)] overflow-hidden animate-slide-up z-10">
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-[var(--border)] gap-3 bg-[var(--surface-hover)]/30">
          <Search className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search foods, sneaky ingredients, myths, swaps (use ↑ ↓ to navigate)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none focus:outline-none text-base sm:text-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)] font-medium"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-xs rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              Clear
            </button>
          )}
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-1.5 rounded-full hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results / Empty View */}
        <div className="p-3 max-h-[420px] overflow-y-auto">
          {query ? (
            results.length > 0 ? (
              <div className="space-y-1">
                {results.map((res, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={res.id}
                      onClick={() => handleSelect(res)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between group cursor-pointer border ${
                        isSelected 
                          ? 'bg-emerald-500/10 border-emerald-500/30 shadow-xs' 
                          : 'hover:bg-[var(--surface-hover)] border-transparent'
                      }`}
                    >
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full font-mono ${
                            isSelected 
                              ? 'bg-emerald-500 text-white' 
                              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          }`}>
                            {res.type}
                          </span>
                          <span className={`font-bold text-sm transition-colors ${
                            isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-[var(--text-primary)]'
                          }`}>
                            {res.title}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] line-clamp-1">
                          {res.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {isSelected && (
                          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 hidden sm:inline font-bold">
                            ↵ Enter
                          </span>
                        )}
                        <ArrowRight className={`w-4 h-4 transition-transform flex-shrink-0 ${
                          isSelected ? 'text-emerald-500 translate-x-1' : 'text-[var(--text-muted)] group-hover:text-emerald-500'
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-[var(--text-secondary)] text-sm">
                No indexed items found matching "{query}".
                <div className="mt-2 text-xs text-[var(--text-muted)]">
                  Try searching for "Greek yogurt", "added sugar", "protein", or "granola"
                </div>
              </div>
            )
          ) : (
            <div className="p-4 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block font-['var(--font-dm-sans)']">
                Quick Navigation
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'AI Food Scanner', path: '/food-insight', icon: Sparkles },
                  { name: 'Food Face-Off', path: '/compare', icon: Scale },
                  { name: 'Label Detective', path: '/label-detective', icon: Scan },
                  { name: 'Smart Swaps', path: '/alternatives', icon: ArrowRight },
                  { name: 'Athlete Myths', path: '/athletes', icon: Dumbbell },
                  { name: 'Culprit Radar', path: '/explore', icon: ShieldAlert },
                ].map((quick, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsOpen(false);
                      router.push(quick.path);
                    }}
                    className="p-3 rounded-xl bg-[var(--surface-hover)] hover:bg-emerald-500/10 hover:text-emerald-600 text-left text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <quick.icon className="w-4 h-4 text-emerald-500" />
                    <span>{quick.name}</span>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                <span>Navigate with mouse or tap Esc</span>
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--surface-hover)] border border-[var(--border)] text-[10px]">
                  Esc to close
                </kbd>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
