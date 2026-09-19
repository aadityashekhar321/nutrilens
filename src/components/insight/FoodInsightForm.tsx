'use client';
import { useState } from 'react';
import { Search, Loader2, Sparkles, Command } from 'lucide-react';

interface FoodInsightFormProps {
  onSubmit: (foodName: string, brand?: string) => void;
  loading: boolean;
}

const POPULAR_SUGGESTIONS = [
  { name: 'Artisan Granola Bar', brand: 'Nature Valley' },
  { name: 'French Vanilla Greek Yogurt', brand: 'Chobani' },
  { name: 'Barista Edition Oat Milk', brand: 'Oatly' },
  { name: 'Veggie Straws Sea Salt', brand: 'Sensible Portions' },
  { name: 'Plant-Based Protein Cookie', brand: "Lenny & Larry's" },
];

export default function FoodInsightForm({ onSubmit, loading }: FoodInsightFormProps) {
  const [foodName, setFoodName] = useState('');
  const [brand, setBrand] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!foodName.trim()) {
      setError('Please enter a food or drink item name');
      return;
    }
    setError('');
    onSubmit(foodName, brand);
  };

  const handleSuggestionClick = (item: { name: string; brand: string }) => {
    setFoodName(item.name);
    setBrand(item.brand);
    setError('');
    onSubmit(item.name, item.brand);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="card p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-[var(--border)] shadow-xl bg-[var(--surface)]">
        <div className="flex flex-col sm:flex-row gap-2.5">
          {/* Food Name Input */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="foodName"
              type="text"
              placeholder="e.g. Vanilla Greek Yogurt, Protein Bar..."
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              disabled={loading}
              className="w-full bg-[var(--surface-hover)] border border-transparent focus:border-emerald-500 rounded-xl pl-11 pr-4 py-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-all font-medium"
            />
          </div>

          {/* Brand Input */}
          <div className="sm:w-52 relative">
            <input
              id="brand"
              type="text"
              placeholder="Brand (e.g. Chobani)"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              disabled={loading}
              className="w-full bg-[var(--surface-hover)] border border-transparent focus:border-emerald-500 rounded-xl px-4 py-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-all font-medium"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 cursor-pointer flex-shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Scanning...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Decode</span>
              </>
            )}
          </button>
        </div>

        {error && <p className="text-rose-500 text-xs font-semibold mt-2.5 ml-2">{error}</p>}
      </form>

      {/* Quick Suggestion Pills */}
      <div className="flex items-center flex-wrap gap-2 pt-1 px-1">
        <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
          Quick analyze:
        </span>
        {POPULAR_SUGGESTIONS.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSuggestionClick(item)}
            disabled={loading}
            className="text-xs px-3 py-1.5 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
          >
            <span>{item.name}</span>
            <span className="text-[10px] text-[var(--text-muted)]">({item.brand})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
