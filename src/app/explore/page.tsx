import CulpritCard from '@/components/education/CulpritCard';
import { nutritionCulprits } from '@/data/culprits';
import { ShieldAlert, Sparkles } from 'lucide-react';

export default function ExplorePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto pb-24 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill mb-4 shadow-xs">
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-semibold text-[var(--text-secondary)]">Ingredient Radar & Hall of Shame</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-['var(--font-dm-sans)'] tracking-tight text-[var(--text-primary)] mb-3">
          Hidden Culprits
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          The top three deceptive nutritional landmines hiding behind health halos: excess added sugars, inflammatory fats, and hyper-concentrated sodium.
        </p>
      </div>
      
      {/* Culprits Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {nutritionCulprits.map(culprit => (
          <CulpritCard key={culprit.id} culprit={culprit} />
        ))}
      </div>
    </div>
  );
}
