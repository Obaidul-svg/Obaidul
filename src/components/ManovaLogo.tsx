import React from 'react';

interface ManovaLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'iconOnly' | 'screenshotMatch';
  theme?: 'light' | 'dark' | 'auto';
  showTagline?: boolean;
}

export const ManovaLogo: React.FC<ManovaLogoProps> = ({
  className = '',
  variant = 'compact',
  theme = 'auto',
  showTagline = false,
}) => {
  // SVG Icon representing the uploaded logo:
  // - Stylized "M" with geometric precision
  // - Teal tie ribbon accent (#2A7B9B)
  // - Circular watch dial at center with hour tick marks & hands at 10:10
  const isDarkBg = theme === 'dark';
  const strokeColor = isDarkBg ? '#FFFFFF' : '#0F172A';
  const dialBg = isDarkBg ? '#08121E' : '#0F172A';
  const dialHand = '#FFFFFF';
  const accentTeal = '#2A7B9B';

  if (variant === 'screenshotMatch') {
    // In screenshot Image 1, the top left simply reads "Watches" or "MANOVA Watches"
    return (
      <div className={`flex items-center gap-3 cursor-pointer ${className}`}>
        <svg width="30" height="34" viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stylized M Tie Outline */}
          <path d="M28 20L48 40V68L50 78L52 68V40L72 20H84L54 88L50 96L46 88L16 20H28Z" fill={accentTeal} fillOpacity="0.4" />
          <path d="M14 18V80L28 80V34L48 54L50 56L52 54L72 34V80L86 80V18L50 50L14 18Z" fill={strokeColor} />
          {/* Watch Face in Center */}
          <circle cx="50" cy="48" r="18" fill={dialBg} stroke={accentTeal} strokeWidth="2.5" />
          {/* Hour Ticks */}
          <line x1="50" y1="33" x2="50" y2="35.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="50" y1="60.5" x2="50" y2="63" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="35" y1="48" x2="37.5" y2="48" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="62.5" y1="48" x2="65" y2="48" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          {/* Hands at 10:10 */}
          <line x1="50" y1="48" x2="42" y2="40" stroke={dialHand} strokeWidth="1.8" strokeLinecap="round" />
          <line x1="50" y1="48" x2="59" y2="41" stroke={dialHand} strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="50" cy="48" r="1.5" fill={accentTeal} />
        </svg>
        <div className="flex flex-col">
          <span className="font-serif-luxury text-xl tracking-wider font-semibold text-current">
            MANOVA
          </span>
          <span className="text-[9px] tracking-[0.25em] text-stone-500 font-sans-luxury uppercase -mt-0.5">
            Watches
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'iconOnly') {
    return (
      <svg width="34" height="38" viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M28 20L48 40V68L50 78L52 68V40L72 20H84L54 88L50 96L46 88L16 20H28Z" fill={accentTeal} fillOpacity="0.4" />
        <path d="M14 18V80L28 80V34L48 54L50 56L52 54L72 34V80L86 80V18L50 50L14 18Z" fill={strokeColor} />
        <circle cx="50" cy="48" r="18" fill={dialBg} stroke={accentTeal} strokeWidth="2.5" />
        <line x1="50" y1="33" x2="50" y2="35.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="50" y1="60.5" x2="50" y2="63" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="35" y1="48" x2="37.5" y2="48" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="62.5" y1="48" x2="65" y2="48" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="50" y1="48" x2="42" y2="40" stroke={dialHand} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="50" y1="48" x2="59" y2="41" stroke={dialHand} strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="50" cy="48" r="1.5" fill={accentTeal} />
      </svg>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <svg width="72" height="80" viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-3">
          <path d="M28 20L48 40V68L50 78L52 68V40L72 20H84L54 88L50 96L46 88L16 20H28Z" fill={accentTeal} fillOpacity="0.4" />
          <path d="M14 18V80L28 80V34L48 54L50 56L52 54L72 34V80L86 80V18L50 50L14 18Z" fill={strokeColor} />
          <circle cx="50" cy="48" r="18" fill={dialBg} stroke={accentTeal} strokeWidth="2.5" />
          <line x1="50" y1="33" x2="50" y2="35.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="50" y1="60.5" x2="50" y2="63" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="35" y1="48" x2="37.5" y2="48" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="62.5" y1="48" x2="65" y2="48" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="50" y1="48" x2="42" y2="40" stroke={dialHand} strokeWidth="1.8" strokeLinecap="round" />
          <line x1="50" y1="48" x2="59" y2="41" stroke={dialHand} strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="50" cy="48" r="1.5" fill={accentTeal} />
        </svg>
        <h2 className="text-2xl font-bold tracking-[0.35em] text-current font-sans-luxury">
          MANOVA
        </h2>
        {(showTagline || true) && (
          <p className="text-[11px] tracking-[0.25em] text-stone-500 font-sans-luxury mt-1 uppercase font-medium">
            — TIME. STYLE. CONFIDENCE. —
          </p>
        )}
      </div>
    );
  }

  // Default compact
  return (
    <div className={`flex items-center gap-2.5 cursor-pointer select-none ${className}`}>
      <svg width="28" height="32" viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28 20L48 40V68L50 78L52 68V40L72 20H84L54 88L50 96L46 88L16 20H28Z" fill={accentTeal} fillOpacity="0.4" />
        <path d="M14 18V80L28 80V34L48 54L50 56L52 54L72 34V80L86 80V18L50 50L14 18Z" fill={strokeColor} />
        <circle cx="50" cy="48" r="18" fill={dialBg} stroke={accentTeal} strokeWidth="2.5" />
        <line x1="50" y1="33" x2="50" y2="35.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="50" y1="60.5" x2="50" y2="63" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="35" y1="48" x2="37.5" y2="48" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="62.5" y1="48" x2="65" y2="48" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="50" y1="48" x2="42" y2="40" stroke={dialHand} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="50" y1="48" x2="59" y2="41" stroke={dialHand} strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="50" cy="48" r="1.5" fill={accentTeal} />
      </svg>
      <div className="flex flex-col">
        <span className="text-lg font-bold tracking-[0.25em] text-current font-sans-luxury">
          MANOVA
        </span>
        {showTagline && (
          <span className="text-[8px] tracking-[0.2em] text-stone-500 uppercase -mt-0.5">
            TIME • STYLE • CONFIDENCE
          </span>
        )}
      </div>
    </div>
  );
};
