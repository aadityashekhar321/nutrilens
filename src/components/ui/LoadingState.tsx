'use client';
import { Scan } from 'lucide-react';

export default function LoadingState({ message = 'Analyzing nutrient matrices...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[260px] card border border-[var(--border)] scanline text-center animate-fade-in relative overflow-hidden">
      <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-ping" />
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-sm">
          <Scan className="w-6 h-6 animate-pulse" />
        </div>
      </div>
      <h4 className="text-base font-bold font-['var(--font-dm-sans)'] text-[var(--text-primary)] mb-1">
        Telemetry Active
      </h4>
      <p className="text-xs sm:text-sm font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
        {message}
      </p>
    </div>
  );
}
