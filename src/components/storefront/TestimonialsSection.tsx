import React from 'react';
import { ThemeSection, TypographyPreset } from '../../types';
import { Star } from 'lucide-react';

interface TestimonialsSectionProps {
  section: ThemeSection;
  fontFamily: TypographyPreset;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  section,
  fontFamily,
}) => {
  const {
    headline = 'Editorial Acclaim',
    quote = '“MANOVA has achieved what few modern watchmakers manage: timeless mechanical authority merged with razor-sharp aesthetic restraint.”',
    publication = 'GQ HOROLOGY & STYLE',
    author = 'Marcus Vance, Senior Watch Editor'
  } = section.settings;

  const fontClass = fontFamily === 'serif' 
    ? 'font-serif-luxury' 
    : fontFamily === 'display' 
    ? 'font-display-luxury' 
    : 'font-sans-luxury';

  const pressReviews = [
    {
      pub: 'GQ HOROLOGY',
      quote: quote,
      author: author
    },
    {
      pub: 'HODINKEE REVIEWS',
      quote: '“The Rose Horizon Automatic balances an uncompromising movement with wrist architecture that punches far beyond its retail tier.”',
      author: 'Claire Delacroix, Contributing Specialist'
    },
    {
      pub: 'THE FINANCIAL TIMES',
      quote: '“Quiet luxury distilled into pure horological substance. A modern classic for collectors who prize understated substance.”',
      author: 'Alistair Ross, Watch & Luxury Columnist'
    }
  ];

  return (
    <section className="py-20 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="flex justify-center items-center gap-1 text-amber-400 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-stone-400">
          {headline}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {pressReviews.map((rev, idx) => (
            <div key={idx} className="bg-stone-800/60 p-8 rounded-2xl border border-stone-700/60 flex flex-col justify-between text-left">
              <p className={`${fontClass} text-lg sm:text-xl text-stone-200 leading-relaxed font-light italic mb-6`}>
                {rev.quote}
              </p>
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-amber-400 block font-sans-luxury">
                  {rev.pub}
                </span>
                <span className="text-[11px] text-stone-400 font-sans-luxury block mt-0.5">
                  {rev.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
