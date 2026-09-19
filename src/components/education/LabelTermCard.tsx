import { AlertTriangle, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';
import { LabelTerm } from '@/types';

export default function LabelTermCard({ term }: { term: LabelTerm }) {
  const isHigh = term.warningLevel === 'high';
  const isMedium = term.warningLevel === 'medium';

  return (
    <div className={`card card-spotlight p-6 h-full flex flex-col justify-between border transition-all duration-300 ${
      isHigh 
        ? 'border-rose-500/20 hover:border-rose-500/50' 
        : isMedium 
        ? 'border-amber-500/20 hover:border-amber-500/50' 
        : 'border-cyan-500/20 hover:border-cyan-500/50'
    }`}>
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl sm:text-2xl font-black font-['var(--font-dm-sans)'] text-[var(--text-primary)]">
            “{term.term}”
          </span>
          <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
            isHigh 
              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' 
              : isMedium
              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
              : 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20'
          }`}>
            {term.warningLevel} Risk
          </span>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
              What Law Technically Permits:
            </h4>
            <p className="text-[var(--text-primary)] text-xs sm:text-sm leading-relaxed">
              {term.whatItUsuallyMeans}
            </p>
          </div>
          
          <div className="bg-rose-500/5 dark:bg-rose-500/10 rounded-xl p-3.5 border border-rose-500/20">
            <h4 className="text-[11px] font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> What It Does NOT Guarantee:
            </h4>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {term.whatItDoesNotGuarantee}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-[var(--border)]">
        <h4 className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> What to verify instead:
        </h4>
        <p className="text-xs font-semibold text-[var(--text-primary)]">
          {term.whatToCheckInstead}
        </p>
      </div>
    </div>
  );
}
