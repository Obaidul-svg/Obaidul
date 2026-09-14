import React from 'react';
import { ButtonStyle, TypographyPreset } from '../../types';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';

interface JournalPageProps {
  primaryColor: string;
  buttonStyle: ButtonStyle;
  fontFamily: TypographyPreset;
  onExploreWatches: () => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({
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

  const articles = [
    {
      id: 1,
      tag: 'CALIBRE ARCHITECTURE',
      date: 'September 2026',
      readTime: '6 min read',
      title: 'Why Automatic Mechanical Watches Thrive in Tropical Bangladesh',
      excerpt: 'How micro-sealed hermetic gaskets, synthetic ruby jewels, and modern synthetic lubricants protect fine mechanical movements against South Asian humidity.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85'
    },
    {
      id: 2,
      tag: 'METALLURGY & GOLD',
      date: 'August 2026',
      readTime: '4 min read',
      title: 'The Art of Fluted Bezels: 18K Gold Lightplay on the Wrist',
      excerpt: 'Exploring the 48 geometric diamond-cut facets that give our Heritage Gold collection its distinctive warm shimmer in natural daylight.',
      image: 'https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=800&q=85'
    },
    {
      id: 3,
      tag: 'COLLECTOR GUIDE',
      date: 'July 2026',
      readTime: '8 min read',
      title: 'Beginning Your Mechanical Watch Collection in Dhaka',
      excerpt: 'An insider look at case diameter proportions, automatic vs manual winding calibres, and caring for calfskin straps in Dhaka executive circles.',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=85'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F6] text-stone-900 pb-24">
      {/* Header */}
      <div className="bg-[#FAF7F2] border-b border-stone-200/80 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-stone-500 mb-2 block">
            CHRONOVA EDITORIAL
          </span>
          <h1 className={`${fontClass} text-4xl sm:text-5xl md:text-6xl font-normal text-stone-900 mb-4`}>
            Horological Journal
          </h1>
          <p className="text-stone-600 text-base sm:text-lg font-sans-luxury max-w-2xl mx-auto font-light leading-relaxed">
            Essays on mechanical movement engineering, vintage watch preservation, and the culture of luxury timekeeping in Bangladesh.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-lg transition-all text-left flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
                    <span className="text-amber-800 font-semibold uppercase tracking-wider">{art.tag}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {art.readTime}</span>
                  </div>

                  <h3 className={`${fontClass} text-xl font-medium text-stone-900 group-hover:text-amber-700 transition-colors leading-snug`}>
                    {art.title}
                  </h3>

                  <p className="text-xs text-stone-500 font-light leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-100 mt-4 flex items-center justify-between text-xs text-stone-500 font-mono">
                <span>{art.date}</span>
                <span className="text-stone-900 font-medium group-hover:underline flex items-center gap-1 cursor-pointer">
                  Read Essay <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
