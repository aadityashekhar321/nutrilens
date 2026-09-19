'use client';
import { useState, useRef } from 'react';
import { Search, Loader2, Sparkles, X, CornerDownLeft, Tag } from 'lucide-react';

interface FoodInsightFormProps {
  onSubmit: (foodName: string, brand?: string) => void;
  loading: boolean;
}

const POPULAR_SUGGESTIONS = [
  { name: 'French Vanilla Greek Yogurt', brand: 'Chobani', emoji: '🥣', tag: 'Dairy' },
  { name: 'Barista Edition Oat Milk', brand: 'Oatly', emoji: '🥛', tag: 'Plant Milk' },
  { name: 'Artisan Honey Oat Granola Bar', brand: 'Nature Valley', emoji: '🌾', tag: 'Granola' },
  { name: 'Dark Chocolate Nut Protein Bar', brand: 'KIND', emoji: '🍫', tag: 'Protein' },
  { name: 'Complete Plant Protein Cookie', brand: "Lenny & Larry's", emoji: '🍪', tag: 'Snack' },
  { name: 'Green Machine Superfood Smoothie', brand: 'Naked Juice', emoji: '🧃', tag: 'Beverage' },
];

export default function FoodInsightForm({ onSubmit, loading }: FoodInsightFormProps) {
  const [foodName, setFoodName] = useState('');
  const [brand, setBrand] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!foodName.trim()) {
      setError('Please enter a food or drink item to decode');
      inputRef.current?.focus();
      return;
    }
    setError('');
    onSubmit(foodName.trim(), brand.trim() || undefined);
  };

  const handleSuggestionClick = (item: { name: string; brand: string }) => {
    setFoodName(item.name);
    setBrand(item.brand);
    setError('');
    onSubmit(item.name, item.brand);
  };

  const handleClear = () => {
    setFoodName('');
    setBrand('');
    setError('');
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* High-Tech Spectrometer Form */}
      <form 
        onSubmit={handleSubmit} 
        className="card p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl border border-[var(--border)] shadow-2xl bg-[var(--surface)] transition-all duration-300 focus-within:border-emerald-500/60 focus-within:ring-4 focus-within:ring-emerald-500/10 focus-within:shadow-emerald-500/5 relative overflow-hidden"
      >
        {/* Subtle Ambient Top Border Highlight */}
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

        <div className="flex flex-col sm:flex-row gap-2">
          {/* Main Food Query Input */}
          <div className="flex-1 relative flex items-center">
            <div className="absolute left-3.5 sm:left-4 text-emerald-500 pointer-events-none flex items-center justify-center">
              <Search className="w-4 h-4" />
            </div>
            <input
              ref={inputRef}
              id="foodName"
              type="text"
              placeholder="e.g. French Vanilla Greek Yogurt, Oat Milk..."
              value={foodName}
              onChange={(e) => {
                setFoodName(e.target.value);
                if (error) setError('');
              }}
              disabled={loading}
              className="w-full bg-[var(--surface-hover)] border border-transparent focus:border-emerald-500/30 rounded-xl sm:rounded-2xl pl-10 sm:pl-11 pr-9 py-3 sm:py-3.5 text-sm sm:text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-all font-medium"
            />
            {foodName && !loading && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
                title="Clear input"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Optional Brand Input */}
          <div className="sm:w-52 relative flex items-center">
            <div className="absolute left-3.5 text-[var(--text-muted)] pointer-events-none flex items-center justify-center">
              <Tag className="w-3.5 h-3.5" />
            </div>
            <input
              id="brand"
              type="text"
              placeholder="Brand (e.g. Chobani)"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              disabled={loading}
              className="w-full bg-[var(--surface-hover)] border border-transparent focus:border-emerald-500/30 rounded-xl sm:rounded-2xl pl-9 pr-4 py-3 sm:py-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-all font-medium"
            />
          </div>

          {/* Action Trigger Button */}
          <button
            type="submit"
            disabled={loading || !foodName.trim()}
            className="rounded-xl sm:rounded-2xl px-6 py-3 sm:py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-98 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer flex-shrink-0 group"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span className="font-semibold">Auditing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span className="font-bold tracking-tight">Decode</span>
                <CornerDownLeft className="w-3.5 h-3.5 opacity-60 hidden sm:inline-block ml-0.5" />
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="pt-2 px-3 flex items-center gap-1.5 text-rose-500 text-xs font-semibold animate-fade-in">
            <span>•</span>
            <span>{error}</span>
          </div>
        )}
      </form>

      {/* Interactive Quick Presets */}
      <div className="space-y-1.5 pt-1 px-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-emerald-500" /> Test Common Health Halo Foods:
          </span>
          <span className="text-[10px] text-[var(--text-muted)] hidden sm:inline">
            Click to analyze instantly
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {POPULAR_SUGGESTIONS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSuggestionClick(item)}
              disabled={loading}
              className="group text-xs px-3 py-1.5 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] hover:border-emerald-500/30 transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-xs hover:shadow-sm active:scale-97 disabled:opacity-50"
            >
              <span className="text-sm group-hover:scale-110 transition-transform">{item.emoji}</span>
              <span className="font-medium">{item.name}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-[var(--surface-hover)] text-[var(--text-muted)] font-mono">
                {item.brand}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
