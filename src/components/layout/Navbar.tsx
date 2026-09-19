'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sparkles, 
  Scale, 
  Search, 
  Dumbbell, 
  ArrowRightLeft, 
  Menu, 
  X, 
  ShieldAlert,
  ScanEye,
  ChevronDown,
  ArrowRight,
  Zap,
  Flame
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Logo from '@/components/ui/Logo';

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
  description?: string;
}

const PRIMARY_LINKS: NavItem[] = [
  { name: 'Food Scanner', href: '/food-insight', icon: Sparkles },
  { name: 'Face-Off', href: '/compare', icon: Scale },
  { name: 'Label HUD', href: '/label-detective', icon: ScanEye },
  { name: 'Smart Swaps', href: '/alternatives', icon: ArrowRightLeft },
];

const KNOWLEDGE_ITEMS: NavItem[] = [
  { 
    name: 'Athlete MythBusters', 
    href: '/athletes', 
    icon: Dumbbell, 
    description: 'Evidence-based breakdown of sports nutrition, protein, and hydration claims' 
  },
  { 
    name: 'Sneaky Culprit Radar', 
    href: '/explore', 
    icon: ShieldAlert, 
    description: 'Catalog of 60+ disguised sugar aliases and hidden fat traps' 
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setKnowledgeOpen(false);
  }, [pathname]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setKnowledgeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerSearch = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true
    });
    document.dispatchEvent(event);
  };

  const isKnowledgeActive = pathname.startsWith('/athletes') || pathname.startsWith('/explore');

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'nav-blur border-b border-[var(--border)] shadow-xs' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Mark */}
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex items-center focus:outline-hidden">
            <Logo size="md" showBadge />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 pl-2">
            {PRIMARY_LINKS.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'
                  }`}
                >
                  <link.icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-500' : 'text-[var(--text-muted)]'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            {/* Knowledge Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setKnowledgeOpen(!knowledgeOpen)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                  isKnowledgeActive
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/25'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'
                }`}
              >
                <span>Research</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${knowledgeOpen ? 'rotate-180 text-emerald-500' : 'text-[var(--text-muted)]'}`} />
              </button>

              {knowledgeOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 p-2 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-2xl animate-slide-up backdrop-blur-2xl z-50">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] px-3 py-1.5 font-['var(--font-dm-sans)']">
                    Nutritional Intelligence
                  </div>
                  <div className="space-y-1">
                    {KNOWLEDGE_ITEMS.map((item) => {
                      const isItemActive = pathname.startsWith(item.href);
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setKnowledgeOpen(false)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                            isItemActive
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'hover:bg-[var(--surface-hover)] text-[var(--text-primary)]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 flex-shrink-0 mt-0.5">
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold block">{item.name}</span>
                            <span className="text-[11px] text-[var(--text-secondary)] leading-tight block mt-0.5">
                              {item.description}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search Button */}
          <button
            onClick={triggerSearch}
            title="Search foods, ingredients, myths (⌘K)"
            aria-label="Search foods and ingredients"
            className="flex items-center gap-1.5 sm:gap-2 p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium text-[var(--text-secondary)] bg-[var(--surface-hover)] hover:text-[var(--text-primary)] border border-[var(--border)] transition-all cursor-pointer hover:border-emerald-500/40"
          >
            <Search className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-emerald-500" />
            <span className="hidden md:inline text-[11px] font-normal">Search foods...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[var(--surface)] text-[9px] text-[var(--text-muted)] border border-[var(--border)] font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Primary High-Craft CTA Button */}
          <Link
            href="/food-insight"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Scanner</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-500" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border)] px-4 py-4 space-y-4 animate-slide-up nav-blur shadow-2xl">
          {/* Mobile Search Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              triggerSearch();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)]"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-emerald-500" />
              <span>Search foods, ingredients, myths...</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-[var(--surface)] text-[10px] text-[var(--text-muted)] border border-[var(--border)]">
              ⌘K
            </kbd>
          </button>

          {/* Mobile Navigation List */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] px-2">
              Core Tools
            </span>
            
            <Link
              href="/"
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                pathname === '/'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>Home Overview</span>
            </Link>

            {PRIMARY_LINKS.map((tool) => {
              const isActive = pathname.startsWith(tool.href);
              return (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <tool.icon className="w-4 h-4 text-emerald-500" />
                  <span>{tool.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Research List */}
          <div className="space-y-1 pt-2 border-t border-[var(--border)]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] px-2">
              Research & Science
            </span>
            {KNOWLEDGE_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <item.icon className="w-4 h-4 text-emerald-500" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Theme Switcher Bar */}
          <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between px-1">
            <span className="text-xs font-bold text-[var(--text-secondary)]">Atmosphere Palette:</span>
            <ThemeToggle />
          </div>

          {/* Quick CTA */}
          <div className="pt-1">
            <Link
              href="/food-insight"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Launch AI Food Scanner</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
