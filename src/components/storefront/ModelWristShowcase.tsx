import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

export interface ModelWristSlide {
  id: string;
  badge: string;
  headline: string;
  tagline: string;
  watchModel: string;
  priceBDT: number;
  imageUrl: string;
}

export const LUXURY_MODEL_WRIST_SLIDES: ModelWristSlide[] = [
  {
    id: 'slide-1',
    badge: 'OLEVS AUTOMATIC',
    headline: 'রাজকীয় ব্যক্তিত্ব, আপনার কবজিতে',
    tagline: 'পাঞ্জাবি বা স্যুটের সাথে ওলেভস গোল্ড ট্যুরবিলিয়ন লুক',
    watchModel: 'OLEVS Skeleton Chrono',
    priceBDT: 4850,
    // Clear wrist shot showing watch on model's wrist
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'slide-2',
    badge: 'ARABIC DIAL',
    headline: 'পবিত্র আরবি ডায়ালের আভিজাত্য',
    tagline: 'খাঁটি আরবি সংখ্যা ও সানবার্স্ট এমারেল্ড গ্রিন ডায়াল',
    watchModel: 'Al-Bayan Arabic Watch',
    priceBDT: 6800,
    // Clear model wrist shot with luxury watch
    imageUrl: 'https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'slide-3',
    badge: 'SABR (صبر)',
    headline: 'ধৈর্য ও সফলতার চিরন্তন বার্তা',
    tagline: 'ম্যাট ব্ল্যাক ডায়ালে খাঁটি গোল্ডেন আরবি ক্যালিগ্রাফি',
    watchModel: 'SABR Luxury Calligraphy',
    priceBDT: 5200,
    // Refined timepiece on model's hand
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'slide-4',
    badge: 'POEDAGAR LUXURY',
    headline: 'নাইট লুমিনাস বিজনেস ক্রোনো',
    tagline: 'রাতের আঁধারেও জ্বলজ্বলে আলো ও ওয়াটারপ্রুফ বডি',
    watchModel: 'POEDAGAR Luminous Watch',
    priceBDT: 3950,
    // Wrist close-up on model with formal shirt/suit
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'slide-5',
    badge: 'MANOVA ATELIER',
    headline: 'প্রিমিয়াম সুইস মেকানিক্যাল ক্রাফট',
    tagline: 'স্যাফায়ার ক্রিস্টাল ও 316L সলিড সার্জিক্যাল স্টিল',
    watchModel: 'Royal Chrono 41mm',
    priceBDT: 48000,
    // Elegant luxury wristwear
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=85',
  },
];

interface ModelWristShowcaseProps {
  onExploreClick?: () => void;
  onSelectWatch?: (watchModel: string) => void;
}

export const ModelWristShowcase: React.FC<ModelWristShowcaseProps> = ({
  onExploreClick,
  onSelectWatch,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides = LUXURY_MODEL_WRIST_SLIDES;

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slides.length]);

  const goToSlide = (idx: number) => setCurrentIndex(idx);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div 
      className="relative w-full border-b border-[#2A7B9B]/25 bg-[#060C16] text-white overflow-hidden select-none group/carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide Stage with clear focus on Model Wrist + Watch */}
      <div className="relative h-[220px] sm:h-[260px] md:h-[290px] w-full overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* High Quality Wrist with Watch Image */}
              <img
                src={slide.imageUrl}
                alt={`${slide.watchModel} on model's wrist`}
                className="w-full h-full object-cover object-center filter brightness-[0.88] transition-transform duration-6000 ease-out"
                style={{
                  transform: isActive ? 'scale(1.02)' : 'scale(1.08)',
                }}
              />

              {/* Clean Luxury Gradient: Readable text without muddy blur */}
              <div 
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(6, 12, 22, 0.92) 0%, rgba(6, 12, 22, 0.72) 48%, rgba(6, 12, 22, 0.25) 75%, rgba(6, 12, 22, 0.85) 100%)',
                }}
              />

              {/* Minimal Clean Content: Headline + Simple Tagline + Action */}
              <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-5 sm:px-8 flex items-center">
                <div className="max-w-lg space-y-2 sm:space-y-2.5">
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider bg-[#2A7B9B]/25 border border-[#2A7B9B]/50 text-teal-200">
                    <Sparkles className="w-3 h-3 text-[#3EB2DB]" />
                    <span>{slide.badge}</span>
                  </div>

                  {/* Headline: Simple, Attractive & Direct */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug drop-shadow-sm">
                    {slide.headline}
                  </h3>

                  {/* Short Tagline */}
                  <p className="text-xs sm:text-sm text-stone-200/90 font-light leading-relaxed">
                    {slide.tagline}
                  </p>

                  {/* Clean Price & Action Button */}
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-xs sm:text-sm font-bold text-[#3EB2DB] bg-black/40 px-2.5 py-1 rounded border border-[#2A7B9B]/40 font-mono">
                      ৳ {slide.priceBDT.toLocaleString()} BDT
                    </span>

                    <button
                      onClick={() => {
                        if (onSelectWatch) onSelectWatch(slide.watchModel);
                        if (onExploreClick) onExploreClick();
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-[#2A7B9B] hover:bg-[#20637c] text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>কালেকশন দেখুন</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/50 hover:bg-[#2A7B9B] text-white border border-white/10 transition-all cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/50 hover:bg-[#2A7B9B] text-white border border-white/10 transition-all cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Minimal Dots Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-xs border border-white/10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === i ? 'w-5 bg-[#3EB2DB]' : 'w-1.5 bg-stone-500 hover:bg-stone-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
