'use client';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const DARK_THEMES = ['dark', 'cyberpunk', 'forest', 'sunset', 'ocean'];

export default function ThemeSync() {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const syncDarkClass = () => {
      const active = theme === 'system' ? resolvedTheme : theme;
      const isDark = 
        DARK_THEMES.includes(active || '') || 
        DARK_THEMES.some(t => document.documentElement.classList.contains(t));

      if (isDark) {
        if (!document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.add('dark');
        }
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    syncDarkClass();

    const observer = new MutationObserver(syncDarkClass);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    return () => observer.disconnect();
  }, [theme, resolvedTheme]);

  return null;
}
