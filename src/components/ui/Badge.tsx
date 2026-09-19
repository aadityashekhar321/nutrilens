import { ReactNode } from 'react';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export default function Badge({ 
  variant = 'neutral', 
  children, 
  className = '' 
}: { 
  variant?: BadgeVariant; 
  children: ReactNode; 
  className?: string; 
}) {
  const variantStyles = {
    success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25 shadow-xs',
    warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25 shadow-xs',
    danger: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25 shadow-xs',
    info: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/25 shadow-xs',
    neutral: 'bg-[var(--surface-hover)] text-[var(--text-secondary)] border-[var(--border)] shadow-xs',
  };

  const dotStyles = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-cyan-500',
    neutral: 'bg-neutral-400',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide border ${variantStyles[variant]} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[variant]} animate-pulse`} />
      <span>{children}</span>
    </span>
  );
}
