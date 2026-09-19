'use client';
import { useState, useEffect } from 'react';
import { XCircle, CheckCircle2, ChevronDown, Sparkles, ShieldCheck, Flame } from 'lucide-react';
import { AthleteMyth, MYTH_CATEGORY_LABELS } from '@/types';
import Badge from '../ui/Badge';

interface MythCardProps {
  myth: AthleteMyth;
  forceBusted?: boolean | null;
}

export default function MythCard({ myth, forceBusted }: MythCardProps) {
  const [isBusted, setIsBusted] = useState(false);

  useEffect(() => {
    if (forceBusted !== undefined && forceBusted !== null) {
      setIsBusted(forceBusted);
    }
  }, [forceBusted]);

  return (
    <div className={`card card-spotlight overflow-hidden transition-all duration-300 border ${
      isBusted 
        ? 'border-emerald-500/30 shadow-lg shadow-emerald-500/5 bg-[var(--surface)]' 
        : 'border-[var(--border)] hover:border-amber-500/30 bg-[var(--surface)]'
    }`}>
      <div 
        onClick={() => setIsBusted(!isBusted)}
        className="p-6 cursor-pointer hover:bg-[var(--surface-hover)] transition-colors"
      >
        <div className="flex justify-between items-center mb-3 gap-4">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            {MYTH_CATEGORY_LABELS[myth.category] || myth.category}
          </span>
          
          <span className={`text-xs font-bold px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
            isBusted 
              ? 'bg-emerald-500 text-white shadow-xs' 
              : 'bg-amber-500/15 text-amber-700 dark:text-amber-400 hover:bg-amber-500/25'
          }`}>
            {isBusted ? '✓ Myth Busted' : 'Tap to Bust Myth'}
          </span>
        </div>

        <div className="flex items-start gap-3.5 mt-2">
          <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 flex-shrink-0 mt-0.5">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-600 dark:text-rose-400 block mb-0.5">
              The Pseudoscience Claim
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-['var(--font-dm-sans)'] text-[var(--text-primary)] leading-snug">
              "{myth.myth}"
            </h3>
          </div>
        </div>
      </div>

      {/* Expanded Truth Panel */}
      <div className={`grid transition-all duration-300 ease-in-out ${isBusted ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="p-6 pt-2 border-t border-[var(--border)] bg-gradient-to-b from-emerald-500/5 to-transparent space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-500 flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-0.5">
                  The Biochemical Truth
                </span>
                <p className="text-base font-bold text-[var(--text-primary)] mb-1.5">
                  {myth.truth}
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {myth.explanation}
                </p>
              </div>
            </div>
            
            {/* Practical Athlete Protocol */}
            <div className="ml-0 sm:ml-11 bg-[var(--surface-hover)] p-4 rounded-2xl border border-[var(--border)]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Actionable Training Protocol</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
                {myth.practicalGuidance}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
