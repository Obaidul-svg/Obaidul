import React from 'react';
import { ThemeSection, TypographyPreset, ButtonStyle } from '../../types';
import { Compass, Clock, Award, CheckCircle2 } from 'lucide-react';

interface CraftsmanshipSectionProps {
  section: ThemeSection;
  fontFamily: TypographyPreset;
  primaryColor: string;
  buttonStyle: ButtonStyle;
  onExploreClick: () => void;
}

export const CraftsmanshipSection: React.FC<CraftsmanshipSectionProps> = ({
  section,
  fontFamily,
  primaryColor,
  buttonStyle,
  onExploreClick,
}) => {
  const {
    headline = 'Uncompromising Precision',
    subheadline = 'Every CHRONOVA timepiece undergoes 240 hours of rigorous acoustic calibration, hydro-pressure testing, and hand-finishing before leaving our atelier.',
    badgeText = 'THE CHRONOVA STANDARD',
    buttonText = 'Our Atelier Heritage',
    imageUrl = 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&w=1000&q=85'
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
    <section id="craftsmanship" className="py-20 md:py-28 bg-[#FAF8F5] text-stone-900 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with craftsmanship overlay badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-stone-200/80 bg-stone-100">
              <img
                src={imageUrl}
                alt="Horology Atelier Craftsmanship"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-950/10" />
            </div>

            {/* Floating floating card */}
            <div className="absolute -bottom-6 -left-4 sm:left-6 bg-white p-5 rounded-xl shadow-xl border border-stone-200/80 max-w-xs text-left">
              <div className="flex items-center gap-2.5 mb-1.5 text-amber-700">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-semibold tracking-wider uppercase font-sans-luxury">240-Hour Testing</span>
              </div>
              <p className="text-xs text-stone-600 font-light">
                Individually regulated across 5 positions and tested under 15 bar hydro-pressure.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial story & specifications */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-medium tracking-[0.25em] uppercase text-stone-600 bg-black/5 rounded-full">
              <Compass className="w-3.5 h-3.5 text-stone-700" />
              {badgeText}
            </div>

            <h2 className={`${fontClass} text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-stone-900`}>
              {headline}
            </h2>

            <p className="text-base sm:text-lg text-stone-600 font-sans-luxury font-light leading-relaxed">
              {subheadline}
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 font-sans-luxury">Domed Sapphire Glass</h4>
                  <p className="text-xs text-stone-500 font-light mt-0.5">Dual-sided anti-reflective treatment eliminating glare under direct sunlight.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 font-sans-luxury">Surgical 316L Stainless Steel</h4>
                  <p className="text-xs text-stone-500 font-light mt-0.5">Hypoallergenic, saltwater corrosion-proof, with alternating satin-brushed and hand-mirror polished facets.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 font-sans-luxury">In-House Regulated Calibres</h4>
                  <p className="text-xs text-stone-500 font-light mt-0.5">Accuracy tolerance within -2/+4 seconds per day, exceeding Swiss chronometer benchmarks.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onExploreClick}
                className={`${buttonRadiusClass} px-7 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer`}
                style={{ backgroundColor: primaryColor || '#0A192F' }}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
