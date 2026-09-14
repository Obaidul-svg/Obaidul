import React from 'react';
import { ButtonStyle, TypographyPreset } from '../../types';
import { ArrowRight, Sparkles, Shield, Compass, Hammer, Award } from 'lucide-react';

interface CraftsmanshipPageProps {
  primaryColor: string;
  buttonStyle: ButtonStyle;
  fontFamily: TypographyPreset;
  onExploreWatches: () => void;
}

export const CraftsmanshipPage: React.FC<CraftsmanshipPageProps> = ({
  primaryColor,
  buttonStyle,
  fontFamily,
  onExploreWatches,
}) => {
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

  const pillars = [
    {
      icon: <Hammer className="w-6 h-6 text-amber-800" />,
      title: '316L Surgical Steel & Grade 5 Titanium',
      description: 'Machined from aerospace-grade solid bars with alternating vertical satin brushing and mirror-polished bevels that resist corrosion in coastal climates.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-800" />,
      title: 'Double-Domed Sapphire Crystal',
      description: 'Mohs hardness 9 synthetic sapphire with five layers of internal anti-reflective coating ensuring total optical clarity under direct equatorial sunlight.'
    },
    {
      icon: <Award className="w-6 h-6 text-amber-800" />,
      title: '240-Hour Acoustic Calibration',
      description: 'Every escapement is timed across 5 spatial positions and 3 temperature gradients (4°C, 23°C, 38°C) in our climate-regulated Gulshan atelier.'
    },
    {
      icon: <Shield className="w-6 h-6 text-amber-800" />,
      title: 'Hydro-Pressure Hermetic Sealing',
      description: 'Equipped with dual FKM fluoroelastomer O-rings and screw-down knurled crowns tested to survive deep hydrostatic submersions from 50m to 300m.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F6] text-stone-900 pb-24">
      {/* Hero */}
      <div className="bg-[#FAF7F2] border-b border-stone-200/80 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-stone-500 mb-2 block">
            THE CHRONOVA PHILOSOPHY
          </span>
          <h1 className={`${fontClass} text-4xl sm:text-5xl md:text-6xl font-normal text-stone-900 mb-4`}>
            Designed to Endure
          </h1>
          <p className="text-stone-600 text-base sm:text-lg font-sans-luxury max-w-2xl mx-auto font-light leading-relaxed">
            In an era of disposable digital gadgets, CHRONOVA creates mechanical sanctuaries on the wrist — objects of permanent value, engineering art, and ancestral hand-finishing.
          </p>
        </div>
      </div>

      {/* Main Pillars */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-white p-8 sm:p-10 rounded-2xl border border-stone-200/90 shadow-sm text-left space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center">
                {p.icon}
              </div>
              <h3 className={`${fontClass} text-xl sm:text-2xl font-normal text-stone-900`}>
                {p.title}
              </h3>
              <p className="text-sm text-stone-600 font-sans-luxury font-light leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        {/* Large Editorial Visual */}
        <div className="mt-16 rounded-3xl overflow-hidden relative bg-stone-900 text-white p-8 sm:p-14 lg:p-20 text-left">
          <div className="max-w-2xl space-y-6 relative z-10">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-amber-300">
              DHAKA ATELIER BENCHMARKS
            </span>
            <h2 className={`${fontClass} text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white`}>
              Every Calibre Holds an Unbroken Rhythm
            </h2>
            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              Our master horologists regulate each mechanical balance wheel with precision micro-weights, ensuring time loss never exceeds +4/-2 seconds per day. Built to be passed from parent to child.
            </p>
            <div className="pt-2">
              <button
                onClick={onExploreWatches}
                className={`${buttonRadiusClass} px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-white hover:bg-amber-100 transition-all cursor-pointer shadow-lg inline-flex items-center gap-2`}
              >
                <span>Discover Signature Pieces</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
