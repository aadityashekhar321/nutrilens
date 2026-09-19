'use client';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-8 h-8 rounded-full" />;

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <button
      onClick={cycleTheme}
      className="relative p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all duration-200 cursor-pointer focus:outline-none"
      title={`Theme: ${theme || 'system'} (click to change)`}
      aria-label="Toggle theme"
    >
      <div className="transition-transform duration-300 hover:rotate-45">
        {theme === 'light' ? (
          <Sun className="w-4 h-4 text-amber-500" />
        ) : theme === 'dark' ? (
          <Moon className="w-4 h-4 text-cyan-400" />
        ) : (
          <Monitor className="w-4 h-4 text-emerald-500" />
        )}
      </div>
    </button>
  );
}
