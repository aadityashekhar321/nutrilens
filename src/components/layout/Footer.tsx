import Link from 'next/link';
import { ShieldCheck, Activity, Sparkles, ExternalLink } from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border)] mt-24 bg-[var(--surface)]/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center group">
              <Logo size="md" />
            </Link>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm leading-relaxed">
              Demystifying food marketing with AI-powered nutrition intelligence. We expose health halos and translate misleading labels into actionable dietary clarity.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI Engine: Gemini 3.6 Flash • USDA FoodData Aligned</span>
            </div>
          </div>

          {/* Core Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-4 font-['var(--font-dm-sans)']">
              Intelligence Tools
            </h4>
            <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
              <li>
                <Link href="/food-insight" className="hover:text-emerald-500 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> AI Food Scanner
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-emerald-500 transition-colors">
                  Food Face-Off Comparison
                </Link>
              </li>
              <li>
                <Link href="/label-detective" className="hover:text-emerald-500 transition-colors">
                  Interactive Label HUD
                </Link>
              </li>
              <li>
                <Link href="/alternatives" className="hover:text-emerald-500 transition-colors">
                  Smart Swap Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Education */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-4 font-['var(--font-dm-sans)']">
              Knowledge Base
            </h4>
            <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
              <li>
                <Link href="/explore" className="hover:text-emerald-500 transition-colors">
                  Hidden Culprits Guide
                </Link>
              </li>
              <li>
                <Link href="/athletes" className="hover:text-emerald-500 transition-colors">
                  Athlete MythBusters
                </Link>
              </li>
              <li>
                <span className="text-[var(--text-muted)] text-xs flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" /> Independent Evidence
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-secondary)]">
          <p className="max-w-2xl leading-relaxed text-center md:text-left">
            <strong>Medical Disclaimer:</strong> NutriLens provides educational intelligence and algorithmic analysis of publicly available data. Not intended as medical or clinical dietary advice.
          </p>
          <p className="flex-shrink-0">
            © {new Date().getFullYear()} NutriLens. Built for conscious eaters.
          </p>
        </div>
      </div>
    </footer>
  );
}
