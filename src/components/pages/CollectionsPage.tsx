import React from 'react';
import { ButtonStyle, TypographyPreset } from '../../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CollectionsPageProps {
  primaryColor: string;
  buttonStyle: ButtonStyle;
  fontFamily: TypographyPreset;
  onSelectCategory: (category: string) => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({
  primaryColor,
  buttonStyle,
  fontFamily,
  onSelectCategory,
}) => {
  const fontClass = fontFamily === 'serif' 
    ? 'font-serif-luxury' 
    : fontFamily === 'display' 
    ? 'font-display-luxury' 
    : 'font-sans-luxury';

  const collections = [
    {
      id: 'automatic',
      title: 'The Automatic Series',
      subtitle: 'Self-winding mechanical movements featuring 48h to 72h power reserves and exhibition casebacks.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
      timepieces: 'Midnight Automatic, Rose Horizon',
      tag: 'CALIBRE ATELIER'
    },
    {
      id: 'heritage',
      title: 'Heritage Gold 18K',
      subtitle: 'Radiant champagne Roman numeral dials, fluted 18K gold bezels, and handcrafted jubilee link bracelets.',
      image: 'https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=1200&q=85',
      timepieces: 'Heritage Gold, Royal Heritage',
      tag: 'OPULENT PRESTIGE'
    },
    {
      id: 'chronograph',
      title: 'High-Beat Split Chronographs',
      subtitle: 'Engineered for sub-second precision timing with triple sub-dials and mirror-polished ceramic tachymeters.',
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=85',
      timepieces: 'Modern Chrono',
      tag: 'HIGH PRECISION'
    },
    {
      id: 'classic',
      title: 'Executive Steel & Dress',
      subtitle: 'Slim architectural cases tailored for formal boardrooms, monochrome dials, and supple Italian calfskin straps.',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85',
      timepieces: 'Classic Elegance, Executive Steel, Urban Classic',
      tag: 'UNDERSTATED LUXURY'
    },
    {
      id: 'diver',
      title: 'Marine Titanium Diver',
      subtitle: 'Grade 5 titanium cases built for 300m aquatic hydro-depth, helium escape valves, and BGW9 luminescence.',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85',
      timepieces: 'Signature Blue',
      tag: '300M HYDRO DEPTH'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F6] text-stone-900 pb-24">
      {/* Editorial Header */}
      <div className="bg-[#FAF7F2] border-b border-stone-200/80 py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-stone-500 mb-2 block">
            CHRONOVA MAISON ARCHIVE
          </span>
          <h1 className={`${fontClass} text-4xl sm:text-5xl md:text-6xl font-normal text-stone-900 mb-4`}>
            Horological Collections
          </h1>
          <p className="text-stone-600 text-base sm:text-lg font-sans-luxury max-w-2xl mx-auto font-light leading-relaxed">
            Each CHRONOVA collection represents a dedicated aesthetic universe, united by rigorous acoustic calibration and timeless architectural design.
          </p>
        </div>
      </div>

      {/* Collections Showcase */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 space-y-12">
        {collections.map((col, idx) => {
          const isEven = idx % 2 === 1;

          return (
            <div
              key={col.id}
              className={`bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 items-center`}
            >
              {/* Image side */}
              <div className={`lg:col-span-6 h-72 sm:h-96 relative overflow-hidden bg-stone-100 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-950/15" />
                <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase text-stone-900 rounded-full">
                  {col.tag}
                </span>
              </div>

              {/* Text side */}
              <div className={`lg:col-span-6 p-8 sm:p-12 text-left space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-800">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Series {idx + 1} of 5</span>
                </div>

                <h2 className={`${fontClass} text-2xl sm:text-3xl lg:text-4xl font-normal text-stone-900`}>
                  {col.title}
                </h2>

                <p className="text-stone-600 text-sm sm:text-base font-sans-luxury font-light leading-relaxed">
                  {col.subtitle}
                </p>

                <div className="pt-2 text-xs text-stone-500 font-mono">
                  <span className="text-stone-400">Featured Models:</span> {col.timepieces}
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => onSelectCategory(col.id)}
                    className="px-6 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white rounded-full transition-all shadow hover:shadow-md flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
                    style={{ backgroundColor: primaryColor || '#0A192F' }}
                  >
                    <span>View Collection Pieces</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
