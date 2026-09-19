'use client';
import { useState } from 'react';
import { LabelGuide } from '@/types';
import { CheckCircle2, Circle, Sparkles, Trophy } from 'lucide-react';

export default function LabelChecklist({ guides }: { guides: LabelGuide[] }) {
  const [masteredRules, setMasteredRules] = useState<string[]>([]);

  const toggleRule = (id: string) => {
    if (masteredRules.includes(id)) {
      setMasteredRules(masteredRules.filter(r => r !== id));
    } else {
      setMasteredRules([...masteredRules, id]);
    }
  };

  const isAllMastered = masteredRules.length === guides.length;
  const progressPercent = guides.length > 0 ? Math.round((masteredRules.length / guides.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Progress HUD Bar */}
      <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5 font-['var(--font-dm-sans)']">
            {isAllMastered ? <Trophy className="w-4 h-4 text-emerald-500" /> : <Sparkles className="w-4 h-4 text-emerald-500" />}
            Grocery Aisle Mastery: {masteredRules.length} of {guides.length} Rules Completed
          </span>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Tap each rule once you've checked it in the store or mastered the concept.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-48">
          <div className="flex-1 h-2 bg-[var(--surface-hover)] rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
            {progressPercent}%
          </span>
        </div>
      </div>

      {isAllMastered && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-bold text-center animate-fade-in flex items-center justify-center gap-2">
          <Trophy className="w-4 h-4 text-emerald-500" />
          <span>Label Detective Mastery Unlocked! You are now immune to 95% of supermarket deceptive marketing.</span>
        </div>
      )}

      {/* Rules Grid */}
      <div className="space-y-3">
        {guides.map((guide) => {
          const isMastered = masteredRules.includes(guide.id);
          return (
            <div 
              key={guide.id} 
              onClick={() => toggleRule(guide.id)}
              className={`card p-5 transition-all duration-200 cursor-pointer border ${
                isMastered 
                  ? 'border-emerald-500/40 bg-emerald-500/5 shadow-xs' 
                  : 'hover:border-emerald-500/30 border-[var(--border)]'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <button
                  type="button"
                  className="mt-0.5 flex-shrink-0 cursor-pointer"
                  aria-label={isMastered ? 'Mark uncompleted' : 'Mark completed'}
                >
                  {isMastered ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-[var(--text-muted)] hover:text-emerald-500 transition-colors" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className={`font-bold text-sm sm:text-base transition-colors ${
                      isMastered ? 'text-emerald-700 dark:text-emerald-300 line-through opacity-80' : 'text-[var(--text-primary)]'
                    }`}>
                      {guide.field}
                    </h4>
                    <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">
                      {isMastered ? 'Mastered' : 'Tap to mark done'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-3 leading-relaxed">
                    {guide.whyItMatters}
                  </p>
                  <div className="bg-[var(--surface-hover)] rounded-xl p-3 text-xs leading-relaxed border border-[var(--border)]">
                    <span className="font-bold text-[var(--text-primary)] block mb-1">What to look for:</span>
                    <p className="text-[var(--text-secondary)]">{guide.whatToLookFor}</p>
                  </div>
                  {guide.tipText && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-medium">💡 Pro Tip: {guide.tipText}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
