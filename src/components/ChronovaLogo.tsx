import React from 'react';

interface ChronovaLogoProps {
  variant?: 'full' | 'screenshotMatch' | 'iconOnly' | 'compact';
  theme?: 'light' | 'dark';
  showTagline?: boolean;
  className?: string;
}

export const ChronovaLogo: React.FC<ChronovaLogoProps> = ({
  variant = 'screenshotMatch',
  theme = 'light',
  showTagline = true,
  className = '',
}) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-white' : 'text-stone-900';
  const subtextColor = isDark ? 'text-stone-400' : 'text-stone-500';
  const emblemBorder = isDark ? 'border-amber-400/80 text-amber-300' : 'border-stone-800 text-stone-900';

  if (variant === 'iconOnly') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <div className={`w-8 h-8 rounded-full border-[1.5px] ${emblemBorder} flex items-center justify-center relative`}>
          <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center">
            <span className="font-serif text-[11px] font-bold leading-none">C</span>
          </div>
          <div className="absolute top-0 w-1 h-1 bg-current rounded-full" />
          <div className="absolute bottom-0 w-1 h-1 bg-current rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group ${className}`}>
      {/* Circular Horology Emblem matching reference screenshot */}
      <div className="relative shrink-0">
        <div className={`w-8 sm:w-9 h-8 sm:h-9 rounded-full border-[1.5px] ${emblemBorder} flex items-center justify-center transition-transform duration-300 group-hover:rotate-45`}>
          <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full border border-current flex items-center justify-center">
            <span className="font-serif text-xs font-bold leading-none">C</span>
          </div>
          {/* Subtle horology crown notches */}
          <div className="absolute -top-0.5 w-1 h-1 bg-current rounded-full" />
          <div className="absolute -bottom-0.5 w-1 h-1 bg-current rounded-full" />
          <div className="absolute -left-0.5 w-1 h-1 bg-current rounded-full" />
          <div className="absolute -right-0.5 w-1 h-1 bg-current rounded-full" />
        </div>
      </div>

      {/* Brand Wordmark & Tagline */}
      <div className="flex flex-col text-left">
        <span className={`font-serif tracking-[0.2em] sm:tracking-[0.25em] text-base sm:text-lg font-bold uppercase leading-none ${textColor}`}>
          CHRONOVA
        </span>
        {showTagline && (
          <span className={`text-[8.5px] sm:text-[9.5px] tracking-[0.28em] uppercase font-sans font-medium mt-1 leading-none ${subtextColor}`}>
            BANGLADESH • HOROLOGY ATELIER
          </span>
        )}
      </div>
    </div>
  );
};
