'use client';
import { 
  Coffee, 
  Cookie, 
  Apple, 
  Dumbbell, 
  Sandwich, 
  Wheat, 
  Layers,
  Sparkles,
  Milk,
  Zap
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  foods: string[];
}

interface CategorySelectorProps {
  categories: Category[];
  selectedId: string;
  onChange: (id: string) => void;
}

const CATEGORY_ICONS: Record<string, any> = {
  'yogurt': Milk,
  'granola': Wheat,
  'breakfast-cereals': Wheat,
  'bread': Sandwich,
  'beverages': Coffee,
  'snack-foods': Cookie,
  'protein-products': Dumbbell,
  'energy-foods': Zap,
};

export default function CategorySelector({ categories, selectedId, onChange }: CategorySelectorProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5 font-['var(--font-dm-sans)']">
          <Layers className="w-3.5 h-3.5 text-emerald-500" /> Select Food Category
        </label>
        <span className="text-[11px] text-[var(--text-muted)]">
          {categories.length} matchups available
        </span>
      </div>

      {/* Horizontal Scrolling Pill Ribbon */}
      <div className="flex flex-wrap gap-2 pt-1">
        {categories.map((cat) => {
          const isSelected = cat.id === selectedId;
          const IconComponent = CATEGORY_ICONS[cat.id] || Sparkles;

          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={`group flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25 scale-[1.02]'
                  : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] hover:border-emerald-500/30'
              }`}
            >
              <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-500 group-hover:scale-110 transition-transform'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
