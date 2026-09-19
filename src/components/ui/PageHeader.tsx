import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: ReactNode;
}

export default function PageHeader({ title, subtitle, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-[var(--border)] animate-fade-in relative">
      <div className="flex-1 max-w-3xl">
        {subtitle && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-['var(--font-dm-sans)']">
              {subtitle}
            </span>
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-['var(--font-dm-sans)'] text-[var(--text-primary)]">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl font-normal">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="flex-shrink-0 flex items-center gap-2">
          {children}
        </div>
      )}
    </div>
  );
}
