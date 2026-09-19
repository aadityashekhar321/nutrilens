'use client';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function ErrorState({ 
  message, 
  onRetry 
}: { 
  message: string; 
  onRetry?: () => void; 
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-10 border border-rose-500/30 rounded-3xl bg-rose-500/5 dark:bg-rose-500/10 animate-fade-in text-center shadow-lg relative overflow-hidden">
      <div className="w-14 h-14 rounded-2xl bg-rose-500/15 flex items-center justify-center text-rose-500 mb-4 shadow-inner">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <h3 className="text-base sm:text-lg font-bold font-['var(--font-dm-sans)'] text-[var(--text-primary)] mb-1">
        Diagnostic Exception
      </h3>
      <p className="text-xs sm:text-sm font-medium text-[var(--text-secondary)] max-w-md mb-6 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-xs font-bold text-[var(--text-primary)] shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-emerald-500" />
          <span>Reset Diagnostic</span>
        </button>
      )}
    </div>
  );
}
