import React from 'react';
import { ThemeSection, ButtonStyle, TypographyPreset } from '../../types';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ImageTextSectionProps {
  section: ThemeSection;
  primaryColor: string;
  buttonStyle: ButtonStyle;
  fontFamily: TypographyPreset;
  onButtonClick?: () => void;
}

export const ImageTextSection: React.FC<ImageTextSectionProps> = ({
  section,
  primaryColor,
  buttonStyle,
  fontFamily,
  onButtonClick,
}) => {
  const {
    headline = 'Engineering Without Compromise',
    subheadline = 'Each timepiece represents over 200 hours of master assembly, acoustic calibration, and hand-polishing in our atelier.',
    buttonText = 'Discover The Story',
    badgeText = 'HOROLOGY CRAFT',
    imageUrl = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85',
    backgroundColor,
    alignment = 'left',
    layout = 'imageRight'
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

  const isImageLeft = layout === 'imageLeft';

  return (
    <section 
      id={section.id}
      className="py-16 sm:py-24 transition-colors duration-300 relative overflow-hidden"
      style={{ backgroundColor: backgroundColor || '#FFFFFF' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${isImageLeft ? '' : 'lg:flex-row-reverse'}`}>
          {/* Image Column */}
          <div className={`lg:col-span-6 ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="relative group overflow-hidden rounded-2xl bg-stone-100 border border-stone-200/80 shadow-lg">
              <img 
                src={imageUrl} 
                alt={headline}
                className="w-full h-[380px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
              {badgeText && (
                <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-stone-900 shadow-sm border border-stone-200">
                  {badgeText}
                </div>
              )}
            </div>
          </div>

          {/* Text Column */}
          <div className={`lg:col-span-6 flex flex-col justify-center space-y-6 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'} ${alignment === 'center' ? 'text-center items-center' : 'text-left'}`}>
            {badgeText && (
              <div className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] uppercase text-amber-900 bg-amber-50 rounded-full border border-amber-200/60 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                {badgeText}
              </div>
            )}

            <h2 className={`${fontClass} text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-tight text-stone-900`}>
              {headline}
            </h2>

            <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed max-w-xl">
              {subheadline}
            </p>

            <div className="space-y-3 pt-2 text-sm text-stone-700">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>316L Surgical Grade Stainless Steel metallurgy</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Double-domed anti-reflective sapphire crystal</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Guaranteed 5-Year official atelier warranty in Dhaka</span>
              </div>
            </div>

            {buttonText && (
              <div className="pt-2">
                <button
                  onClick={onButtonClick}
                  className={`${buttonRadiusClass} px-7 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center gap-2`}
                  style={{ backgroundColor: primaryColor || '#0A192F' }}
                >
                  <span>{buttonText}</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
