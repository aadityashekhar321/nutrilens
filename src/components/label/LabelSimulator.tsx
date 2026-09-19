'use client';
import { useState } from 'react';
import { Info, X, AlertTriangle, CheckCircle2, Sparkles, Scan, HelpCircle } from 'lucide-react';
import { SampleLabelData, LabelGuide } from '@/types';

interface LabelSimulatorProps {
  sampleData: SampleLabelData;
  guides: LabelGuide[];
}

export default function LabelSimulator({ sampleData, guides }: LabelSimulatorProps) {
  const [selectedFieldId, setSelectedFieldId] = useState<string>('guide-serving');
  const [packageServingsEaten, setPackageServingsEaten] = useState<number>(1.0);

  const selectedGuide = selectedFieldId ? guides.find(g => g.id === selectedFieldId) : null;

  // Reality math values
  const totalContainerServings: number = typeof sampleData.servingsPerContainer === 'number' 
    ? sampleData.servingsPerContainer 
    : (parseFloat(String(sampleData.servingsPerContainer)) || 2.5);
  const activeCalories = Math.round(sampleData.calories * packageServingsEaten);
  const activeSugars = (sampleData.addedSugars.value * packageServingsEaten).toFixed(1);
  const activeSugarCubes = Math.round((sampleData.addedSugars.value * packageServingsEaten) / 4);
  const activeSodium = Math.round(sampleData.sodium.value * packageServingsEaten);

  const renderRow = (label: string, value: string, guideId: string, indent = false, bold = false, hasWarning = false) => {
    const isSelected = selectedFieldId === guideId;
    return (
      <div 
        className={`flex justify-between items-center py-1.5 px-2 rounded-lg cursor-pointer transition-all relative group
          ${indent ? 'pl-6' : ''} 
          ${bold ? 'font-bold' : 'font-normal'}
          ${isSelected 
            ? 'bg-emerald-500/20 text-emerald-900 dark:text-emerald-100 font-bold border border-emerald-500/30' 
            : 'hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'}
        `}
        onClick={() => setSelectedFieldId(guideId)}
      >
        <div className="flex items-center gap-1.5">
          {hasWarning && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          )}
          <span>{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono">{value}</span>
          <Info className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-500 opacity-100' : 'opacity-0 group-hover:opacity-70 transition-opacity'}`} />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Interactive HUD Nutrition Panel */}
      <div className="w-full max-w-sm mx-auto lg:mx-0 bg-white dark:bg-[#070D19] text-black dark:text-white p-5 rounded-2xl border-2 border-black dark:border-white/20 font-sans shrink-0 shadow-2xl relative overflow-hidden">
        {/* Header HUD Banner */}
        <div className="flex items-center justify-between pb-2 border-b-2 border-black dark:border-white/20 mb-2 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-1">
            <Scan className="w-3 h-3 text-emerald-500" /> HUD INSPECTOR
          </span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">CLICK ROW TO DECODE</span>
        </div>

        <h2 className="text-3xl font-black mb-1 border-b-[8px] border-black dark:border-white tracking-tighter">
          Nutrition Facts
        </h2>
        
        {/* Serving Size Block */}
        <div 
          className={`py-2 px-2 rounded-lg border-b-[4px] border-black dark:border-white cursor-pointer transition-all ${
            selectedFieldId === 'guide-serving' ? 'bg-emerald-500/20 text-emerald-900 dark:text-emerald-100' : 'hover:bg-black/5 dark:hover:bg-white/5'
          }`}
          onClick={() => setSelectedFieldId('guide-serving')}
        >
          <div className="text-xs font-semibold">{sampleData.servingsPerContainer} servings per container</div>
          <div className="flex justify-between text-base font-extrabold">
            <span>Serving size</span>
            <span className="font-mono">{sampleData.servingSize}</span>
          </div>
        </div>

        {/* Calories Block */}
        <div className="py-2 px-2 border-b-[4px] border-black dark:border-white flex justify-between items-end">
          <div>
            <div className="font-bold text-[11px] uppercase tracking-wider">Amount per serving</div>
            <div className="font-black text-2xl tracking-tight">Calories</div>
          </div>
          <div className="font-black text-3xl font-mono">{sampleData.calories}</div>
        </div>

        <div className="text-right text-[10px] font-bold py-1 border-b border-black/30 dark:border-white/20 uppercase tracking-wider">
          % Daily Value*
        </div>

        <div className="space-y-0.5 pt-1 text-xs">
          {renderRow('Total Fat', `${sampleData.totalFat.value}${sampleData.totalFat.unit}`, 'guide-fat', false, true)}
          {renderRow('Saturated Fat', `${sampleData.saturatedFat.value}${sampleData.saturatedFat.unit}`, 'guide-fat', true, false, true)}
          {renderRow('Trans Fat', `${sampleData.transFat.value}${sampleData.transFat.unit}`, 'guide-fat', true, false, true)}
          {renderRow('Sodium', `${sampleData.sodium.value}${sampleData.sodium.unit}`, 'guide-sodium', false, true, true)}
          {renderRow('Total Carbohydrate', `${sampleData.totalCarbs.value}${sampleData.totalCarbs.unit}`, 'guide-fiber', false, true)}
          {renderRow('Dietary Fiber', `${sampleData.dietaryFiber.value}${sampleData.dietaryFiber.unit}`, 'guide-fiber', true)}
          {renderRow('Total Sugars', `${sampleData.totalSugars.value}${sampleData.totalSugars.unit}`, 'guide-sugar', true)}
          {renderRow('Incl. Added Sugars', `${sampleData.addedSugars.value}${sampleData.addedSugars.unit}`, 'guide-sugar', true, false, true)}
          {renderRow('Protein', `${sampleData.protein.value}${sampleData.protein.unit}`, 'guide-fiber', false, true)}
        </div>

        {/* Ingredients Block */}
        <div 
          className={`mt-3 pt-2.5 border-t-[4px] border-black dark:border-white cursor-pointer transition-all p-2 rounded-lg text-xs leading-relaxed ${
            selectedFieldId === 'guide-ingredients' ? 'bg-emerald-500/20 text-emerald-900 dark:text-emerald-100 font-medium' : 'hover:bg-black/5 dark:hover:bg-white/5'
          }`}
          onClick={() => setSelectedFieldId('guide-ingredients')}
        >
          <span className="font-extrabold block mb-0.5">INGREDIENTS: </span>
          <span className="opacity-90">{sampleData.ingredients}</span>
        </div>
      </div>

      {/* Interactive Inspector HUD Detail Card */}
      <div className="flex-1 w-full min-h-[460px]">
        {selectedGuide ? (
          <div className="card p-6 sm:p-8 border border-emerald-500/30 animate-fade-in shadow-xl bg-[var(--surface)] relative h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    Active Inspection Target
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] font-['var(--font-dm-sans)'] mt-0.5">
                    {selectedGuide.field}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Scan className="w-5 h-5" />
                </div>
              </div>
              
              {/* Container Reality Math Interactive Bar */}
              <div className="p-4 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border)]">
                  <div>
                    <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                      <Scan className="w-3.5 h-3.5 text-emerald-500" /> Container Reality Calculator
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)]">
                      How much of this 75g package did you consume?
                    </span>
                  </div>

                  <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    {[
                      { label: '1x Stated Serving', val: 1.0 },
                      { label: '2x Servings', val: 2.0 },
                      { label: `All ${totalContainerServings}x (Whole Box)`, val: totalContainerServings }
                    ].map(p => (
                      <button
                        key={p.val}
                        type="button"
                        onClick={() => setPackageServingsEaten(p.val)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          packageServingsEaten === p.val
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Real Consumption Math Grid */}
                <div className="grid grid-cols-3 gap-2 pt-3 text-center">
                  <div className="p-2 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">Real Calories</span>
                    <span className="font-mono font-black text-sm sm:text-base text-[var(--text-primary)]">
                      {activeCalories} kcal
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block">Added Sugars</span>
                    <span className="font-mono font-black text-sm sm:text-base text-amber-600 dark:text-amber-400">
                      {activeSugars}g ({activeSugarCubes} cubes)
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <span className="text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400 block">Sodium</span>
                    <span className="font-mono font-black text-sm sm:text-base text-rose-600 dark:text-rose-400">
                      {activeSodium} mg
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Why It Matters */}
                <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-1.5 font-['var(--font-dm-sans)']">
                    <AlertTriangle className="w-4 h-4 text-amber-500" /> The Industry Trap & Why It Matters
                  </h4>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                    {selectedGuide.whyItMatters}
                  </p>
                </div>
                
                {/* What to look for */}
                <div className="p-5 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2 flex items-center gap-1.5 font-['var(--font-dm-sans)']">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> What to Look For Instead
                  </h4>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                    {selectedGuide.whatToLookFor}
                  </p>
                </div>

                {/* Real-World Case */}
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-1.5 font-['var(--font-dm-sans)']">
                    <Sparkles className="w-4 h-4 text-emerald-500" /> Real-World Example
                  </h4>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                    {selectedGuide.exampleInterpretation}
                  </p>
                </div>

                {/* Tip */}
                {selectedGuide.tipText && (
                  <div className="text-xs font-medium text-[var(--text-muted)] flex items-center gap-2 pt-2">
                    <span>💡 <strong>Pro Tip:</strong> {selectedGuide.tipText}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[var(--border)] text-xs text-[var(--text-muted)] flex items-center justify-between">
              <span>Section ID: {selectedGuide.id}</span>
              <span>Tap any other row on the label to inspect</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
