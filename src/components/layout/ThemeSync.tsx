'use client';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const DARK_THEMES = ['dark', 'cyberpunk', 'forest', 'sunset', 'ocean'];

export default function ThemeSync() {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    // Determine the actual active theme
    const active = theme === 'system' ? resolvedTheme : theme;
    
    // Check if it's a dark mode variant
    const isDark = DARK_THEMES.includes(active || '');

    // Add or remove Tailwind's '.dark' class without interfering with next-themes' data-theme attribute
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, resolvedTheme]);

  return null;
}
