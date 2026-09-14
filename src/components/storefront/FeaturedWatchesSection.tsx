import React from 'react';
import { Product, ThemeSection, ButtonStyle, TypographyPreset } from '../../types';
import { ShoppingBag, Eye, Heart, Star, ArrowRight } from 'lucide-react';

interface FeaturedWatchesSectionProps {
  section: ThemeSection;
  products: Product[];
  primaryColor: string;
  buttonStyle: ButtonStyle;
  fontFamily: TypographyPreset;
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onViewAllClick: () => void;
}

export const FeaturedWatchesSection: React.FC<FeaturedWatchesSectionProps> = ({
  section,
  products,
  primaryColor,
  buttonStyle,
  fontFamily,
  wishlistIds = [],
  onToggleWishlist,
  onSelectProduct,
  onAddToCart,
  onViewAllClick,
}) => {
  const {
    headline = 'Curated Bangladeshi Collection',
    subheadline = 'Engineered for executive boardrooms in Gulshan to formal gala evenings across the country.',
    buttonText = 'Explore Full Vault'
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

  // Display featured products or take 4 watches
  const featured = products.filter(p => !p.isSignature).slice(0, 4);
  const displayItems = featured.length > 0 ? featured : products.slice(3, 7);

  return (
    <section className="py-20 bg-[#FAF7F2] text-stone-900 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="text-left">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-stone-500 mb-1 block">
              CHRONOVA ATELIER HIGHLIGHTS
            </span>
            <h2 className={`${fontClass} text-3xl sm:text-4xl md:text-5xl font-normal text-stone-900`}>
              {headline}
            </h2>
            <p className="text-stone-500 text-sm font-sans-luxury max-w-xl mt-2 font-light">
              {subheadline}
            </p>
          </div>

          <button
            onClick={onViewAllClick}
            className="text-xs uppercase tracking-wider font-semibold text-stone-800 hover:text-stone-950 flex items-center gap-1.5 underline underline-offset-4 cursor-pointer self-start md:self-end"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Grid of 4 watches */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="group bg-white border border-stone-200/80 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col relative"
              >
                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist?.(product.id);
                  }}
                  className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-sm transition-colors cursor-pointer ${
                    isWishlisted ? 'bg-rose-50 text-rose-600' : 'bg-white/80 text-stone-400 hover:text-stone-900'
                  }`}
                  aria-label="Wishlist Timepiece"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>

                {/* Image */}
                <div
                  className="relative aspect-square bg-stone-50/50 p-4 flex items-center justify-center overflow-hidden cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 bg-stone-900/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="p-2.5 bg-white text-stone-900 rounded-full shadow-md hover:bg-stone-100 transition-transform active:scale-95 cursor-pointer"
                      title="Inspect Specs"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="p-2.5 bg-[#0A192F] text-white rounded-full shadow-md hover:bg-[#122744] transition-transform active:scale-95 cursor-pointer"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow justify-between text-left">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      {product.brand ? (
                        <span className="text-[9px] uppercase font-mono tracking-wider font-semibold text-[#2A7B9B] bg-[#2A7B9B]/10 px-2 py-0.5 rounded">
                          {product.brand}
                        </span>
                      ) : (
                        <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400">
                          {product.category}
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-stone-400">{product.specs.caseDiameter}</span>
                    </div>
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="text-sm font-medium text-stone-900 group-hover:text-[#2A7B9B] transition-colors cursor-pointer truncate font-sans-luxury"
                    >
                      {product.title}
                    </h3>
                    <p className="text-[11px] text-stone-500 font-light line-clamp-1 mt-0.5">
                      {product.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-semibold text-stone-900 font-sans-luxury">
                        ৳ {product.price.toLocaleString()} BDT
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-[11px] text-stone-400 line-through">
                          ৳ {product.compareAtPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className={`${buttonRadiusClass} text-[11px] font-medium px-3 py-1.5 bg-stone-900 hover:bg-black text-white transition-colors cursor-pointer flex items-center gap-1`}
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
