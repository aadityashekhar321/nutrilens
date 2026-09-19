import PageHeader from '@/components/ui/PageHeader';
import LabelTermCard from '@/components/education/LabelTermCard';
import LabelSimulator from '@/components/label/LabelSimulator';
import LabelChecklist from '@/components/label/LabelChecklist';
import DeceptionChallenge from '@/components/label/DeceptionChallenge';
import { Scan, ShieldAlert, Sparkles, Trophy } from 'lucide-react';

import { labelTerms } from '@/data/label-terms';
import { labelGuides, sampleLabelData as sampleLabel } from '@/data/label-guides';

export default function LabelDetectivePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto space-y-16 pb-24 animate-fade-in">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill mb-4 shadow-xs">
          <Scan className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-semibold text-[var(--text-secondary)]">Nutrition Label X-Ray</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-['var(--font-dm-sans)'] tracking-tight text-[var(--text-primary)] mb-3">
          Label Detective
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          Learn to read between the lines. Click on any section of the nutrition label below to reveal the industry tricks and regulatory loopholes behind the numbers.
        </p>
      </div>

      {/* Interactive HUD Simulator Section */}
      <section className="card p-6 sm:p-10 border border-[var(--border)] shadow-xl bg-[var(--surface)]">
        <LabelSimulator sampleData={sampleLabel} guides={labelGuides} />
      </section>

      {/* Interactive Detective Challenge Quiz */}
      <section>
        <DeceptionChallenge />
      </section>

      {/* Misleading Marketing Claims */}
      <section className="space-y-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" /> Deceptive Front-of-Package Lexicon
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['var(--font-dm-sans)'] text-[var(--text-primary)]">
            Legally Permitted, Intentionally Misleading
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            These buzzwords are crafted to trigger the "health halo effect." Here is what the law requires versus what food brands want you to assume.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labelTerms.map((term, i) => (
            <LabelTermCard key={i} term={term} />
          ))}
        </div>
      </section>

      {/* Checklist */}
      <section className="space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['var(--font-dm-sans)'] text-[var(--text-primary)]">
            5-Second Grocery Aisle Checklist
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Quick mental rules of thumb to scan any packaged food item in under 5 seconds.
          </p>
        </div>
        <div className="max-w-4xl">
          <LabelChecklist guides={labelGuides} />
        </div>
      </section>
    </div>
  );
}
