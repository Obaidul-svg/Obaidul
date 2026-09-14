import React from 'react';
import { ThemeSection, ButtonStyle, TypographyPreset } from '../../types';
import { Sparkles, ArrowRight, Tag } from 'lucide-react';

interface PromoBannerSectionProps {
  section: ThemeSection;
  primaryColor: string;
  buttonStyle: ButtonStyle;
  fontFamily: TypographyPreset;
  onButtonClick?: () => void;
}

export const PromoBannerSection: React.FC<PromoBannerSectionProps> = ({
  section,
  primaryColor,
  buttonStyle,
  fontFamily,
  onButtonClick,
}) => {
  const {
    headline = 'Private Atelier Privilege — ৳ 2,000 Complimentary Credit',
    subheadline = 'Enter code CHRONOVA2000 at checkout on any order over ৳ 30,000. Includes insured expedited courier delivery across Bangladesh.',
    buttonText = 'Claim Invitation Code',
    badgeText = 'EXCLUSIVE INVITATION',
    imageUrl = 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=85',
    backgroundColor = '#0A192F',
  } = section.settings;

  const fontClass = fontFamily === 'serif' 
    ? 'font-serif-luxury' 
    : fontFamily === 'display' 
    ? 'font-display-luxury' 
    : 'font-sans-luxury';

  const buttonRadiusClass = buttonStyle === 'pill' 
    ? 'rounded-full' 
    : buttonStyle === 'sharp' 
    ? 'rounded-none' 
    : 'rounded-lg';

  return (
    <section 
      id={section.id}
      className="relative py-16 sm:py-20 text-white overflow-hidden"
      style={{ backgroundColor: backgroundColor || '#0A192F' }}
    >
      {/* Background Image with Dark Overlay */}
      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <img 
            src={imageUrl} 
            alt="Promo Background" 
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F] via-[#0A192F]/90 to-[#0A192F]/70" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-3xl space-y-5 text-left">
          {badgeText && (
            <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold tracking-[0.25em] uppercase text-amber-300 bg-amber-950/60 rounded-full border border-amber-500/40">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>{badgeText}</span>
            </div>
          )}

          <h2 className={`${fontClass} text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight text-white tracking-wide`}>
            {headline}
          </h2>

          <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed max-w-2xl">
            {subheadline}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {buttonText && (
              <button
                onClick={onButtonClick}
                className={`${buttonRadiusClass} px-7 py-3 text-xs sm:text-sm font-bold bg-[#C5A059] hover:bg-[#b59049] text-stone-950 transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-2`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>{buttonText}</span>
              </button>
            )}

            <div className="flex items-center gap-2 text-xs text-stone-400 font-mono">
              <span>Code:</span>
              <span className="px-2 py-1 bg-white/10 rounded font-bold text-amber-300 border border-white/20">
                CHRONOVA2000
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
