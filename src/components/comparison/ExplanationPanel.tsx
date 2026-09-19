import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface ExplanationPanelProps {
  explanation: string;
  foodAName: string;
  foodBName: string;
}

export default function ExplanationPanel({ explanation, foodAName, foodBName }: ExplanationPanelProps) {
  return (
    <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-[var(--surface)] to-cyan-500/5 border border-emerald-500/20 shadow-lg relative overflow-hidden animate-slide-up">
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-500 flex-shrink-0 shadow-inner">
          <Sparkles className="w-6 h-6" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-['var(--font-dm-sans)']">
              The Nutritional Verdict
            </span>
          </div>

          <h4 className="text-xl sm:text-2xl font-extrabold font-['var(--font-dm-sans)'] text-[var(--text-primary)] mb-3">
            Why <span className="text-emerald-500">{foodBName}</span> outclasses <span className="text-amber-500">{foodAName}</span>
          </h4>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-normal">
            {explanation}
          </p>

          <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Algorithmic analysis grounded in USDA nutrient databases & biochemical glycemic impact guidelines.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
