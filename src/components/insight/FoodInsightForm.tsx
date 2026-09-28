'use client';
import { useState, useRef } from 'react';
import { Search, Loader2, Sparkles, X, CornerDownLeft, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

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
  const [isFocused, setIsFocused] = useState(false);
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl mx-auto space-y-6 relative z-10"
    >
      {/* High-Tech Spectrometer Form */}
      <motion.form 
        onSubmit={handleSubmit} 
        animate={{ 
          scale: isFocused ? 1.01 : 1,
          boxShadow: isFocused ? '0 20px 40px -15px rgba(16, 185, 129, 0.15)' : '0 10px 30px -10px rgba(0, 0, 0, 0.2)'
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          "card p-2 sm:p-3 rounded-[1.5rem] sm:rounded-[2rem] border shadow-2xl transition-all duration-300 relative overflow-hidden bg-opacity-90 backdrop-blur-xl",
          isFocused ? "border-emerald-500/40 bg-[var(--surface)]" : "border-[var(--border)] bg-[var(--surface-elevated)]"
        )}
      >
        {/* Subtle Ambient Top Border Highlight */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50" />

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Main Food Query Input */}
          <div className="flex-1 relative flex items-center group">
            <div className="absolute left-4 sm:left-5 text-emerald-500 pointer-events-none flex items-center justify-center transition-transform group-focus-within:scale-110 group-focus-within:text-emerald-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              ref={inputRef}
              id="foodName"
              type="text"
              placeholder="e.g. French Vanilla Greek Yogurt, Oat Milk..."
              value={foodName}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => {
                setFoodName(e.target.value);
                if (error) setError('');
              }}
              disabled={loading}
              className="w-full bg-[var(--surface-hover)] border border-transparent focus:border-emerald-500/30 rounded-xl sm:rounded-2xl pl-12 sm:pl-14 pr-10 py-3.5 sm:py-4 text-base sm:text-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-all font-medium focus:bg-[var(--surface)]"
            />
            <AnimatePresence>
              {foodName && !loading && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  type="button"
                  onClick={handleClear}
                  className="absolute right-4 p-1.5 rounded-full bg-[var(--surface)] text-[var(--text-muted)] hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="Clear input"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Optional Brand Input */}
          <div className="sm:w-56 relative flex items-center group">
            <div className="absolute left-4 text-[var(--text-muted)] pointer-events-none flex items-center justify-center transition-colors group-focus-within:text-cyan-400">
              <Tag className="w-4 h-4" />
            </div>
            <input
              id="brand"
              type="text"
              placeholder="Brand (e.g. Chobani)"
              value={brand}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setBrand(e.target.value)}
              disabled={loading}
              className="w-full bg-[var(--surface-hover)] border border-transparent focus:border-cyan-500/30 rounded-xl sm:rounded-2xl pl-11 pr-4 py-3.5 sm:py-4 text-sm sm:text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-all font-medium focus:bg-[var(--surface)]"
            />
          </div>

          {/* Action Trigger Button */}
          <motion.button
            whileHover={{ scale: loading || !foodName.trim() ? 1 : 1.02 }}
            whileTap={{ scale: loading || !foodName.trim() ? 1 : 0.98 }}
            type="submit"
            disabled={loading || !foodName.trim()}
            className={cn(
              "rounded-xl sm:rounded-2xl px-6 py-4 sm:py-0 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25 cursor-pointer flex-shrink-0 group relative overflow-hidden",
              (loading || !foodName.trim()) ? "opacity-50 cursor-not-allowed shadow-none grayscale-[0.3]" : ""
            )}
          >
            {/* Shimmer Effect */}
            {!loading && foodName.trim() && (
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            )}
            
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span className="font-semibold tracking-wide">Auditing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                <span className="font-bold tracking-tight">Decode</span>
                <CornerDownLeft className="w-4 h-4 opacity-60 hidden sm:inline-block ml-1" />
              </>
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-3 px-4 flex items-center gap-2 text-rose-500 text-sm font-semibold"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>

      {/* Interactive Quick Presets */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="space-y-3 pt-2 px-2"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Test Common Health Halo Foods:
          </span>
          <span className="text-[10px] text-[var(--text-muted)] hidden sm:inline font-medium bg-[var(--surface-hover)] px-2 py-0.5 rounded-full">
            Click to analyze instantly
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          {POPULAR_SUGGESTIONS.map((item, idx) => (
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              key={idx}
              type="button"
              onClick={() => handleSuggestionClick(item)}
              disabled={loading}
              className="group text-xs px-3.5 py-2 rounded-xl bg-[var(--surface)] hover:bg-emerald-500/10 text-[var(--text-secondary)] hover:text-emerald-500 dark:hover:text-emerald-400 border border-[var(--border)] hover:border-emerald-500/40 transition-colors duration-200 cursor-pointer flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              <span className="text-sm">{item.emoji}</span>
              <span className="font-semibold">{item.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[var(--surface-hover)] group-hover:bg-emerald-500/20 text-[var(--text-muted)] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 font-mono transition-colors">
                {item.brand}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
