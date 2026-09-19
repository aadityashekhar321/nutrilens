'use client';
import { useState } from 'react';
import { Eye, CheckCircle2, HelpCircle, Sparkles, Trophy, AlertTriangle } from 'lucide-react';

interface ChallengeTrick {
  id: string;
  badge: string;
  frontClaim: string;
  hiddenTruth: string;
  lesson: string;
}

const TRICKS: ChallengeTrick[] = [
  {
    id: 'serving-split',
    badge: 'Loophole #1',
    frontClaim: 'Claims "Only 110 Calories!" on the front label.',
    hiddenTruth: 'The wrapper actually contains 2.5 servings. Anyone eating the whole single-serving packet consumes 275 calories and 32g of sugar.',
    lesson: 'Always multiply calories by "Servings Per Container" before assuming it is a light snack.'
  },
  {
    id: 'sugar-split',
    badge: 'Loophole #2',
    frontClaim: '"Organic Rolled Oats" is listed as the first ingredient.',
    hiddenTruth: 'The brand used 4 different sweeteners: brown rice syrup, organic cane sugar, date paste, and maltodextrin. Combined, sugar is 54% of the bar, but splitting them keeps oats at #1!',
    lesson: 'Scan the first 5 ingredients for any word ending in "-ose", "syrup", "juice", or "nectar".'
  },
  {
    id: 'trans-fat-zero',
    badge: 'Loophole #3',
    frontClaim: 'Boldly displays "0g Trans Fat!" in green letters.',
    hiddenTruth: 'FDA rules permit rounding down to 0g if there is under 0.5g per serving. The ingredient panel lists "Partially Hydrogenated Palm Oil" - you are still ingesting artificial trans fats.',
    lesson: 'If you see "hydrogenated" or "shortening" in the ingredients, there is trans fat regardless of the 0g claim.'
  }
];

export default function DeceptionChallenge() {
  const [revealedTricks, setRevealedTricks] = useState<string[]>([]);

  const toggleReveal = (id: string) => {
    if (revealedTricks.includes(id)) {
      setRevealedTricks(revealedTricks.filter(t => t !== id));
    } else {
      setRevealedTricks([...revealedTricks, id]);
    }
  };

  const isComplete = revealedTricks.length === TRICKS.length;

  return (
    <div className="card p-6 sm:p-8 border border-amber-500/30 shadow-xl bg-gradient-to-br from-[var(--surface)] via-[var(--surface)] to-amber-500/5 relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 font-['var(--font-dm-sans)']">
              Interactive Detective Challenge
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold font-['var(--font-dm-sans)'] text-[var(--text-primary)]">
            Case File: "Artisan Wild Berry Fit-Crunch Bar"
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
            Can you spot the 3 deceptive manufacturer tricks hiding on this product? Tap to expose each one.
          </p>
        </div>

        {/* Progress Badge */}
        <div className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border font-mono text-xs font-bold transition-all ${
          isComplete 
            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' 
            : 'bg-[var(--surface-hover)] text-[var(--text-secondary)] border-[var(--border)]'
        }`}>
          {isComplete ? <Trophy className="w-4 h-4 text-emerald-500" /> : <Eye className="w-4 h-4 text-amber-500" />}
          <span>{revealedTricks.length} of {TRICKS.length} Discovered</span>
        </div>
      </div>

      {/* Challenge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
        {TRICKS.map((trick) => {
          const isRevealed = revealedTricks.includes(trick.id);
          return (
            <div
              key={trick.id}
              onClick={() => toggleReveal(trick.id)}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isRevealed
                  ? 'bg-amber-500/10 border-amber-500/30 shadow-md'
                  : 'bg-[var(--surface-hover)]/60 border-[var(--border)] hover:border-amber-500/30 hover:bg-[var(--surface-hover)]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400">
                    {trick.badge}
                  </span>
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                    {isRevealed ? 'Exposed' : 'Tap to reveal'}
                  </span>
                </div>

                <div className="text-xs sm:text-sm font-bold text-[var(--text-primary)] mb-3">
                  {trick.frontClaim}
                </div>

                {isRevealed && (
                  <div className="space-y-2.5 animate-slide-up pt-2 border-t border-amber-500/20">
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      <strong className="text-rose-600 dark:text-rose-400">The Scam: </strong>
                      {trick.hiddenTruth}
                    </p>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold bg-[var(--surface)] p-2 rounded-lg border border-[var(--border)]">
                      💡 {trick.lesson}
                    </p>
                  </div>
                )}
              </div>

              {!isRevealed && (
                <div className="pt-4 text-xs font-semibold text-[var(--text-muted)] flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>How does this fool consumers?</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isComplete && (
        <div className="mt-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center gap-2 animate-fade-in">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>Case Solved! You now know the top 3 tricks food corporations use to bypass health laws.</span>
        </div>
      )}
    </div>
  );
}
