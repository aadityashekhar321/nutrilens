import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showBadge?: boolean;
  className?: string;
}

export default function Logo({
  size = 'md',
  showText = true,
  showBadge = false,
  className = '',
}: LogoProps) {
  const dimensions = {
    sm: { box: 'w-7 h-7', icon: 28, text: 'text-base', badge: 'text-[9px] px-1.5' },
    md: { box: 'w-9 h-9', icon: 36, text: 'text-lg sm:text-xl', badge: 'text-[10px] px-2 py-0.5' },
    lg: { box: 'w-12 h-12', icon: 48, text: 'text-2xl sm:text-3xl', badge: 'text-xs px-2.5 py-0.5' },
    xl: { box: 'w-16 h-16', icon: 64, text: 'text-4xl', badge: 'text-sm px-3 py-1' },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon Mark */}
      <div className={`relative ${dimensions.box} rounded-xl bg-[#031510] border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-950/40 group-hover:border-emerald-400/60 group-hover:shadow-emerald-500/20 transition-all duration-300 overflow-hidden`}>
        {/* Ambient Radial Gradient Inside */}
        <div className="absolute inset-0 bg-radial from-emerald-500/20 via-transparent to-transparent opacity-80" />

        {/* Custom NutriLens Vector Emblem */}
        <svg 
          viewBox="0 0 64 64" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1"
        >
          <defs>
            <linearGradient id="logoRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399"/>
              <stop offset="50%" stopColor="#06b6d4"/>
              <stop offset="100%" stopColor="#10b981"/>
            </linearGradient>
            <linearGradient id="leafGradLogo" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#a7f3d0"/>
              <stop offset="50%" stopColor="#34d399"/>
              <stop offset="100%" stopColor="#059669"/>
            </linearGradient>
            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Optical Aperture Rings */}
          <circle cx="32" cy="32" r="24" stroke="#064e3b" strokeWidth="1.5" strokeOpacity="0.5"/>
          <circle cx="32" cy="32" r="21" stroke="url(#logoRing)" strokeWidth="1.8" filter="url(#logoGlow)"/>
          <circle cx="32" cy="32" r="17" stroke="#047857" strokeWidth="1" strokeDasharray="3 3"/>

          {/* Organic Leaf / Metabolic Focus */}
          <g filter="url(#logoGlow)">
            <path 
              d="M32 15 C39 21, 42 29, 32 46 C22 29, 25 21, 32 15 Z" 
              fill="url(#leafGradLogo)" 
              fillOpacity="0.25"
              stroke="url(#leafGradLogo)" 
              strokeWidth="2.2" 
              strokeLinejoin="round"
            />
            <path d="M32 17 L32 44" stroke="#a7f3d0" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M32 25 Q35 23 38 22" stroke="#a7f3d0" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M32 25 Q29 23 26 22" stroke="#a7f3d0" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M32 31 Q36 29 39 29" stroke="#34d399" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M32 31 Q28 29 25 29" stroke="#34d399" strokeWidth="1.4" strokeLinecap="round"/>
          </g>

          {/* Reticle Focus Crosshair Dots */}
          <circle cx="32" cy="10" r="1.5" fill="#34d399"/>
          <circle cx="32" cy="54" r="1.5" fill="#34d399"/>
          <circle cx="10" cy="32" r="1.5" fill="#06b6d4"/>
          <circle cx="54" cy="32" r="1.5" fill="#06b6d4"/>
        </svg>

        {/* Live Active Pulse Dot */}
        <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-[#031510] animate-pulse" />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex items-center gap-2">
          <span className={`font-extrabold ${dimensions.text} font-['var(--font-dm-sans)'] tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-emerald-400`}>
            Nutri<span className="text-emerald-500">Lens</span>
          </span>
          {showBadge && (
            <span className={`inline-flex items-center gap-1 rounded-full font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 ${dimensions.badge}`}>
              USDA Verified
            </span>
          )}
        </div>
      )}
    </div>
  );
}
