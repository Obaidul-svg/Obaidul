import React, { useState, useEffect, useRef } from 'react';
import { ThemeSection, ButtonStyle, TypographyPreset } from '../../types';
import { 
  ArrowRight, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Gift, 
  Award, 
  Check, 
  Star 
} from 'lucide-react';

interface HeroSectionProps {
  section: ThemeSection;
  primaryColor: string;
  backgroundColor: string;
  accentColor: string;
  buttonStyle: ButtonStyle;
  fontFamily: TypographyPreset;
  onExploreClick: () => void;
}

// Visual Editorial Slides directly inspired by user photos:
// Photo 1: MEN'S WATCHES - TIME. STYLE. YOU. (Classic, Bold, Minimal, Sporty, Premium)
// Photo 2: TIME - Man in elegant dark suit leaning against luxury timepiece (Time is more than measured. It is mastered.)
// Photo 3: TIMELESS ELEGANCE - Made for Her (Luxury close up on wrist)
// Photo 4: TIMELESS STYLE - Young model in hoodie wearing clean steel watch (Minimal design. Maximum impact.)
// Photo 5: TIME - Man in sharp suit next to bold Chronograph (Precision is power / Swiss crafted.)
interface HeroSlideItem {
  id: string;
  badge: string;
  headlineMain: string;
  headlineSub: string;
  shortTagline: string;
  price: string;
  tag: string;
  bgImage: string;
  watchStyle: string;
}

const HERO_EDITORIAL_SLIDES: HeroSlideItem[] = [
  {
    id: 'slide-time-mastered',
    badge: 'LUXURY ATELIER',
    headlineMain: 'TIME.',
    headlineSub: 'STYLE. YOU.',
    shortTagline: 'সময় শুধু হিসাবের জন্য নয়, সময়কে জয় করার জন্য।',
    price: '৳ ৪,৮৫০',
    tag: 'OLEVS BOLD CHRONO',
    // Striking luxury editorial watch with model suit aesthetic (Inspired by Photo 2 & 5)
    bgImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=2000&q=90',
    watchStyle: 'মেটাল লিংক ও ক্রোনোগ্রাফ',
  },
  {
    id: 'slide-timeless-style',
    badge: 'TIMELESS STYLE',
    headlineMain: 'MINIMAL DESIGN.',
    headlineSub: 'MAXIMUM IMPACT.',
    shortTagline: 'প্রতিটি মুহূর্তের আভিজাত্য, যেকোনো পোশাকে মানানসই।',
    price: '৳ ৩,৯৫০',
    tag: 'CLASSIC STEEL EDITION',
    // Sharp young model wrist watch shot with clean modern style (Inspired by Photo 4)
    bgImage: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=2000&q=90',
    watchStyle: 'মডার্ন সিলভার ও লেদার',
  },
  {
    id: 'slide-precision-power',
    badge: 'SWISS CRAFTED',
    headlineMain: 'PRECISION IS POWER.',
    headlineSub: 'MASTER THE TIME.',
    shortTagline: 'স্যাফায়ার ক্রিস্টাল গ্লাস ও 316L সার্জিক্যাল স্টিল ফিনিশ।',
    price: '৳ ৬,৮০০',
    tag: 'EMERALD ARABIC DIAL',
    // Bold dark luxury timepiece aesthetic (Inspired by Photo 5 & 2)
    bgImage: 'https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=2000&q=90',
    watchStyle: 'পবিত্র আরবি ডায়াল সংস্করণ',
  },
  {
    id: 'slide-timeless-elegance',
    badge: 'FOR HER & HIM',
    headlineMain: 'TIMELESS ELEGANCE.',
    headlineSub: 'MADE TO SHINE.',
    shortTagline: 'পারফেক্ট ব্লেন্ড অব লাক্সারি অ্যান্ড কমফোর্ট।',
    price: '৳ ৪,২০০',
    tag: 'ROYAL HERITAGE DUO',
    // Elegant luxury wrist shot (Inspired by Photo 3)
    bgImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=2000&q=90',
    watchStyle: 'প্রিমিয়াম জেনুইন লেদার',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  section,
  primaryColor = '#0F172A',
  backgroundColor,
  accentColor = '#2A7B9B',
  buttonStyle = 'rounded',
  fontFamily = 'serif',
  onExploreClick,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const slides = HERO_EDITORIAL_SLIDES;

  useEffect(() => {
    if (isPaused) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  const active = slides[currentSlide];

  return (
    <section 
      id="hero-section"
      className="relative w-full bg-[#060C16] text-white overflow-hidden select-none border-b border-[#2A7B9B]/20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 
        MAIN FULL-BLEED EDITORIAL SLIDER
        Focus is purely on the large, captivating image, framed with luxury typography & minimal text
      */}
      <div className="relative w-full h-[520px] sm:h-[600px] md:h-[650px] lg:h-[720px] overflow-hidden">
        {slides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Main Focus: High-resolution Editorial Photo */}
              <img
                src={slide.bgImage}
                alt={`${slide.tag} editorial watch`}
                className="w-full h-full object-cover object-center filter brightness-[0.82] transition-transform duration-[7000ms] ease-out"
                style={{
                  transform: isActive ? 'scale(1.03)' : 'scale(1.10)',
                }}
              />

              {/* 
                Editorial Vignette Overlay:
                Transparent center to let the watch & model shine; dark soft edges for crisp text
              */}
              <div 
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(6, 12, 22, 0.4) 0%, rgba(6, 12, 22, 0.1) 30%, rgba(6, 12, 22, 0.75) 75%, rgba(6, 12, 22, 0.98) 100%), linear-gradient(90deg, rgba(6, 12, 22, 0.92) 0%, rgba(6, 12, 22, 0.6) 45%, rgba(6, 12, 22, 0.1) 75%, rgba(6, 12, 22, 0.7) 100%)',
                }}
              />

              {/* Giant Luxury Watermark "TIME" (Directly inspired by Poster 2 & 5) */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-1 text-center w-full"
                aria-hidden="true"
              >
                <span 
                  className="text-[140px] sm:text-[220px] md:text-[300px] lg:text-[400px] font-black tracking-[0.18em] uppercase font-serif block opacity-[0.04] leading-none text-white"
                >
                  TIME
                </span>
              </div>

              {/* Clean, Attractive, Concise Content Block */}
              <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-end pb-14 sm:pb-16 lg:pb-20">
                <div className="max-w-xl space-y-3 sm:space-y-4">
                  
                  {/* Category / Badge */}
                  <div className="flex items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase bg-[#2A7B9B]/25 border border-[#2A7B9B]/50 text-teal-200 backdrop-blur-md">
                      <Sparkles className="w-3.5 h-3.5 text-[#3EB2DB]" />
                      <span>{slide.badge}</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-1 text-[11px] text-amber-300 bg-black/40 px-2.5 py-1 rounded-full border border-white/10 font-medium">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>৪.৯/৫ রেটিং</span>
                    </div>
                  </div>

                  {/* Attractive Headline with High-Contrast Typography */}
                  <div className="space-y-0.5">
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase font-serif-luxury leading-[1.08] drop-shadow-md">
                      {slide.headlineMain} <br />
                      <span 
                        className="text-transparent bg-clip-text"
                        style={{
                          backgroundImage: 'linear-gradient(135deg, #FFFFFF 0%, #67E8F9 55%, #2A7B9B 100%)'
                        }}
                      >
                        {slide.headlineSub}
                      </span>
                    </h1>
                  </div>

                  {/* Short, Attractive Tagline (Kept minimal as requested) */}
                  <p className="text-xs sm:text-base text-stone-200 font-light max-w-md drop-shadow-sm leading-relaxed">
                    {slide.shortTagline}
                  </p>

                  {/* Price Tag & Single Primary Action Button */}
                  <div className="flex flex-wrap items-center gap-3.5 pt-1">
                    <button
                      onClick={onExploreClick}
                      className="px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-[#2A7B9B] to-[#164E63] hover:from-[#3EB2DB] hover:to-[#2A7B9B] text-white text-xs sm:text-sm font-bold shadow-xl shadow-teal-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2 cursor-pointer group"
                    >
                      <span>কালেকশন দেখুন • EXPLORE</span>
                      <ArrowRight className="w-4 h-4 text-teal-200 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#2A7B9B]/40">
                      <span className="text-[10px] font-mono text-stone-400 uppercase">মূল্য:</span>
                      <span className="text-xs sm:text-sm font-mono font-bold text-[#3EB2DB]">
                        {slide.price} BDT
                      </span>
                      <span className="text-[10px] text-stone-300 font-mono pl-1 border-l border-white/20">
                        {slide.tag}
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          );
        })}

        {/* Carousel Navigation Controls: Next / Prev Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-[#2A7B9B] text-white border border-white/15 transition-all duration-200 cursor-pointer backdrop-blur-xs hover:scale-105"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-[#2A7B9B] text-white border border-white/15 transition-all duration-200 cursor-pointer backdrop-blur-xs hover:scale-105"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicators & Quick Style Selector Bar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === i 
                  ? 'w-8 bg-[#3EB2DB]' 
                  : 'w-2 bg-stone-500 hover:bg-stone-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 
        Bottom Minimal Proof Bar (Inspired by Photo 1, 3, 4: Built to Last, Made For Men, Perfect Gift)
        Clean, uncluttered 3-column micro footer
      */}
      <div className="bg-[#040810] border-t border-[#2A7B9B]/20 py-3 sm:py-3.5 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-2 sm:gap-4 text-center text-stone-300 text-[11px] sm:text-xs">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3EB2DB] shrink-0" />
            <span className="font-semibold text-white">BUILT TO LAST</span>
            <span className="hidden md:inline text-stone-400">• ওয়াটারপ্রুফ ও স্যাফায়ার গ্লাস</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3EB2DB] shrink-0" />
            <span className="font-semibold text-white">PREMIUM FINISH</span>
            <span className="hidden md:inline text-stone-400">• 316L সার্জিক্যাল স্টিল</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3EB2DB] shrink-0" />
            <span className="font-semibold text-white">PERFECT GIFT</span>
            <span className="hidden md:inline text-stone-400">• লাক্সারি গিফট বক্স সহ</span>
          </div>
        </div>
      </div>
    </section>
  );
};
