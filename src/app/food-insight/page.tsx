'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import FoodInsightForm from '@/components/insight/FoodInsightForm';
import InsightResult from '@/components/insight/InsightResult';
import ErrorState from '@/components/ui/ErrorState';
import { useFoodInsight } from '@/hooks/use-food-insight';
import { Sparkles, Scan, RotateCcw, Activity } from 'lucide-react';

const SCAN_MESSAGES = [
  'Parsing ingredient nomenclature...',
  'Cross-referencing glycemic spike index...',
  'Detecting deceptive marketing terms...',
  'Evaluating hidden added sugar density...',
  'Calculating overall Truth Score...',
];

function FoodInsightContent() {
  const searchParams = useSearchParams();
  const { 
    submitInsight, 
    loading, 
    result, 
    error,
    clearResult 
  } = useFoodInsight();

  const [scanMessageIndex, setScanMessageIndex] = useState(0);

  // Read initial query parameter from URL (e.g., from hero search)
  useEffect(() => {
    const q = searchParams.get('q');
    if (q && !result && !loading) {
      submitInsight(q);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setScanMessageIndex((prev) => (prev + 1) % SCAN_MESSAGES.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalyze = async (foodName: string, brand?: string) => {
    await submitInsight(foodName, brand);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto min-h-screen animate-fade-in pb-24">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-10 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill mb-4 shadow-xs">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-semibold text-[var(--text-secondary)]">
            Neural Food Scanner • Powered by Gemini 3.6 Flash
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['var(--font-dm-sans)'] mb-3 text-[var(--text-primary)]">
          AI Food Insight
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
          Type any packaged food or drink. We analyze packaging claims, highlight hidden additives, and compute an objective Truth Score.
        </p>
      </div>

      {/* Input Console */}
      <FoodInsightForm onSubmit={handleAnalyze} loading={loading} />

      {/* Loading Scanning HUD */}
      {loading && (
        <div className="w-full max-w-2xl mx-auto mt-12 card p-8 border border-emerald-500/30 scanline relative overflow-hidden text-center animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 animate-pulse">
            <Scan className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold font-['var(--font-dm-sans)'] text-[var(--text-primary)] mb-1">
            Analyzing Food Matrix
          </h3>
          <p className="text-sm font-mono text-emerald-600 dark:text-emerald-400 font-semibold h-6">
            {SCAN_MESSAGES[scanMessageIndex]}
          </p>
          <div className="w-48 h-1.5 bg-[var(--surface-hover)] rounded-full mx-auto mt-6 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full animate-pulse" style={{ width: '75%' }} />
          </div>
        </div>
      )}

      {/* Error or Result Display */}
      <div className="mt-8">
        {error && (
          <div className="max-w-2xl mx-auto">
            <ErrorState message={error.message || 'An error occurred'} onRetry={clearResult} />
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="flex justify-end max-w-4xl mx-auto">
              <button
                onClick={clearResult}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] shadow-xs transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Analyze Another Food</span>
              </button>
            </div>
            <InsightResult result={result} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function AIInsightPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
      </div>
    }>
      <FoodInsightContent />
    </Suspense>
  );
}
