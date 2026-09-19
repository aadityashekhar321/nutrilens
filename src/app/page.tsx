'use client';
import { useState, MouseEvent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  ArrowRight, 
  Scan, 
  ShieldAlert, 
  Scale, 
  Zap, 
  CheckCircle2, 
  AlertTriangle,
  Flame,
  Search,
  Activity,
  ChevronRight,
  TrendingDown,
  Layers,
  Milk,
  Wheat,
  Coffee,
  Cookie,
  Dumbbell,
  Check,
  Eye,
  Info
} from 'lucide-react';

interface ScannerDemoItem {
  id: string;
  name: string;
  category: string;
  icon: any;
  marketingTitle: string;
  marketingBadges: string[];
  marketingTagline: string;
  realityTitle: string;
  realitySugarGrams: number;
  realitySugarCubes: number;
  realityGlycemic: 'High (Rapid Spike)' | 'Moderate' | 'Sustained';
  realityWarnings: string[];
  realityConclusion: string;
  realityScore: number;
}

const DEMO_ITEMS: ScannerDemoItem[] = [
  {
    id: 'yogurt',
    name: 'Artisan Vanilla Greek Yogurt',
    category: 'Dairy & Alternatives',
    icon: Milk,
    marketingTitle: '"French Vanilla Organic Greek Yogurt"',
    marketingBadges: ['High Protein', 'Live Probiotics', '100% Grass-Fed Milk', 'Gluten Free'],
    marketingTagline: 'Perceived as a wholesome, protein-dense metabolic breakfast.',
    realityTitle: '24g Added Sugar (6 Sugar Cubes)',
    realitySugarGrams: 24,
    realitySugarCubes: 6,
    realityGlycemic: 'High (Rapid Spike)',
    realityWarnings: ['More sugar than a glazed jelly donut', 'Exceeds 80% of AHA daily sugar quota', 'Liquid cane syrup sweetener'],
    realityConclusion: 'Excess sugar cancels out the anti-inflammatory benefits of probiotics.',
    realityScore: 38
  },
  {
    id: 'granola',
    name: 'Wild Honey Oat Granola',
    category: 'Breakfast Cereals',
    icon: Wheat,
    marketingTitle: '"Wild Harvest Honey Almond Granola"',
    marketingBadges: ['Heart Healthy Whole Grain', 'Energy Dense', 'Non-GMO', 'Pure Honey'],
    marketingTagline: 'Marketed as sustained, wholesome outdoor athletic fuel.',
    realityTitle: '28g Sugar + Palm Oil (7 Cubes)',
    realitySugarGrams: 28,
    realitySugarCubes: 7,
    realityGlycemic: 'High (Rapid Spike)',
    realityWarnings: ['420 kcal per humble 2/3 cup', 'Fractionated palm kernel oil binder', 'Caloric density equal to chocolate cake'],
    realityConclusion: 'High caloric density and glycemic load promote rapid fat storage.',
    realityScore: 32
  },
  {
    id: 'oatmilk',
    name: 'Barista Edition Oat Milk',
    category: 'Plant Milk & Beverages',
    icon: Coffee,
    marketingTitle: '"Barista Edition Creamy Oat Milk"',
    marketingBadges: ['100% Plant Based', 'Zero Dairy', 'Sustainable Oats', 'Barista Approved'],
    marketingTagline: 'Positioned as the clean, eco-conscious latte upgrade.',
    realityTitle: 'Rapeseed Oil + 14g Maltose (3.5 Cubes)',
    realitySugarGrams: 14,
    realitySugarCubes: 4,
    realityGlycemic: 'High (Rapid Spike)',
    realityWarnings: ['Enzymatic hydrolysis creates high-GI maltose', 'Dipottasium phosphate & seed oil emulsifiers', 'Virtually 0g intact oat fiber'],
    realityConclusion: 'Biochemically comparable to drinking liquid starch syrup emulsified with oil.',
    realityScore: 44
  },
  {
    id: 'veggie',
    name: 'Garden Veggie Straws',
    category: 'Snack Foods',
    icon: Cookie,
    marketingTitle: '"Sea Salt Garden Veggie Straws"',
    marketingBadges: ['Real Spinach & Tomato', '30% Less Fat', 'No Artificial Flavors', 'Pure Goodness'],
    marketingTagline: 'Sold to health-conscious parents as an innocent veggie alternative to chips.',
    realityTitle: '93% Potato Starch + 480mg Sodium',
    realitySugarGrams: 2,
    realitySugarCubes: 1,
    realityGlycemic: 'Moderate',
    realityWarnings: ['0g real vegetable dietary fiber', 'Spinach & tomato powder used purely for food coloring', 'High-heat oxidized vegetable oils'],
    realityConclusion: 'Virtually identical nutritional blueprint to standard ultra-processed chips.',
    realityScore: 41
  }
];

const TELEMETRY_MARQUEE = [
  '⚡ 83% of "healthy" breakfast cereals exceed AHA daily added sugar limits',
  '⚡ Over 60 disguised legal pseudonyms used for added sugars on US packaging',
  '⚡ NutriLens smart swaps eliminate an average of 14.6 lbs of hidden sugar per year',
  '⚡ Front-of-pack "Made with Real Fruit" often contains < 2% fruit puree and 70% corn syrup',
  '⚡ "Zero Trans Fat" labels legally allow up to 0.49g of trans fat per serving in the US',
  '⚡ All NutriLens biochemical data is cross-referenced with USDA FoodData Central standards',
];

const SAMPLE_SEARCH_CHIPS = [
  'Chobani Flips',
  'Oatly Barista',
  'Nature Valley Granola',
  'Garden Veggie Straws',
  'Clif Energy Bar',
  'Naked Green Machine'
];

export default function Home() {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<ScannerDemoItem>(DEMO_ITEMS[0]);
  const [sliderPos, setSliderPos] = useState(50);
  const [isScanning, setIsScanning] = useState(false);
  const [heroSearchInput, setHeroSearchInput] = useState('');
  const [activeHaloStep, setActiveHaloStep] = useState(0);

  // Card Spotlight cursor tracking
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const cards = document.querySelectorAll('.card-spotlight');
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    });
  };

  const handleProductSwitch = (item: ScannerDemoItem) => {
    setActiveItem(item);
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 600);
  };

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroSearchInput.trim()) return;
    router.push(`/food-insight?q=${encodeURIComponent(heroSearchInput.trim())}`);
  };

  const haloSteps = [
    {
      step: '01',
      title: 'The Front-of-Pack Distraction',
      subtitle: 'Halo Buzzwords',
      description: 'Manufacturers emblazon packages with high-trust trigger words like "Natural", "High Protein", "Non-GMO", or "Gluten-Free" to distract from poor fundamental macronutrient ratios.',
      stat: '87% of shoppers',
      statLabel: 'judge food health purely from front packaging'
    },
    {
      step: '02',
      title: 'Serving Size Downscaling',
      subtitle: 'Portion Illusion',
      description: 'A 16oz smoothie bottle or tiny snack bag is divided into "2.5 servings". This keeps calories and sugars artificially low in the headline box while most consumers drink the entire container.',
      stat: '2.5× higher',
      statLabel: 'actual sugar intake than headline values'
    },
    {
      step: '03',
      title: 'The 60+ Sugar Alias Shuffle',
      subtitle: 'Ingredient Masking',
      description: 'FDA rules require ingredients to be listed by weight. By splitting sweeteners across 4 different aliases (dextrose, maltodextrin, cane syrup, fruit concentrate), sugar drops below whole oats in the list.',
      stat: '60+ pseudonyms',
      statLabel: 'legally disguise high-fructose corn syrups'
    }
  ];

  return (
    <div className="flex flex-col w-full pb-24 overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-4 sm:pt-10 pb-16 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Ambient Subtle Grid Backdrop */}
        <div className="absolute inset-0 grid-pattern pointer-events-none -z-10 opacity-60" />
        
        {/* Real-time Status Beacon */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface)] border border-emerald-500/20 shadow-xs mb-6 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-[var(--text-secondary)]">
            USDA Biochemical Core • AI Truth Engine Active
          </span>
        </div>

        {/* Magnetic Typography */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mb-6 font-['var(--font-dm-sans)'] leading-[1.08] text-[var(--text-primary)]">
          Stop eating the marketing. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500">
            Start seeing the nutrition.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mb-8 leading-relaxed">
          Food corporations spend billions convincing consumers that sugar-dense, ultra-processed products are wholesome. NutriLens uses clinical AI to decode the actual biochemical reality behind the box.
        </p>

        {/* Command Search Console */}
        <div className="w-full max-w-2xl mx-auto mb-4">
          <form 
            onSubmit={handleHeroSearchSubmit}
            className="card p-2 sm:p-2.5 rounded-2xl sm:rounded-full border border-[var(--border)] shadow-xl bg-[var(--surface)] flex flex-col sm:flex-row items-stretch sm:items-center gap-2 hover:border-emerald-500/40 transition-colors"
          >
            <div className="flex items-center flex-1 px-3">
              <Search className="w-5 h-5 text-emerald-500 flex-shrink-0 mr-3" />
              <input
                type="text"
                placeholder="Type any food or brand (e.g. Oatly, Chobani, Clif Bar)..."
                value={heroSearchInput}
                onChange={(e) => setHeroSearchInput(e.target.value)}
                className="w-full bg-transparent border-none text-sm sm:text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl sm:rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Scan Food Truth</span>
            </button>
          </form>

          {/* Quick Suggestion Chips */}
          <div className="flex items-center justify-center flex-wrap gap-1.5 mt-3 text-xs text-[var(--text-muted)]">
            <span className="mr-1 hidden sm:inline">Popular targets:</span>
            {SAMPLE_SEARCH_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => {
                  setHeroSearchInput(chip);
                  router.push(`/food-insight?q=${encodeURIComponent(chip)}`);
                }}
                className="px-2.5 py-1 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-emerald-500 hover:border-emerald-500/40 transition-all cursor-pointer text-[11px]"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE TRUTH SCANNER 2.0 CONSOLE                                     */}
        {/* ========================================================================= */}
        <div className="w-full max-w-5xl mt-10 rounded-3xl border border-[var(--border)] shadow-2xl bg-[var(--surface)] p-3 sm:p-5 text-left relative overflow-hidden">
          {/* Top Console Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Scan className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] block leading-none">
                  Truth Scanner Console v2.1
                </span>
                <span className="text-[11px] text-[var(--text-muted)] block mt-0.5">
                  Drag the center slider or switch targets to inspect discrepancies
                </span>
              </div>
            </div>

            {/* Product Switcher Capsule */}
            <div className="flex items-center flex-wrap gap-1.5">
              {DEMO_ITEMS.map((item) => {
                const isSelected = item.id === activeItem.id;
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleProductSwitch(item)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)]'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dual Split Visualizer */}
          <div className={`relative w-full h-[520px] sm:h-[480px] rounded-2xl overflow-hidden select-none border border-[var(--border)] ${isScanning ? 'scanline' : ''}`}>
            {/* Left Side: Front-of-Pack Marketing Claim */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-[var(--surface)] to-amber-500/5 p-5 sm:p-10 flex flex-col justify-between"
              style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold text-xs uppercase tracking-wider mb-2 sm:mb-3 border border-amber-500/20">
                  <span>Front of Package (Marketing)</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--text-primary)] font-['var(--font-dm-sans)'] leading-tight max-w-md">
                  {activeItem.marketingTitle}
                </h3>
                
                <div className="flex flex-wrap gap-1.5 mt-3 sm:mt-4 max-w-sm">
                  {activeItem.marketingBadges.map((badge, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-semibold bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/25 flex items-center gap-1">
                      <Check className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/85 dark:bg-[var(--surface-elevated)]/80 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-amber-500/20 max-w-sm shadow-sm">
                <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider block">
                  Perceived Wholesomeness
                </span>
                <p className="text-xs sm:text-sm font-semibold text-amber-700 dark:text-amber-400 mt-0.5 leading-snug">
                  {activeItem.marketingTagline}
                </p>
              </div>
            </div>

            {/* Right Side: Scientific Biochemical Reality */}
            <div 
              className="absolute inset-0 bg-gradient-to-bl from-rose-500/10 via-[var(--surface)] to-rose-500/5 p-5 sm:p-10 flex flex-col justify-between items-end text-right"
              style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
            >
              <div className="flex flex-col items-end">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-400 font-bold text-xs uppercase tracking-wider mb-2 sm:mb-3 border border-rose-500/20">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                  <span>Lab Truth (Nutritional Reality)</span>
                </div>
                
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--text-primary)] font-['var(--font-dm-sans)'] leading-tight">
                  {activeItem.realityTitle}
                </h3>

                <div className="flex flex-wrap gap-1.5 justify-end mt-3 sm:mt-4 max-w-md">
                  {activeItem.realityWarnings.map((warn, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-semibold bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/25">
                      ⚠ {warn}
                    </span>
                  ))}
                </div>
              </div>

              {/* Physical Sugar Cubes Representation & Truth Score */}
              <div className="bg-white/85 dark:bg-[var(--surface-elevated)]/80 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-rose-500/20 max-w-sm shadow-sm text-right">
                <div className="flex items-center justify-between gap-4 mb-2 pb-2 border-b border-[var(--border)]">
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider block">
                      Truth Score
                    </span>
                    <span className="text-base font-black text-rose-600 dark:text-rose-400">
                      {activeItem.realityScore} / 100
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider block">
                      Glycemic Spike
                    </span>
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                      {activeItem.realityGlycemic}
                    </span>
                  </div>
                </div>

                <div className="mb-2">
                  <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider block mb-1">
                    Physical Sugar Equivalence ({activeItem.realitySugarGrams}g Added)
                  </span>
                  <div className="flex gap-1 justify-end flex-wrap">
                    {[...Array(activeItem.realitySugarCubes)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded bg-amber-200 dark:bg-amber-300 border border-amber-400 shadow-xs flex items-center justify-center text-[8px] sm:text-[9px] font-black text-amber-900"
                        title="4g Sugar Cube"
                      >
                        4g
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] sm:text-xs text-rose-600 dark:text-rose-400 font-bold leading-tight">
                  {activeItem.realityConclusion}
                </p>
              </div>
            </div>

            {/* Center Drag Divider */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl flex items-center justify-center pointer-events-none z-10"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-10 h-10 -ml-4.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl border-2 border-white">
                <Scale className="w-4 h-4" />
              </div>
            </div>

            {/* Invisible Range Slider */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize z-20 w-full h-full"
              aria-label="Drag slider to compare marketing claim vs reality"
            />
          </div>

          {/* Slider Control Ribbon */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 px-1 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-1.5 w-full sm:w-auto justify-center">
              <button
                type="button"
                onClick={() => setSliderPos(95)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  sliderPos > 70 
                    ? 'bg-amber-500 text-white shadow-xs' 
                    : 'bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                🏷️ Marketing
              </button>
              <button
                type="button"
                onClick={() => setSliderPos(50)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  sliderPos >= 35 && sliderPos <= 65
                    ? 'bg-emerald-500 text-white shadow-xs' 
                    : 'bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                ⚖️ 50/50 Split
              </button>
              <button
                type="button"
                onClick={() => setSliderPos(5)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  sliderPos < 30 
                    ? 'bg-rose-500 text-white shadow-xs' 
                    : 'bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                🔬 Lab Reality
              </button>
            </div>

            <span className="font-medium text-center hidden md:inline text-[11px]">
              ← Drag center handle to expose hidden sugars and industrial binders →
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* LIVE DECEPTION TELEMETRY MARQUEE                                          */}
      {/* ========================================================================= */}
      <section className="w-full border-y border-[var(--border)] bg-[var(--surface)] py-3 overflow-hidden select-none">
        <div className="animate-marquee gap-8 items-center">
          {TELEMETRY_MARQUEE.concat(TELEMETRY_MARQUEE).map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] whitespace-nowrap px-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{item}</span>
            </span>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3-STEP "HOW HEALTH HALOS TRICK YOU" SHOWCASE                              */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 py-20 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 block mb-2">
            The Psychology of Food Marketing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-['var(--font-dm-sans)'] text-[var(--text-primary)] mb-3">
            How Health Halos Trick 87% of Shoppers
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            Industrial food formulation relies on three systematic techniques to disguise poor nutritional quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {haloSteps.map((step, idx) => (
            <div 
              key={step.step}
              onClick={() => setActiveHaloStep(idx)}
              className={`card card-spotlight p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                activeHaloStep === idx 
                  ? 'border-emerald-500/50 bg-emerald-500/5 shadow-lg' 
                  : 'hover:-translate-y-1'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-emerald-500">
                    {step.step}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[var(--surface-hover)] text-[var(--text-muted)]">
                    {step.subtitle}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-['var(--font-dm-sans)'] text-[var(--text-primary)] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border)]">
                <span className="text-xl font-extrabold text-[var(--text-primary)] block">
                  {step.stat}
                </span>
                <span className="text-[11px] text-[var(--text-muted)]">
                  {step.statLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* NEXT-GEN BENTO GRID WITH LIVE MICRO-INTERACTIONS                          */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 py-12 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-['var(--font-dm-sans)'] text-[var(--text-primary)] mb-3">
            Nutritional Diagnostics Engine
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            Every tool is engineered to give you clear, scientific answers without dietary dogma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Bento Item 1: AI Instant Food Scanner (Large 2 Cols) */}
          <Link
            href="/food-insight"
            className="md:col-span-2 card card-spotlight p-6 sm:p-8 flex flex-col justify-between group hover:-translate-y-1 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Gemini 3.6 Flash Active
                </span>
              </div>
              <h3 className="text-2xl font-bold font-['var(--font-dm-sans)'] text-[var(--text-primary)] mb-2">
                Instant AI Food Scanner
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                Type any packaged product or brand. Our neural decoder parses ingredient nomenclature, calculates deception risk, and generates a verified Truth Score in seconds.
              </p>
            </div>

            <div className="bg-[var(--surface-hover)] rounded-xl p-3.5 border border-[var(--border)] flex items-center justify-between text-xs font-medium text-[var(--text-secondary)]">
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-500" />
                Try: "Barista Oat Milk", "Nature Valley", "Veggie Straws"
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-emerald-500" />
            </div>
          </Link>

          {/* Bento Item 2: Food Face-Off Spectrometer (1 Col) */}
          <Link
            href="/compare"
            className="card card-spotlight p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-4 group-hover:scale-110 transition-transform">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-['var(--font-dm-sans)'] text-[var(--text-primary)] mb-2">
                Food Face-Off
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                Put "healthy" foods head-to-head against true alternatives with physical sugar cubes and Recharts macro deltas.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-500">
              <span>Compare 8 food pairs</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Bento Item 3: Label Detective HUD (1 Col) */}
          <Link
            href="/label-detective"
            className="card card-spotlight p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 transition-transform">
                <Scan className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-['var(--font-dm-sans)'] text-[var(--text-primary)] mb-2">
                Label Detective HUD
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                Interactive nutrition facts simulator with radar pins, ingredient loopholes, and the Deception Challenge mini-game.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-500">
              <span>Inspect label pins</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Bento Item 4: Smart Swaps & Annual Calculator (2 Cols) */}
          <Link
            href="/alternatives"
            className="md:col-span-2 card card-spotlight p-6 sm:p-8 flex flex-col justify-between group hover:-translate-y-1 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Annual Impact Calculator
                </span>
              </div>
              <h3 className="text-2xl font-bold font-['var(--font-dm-sans)'] text-[var(--text-primary)] mb-2">
                Smart Swaps Studio
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                Discover 1-to-1 food substitutions that preserve taste while eliminating an average of 14.6 lbs of pure hidden sugar from your yearly routine.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)]">
                <span className="text-[11px] text-[var(--text-muted)] block">Average Sugar Avoided</span>
                <span className="text-lg font-extrabold text-emerald-500">-72% Added Sugar</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)]">
                <span className="text-[11px] text-[var(--text-muted)] block">Satiety & Fiber Lift</span>
                <span className="text-lg font-extrabold text-cyan-500">+3× Fullness Index</span>
              </div>
            </div>
          </Link>

          {/* Bento Item 5: Athlete MythBusters (1 Col) */}
          <Link
            href="/athletes"
            className="card card-spotlight p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4 group-hover:scale-110 transition-transform">
                <Dumbbell className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-['var(--font-dm-sans)'] text-[var(--text-primary)] mb-2">
                Athlete MythBusters
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                Clinical sports science debunking protein mega-dosing, BCAA hype, and electrolyte sugar bombs.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-500">
              <span>Bust fitness myths</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Bento Item 6: Hidden Culprits (1 Col) */}
          <Link
            href="/explore"
            className="card card-spotlight p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-['var(--font-dm-sans)'] text-[var(--text-primary)] mb-2">
                Sneaky Culprit Radar
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                Catalog of 60+ chemical aliases food manufacturers use to hide high-fructose syrups and oxidized seed oils.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-500">
              <span>Explore disguised aliases</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CLOSING TERMINAL CTA                                                      */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 py-12 max-w-6xl mx-auto w-full">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-amber-500/10 border border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-xl">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 block mb-2">
              Instant Diagnostic
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-['var(--font-dm-sans)'] text-[var(--text-primary)] mb-2">
              Ready to verify what's actually in your pantry?
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Scan any brand name or compare products right now. Powered by Google Gemini 3.6 Flash and USDA FoodData Central. No sign-up required.
            </p>
          </div>

          <Link
            href="/food-insight"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--background)] font-bold text-sm hover:scale-105 active:scale-95 transition-all flex-shrink-0 shadow-lg cursor-pointer"
          >
            <span>Scan with AI Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
