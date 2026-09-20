'use client';
import { useTheme } from 'next-themes';
import { 
  Sun, 
  Moon, 
  Monitor, 
  Zap, 
  Trees, 
  Flame, 
  Waves, 
  Check, 
  Palette, 
  ChevronDown 
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

interface ThemeOption {
  id: string;
  name: string;
  subtitle: string;
  icon: any;
  iconColor: string;
  swatches: [string, string, string]; // [bg, surface, accent]
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'dark',
    name: 'Obsidian Void',
    subtitle: 'Stealth pitch black & neon emerald',
    icon: Moon,
    iconColor: 'text-emerald-400',
    swatches: ['#030712', '#0B1120', '#10B981'],
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    subtitle: 'Ultraviolet city & hot magenta glow',
    icon: Zap,
    iconColor: 'text-fuchsia-400',
    swatches: ['#080014', '#120124', '#FF007A'],
  },
  {
    id: 'forest',
    name: 'Bio-Forest',
    subtitle: 'Living botanical jungle & mint',
    icon: Trees,
    iconColor: 'text-teal-400',
    swatches: ['#02140D', '#05261A', '#2DD4BF'],
  },
  {
    id: 'sunset',
    name: 'Solar Sunset',
    subtitle: 'Volcanic espresso & radiant amber',
    icon: Flame,
    iconColor: 'text-amber-400',
    swatches: ['#140B07', '#22120B', '#F97316'],
  },
  {
    id: 'ocean',
    name: 'Ocean Abyss',
    subtitle: 'Deep marine trench & electric cyan',
    icon: Waves,
    iconColor: 'text-cyan-400',
    swatches: ['#020D1A', '#06192E', '#38BDF8'],
  },

  {
    id: 'system',
    name: 'System Default',
    subtitle: 'Syncs automatically with your OS',
    icon: Monitor,
    iconColor: 'text-[var(--text-secondary)]',
    swatches: ['#1E293B', '#334155', '#94A3B8'],
  },
];

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open]);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full bg-[var(--surface-hover)]" />;
  }

  const currentThemeObj = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];
  const CurrentIcon = currentThemeObj.icon;

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button with Active Theme Swatch Ring */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-full text-xs font-semibold text-[var(--text-secondary)] bg-[var(--surface-hover)] hover:text-[var(--text-primary)] border border-[var(--border)] hover:border-emerald-500/40 transition-all cursor-pointer shadow-xs active:scale-95 group focus:outline-none"
        title={`Active Theme: ${currentThemeObj.name} (Click to change)`}
        aria-label="Theme selector"
        aria-expanded={open}
      >
        <div className="w-6 h-6 rounded-full flex items-center justify-center relative">
          <CurrentIcon className={`w-3.5 h-3.5 ${currentThemeObj.iconColor} transition-transform duration-300 group-hover:scale-110`} />
          {/* Active Accent Dot */}
          <span 
            className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-[var(--surface)] shadow-xs"
            style={{ backgroundColor: currentThemeObj.swatches[2] }}
          />
        </div>
        <span className="hidden sm:inline text-[11px] font-medium pr-0.5">
          {currentThemeObj.name.split(' ')[0]}
        </span>
        <ChevronDown className={`w-3 h-3 text-[var(--text-muted)] transition-transform duration-200 ${open ? 'rotate-180 text-emerald-500' : ''}`} />
      </button>

      {/* Floating Theme Palette Popover Menu */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 p-2.5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-2xl backdrop-blur-2xl z-50 animate-slide-up space-y-1">
          {/* Menu Header */}
          <div className="px-2.5 py-1.5 pb-2 border-b border-[var(--border)] flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-primary)] font-['var(--font-dm-sans)']">
              <Palette className="w-3.5 h-3.5 text-emerald-500" />
              <span>Select Atmosphere</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--surface-hover)] text-[var(--text-muted)]">
              6 Themes
            </span>
          </div>

          {/* Theme Grid List */}
          <div className="space-y-1 pt-1 max-h-[380px] overflow-y-auto">
            {THEME_OPTIONS.map((item) => {
              const isActive = theme === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setTheme(item.id);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/15 border border-emerald-500/40 text-[var(--text-primary)] shadow-sm'
                      : 'hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Icon Box */}
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center shadow-xs border border-white/10"
                      style={{ backgroundColor: item.swatches[1] }}
                    >
                      <Icon className={`w-4 h-4 ${item.iconColor}`} />
                    </div>

                    {/* Name & Subtitle */}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[var(--text-primary)]">
                          {item.name}
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)] leading-tight">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Swatches & Active Check */}
                  <div className="flex items-center gap-2">
                    {/* 3 Swatch Dots */}
                    <div className="flex items-center -space-x-1">
                      <div 
                        className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-xs" 
                        style={{ backgroundColor: item.swatches[0] }} 
                      />
                      <div 
                        className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-xs" 
                        style={{ backgroundColor: item.swatches[1] }} 
                      />
                      <div 
                        className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-xs" 
                        style={{ backgroundColor: item.swatches[2] }} 
                      />
                    </div>

                    {/* Checkmark */}
                    {isActive ? (
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
