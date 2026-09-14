import React from 'react';
import { ThemeSection, TypographyPreset } from '../../types';

interface ChronosWatermarkBannerProps {
  section: ThemeSection;
  fontFamily: TypographyPreset;
  onExploreClick: () => void;
}

export const ChronosWatermarkBanner: React.FC<ChronosWatermarkBannerProps> = ({
  section,
  fontFamily,
  onExploreClick,
}) => {
  const {
    headline = 'CHRONOVA CHRONOVA',
    subheadline = 'Mechanical calibres engineered for generations. Experience the gold standard of Bangladeshi luxury horology.',
    imageUrl = 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1200&q=85'
  } = section.settings;

  const fontClass = fontFamily === 'serif' 
    ? 'font-serif-luxury' 
    : fontFamily === 'display' 
    ? 'font-display-luxury' 
    : 'font-sans-luxury';

  return (
    <section className="relative bg-gradient-to-b from-[#8C8F94] to-[#4A4E57] text-white overflow-hidden py-14 sm:py-20">
      {/* Background Watermark Typography as seen in screenshot Image 1 */}
      <div className="absolute left-6 sm:left-12 top-6 select-none pointer-events-none opacity-25 -z-0">
        <div className={`${fontClass} text-5xl sm:text-7xl md:text-8xl font-black tracking-widest leading-none text-white/40 uppercase`}>
          {headline.split(' ')[0] || 'CHRONOS'}
        </div>
        <div className={`${fontClass} text-5xl sm:text-7xl md:text-8xl font-black tracking-widest leading-none text-transparent stroke-white stroke-1 uppercase -mt-3 sm:-mt-5`} style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.6)' }}>
          {headline.split(' ')[1] || 'CHRONOS'}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4 pt-10 sm:pt-0">
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-amber-300">
              Atelier Engineering
            </span>
            <h3 className={`${fontClass} text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white`}>
              Every Second, Measured to Sub-Micron Precision
            </h3>
            <p className="text-sm sm:text-base text-stone-300 font-sans-luxury max-w-xl font-light leading-relaxed">
              {subheadline}
            </p>
            <div className="pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-stone-900 bg-white hover:bg-amber-100 rounded-full transition-all shadow-md cursor-pointer"
              >
                Discover Technical Calibres
              </button>
            </div>
          </div>

          {/* Right Image matching the gold bracelet timepiece in screenshot */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-64 sm:w-80 aspect-[3/4] overflow-hidden rounded-2xl border border-white/20 shadow-2xl bg-black/40">
              <img
                src={imageUrl}
                alt="Chronos Marine Craftsmanship"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="text-[10px] uppercase tracking-widest text-amber-300">Limited Production</span>
                <p className="text-sm font-serif-luxury font-medium text-white">Royal Chronos Jubilee 42mm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
