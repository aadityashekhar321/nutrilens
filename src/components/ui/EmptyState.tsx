'use client';
import { SearchX, Sparkles } from 'lucide-react';

export default function EmptyState({ 
  message, 
  actionText, 
  onAction 
}: { 
  message: string; 
  actionText?: string; 
  onAction?: () => void; 
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[260px] border border-dashed border-[var(--border)] rounded-3xl bg-[var(--surface)]/40 animate-fade-in text-center">
      <div className="w-14 h-14 rounded-2xl bg-[var(--surface-hover)] flex items-center justify-center text-[var(--text-muted)] mb-4">
        <SearchX className="w-7 h-7" />
      </div>
      <p className="text-sm font-semibold text-[var(--text-secondary)] max-w-sm mb-6 leading-relaxed">
        {message}
      </p>
      {onAction && actionText && (
        <button 
          onClick={onAction}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
}
